import { createContext, useContext, useState, useEffect, useCallback, useRef, useMemo, ReactNode } from 'react';
import { useAuth } from '@clerk/clerk-expo';
import { createDB, Subscription as DBSubscription, Installment as DBInstallment } from '@/utils/db';

const LOGO_COLORS: Record<string, string> = {
  Netflix: '#E50914',
  Spotify: '#1DB954',
  Shahid: '#6C5CE7',
  'YouTube Premium': '#FF0000',
  Disney: '#0063E5',
  default: '#8B5CF6',
};

const INSTALLMENT_LOGO_COLORS: Record<string, string> = {
  ValU: '#8B5CF6',
  Sympl: '#10B981',
  'Fawry+': '#F59E0B',
  default: '#6B7280',
};

function getLogo(name: string): string {
  return name.substring(0, 2).toUpperCase();
}

function daysUntil(dateStr: string): number {
  const target = new Date(dateStr);
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function mapDBToUISubscription(s: DBSubscription): SubscriptionItem {
  const days = daysUntil(s.next_renewal);
  return {
    id: s.id.toString(),
    name: s.name,
    logo: getLogo(s.name),
    logoColor: LOGO_COLORS[s.name] || LOGO_COLORS.default,
    amount: s.amount,
    status: s.status === 'active' ? 'active' : s.status === 'paused' ? 'inactive' : 'warning',
    renewalDate: s.next_renewal,
    daysUntilRenewal: days,
  };
}

function mapDBToUIInstallment(i: DBInstallment): InstallmentItem {
  const days = daysUntil(i.next_payment_date);
  return {
    id: i.id.toString(),
    name: i.name,
    logo: getLogo(i.name),
    logoColor: INSTALLMENT_LOGO_COLORS[i.name] || INSTALLMENT_LOGO_COLORS.default,
    amount: i.amount,
    status: i.status,
    renewalDate: i.next_payment_date,
    daysUntilPayment: days,
    totalMonths: i.total_months,
    paidMonths: i.paid_months,
    remainingAmount: i.remaining_amount,
  };
}

export interface InstallmentItem {
  id: string;
  name: string;
  logo: string;
  logoColor: string;
  amount: number;
  status: 'active' | 'warning' | 'completed' | 'inactive';
  renewalDate: string;
  daysUntilPayment: number;
  totalMonths: number;
  paidMonths: number;
  remainingAmount: number;
}

export interface InstallmentSummary {
  monthlyAmount: number;
  activeCount: number;
  remainingTotal: number;
}

export interface SubscriptionItem {
  id: string;
  name: string;
  logo: string;
  logoColor: string;
  amount: number;
  status: 'active' | 'warning' | 'inactive';
  renewalDate: string;
  daysUntilRenewal: number;
  usageDaysUnused?: number;
  priceDelta?: {
    value: number;
    label: string;
  };
  installmentRemaining?: number;
}

export interface SubscriptionSummary {
  monthlySpend: number;
  activeCount: number;
  annualSpend: number;
  renewThisWeek: number;
}

type BillsTab = 'subscriptions' | 'installments';

interface BillsContextType {
  subscriptions: SubscriptionItem[];
  installments: InstallmentItem[];
  subscriptionSummary: SubscriptionSummary;
  installmentSummary: InstallmentSummary;
  activeTab: BillsTab;
  setActiveTab: (tab: BillsTab) => void;
  loading: boolean;
  refetch: () => Promise<void>;
  deleteSubscription: (id: string) => Promise<void>;
}

const BillsContext = createContext<BillsContextType | undefined>(undefined);

function computeSubscriptionSummary(subs: SubscriptionItem[]): SubscriptionSummary {
  const active = subs.filter((s) => s.status === 'active');
  const monthlySpend = active.reduce((sum, s) => sum + s.amount, 0);
  const annualSpend = monthlySpend * 12;
  const renewThisWeek = active.filter((s) => s.daysUntilRenewal <= 7).length;
  return { monthlySpend, activeCount: active.length, annualSpend, renewThisWeek };
}

function computeInstallmentSummary(insts: InstallmentItem[]): InstallmentSummary {
  const active = insts.filter((i) => i.status === 'active');
  const monthlyAmount = active.reduce((sum, i) => sum + i.amount, 0);
  const remainingTotal = active.reduce((sum, i) => sum + i.remainingAmount, 0);
  return { monthlyAmount, activeCount: active.length, remainingTotal };
}

export function BillsProvider({ children }: { children: ReactNode }) {
  const [subscriptions, setSubscriptions] = useState<SubscriptionItem[]>([]);
  const [installments, setInstallments] = useState<InstallmentItem[]>([]);
  const subscriptionSummary = useMemo(() => computeSubscriptionSummary(subscriptions), [subscriptions]);
  const installmentSummary = useMemo(() => computeInstallmentSummary(installments), [installments]);
  const [activeTab, setActiveTab] = useState<BillsTab>('subscriptions');
  const [loading, setLoading] = useState(true);
  const { getToken, userId } = useAuth();
  const getTokenRef = useRef(getToken);
  getTokenRef.current = getToken;

  const fetchData = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const db = createDB(async () => (await getTokenRef.current()) || '');
      const [subsData, instsData] = await Promise.all([
        db.subscriptions.getAll(userId),
        db.installments.getAll(userId),
      ]);
      const subs = subsData.map(mapDBToUISubscription);
      const insts = instsData.map(mapDBToUIInstallment);
      setSubscriptions(subs);
      setInstallments(insts);
    } catch (err) {
      console.error('Failed to fetch bills data:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const deleteSubscription = useCallback(async (id: string) => {
    try {
      const db = createDB(async () => (await getTokenRef.current()) || '');
      await db.subscriptions.delete(Number(id));
      setSubscriptions(prev => prev.filter(sub => sub.id !== id));
    } catch (err) {
      console.error('Failed to delete subscription:', err);
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <BillsContext.Provider
      value={{
        subscriptions,
        installments,
        subscriptionSummary,
        installmentSummary,
        activeTab,
        setActiveTab,
        loading,
        refetch: fetchData,
        deleteSubscription,
      }}
    >
      {children}
    </BillsContext.Provider>
  );
}

export function useBills() {
  const context = useContext(BillsContext);
  if (!context) {
    throw new Error('useBills must be used within a BillsProvider');
  }
  return context;
}
