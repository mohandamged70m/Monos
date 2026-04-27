import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '@/constants/theme';

interface SubscriptionSummaryData {
  monthlySpend: number;
  activeCount: number;
  annualSpend: number;
  renewThisWeek: number;
}

interface InstallmentSummaryData {
  monthlyAmount: number;
  activeCount: number;
  remainingTotal: number;
}

type TabType = 'subscriptions' | 'installments';

interface BillsSummaryCardProps {
  type: TabType;
  subscriptionData?: SubscriptionSummaryData;
  installmentData?: InstallmentSummaryData;
}

function formatCurrency(value: number): string {
  return `EGP ${new Intl.NumberFormat('en-EG').format(value)}`;
}

export default function BillsSummaryCard({
  type,
  subscriptionData,
  installmentData,
}: BillsSummaryCardProps) {
  const isSubscription = type === 'subscriptions';
  const accentColor = isSubscription ? theme.colors.teal : theme.colors.accent;

  const sub = subscriptionData ?? {
    monthlySpend: 0,
    activeCount: 0,
    annualSpend: 0,
    renewThisWeek: 0,
  };

  const inst = installmentData ?? {
    monthlyAmount: 0,
    activeCount: 0,
    remainingTotal: 0,
  };

  return (
    <LinearGradient
      colors={['#1A1A2E', '#16161F']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.heroSection}>
        <Text style={styles.heroLabel}>
          {isSubscription ? 'MONTHLY SPENDING' : 'MONTHLY INSTALLMENTS'}
        </Text>
        <Text style={styles.heroValue}>
          {formatCurrency(isSubscription ? sub.monthlySpend : inst.monthlyAmount)}
        </Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={[styles.statValue, { color: accentColor }]}>
            {isSubscription ? sub.activeCount : inst.activeCount}
          </Text>
          <Text style={styles.statLabel}>active</Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.stat}>
          <Text style={[styles.statValue, { color: accentColor }]}>
            {isSubscription
              ? formatCurrency(sub.annualSpend)
              : formatCurrency(inst.remainingTotal)}
          </Text>
          <Text style={styles.statLabel}>
            {isSubscription ? 'per year' : 'remaining'}
          </Text>
        </View>

        {isSubscription && (
          <>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={[styles.statValue, { color: theme.colors.warning }]}>
                {sub.renewThisWeek}
              </Text>
              <Text style={styles.statLabel}>this week</Text>
            </View>
          </>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  heroLabel: {
    color: theme.colors.textMuted,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  heroValue: {
    color: theme.colors.textPrimary,
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -1,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  statLabel: {
    color: theme.colors.textMuted,
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'center',
  },
});