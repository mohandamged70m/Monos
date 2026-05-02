import { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react';
import { useAuth } from '@clerk/clerk-expo';
import { createDB, Transaction as DBTransaction } from '@/utils/db';

const CATEGORY_ICONS: Record<string, { icon: string; bg: string }> = {
  Food: { icon: '🍔', bg: '#FFEDD5' },
  Transport: { icon: '🚌', bg: '#DBEAFE' },
  Grocery: { icon: '🛒', bg: '#DCFCE7' },
  Entertainment: { icon: '🎬', bg: '#F3E8FF' },
  Shopping: { icon: '🛍️', bg: '#FCE7F3' },
  Personal: { icon: '💇', bg: '#FEE2E2' },
  Bills: { icon: '💡', bg: '#FEF3C7' },
  Health: { icon: '💊', bg: '#FECACA' },
};

function mapDBToUI(tx: DBTransaction): Transaction {
  const cat = CATEGORY_ICONS[tx.category] || { icon: '💳', bg: '#E5E7EB' };
  return {
    id: tx.id,
    icon: cat.icon,
    iconBg: cat.bg,
    merchant: tx.merchant || 'Unknown',
    category: tx.category,
    amount: tx.amount,
    date: tx.date,
    type: tx.type,
    account: tx.account || 'Main Account',
    description: tx.merchant || '',
    note: tx.note || undefined,
  };
}

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
  loading: boolean;
  error: string | null;
  addTransaction: (tx: Omit<Transaction, 'id' | 'icon' | 'iconBg'>) => Promise<void>;
  deleteTransaction: (id: number) => Promise<void>;
  refetch: () => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined);

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getToken, userId } = useAuth();
  const getTokenRef = useRef(getToken);
  getTokenRef.current = getToken;

  const fetchTransactions = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    try {
      const db = createDB(async () => (await getTokenRef.current()) || '');
      const data = await db.transactions.getAll(userId);
      setTransactions(data.map(mapDBToUI));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const addTransaction = async (tx: Omit<Transaction, 'id' | 'icon' | 'iconBg'>) => {
    if (!userId) return;
    const db = createDB(async () => (await getTokenRef.current()) || '');
    await db.transactions.create({
      user_id: userId,
      amount: tx.amount,
      category: tx.category,
      merchant: tx.merchant || null,
      date: tx.date || new Date().toISOString().split('T')[0],
      note: tx.note || null,
      type: tx.type,
      account: tx.account || null,
    });
    await fetchTransactions();
  };

  const deleteTransaction = async (id: number) => {
    if (!userId) return;
    const db = createDB(async () => (await getTokenRef.current()) || '');
    await db.transactions.delete(id);
    await fetchTransactions();
  };

  return (
    <TransactionsContext.Provider value={{ transactions, loading, error, addTransaction, deleteTransaction, refetch: fetchTransactions }}>
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
