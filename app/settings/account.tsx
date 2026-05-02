import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import SettingsHeader from '@/components/settings/SettingsHeader';

const { colors } = theme;

export default function AccountScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ paddingHorizontal: 16, paddingTop: 60, paddingBottom: 20 }}>
        <SettingsHeader title="Account" />
        
        <View style={{ backgroundColor: colors.surface, borderRadius: 18, padding: 20, borderWidth: 1, borderColor: colors.border }}>
          <View style={{ alignItems: 'center', marginBottom: 20 }}>
            <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: colors.accent + '30', justifyContent: 'center', alignItems: 'center', marginBottom: 12 }}>
              <Ionicons name="person" size={40} color={colors.accent} />
            </View>
            <Text style={{ fontSize: 20, fontWeight: '700', color: colors.textPrimary }}>John Doe</Text>
            <Text style={{ fontSize: 14, color: colors.textSecondary, marginTop: 4 }}>john@spendly.com</Text>
            <View style={{ backgroundColor: colors.accentSubtle, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 6, marginTop: 8 }}>
              <Text style={{ color: colors.accent, fontSize: 12, fontWeight: '600' }}>Basic Plan</Text>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <TouchableOpacity style={{ backgroundColor: colors.surface, borderRadius: 18, padding: 16, borderWidth: 1, borderColor: colors.border }}>
            <Text style={{ color: colors.textPrimary, fontSize: 16, fontWeight: '500' }}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
