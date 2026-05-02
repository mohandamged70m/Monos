import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import SettingsHeader from '@/components/settings/SettingsHeader';

const { colors } = theme;

export default function BankAccountsScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ paddingHorizontal: 16, paddingTop: 60, paddingBottom: 20 }}>
        <SettingsHeader title="Bank Accounts" />
        
        <View style={{ backgroundColor: colors.surface, borderRadius: 18, padding: 20, borderWidth: 1, borderColor: colors.border }}>
          <Text style={{ fontSize: 16, color: colors.textSecondary, marginBottom: 16 }}>Connected Accounts</Text>
          
          <View style={{ alignItems: 'center', paddingVertical: 40 }}>
            <Ionicons name="card-outline" size={48} color={colors.textMuted} />
            <Text style={{ fontSize: 16, color: colors.textSecondary, marginTop: 12 }}>No bank accounts connected</Text>
            <Text style={{ fontSize: 13, color: colors.textMuted, marginTop: 4, textAlign: 'center' }}>
              Connect your bank accounts to automatically track transactions
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: colors.accent,
            borderRadius: 12,
            padding: 16,
            alignItems: 'center',
            marginTop: 20,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Connect Bank Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
