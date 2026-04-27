'use client';

import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '@/constants/theme';
import { colors } from '@/constants/colors';
import { useTransactions } from '@/context/TransactionsContext';

const categoryIcons: Record<string, { icon: string; bg: string }> = {
  Food: { icon: '🍔', bg: '#FFEDD5' },
  Transport: { icon: '🚌', bg: '#DBEAFE' },
  Grocery: { icon: '🛒', bg: '#DCFCE7' },
  Entertainment: { icon: '🎬', bg: '#F3E8FF' },
  Shopping: { icon: '🛍️', bg: '#FCE7F3' },
  Personal: { icon: '💇', bg: '#FEE2E2' },
};

const categories = Object.keys(categoryIcons);

export default function AddTransactionScreen() {
  const router = useRouter();
  const { addTransaction } = useTransactions();
  const [merchant, setMerchant] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');

  const handleSave = () => {
    if (!merchant.trim()) {
      Alert.alert('Error', 'Please enter a merchant name');
      return;
    }
    if (!amount || isNaN(Number(amount))) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    const cat = categoryIcons[category];
    addTransaction({
      merchant: merchant.trim(),
      amount: Number(amount),
      category,
      type: 'expense',
      account: 'Main Account',
      icon: cat.icon,
      iconBg: cat.bg,
    });

    router.back();
  };

  return (
    <SafeAreaView edges={['top']} style={[styles.container, { flex: 1 }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Add Transaction</Text>
      </View>

      <ScrollView style={[styles.scroll, { backgroundColor: theme.colors.background }]} contentContainerStyle={styles.content}>
        <View style={styles.field}>
          <Text style={styles.label}>Merchant</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., McDonalds, Uber, Walmart"
            placeholderTextColor={colors.text3}
            value={merchant}
            onChangeText={setMerchant}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={styles.input}
            placeholder="0.00"
            placeholderTextColor={colors.text3}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Category</Text>
          <View style={styles.categoryGrid}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[styles.categoryBtn, category === cat && styles.categoryBtnActive]}
                onPress={() => setCategory(cat)}
              >
                <Text style={styles.categoryIcon}>{categoryIcons[cat].icon}</Text>
                <Text style={[styles.categoryText, category === cat && styles.categoryTextActive]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Save Transaction</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  scroll: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  field: {
    marginBottom: 24,
  },
  label: {
    color: colors.text2,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.text1,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 6,
  },
  categoryBtnActive: {
    backgroundColor: theme.colors.accent,
  },
  categoryIcon: {
    fontSize: 16,
  },
  categoryText: {
    color: colors.text2,
    fontSize: 13,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#fff',
  },
  saveBtn: {
    backgroundColor: theme.colors.accent,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});