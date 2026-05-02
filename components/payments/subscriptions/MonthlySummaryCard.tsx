import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '@/constants/theme';
import { SubscriptionSummary } from '@/constants/billsData';

interface MonthlySummaryCardProps {
  data?: SubscriptionSummary;
}

function formatCurrency(value: number): string {
  return `EGP ${new Intl.NumberFormat('en-EG').format(value)}`;
}

export default function MonthlySummaryCard({ data }: MonthlySummaryCardProps) {
  if (!data) return null;

  const summary = data;

  return (
    <LinearGradient
      colors={['#1A1A2E', '#16161F']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.heroSection}>
        <Text style={styles.heroLabel}>MONTHLY SPEND</Text>
        <Text style={styles.heroValue}>{formatCurrency(summary.monthlySpend)}</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={[styles.statValue, { color: theme.colors.purple }]}>
            {summary.activeCount}
          </Text>
          <Text style={styles.statLabel}>active subscriptions</Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.stat}>
          <Text style={[styles.statValue, { color: theme.colors.purple }]}>
            {formatCurrency(summary.annualSpend)}
          </Text>
          <Text style={styles.statLabel}>per year</Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.stat}>
          <Text style={[styles.statValue, { color: theme.colors.warning }]}>
            {summary.renewThisWeek}
          </Text>
          <Text style={styles.statLabel}>renew this week</Text>
        </View>
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