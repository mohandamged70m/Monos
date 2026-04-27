import { createContext, useContext, useState, ReactNode } from 'react';

export interface Transaction {
  id: number;
  icon: string;
  iconBg: string;
  merchant: string;
  category: string;
  amount: number;
  date?: string;
  type: 'expense' | 'income' | 'transfer';
  account: string;
  description?: string;
  note?: string;
}

interface TransactionsContextType {
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined);

const initialTransactions: Transaction[] = [
  { id: 1, icon: '🍔', iconBg: '#FFEDD5', merchant: 'McDonalds', category: 'Food', amount: 250, type: 'expense', account: 'Main Account' },
  { id: 2, icon: '🚌', iconBg: '#DBEAFE', merchant: 'Uber', category: 'Transport', amount: 120, type: 'expense', account: 'Main Account' },
  { id: 3, icon: '🛒', iconBg: '#DCFCE7', merchant: 'Walmart', category: 'Grocery', amount: 890, type: 'expense', account: 'Main Account' },
  { id: 4, icon: '🎬', iconBg: '#F3E8FF', merchant: 'Netflix', category: 'Entertainment', amount: 129, type: 'expense', account: 'Main Account' },
  { id: 5, icon: '☕', iconBg: '#FEF3C7', merchant: 'Starbucks', category: 'Food', amount: 45, type: 'expense', account: 'Main Account' },
];

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  const addTransaction = (tx: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = {
      ...tx,
      id: Date.now(),
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  return (
    <TransactionsContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionsProvider');
  }
  return context;
}