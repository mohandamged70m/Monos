import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';
import { TransactionRow } from './TransactionRow';
import { Transaction } from '@/context/TransactionsContext';

interface TransactionsListProps {
  transactions: Transaction[];
}

export default function TransactionsList({ transactions }: TransactionsListProps) {
  const visibleTransactions = transactions.slice(0, 5);

  if (!transactions || transactions.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        {visibleTransactions.map((tx) => (
          <TransactionRow
            key={tx.id}
            icon={tx.icon}
            iconBg={tx.iconBg}
            merchant={tx.merchant}
            category={tx.category}
            amount={tx.amount}
            date={tx.date}
            type={tx.type}
            account={tx.account}
            description={tx.description}
            note={tx.note}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  sectionTitle: {
    color: theme.colors.textMuted,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.5,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  list: {
    gap: 4,
  },
  viewAllBtn: {
    marginTop: 12,
    alignSelf: 'center',
    paddingVertical: 8,
  },
  viewAllText: {
    color: theme.colors.accent,
    fontSize: 13,
    fontWeight: '600',
  },
});