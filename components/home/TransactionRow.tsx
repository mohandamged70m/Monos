import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { colors } from '@/constants/colors'
import { theme } from '@/constants/theme'

type Props = {
  icon: string
  iconBg: string
  merchant: string
  category: string
  amount: number
  date?: string
  onPress?: () => void
}

export function TransactionRow({ 
  icon, iconBg, merchant, category, amount, date, onPress 
}: Props) {
  const RowWrapper = onPress ? TouchableOpacity : View;
  
  return (
    <RowWrapper 
      style={styles.row} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.icon, { backgroundColor: iconBg }]}>
        <Text style={styles.iconText}>{icon}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.merchant} numberOfLines={1}>{merchant}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.category}>{category}</Text>
          {date && (
            <>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.date}>{date}</Text>
            </>
          )}
        </View>
      </View>
      <Text style={styles.amount}>- ${amount}</Text>
    </RowWrapper>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: 14,
    padding: 12,
    marginBottom: 8,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconText: { fontSize: 18 },
  info: { flex: 1 },
  merchant: {
    color: colors.text1,
    fontSize: 14,
    fontWeight: '600',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  category: {
    color: colors.text3,
    fontSize: 11,
  },
  dot: {
    color: colors.text3,
    marginHorizontal: 4,
  },
  date: {
    color: colors.text3,
    fontSize: 11,
  },
  amount: {
    color: colors.red,
    fontSize: 14,
    fontWeight: '700',
  },
})