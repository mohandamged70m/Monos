import React, { useMemo } from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { theme } from '@/constants/theme';

interface HeroCardData {
  month: string;
  balance: number;
  previousBalance: number;
  income: number;
  spent: number;
  subscriptionsCount: number;
}

interface HeroCardProps {
  data: HeroCardData;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-EG', {
    style: 'currency',
    currency: 'EGP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-EG').format(value);
}

export default function HeroCard({ data }: HeroCardProps) {
  const month = data.month;
  const balance = data.balance;
  const previousBalance = data.previousBalance;
  const income = data.income;
  const spent = data.spent;
  const subscriptionsCount = data.subscriptionsCount;

  const balanceChange = balance - previousBalance;
  const isPositive = balanceChange >= 0;
  const balanceChangeFormatted = formatCurrency(Math.abs(balanceChange));

  const scale = useSharedValue(1);

  const triggerHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const animatedBalanceStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleBalancePressIn = () => {
    scale.value = withSpring(0.98, { damping: 15, stiffness: 400 });
  };

  const handleBalancePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 400 });
  };

  const handleBalancePress = () => {
    runOnJS(triggerHaptic)();
  };

  const stats = useMemo(
    () => [
      { value: formatNumber(income), label: 'INCOME', color: theme.colors.success },
      { value: formatNumber(spent), label: 'SPENT', color: theme.colors.destructive },
      { value: subscriptionsCount.toString(), label: 'SUBS', color: theme.colors.purple },
    ],
    [income, spent, subscriptionsCount]
  );

  return (
    <LinearGradient
      colors={[theme.colors.surface, theme.colors.background]}
      style={styles.card}
    >
      <View style={styles.topRow}>
        <View style={styles.monthPill}>
          <Text style={styles.monthText}>{month}</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>M</Text>
        </View>
      </View>

      <AnimatedTouchable
        onPressIn={handleBalancePressIn}
        onPressOut={handleBalancePressOut}
        onPress={handleBalancePress}
        activeOpacity={1}
        style={[styles.balanceSection, animatedBalanceStyle]}
      >
        <Text style={styles.balanceLabel}>TOTAL BALANCE</Text>
        <Text style={styles.balanceAmount}>{formatCurrency(balance)}</Text>
        <Text style={[styles.balanceChange, { color: theme.colors.textMuted }]}>
          {isPositive ? '↑' : '↓'} {balanceChangeFormatted} from last month
        </Text>
      </AnimatedTouchable>

      <View style={styles.statsRow}>
        {stats.map((stat, i) => (
          <TouchableOpacity key={i} style={styles.statPill}>
            <Text style={[styles.statValue, { color: stat.color }]}>
              {stat.value}
            </Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 28,
    padding: 20,
    marginHorizontal: -16,
    gap: 18,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  monthPill: {
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  monthText: { color: theme.colors.textSecondary, fontSize: 13, fontWeight: '500' },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: theme.colors.textPrimary, fontWeight: '700', fontSize: 15 },

  balanceSection: {
    alignItems: 'center',
    gap: 4,
  },
  balanceLabel: {
    color: theme.colors.textMuted,
    fontSize: 11,
    letterSpacing: 1.5,
    fontWeight: '600',
  },
  balanceAmount: {
    color: theme.colors.textPrimary,
    fontSize: 42,
    fontWeight: '800',
    letterSpacing: -1,
  },
  balanceChange: {
    color: theme.colors.textMuted,
    fontSize: 13,
  },

  statsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  statPill: {
    flex: 1,
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: 'center',
    gap: 3,
  },
  statValue: {
    fontSize: 15,
    fontWeight: '700',
  },
  statLabel: {
    color: theme.colors.textMuted,
    fontSize: 10,
    letterSpacing: 1,
    fontWeight: '600',
  },
});