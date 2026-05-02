import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';

interface SavingsRateCardProps {
  savingsRate: number;
  savedAmount: number;
  totalIncome: number;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-EG').format(value);
}

export default function SavingsRateCard({ savingsRate, savedAmount, totalIncome }: SavingsRateCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Savings Rate</Text>
      
      <View style={styles.content}>
        <View style={styles.ringContainer}>
          <View style={styles.ringBackground} />
          <View style={[styles.ringProgress, { borderColor: theme.colors.success }]} />
          <View style={styles.ringOverlay}>
            <Text style={styles.ringPercent}>{savingsRate}%</Text>
          </View>
        </View>

        <View style={styles.info}>
          <Text style={styles.percentBig}>{savingsRate}%</Text>
          <Text style={styles.percentLabel}>of income saved</Text>
          <Text style={styles.description}>
            You saved EGP {formatCurrency(savedAmount)} out of EGP {formatCurrency(totalIncome)} income this month
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginHorizontal: 20,
    gap: 14,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  ringContainer: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringBackground: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 12,
    borderColor: theme.colors.surfaceElevated,
  },
  ringProgress: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 12,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    transform: [{ rotate: '45deg' }],
  },
  ringOverlay: {
    position: 'absolute',
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringPercent: {
    color: theme.colors.success,
    fontSize: 18,
    fontWeight: '800',
  },
  info: {
    flex: 1,
    gap: 4,
  },
  percentBig: {
    color: theme.colors.success,
    fontSize: 32,
    fontWeight: '800',
  },
  percentLabel: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
  description: {
    color: theme.colors.textMuted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
  },
});