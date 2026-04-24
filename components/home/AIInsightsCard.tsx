import React from 'react';
import {
  View, Text, StyleSheet
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '@/constants/theme';

interface AIInsightsCardProps {
  insight: string;
  trendMultiplier?: number;
  amount?: number;
  category?: string;
}

export default function AIInsightsCard({
  insight,
  trendMultiplier = 1,
  amount,
  category,
}: AIInsightsCardProps) {
  const formattedAmount = amount
    ? `EGP ${new Intl.NumberFormat('en-EG').format(amount)}`
    : null;

  return (
    <LinearGradient
      colors={[theme.colors.accentLight, theme.colors.accentSubtle]}
      style={styles.card}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.iconText}>+</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.insightText}>
          {insight}
          {formattedAmount && (
            <Text style={styles.amountText}> That's {formattedAmount} extra.</Text>
          )}
        </Text>
        {trendMultiplier > 1 && (
          <Text style={styles.trendText}>
            {trendMultiplier}x vs last period
          </Text>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    gap: 12,
    borderWidth: 1,
    borderColor: theme.colors.accentGlow,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
  insightText: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 13,
    lineHeight: 20,
  },
  amountText: {
    color: theme.colors.textPrimary,
    fontWeight: '600',
  },
  trendText: {
    color: theme.colors.textMuted,
    fontSize: 11,
    marginTop: 4,
  },
});