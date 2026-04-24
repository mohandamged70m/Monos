import { View, Text, StyleSheet } from 'react-native'
import { colors } from '@/constants/colors'

export function RenewalAlert() {
  return (
    <View style={styles.card}>
      <View style={styles.logo}>
        <Text style={styles.logoText}>N</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>Netflix</Text>
        <Text style={styles.due}>Renews in 3 days</Text>
      </View>
      <Text style={styles.price}>EGP 129</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: 'rgba(251,191,36,0.08)',
    borderWidth: 0.5,
    borderColor: 'rgba(251,191,36,0.3)',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#E50914',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logoText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  info: { flex: 1 },
  name: {
    color: colors.text1,
    fontSize: 13,
    fontWeight: '600',
  },
  due: {
    color: colors.amber,
    fontSize: 11,
    marginTop: 2,
  },
  price: {
    color: colors.amber,
    fontSize: 14,
    fontWeight: '700',
  },
})