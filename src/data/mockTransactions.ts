import { Transaction } from '../types/transaction';

// Helper to create dates relative to today
const daysAgo = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    merchantName: 'Acme Corp',
    category: 'Salary',
    date: daysAgo(0),
    amount: 3000,
    type: 'income',
    description: 'Monthly salary',
  },
  {
    id: '2',
    merchantName: 'Grocery Store',
    category: 'Food',
    date: daysAgo(0),
    amount: 85.4,
    type: 'outcome',
    description: 'Weekly groceries',
  },
  {
    id: '3',
    merchantName: 'Electric Company',
    category: 'Utilities',
    date: daysAgo(1),
    amount: 120.3,
    type: 'outcome',
    description: 'Monthly electricity bill',
  },
  {
    id: '4',
    merchantName: 'Gas Station',
    category: 'Transportation',
    date: daysAgo(1),
    amount: 45.2,
    type: 'outcome',
    description: 'Fuel',
  },
  {
    id: '5',
    merchantName: 'Freelance Client',
    category: 'Side Income',
    date: daysAgo(2),
    amount: 250,
    type: 'income',
    description: 'Website design project',
  },
  {
    id: '6',
    merchantName: 'Restaurant',
    category: 'Food',
    date: daysAgo(2),
    amount: 35.6,
    type: 'outcome',
    description: 'Dinner with friends',
  },
  {
    id: '7',
    merchantName: 'Mobile Provider',
    category: 'Utilities',
    date: daysAgo(3),
    amount: 55.0,
    type: 'outcome',
    description: 'Monthly phone bill',
  },
  {
    id: '8',
    merchantName: 'Online Store',
    category: 'Shopping',
    date: daysAgo(4),
    amount: 120.5,
    type: 'outcome',
    description: 'New clothing items',
  },
];
