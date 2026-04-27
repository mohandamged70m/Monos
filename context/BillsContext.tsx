import { createContext, useContext, useState, ReactNode } from 'react';
import {
  SubscriptionItem,
  SubscriptionSummary,
  InstallmentItem,
  InstallmentSummary,
  subscriptions as initialSubscriptions,
  installments as initialInstallments,
  subscriptionSummary as initialSubSummary,
  installmentSummary as initialInstSummary,
} from '@/constants/billsData';

type BillsTab = 'subscriptions' | 'installments';

interface BillsContextType {
  subscriptions: SubscriptionItem[];
  installments: InstallmentItem[];
  subscriptionSummary: SubscriptionSummary;
  installmentSummary: InstallmentSummary;
  activeTab: BillsTab;
  setActiveTab: (tab: BillsTab) => void;
  addSubscription: (sub: Omit<SubscriptionItem, 'id'>) => void;
  addInstallment: (inst: Omit<InstallmentItem, 'id'>) => void;
  removeSubscription: (id: string) => void;
  removeInstallment: (id: string) => void;
}

const BillsContext = createContext<BillsContextType | undefined>(undefined);

export function BillsProvider({ children }: { children: ReactNode }) {
  const [subscriptions, setSubscriptions] = useState<SubscriptionItem[]>(initialSubscriptions);
  const [installments, setInstallments] = useState<InstallmentItem[]>(initialInstallments);
  const [subscriptionSummary, setSubscriptionSummary] = useState<SubscriptionSummary>(initialSubSummary);
  const [installmentSummary, setInstallmentSummary] = useState<InstallmentSummary>(initialInstSummary);
  const [activeTab, setActiveTab] = useState<BillsTab>('subscriptions');

  const addSubscription = (sub: Omit<SubscriptionItem, 'id'>) => {
    const newSub: SubscriptionItem = {
      ...sub,
      id: Date.now().toString(),
    };
    setSubscriptions((prev) => [newSub, ...prev]);
    updateSubscriptionSummary([...subscriptions, newSub]);
  };

  const addInstallment = (inst: Omit<InstallmentItem, 'id'>) => {
    const newInst: InstallmentItem = {
      ...inst,
      id: Date.now().toString(),
    };
    setInstallments((prev) => [newInst, ...prev]);
    updateInstallmentSummary([...installments, newInst]);
  };

  const removeSubscription = (id: string) => {
    const updated = subscriptions.filter((s) => s.id !== id);
    setSubscriptions(updated);
    updateSubscriptionSummary(updated);
  };

  const removeInstallment = (id: string) => {
    const updated = installments.filter((i) => i.id !== id);
    setInstallments(updated);
    updateInstallmentSummary(updated);
  };

  const updateSubscriptionSummary = (subs: SubscriptionItem[]) => {
    const active = subs.filter((s) => s.status === 'active');
    const monthlySpend = active.reduce((sum, s) => sum + s.amount, 0);
    const annualSpend = monthlySpend * 12;
    const renewThisWeek = active.filter((s) => s.daysUntilRenewal <= 7).length;
    setSubscriptionSummary({
      monthlySpend,
      activeCount: active.length,
      annualSpend,
      renewThisWeek,
    });
  };

  const updateInstallmentSummary = (insts: InstallmentItem[]) => {
    const active = insts.filter((i) => i.status === 'active');
    const monthlyAmount = active.reduce((sum, i) => sum + i.amount, 0);
    const remainingTotal = active.reduce((sum, i) => sum + i.remainingAmount, 0);
    setInstallmentSummary({
      monthlyAmount,
      activeCount: active.length,
      remainingTotal,
    });
  };

  return (
    <BillsContext.Provider
      value={{
        subscriptions,
        installments,
        subscriptionSummary,
        installmentSummary,
        activeTab,
        setActiveTab,
        addSubscription,
        addInstallment,
        removeSubscription,
        removeInstallment,
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