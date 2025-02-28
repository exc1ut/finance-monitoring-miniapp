import { createContext, ReactNode, useContext, useState } from 'react';
import { defaultFilters, TransactionFilters, useTransactions } from '../hooks/useTransactions';

interface TransactionsContextType {
  filters: TransactionFilters;
  setFilters: (filters: TransactionFilters) => void;
  dailyGroups: ReturnType<typeof useTransactions>['dailyGroups'];
  summary: ReturnType<typeof useTransactions>['summary'];
  loading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => Promise<unknown>;
  error: any;
  filterOptions: ReturnType<typeof useTransactions>['filterOptions'];
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined);

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<TransactionFilters>(defaultFilters);

  // Use our custom hook to fetch transactions with the current filters
  const {
    dailyGroups,
    summary,
    loading,
    error,
    filterOptions,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useTransactions(filters);

  return (
    <TransactionsContext.Provider
      value={{
        filters,
        setFilters,
        dailyGroups,
        summary,
        loading,
        error,
        filterOptions,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactionsContext() {
  const context = useContext(TransactionsContext);
  if (context === undefined) {
    throw new Error('useTransactionsContext must be used within a TransactionsProvider');
  }
  return context;
}
