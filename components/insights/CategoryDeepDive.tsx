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

interface CategoryDeepDiveProps {
  categories: CategoryData[];
  totalSpent: number;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-EG').format(value);
}

export default function CategoryDeepDive({ categories, totalSpent }: CategoryDeepDiveProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Category Deep Dive</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{categories.length} total</Text>
        </View>
      </View>

      <View style={styles.categoriesList}>
        {categories.map((category) => (
          <View key={category.name} style={styles.categoryRow}>
            <View style={styles.categoryHeader}>
              <View style={styles.categoryInfo}>
                <View style={[styles.colorDot, { backgroundColor: category.color }]} />
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryName}>{category.name}</Text>
              </View>
              <View style={styles.categoryValues}>
                <Text style={styles.categoryAmount}>EGP {formatCurrency(category.amount)}</Text>
                <Text style={styles.categoryPercent}>{category.percentage}%</Text>
              </View>
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
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  badge: {
    backgroundColor: theme.colors.success + '20',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    color: theme.colors.success,
    fontSize: 12,
    fontWeight: '600',
  },
  categoriesList: {
    gap: 16,
  },
  categoryRow: {
    gap: 8,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  },
  categoryValues: {
    flexDirection: 'row',
    gap: 12,
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
    width: 35,
    textAlign: 'right',
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