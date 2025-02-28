import { DailyTransactionGroup, Transaction } from '../types/transaction';

// Format date as "DD MMM YYYY" (e.g. "25 Jun 2023")
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

// Check if two dates are the same day
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

// Group transactions by date
export const groupTransactionsByDate = (transactions: Transaction[]): DailyTransactionGroup[] => {
  // Sort transactions by date (newest first)
  const sortedTransactions = [...transactions].sort((a, b) => b.date.getTime() - a.date.getTime());

  const dailyGroups: DailyTransactionGroup[] = [];

  sortedTransactions.forEach((transaction) => {
    // Find if we already have a group for this date
    const existingGroup = dailyGroups.find((group) => isSameDay(group.date, transaction.date));

    if (existingGroup) {
      // Add transaction to existing group
      existingGroup.transactions.push(transaction);

      // Update totals
      if (transaction.type === 'income') {
        existingGroup.totalIncome += transaction.amount;
      } else {
        existingGroup.totalOutcome += transaction.amount;
      }
    } else {
      // Create a new group
      dailyGroups.push({
        date: transaction.date,
        transactions: [transaction],
        totalIncome: transaction.type === 'income' ? transaction.amount : 0,
        totalOutcome: transaction.type === 'outcome' ? transaction.amount : 0,
      });
    }
  });

  return dailyGroups;
};

// Calculate overall totals
export const calculateOverallTotals = (transactions: Transaction[]) => {
  const totals = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'income') {
        acc.totalIncome += transaction.amount;
      } else {
        acc.totalOutcome += transaction.amount;
      }
      return acc;
    },
    { totalIncome: 0, totalOutcome: 0 }
  );

  return {
    ...totals,
    balance: totals.totalIncome - totals.totalOutcome,
  };
};
