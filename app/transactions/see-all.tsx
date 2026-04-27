'use client';

import { useState, useMemo } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '@/constants/theme';
import { colors } from '@/constants/colors';
import TransactionsList from '@/components/home/TransactionsList';
import { useTransactions } from '@/context/TransactionsContext';

const categories = ['All', 'Food', 'Transport', 'Grocery', 'Entertainment', 'Shopping', 'Personal'];

export default function TransactionsPage() {
  const router = useRouter();
  const { transactions } = useTransactions();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch = tx.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || tx.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [transactions, searchQuery, selectedCategory]);

  return (
    <SafeAreaView edges={['top']} style={[styles.container, { flex: 1 }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Transactions</Text>
      </View>

      <View style={[styles.searchContainer, { backgroundColor: theme.colors.background }]}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search transactions..."
          placeholderTextColor={theme.colors.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Text style={styles.clearBtn}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={[styles.filterContainer, { backgroundColor: theme.colors.background }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll} style={{ backgroundColor: theme.colors.background }}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.filterChip, selectedCategory === cat && styles.filterChipActive]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[styles.filterText, selectedCategory === cat && styles.filterTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={[styles.scroll, { backgroundColor: theme.colors.background }]} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <TransactionsList transactions={filteredTransactions} />

        {filteredTransactions.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyText}>No transactions found</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  backText: {
    color: colors.text1,
    fontSize: 18,
    fontWeight: '600',
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 24,
    fontWeight: '700',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    marginHorizontal: 16,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: colors.text1,
    fontSize: 14,
  },
  clearBtn: {
    color: colors.text3,
    fontSize: 14,
    padding: 4,
  },
  filterContainer: {
    marginTop: 16,
    marginBottom: 8,
  },
  filterScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterChipActive: {
    backgroundColor: theme.colors.accent,
  },
  filterText: {
    color: colors.text3,
    fontSize: 13,
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#fff',
  },
  scroll: {
    backgroundColor: theme.colors.background,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 100,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    color: colors.text3,
    fontSize: 14,
  },
});