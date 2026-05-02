import React from 'react';
import { View, Text } from 'react-native';
import { theme } from '@/constants/theme';
import SettingsHeader from '@/components/settings/SettingsHeader';

const { colors } = theme;

export default function PhoneScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ paddingHorizontal: 16, paddingTop: 60, paddingBottom: 20 }}>
        <SettingsHeader title="Phone" />
        
        <View style={{ backgroundColor: colors.surface, borderRadius: 18, padding: 20, borderWidth: 1, borderColor: colors.border }}>
          <Text style={{ fontSize: 16, color: colors.textSecondary, marginBottom: 8 }}>Phone Number</Text>
          <View style={{ backgroundColor: colors.background, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: colors.border }}>
            <Text style={{ fontSize: 16, color: colors.textMuted }}>Not configured</Text>
          </View>
          <Text style={{ fontSize: 13, color: colors.textMuted, marginTop: 12 }}>
            Add your phone number to enable SMS import and security features.
          </Text>
        </View>
      </View>
    </View>
  );
}
