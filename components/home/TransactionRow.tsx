import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { colors } from '@/constants/colors'
import { theme } from '@/constants/theme'
import { useState, useRef } from 'react'

type Props = {
  icon: string
  iconBg: string
  merchant: string
  category: string
  amount: number
  date?: string
  type?: 'expense' | 'income' | 'transfer'
  account?: string
  description?: string
  note?: string
}

export function TransactionRow({ 
  icon, iconBg, merchant, category, amount, date, type = 'expense', account = 'Main Account', description, note
}: Props) {
  const [expanded, setExpanded] = useState(false)
  const animation = useRef(new Animated.Value(0)).current

  const toggleExpand = () => {
    const toValue = expanded ? 0 : 1
    Animated.timing(animation, {
      toValue,
      duration: 250,
      useNativeDriver: false,
    }).start()
    setExpanded(!expanded)
  }

  const amountColor = type === 'income' ? theme.colors.success : colors.red
  const amountPrefix = type === 'income' ? '+ ' : '- '

  return (
    <TouchableOpacity 
      style={styles.row} 
      onPress={toggleExpand}
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
      <View style={styles.rightSection}>
        <Text style={[styles.amount, { color: amountColor }]}>
          {amountPrefix}${amount}
        </Text>
        <Text style={styles.expandHint}>{expanded ? 'Less' : 'Details'}</Text>
      </View>

      <Animated.View style={[
        styles.expandedSection,
        {
          maxHeight: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 200],
          }),
          opacity: animation,
        }
      ]}>
        <View style={styles.divider} />
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Type</Text>
          <Text style={styles.detailValue}>{type}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Account</Text>
          <Text style={styles.detailValue}>{account}</Text>
        </View>
        {description && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Description</Text>
            <Text style={styles.detailValue}>{description}</Text>
          </View>
        )}
        {note && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Note</Text>
            <Text style={styles.detailValue}>{note}</Text>
          </View>
        )}
      </Animated.View>
    </TouchableOpacity>
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
    flexWrap: 'wrap',
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
    fontSize: 14,
    fontWeight: '700',
  },
  rightSection: {
    alignItems: 'flex-end',
    marginLeft: 8,
  },
  expandHint: {
    color: theme.colors.accent,
    fontSize: 10,
    fontWeight: '500',
    marginTop: 2,
  },
  expandedSection: {
    width: '100%',
    overflow: 'hidden',
    marginTop: 8,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.borderSubtle,
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  detailLabel: {
    color: colors.text3,
    fontSize: 12,
  },
  detailValue: {
    color: colors.text1,
    fontSize: 12,
    fontWeight: '500',
  },
})