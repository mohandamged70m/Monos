import React, { useState } from 'react';
import { View, Text, Switch } from 'react-native';
import { theme } from '@/constants/theme';
import SettingsHeader from '@/components/settings/SettingsHeader';

const { colors } = theme;

export default function PaymentImportScreen() {
  const [smsEnabled, setSmsEnabled] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ paddingHorizontal: 16, paddingTop: 60, paddingBottom: 20 }}>
        <SettingsHeader title="Payment & SMS Import" />
        
        <View style={{ backgroundColor: colors.surface, borderRadius: 18, padding: 20, borderWidth: 1, borderColor: colors.border }}>
          <Text style={{ fontSize: 16, color: colors.textSecondary, marginBottom: 16 }}>SMS Import</Text>
          
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 15, color: colors.textPrimary, fontWeight: '500' }}>Enable SMS Import</Text>
              <Text style={{ fontSize: 13, color: colors.textSecondary, marginTop: 4 }}>
                Automatically import transactions from payment SMS
              </Text>
            </View>
            <Switch
              value={smsEnabled}
              onValueChange={setSmsEnabled}
              trackColor={{ false: colors.border, true: colors.accent }}
              thumbColor="#fff"
            />
          </View>
        </View>

        <View style={{ backgroundColor: colors.surface, borderRadius: 18, padding: 20, borderWidth: 1, borderColor: colors.border, marginTop: 20 }}>
          <Text style={{ fontSize: 16, color: colors.textSecondary, marginBottom: 16 }}>Connected Apps</Text>
          <View style={{ alignItems: 'center', paddingVertical: 20 }}>
            <Text style={{ fontSize: 14, color: colors.textMuted }}>No payment apps connected</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
