import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import SettingsHeader from '@/components/settings/SettingsHeader';

const { colors } = theme;

export default function TermsPrivacyScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ paddingHorizontal: 16, paddingTop: 60, paddingBottom: 20 }}>
        <SettingsHeader title="Terms & Privacy" />
        
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.surface,
            borderRadius: 18,
            padding: 16,
            borderWidth: 1,
            borderColor: colors.border,
            marginBottom: 12,
          }}
        >
          <View style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: '#6B7280' + '20', justifyContent: 'center', alignItems: 'center', marginRight: 12 }}>
            <Ionicons name="document-text-outline" size={20} color="#6B7280" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 15, color: colors.textPrimary, fontWeight: '500' }}>Terms of Service</Text>
            <Text style={{ fontSize: 13, color: colors.textSecondary, marginTop: 2 }}>Last updated: Jan 2026</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.surface,
            borderRadius: 18,
            padding: 16,
            borderWidth: 1,
            borderColor: colors.border,
            marginBottom: 12,
          }}
        >
          <View style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: '#6B7280' + '20', justifyContent: 'center', alignItems: 'center', marginRight: 12 }}>
            <Ionicons name="shield-outline" size={20} color="#6B7280" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 15, color: colors.textPrimary, fontWeight: '500' }}>Privacy Policy</Text>
            <Text style={{ fontSize: 13, color: colors.textSecondary, marginTop: 2 }}>Last updated: Jan 2026</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
        </TouchableOpacity>

        <View style={{ marginTop: 20, padding: 16 }}>
          <Text style={{ fontSize: 13, color: colors.textMuted, textAlign: 'center', lineHeight: 20 }}>
            By using Spendly, you agree to our Terms of Service and Privacy Policy. We respect your privacy and protect your personal data.
          </Text>
        </View>
      </View>
    </View>
  );
}
