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

export interface BillsSummary {
  subscriptions: SubscriptionSummary;
  installments: InstallmentSummary;
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
