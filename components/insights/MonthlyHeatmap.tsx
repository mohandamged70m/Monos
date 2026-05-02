import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';

interface DayCell {
  day: number;
  amount: number;
  isSpike?: boolean;
}

interface MonthlyHeatmapProps {
  data: DayCell[];
  month: string;
}

export default function MonthlyHeatmap({ data, month }: MonthlyHeatmapProps) {
  const maxAmount = Math.max(...data.map(d => d.amount), 1);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const firstDayOfMonth = new Date(2026, 3, 1).getDay();
  const paddedData = [
    ...Array(firstDayOfMonth).fill(null),
    ...data.map(d => ({ ...d, isSpike: d.day === 7 })),
  ];

  const getCellColor = (cell: DayCell | null) => {
    if (!cell) return 'transparent';
    if (cell.isSpike) return theme.colors.destructive;
    
    const intensity = cell.amount / maxAmount;
    if (intensity > 0.7) return theme.colors.accent;
    if (intensity > 0.4) return theme.colors.accent + '80';
    if (intensity > 0.1) return theme.colors.accent + '40';
    return theme.colors.surfaceElevated;
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Monthly Heatmap</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{month}</Text>
        </View>
      </View>

      <View style={styles.weekDaysRow}>
        {weekDays.map((day) => (
          <Text key={day} style={styles.weekDayLabel}>{day}</Text>
        ))}
      </View>

      <View style={styles.grid}>
        {paddedData.map((cell, index) => (
          cell ? (
            <View
              key={index}
              style={[
                styles.cell,
                { backgroundColor: getCellColor(cell) },
                cell.isSpike && styles.cellSpike,
              ]}
            >
              <Text style={styles.cellText}>{cell.day}</Text>
            </View>
          ) : (
            <View key={index} style={styles.emptyCell} />
          )
        ))}
      </View>

      <View style={styles.legend}>
        <Text style={styles.legendLabel}>Less</Text>
        <View style={styles.legendGradient}>
          <View style={[styles.legendCell, { backgroundColor: theme.colors.surfaceElevated }]} />
          <View style={[styles.legendCell, { backgroundColor: theme.colors.accent + '40' }]} />
          <View style={[styles.legendCell, { backgroundColor: theme.colors.accent + '80' }]} />
          <View style={[styles.legendCell, { backgroundColor: theme.colors.accent }]} />
          <View style={[styles.legendCell, { backgroundColor: theme.colors.destructive }]} />
        </View>
        <Text style={styles.legendLabel}>More</Text>
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
    backgroundColor: theme.colors.warning + '20',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    color: theme.colors.warning,
    fontSize: 12,
    fontWeight: '600',
  },
  weekDaysRow: {
    flexDirection: 'row',
    gap: 4,
  },
  weekDayLabel: {
    flex: 1,
    color: theme.colors.textMuted,
    fontSize: 9,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  cell: {
    width: '13%',
    aspectRatio: 1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellSpike: {
    shadowColor: theme.colors.destructive,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 8,
  },
  cellText: {
    color: theme.colors.textPrimary,
    fontSize: 10,
    fontWeight: '500',
  },
  emptyCell: {
    width: '13%',
    aspectRatio: 1,
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 4,
  },
  legendLabel: {
    color: theme.colors.textMuted,
    fontSize: 10,
    fontWeight: '500',
  },
  legendGradient: {
    flexDirection: 'row',
    gap: 4,
  },
  legendCell: {
    width: 16,
    height: 16,
    borderRadius: 4,
  },
});