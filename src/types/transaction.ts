export type TransactionType = 'income' | 'outcome';

export interface Transaction {
  id: string;
  merchantName: string;
  category: string;
  date: Date;
  amount: number;
  type: TransactionType;
  description?: string;
  cardId?: string;
}

export interface DailyTransactionGroup {
  date: Date;
  transactions: Transaction[];
  totalIncome: number;
  totalOutcome: number;
}
