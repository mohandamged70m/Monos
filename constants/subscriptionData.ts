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
    name: 'Valu Installment',
    logo: 'V',
    logoColor: '#3B82F6',
    amount: 320,
    status: 'active',
    renewalDate: '2026-05-10',
    daysUntilRenewal: 16,
    installmentRemaining: 3840,
  },
  {
    id: '5',
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

export const inflationAlert = {
  enabled: true,
  label: '↑ EGP inflation alert',
  message: 'USD-priced subscriptions cost 42% more since Jan 2024',
};