import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';

interface ComparisonData {
  label: string;
  value: string;
  change: number;
  isGoodWhenUp?: boolean;
}

interface ComparisonGridProps {
  data: ComparisonData[];
}

export default function ComparisonGrid({ data }: ComparisonGridProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>vs Last Month</Text>
      <View style={styles.grid}>
        {data.map((item) => {
          const isPositive = item.isGoodWhenUp ? item.change > 0 : item.change < 0;
          const changeColor = isPositive ? theme.colors.success : theme.colors.destructive;
          const changeIcon = item.change > 0 ? '↑' : '↓';
          const changeText = item.change > 0 ? `+${item.change}%` : `${item.change}%`;

          return (
            <View key={item.label} style={styles.card}>
              <Text style={styles.label}>{item.label}</Text>
              <Text style={styles.value}>{item.value}</Text>
              <View style={[styles.changeBadge, { backgroundColor: changeColor + '20' }]}>
                <Text style={[styles.changeText, { color: changeColor }]}>
                  {changeIcon} {changeText}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    gap: 12,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    width: '47%',
    backgroundColor: theme.colors.surface,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: 6,
  },
  label: {
    color: theme.colors.textMuted,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  value: {
    color: theme.colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
  },
  changeBadge: {
    alignSelf: 'flex-start',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
  },
});