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

export const subscriptionSummary: SubscriptionSummary = {
  monthlySpend: 687,
  activeCount: 5,
  annualSpend: 8244,
  renewThisWeek: 2,
};

export const installmentSummary: InstallmentSummary = {
  monthlyAmount: 0,
  activeCount: 0,
  remainingTotal: 0,
};

export const subscriptions: SubscriptionItem[] = [
  {
    id: '1',
    name: 'Netflix',
    logo: 'N',
    logoColor: '#E50914',
    amount: 129,
    status: 'active',
    renewalDate: '2026-04-27',
    daysUntilRenewal: 3,
    priceDelta: {
      value: 54,
      label: '+54 vs 2024',
    },
  },
  {
    id: '2',
    name: 'Spotify',
    logo: 'S',
    logoColor: '#1DB954',
    amount: 89,
    status: 'active',
    renewalDate: '2026-05-01',
    daysUntilRenewal: 7,
    priceDelta: {
      value: 0,
      label: 'stable',
    },
  },
  {
    id: '3',
    name: 'Shahid',
    logo: 'Sh',
    logoColor: '#6C5CE7',
    amount: 149,
    status: 'warning',
    renewalDate: '2026-05-15',
    daysUntilRenewal: 21,
    usageDaysUnused: 45,
  },
  {
    id: '4',
    name: 'YouTube Premium',
    logo: 'Y',
    logoColor: '#FF0000',
    amount: 85,
    status: 'active',
    renewalDate: '2026-04-30',
    daysUntilRenewal: 6,
    priceDelta: {
      value: 15,
      label: '+15 vs 2024',
    },
  },
];

export const installments: InstallmentItem[] = [
  {
    id: '1',
    name: 'ValU',
    logo: 'V',
    logoColor: '#8B5CF6',
    amount: 1500,
    status: 'active',
    renewalDate: '2026-05-01',
    daysUntilPayment: 7,
    totalMonths: 12,
    paidMonths: 3,
    remainingAmount: 13500,
  },
  {
    id: '2',
    name: 'Sympl',
    logo: 'Sy',
    logoColor: '#10B981',
    amount: 450,
    status: 'active',
    renewalDate: '2026-05-15',
    daysUntilPayment: 21,
    totalMonths: 6,
    paidMonths: 2,
    remainingAmount: 1800,
  },
  {
    id: '3',
    name: 'Fawry+',
    logo: 'F+',
    logoColor: '#F59E0B',
    amount: 800,
    status: 'warning',
    renewalDate: '2026-04-28',
    daysUntilPayment: 3,
    totalMonths: 10,
    paidMonths: 4,
    remainingAmount: 4800,
  },
];