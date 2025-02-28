import { useEffect, useMemo, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { DateValue } from '@mantine/dates';
import { useAppApiAccountAccountList } from '../api/finance-tracker/account/account';
import { useAppApiCardCardList } from '../api/finance-tracker/card/card';
import { appApiTransactionTransactionList } from '../api/finance-tracker/transaction/transaction';
import { DailyTransactionGroup, Transaction, TransactionType } from '../types/transaction';
import { calculateOverallTotals, groupTransactionsByDate } from '../utils/transactionUtils';

// Pagination settings
const PAGE_SIZE = 10; // Reduce page size to make pagination more visible

// Filter types
export interface TransactionFilters {
  dateRange: [DateValue, DateValue];
  quickFilter: string;
  categories: string[];
  cards: string[];
  merchants: string[];
  amountRange: [number | null, number | null];
  transactionType: TransactionType | 'all';
}

export const defaultFilters: TransactionFilters = {
  dateRange: [null, null],
  quickFilter: 'month',
  categories: [],
  cards: [],
  merchants: [],
  amountRange: [null, null],
  transactionType: 'all',
};

export const useTransactions = (filters: TransactionFilters = defaultFilters) => {
  // State for processed data
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [dailyGroups, setDailyGroups] = useState<DailyTransactionGroup[]>([]);
  const [summary, setSummary] = useState({ totalIncome: 0, totalOutcome: 0, balance: 0 });

  // Fetch transactions with React Query's Infinite Query
  const {
    data: transactionPages,
    isLoading: isLoadingTransactions,
    error: transactionError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch: refetchTransactions,
  } = useInfiniteQuery({
    queryKey: ['transactions', filters],
    queryFn: async ({ pageParam = 0 }) => {
      console.log(`Fetching transactions with offset=${pageParam}, limit=${PAGE_SIZE}`);
      const result = await appApiTransactionTransactionList({
        limit: PAGE_SIZE,
        offset: pageParam,
        // We could add more filtering parameters here once the API supports them
      });

      console.log(`Received ${result.items.length} transactions`);
      return result;
    },
    getNextPageParam: (lastPage, pages) => {
      // If the last page has fewer items than PAGE_SIZE, we've reached the end
      if (!lastPage.items || lastPage.items.length < PAGE_SIZE) {
        console.log('No more pages to fetch');
        return undefined;
      }

      // Otherwise, return the next offset
      const nextOffset = pages.length * PAGE_SIZE;
      console.log(`Next page offset: ${nextOffset}`);
      return nextOffset;
    },
    initialPageParam: 0,
    // Add a stale time to avoid refetching data too often
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Fetch accounts for category information
  const { isLoading: isLoadingAccounts } = useAppApiAccountAccountList();

  // Fetch cards for payment method information
  const { data: cardData, isLoading: isLoadingCards } = useAppApiCardCardList();

  // Combine all transaction pages into a single array
  const allTransactions = useMemo(() => {
    if (!transactionPages) {
      return [];
    }

    const transactions = transactionPages.pages.flatMap((page) => page.items || []);
    console.log(`Total transactions after flattening: ${transactions.length}`);
    return transactions;
  }, [transactionPages]);

  // Apply filters to transactions
  const applyFilters = (data: Transaction[], filters: TransactionFilters): Transaction[] => {
    return data.filter((transaction) => {
      // Filter by date range
      if (filters.dateRange[0] && filters.dateRange[1]) {
        const startDate = filters.dateRange[0];
        const endDate = filters.dateRange[1];
        if (startDate && endDate) {
          if (transaction.date < startDate || transaction.date > endDate) {
            return false;
          }
        }
      }

      // Filter by quick filter (today, week, month, year)
      if (filters.quickFilter !== 'all') {
        const now = new Date();
        const transactionDate = transaction.date;

        if (filters.quickFilter === 'today') {
          if (
            transactionDate.getDate() !== now.getDate() ||
            transactionDate.getMonth() !== now.getMonth() ||
            transactionDate.getFullYear() !== now.getFullYear()
          ) {
            return false;
          }
        } else if (filters.quickFilter === 'week') {
          // Get start of current week (Sunday)
          const startOfWeek = new Date(now);
          startOfWeek.setDate(now.getDate() - now.getDay());
          startOfWeek.setHours(0, 0, 0, 0);

          if (transactionDate < startOfWeek) {
            return false;
          }
        } else if (filters.quickFilter === 'month') {
          if (
            transactionDate.getMonth() !== now.getMonth() ||
            transactionDate.getFullYear() !== now.getFullYear()
          ) {
            return false;
          }
        } else if (filters.quickFilter === 'year') {
          if (transactionDate.getFullYear() !== now.getFullYear()) {
            return false;
          }
        }
      }

      // Filter by categories
      if (filters.categories.length > 0) {
        if (!filters.categories.includes(transaction.category)) {
          return false;
        }
      }

      // Filter by cards
      if (filters.cards.length > 0 && transaction.cardId) {
        if (!filters.cards.includes(transaction.cardId)) {
          return false;
        }
      }

      // Filter by merchants
      if (filters.merchants.length > 0) {
        if (!filters.merchants.includes(transaction.merchantName)) {
          return false;
        }
      }

      // Filter by amount range
      if (filters.amountRange[0] !== null) {
        if (transaction.amount < filters.amountRange[0]) {
          return false;
        }
      }

      if (filters.amountRange[1] !== null) {
        if (transaction.amount > filters.amountRange[1]) {
          return false;
        }
      }

      // Filter by transaction type
      if (filters.transactionType !== 'all') {
        if (transaction.type !== filters.transactionType) {
          return false;
        }
      }

      return true;
    });
  };

  // Get unique categories, merchants, and cards for filters
  const getFilterOptions = () => {
    const categories = [...new Set(transactions.map((t) => t.category))];
    const merchants = [...new Set(transactions.map((t) => t.merchantName))];

    // Cards would come from the cardData API response
    const cards =
      cardData?.items?.map((card) => ({
        value: card.id.toString(),
        label: card.name,
      })) || [];

    return {
      categories: categories.map((cat) => ({ value: cat, label: cat })),
      merchants: merchants.map((merchant) => ({ value: merchant, label: merchant })),
      cards,
    };
  };

  // Apply filters and transform API data to our application format
  useEffect(() => {
    if (allTransactions.length > 0 && !isLoadingTransactions) {
      // Transform API data to our application format
      const transformedTransactions: Transaction[] = allTransactions.map((item) => {
        // Determine if it's income or outcome based on amount (positive = income, negative = outcome)
        // Amount could be string or number in the API
        const amount = typeof item.amount === 'string' ? parseFloat(item.amount) : item.amount;
        const type: TransactionType = amount >= 0 ? 'income' : 'outcome';

        return {
          id: item.id.toString(),
          merchantName: item.name,
          // Category would likely come from account or a separate field
          category: item.account?.name || 'Uncategorized',
          date: new Date(item.date),
          // Use absolute value for consistency in our app
          amount: Math.abs(amount),
          type,
          // Add card information for filtering
          cardId: item.card?.id.toString(),
        };
      });

      // Apply filters
      const filteredTransactions = applyFilters(transformedTransactions, filters);
      console.log(`Filtered transactions: ${filteredTransactions.length}`);

      // Set transactions
      setTransactions(filteredTransactions);

      // Group by date and calculate totals
      const groups = groupTransactionsByDate(filteredTransactions);
      setDailyGroups(groups);

      const totals = calculateOverallTotals(filteredTransactions);
      setSummary(totals);
    }
  }, [allTransactions, isLoadingTransactions, filters]);

  return {
    transactions,
    dailyGroups,
    summary,
    loading: isLoadingTransactions || isLoadingAccounts || isLoadingCards,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error: transactionError,
    refetch: refetchTransactions,
    filterOptions: getFilterOptions(),
  };
};
