import { View, Text, StyleSheet } from 'react-native'
import { colors } from '@/constants/colors'
import { theme } from '@/constants/theme'

type Props = {
  icon: string
  iconBg: string
  merchant: string
  category: string
  amount: number
}

export function TransactionRow({ 
  icon, iconBg, merchant, category, amount 
}: Props) {
  return (
    <><Text style={styles.sectionTitle}>Recent Transactions</Text><View style={styles.row}>
      <View style={[styles.icon, { backgroundColor: iconBg }]}>
        <Text style={styles.iconText}>{icon}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.merchant}>{merchant}</Text>
        <Text style={styles.category}>{category}</Text>
      </View>
      <Text style={styles.amount}>- {amount}</Text>
    </View></>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 12,
    marginBottom: 8,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconText: { fontSize: 16 },
  info: { flex: 1 },
  merchant: {
    color: colors.text1,
    fontSize: 13,
    fontWeight: '500',
  },
  category: {
    color: colors.text3,
    fontSize: 11,
    marginTop: 2,
  },
  amount: {
    color: colors.red,
    fontSize: 13,
    fontWeight: '600',
  },
  sectionTitle : {
    color: theme.colors.textMuted,
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 12,
    letterSpacing: 1.5,
    paddingHorizontal: 4,
  },
  list : {
    gap: 8,
  }
})