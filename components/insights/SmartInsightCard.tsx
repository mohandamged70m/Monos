import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '@/constants/theme';

interface SmartInsightCardProps {
  insight: string;
  category?: string;
  savingsAmount?: number;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-EG').format(value);
}

export default function SmartInsightCard({
  insight,
  category,
  savingsAmount,
}: SmartInsightCardProps) {
  const formattedAmount = savingsAmount
    ? `EGP ${formatCurrency(savingsAmount)}`
    : null;

  return (
    <LinearGradient
      colors={[theme.colors.accentLight, theme.colors.accentSubtle]}
      style={styles.card}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.brainIcon}>🧠</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Smart Insight</Text>
        <Text style={styles.insightText}>
          {insight}
          {formattedAmount && category && (
            <Text style={styles.highlight}>
              {' '}
              Reducing your {category} spending could save you{' '}
              {formattedAmount} monthly.
            </Text>
          )}
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    gap: 12,
    borderWidth: 1,
    borderColor: theme.colors.accentGlow,
    marginHorizontal: 20,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: theme.colors.accent + '30',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brainIcon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    gap: 6,
  },
  title: {
    color: theme.colors.accent,
    fontSize: 14,
    fontWeight: '700',
  },
  insightText: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },
  highlight: {
    color: theme.colors.textPrimary,
    fontWeight: '500',
  },
});