import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { colors } from '@/constants/colors'

const stats = [
  { label: 'INCOME',  value: 'EGP 12,500', change: '+2.5%', good: true  },
  { label: 'SPENT',   value: 'EGP 4,280',  change: '-8%',   good: true  },
  { label: 'SUBS',    value: 'EGP 1,890',  change: '+12%',  good: false },
]

export function StatPills() {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {stats.map((s) => (
        <View key={s.label} style={styles.pill}>
          <Text style={styles.label}>{s.label}</Text>
          <Text style={styles.value}>{s.value}</Text>
          <Text style={[
            styles.change, 
            { color: s.good ? colors.green : colors.red }
          ]}>
            {s.change}
          </Text>
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 10,
  },
  pill: {
    backgroundColor: colors.elevated,
    borderRadius: 14,
    padding: 14,
    minWidth: 115,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  label: {
    color: colors.text3,
    fontSize: 10,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  value: {
    color: colors.text1,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  change: {
    fontSize: 12,
    fontWeight: '500',
  },
})