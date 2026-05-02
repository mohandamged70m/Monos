import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';

interface CategoryData {
  name: string;
  amount: number;
  percentage: number;
  color: string;
  icon: string;
}

interface CategoryBreakdownProps {
  categories: CategoryData[];
  totalSpent: number;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-EG').format(value);
}

export default function CategoryBreakdown({ categories, totalSpent }: CategoryBreakdownProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Spending Breakdown</Text>
      <View style={styles.legend}>
        {categories.map((cat, i) => (
          <View key={i} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: cat.color }]} />
            <Text style={styles.legendText}>{cat.name}</Text>
          </View>
        ))}
      </View>
      <View style={styles.categoriesList}>
        {categories.map((category) => (
          <View key={category.name} style={styles.categoryRow}>
            <View style={styles.categoryInfo}>
              <View style={[styles.colorDot, { backgroundColor: category.color }]} />
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={styles.categoryName}>{category.name}</Text>
            </View>
            <View style={styles.categoryValues}>
              <Text style={styles.categoryAmount}>EGP {formatCurrency(category.amount)}</Text>
              <Text style={styles.categoryPercent}>{category.percentage}%</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${category.percentage}%`, backgroundColor: category.color }]} />
            </View>
          </View>
        ))}
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
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    color: theme.colors.textMuted,
    fontSize: 11,
    fontWeight: '500',
  },
  categoriesList: {
    gap: 16,
  },
  categoryRow: {
    gap: 8,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  categoryIcon: {
    fontSize: 14,
  },
  categoryName: {
    color: theme.colors.textPrimary,
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  categoryValues: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 18,
  },
  categoryAmount: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  categoryPercent: {
    color: theme.colors.textMuted,
    fontSize: 13,
    fontWeight: '500',
  },
  progressBarBg: {
    height: 6,
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
});