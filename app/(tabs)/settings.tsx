import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { theme } from '@/constants/theme';
import SettingsRow from '@/components/settings/SettingsRow';
import SettingsSection from '@/components/settings/SettingsSection';
import SettingsDivider from '@/components/settings/SettingsDivider';

const { colors } = theme;

export default function SettingsScreen() {
  const router = useRouter();
  const [faceIdEnabled, setFaceIdEnabled] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 60, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 28, fontWeight: '700', color: colors.textPrimary }}>
            Settings
          </Text>
        </View>

        <TouchableOpacity activeOpacity={0.9} style={{ borderRadius: 18, overflow: 'hidden', marginBottom: 24 }}>
          <LinearGradient
            colors={[colors.accent, colors.accentLight]}
            style={{ padding: 20, borderRadius: 18 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={{ backgroundColor: 'rgba(255,255,255,0.25)', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4, marginBottom: 10 }}>
              <Text style={{ color: '#fff', fontSize: 11, fontWeight: '700', letterSpacing: 1 }}>PREMIUM</Text>
            </View>
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700', marginBottom: 14 }}>Go Premium & Track Smarter 🚀</Text>
            <View style={{ backgroundColor: '#fff', alignSelf: 'flex-start', paddingHorizontal: 24, paddingVertical: 10, borderRadius: 20 }}>
              <Text style={{ color: colors.accent, fontSize: 14, fontWeight: '700' }}>Try Now</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <SettingsSection title="ACCOUNT">
          <SettingsRow
            icon="person"
            iconColor={colors.accent}
            title="John Doe"
            subtitle="john@spendly.com"
            onPress={() => router.push('/settings/account')}
            rightElement={
              <View style={{ backgroundColor: colors.accentSubtle, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 }}>
                <Text style={{ color: colors.accent, fontSize: 12, fontWeight: '600' }}>Basic</Text>
              </View>
            }
            showChevron={false}
          />
          <SettingsDivider />
          <SettingsRow icon="call" iconColor="#3B82F6" title="Phone" subtitle="Not configured" onPress={() => router.push('/settings/phone')} />
          <SettingsDivider />
          <SettingsRow icon="card" iconColor="#8B5CF6" title="My Bank Accounts" onPress={() => router.push('/settings/bank-accounts')} />
          <SettingsDivider />
          <SettingsRow icon="cash" iconColor="#F59E0B" title="Payment & SMS Import" onPress={() => router.push('/settings/payment-import')} />
          <SettingsDivider />
          <SettingsRow icon="eye" iconColor="#EC4899" title="Display Options" onPress={() => router.push('/settings/display-options')} />
          <SettingsDivider />
          <SettingsRow icon="pricetag" iconColor="#14B8A6" title="Tag & Labels" onPress={() => router.push('/settings/tags')} />
          <SettingsDivider />
          <SettingsRow icon="pricetags" iconColor="#F97316" title="Vendor Auto-Tags" onPress={() => router.push('/settings/vendor-auto-tags')} />
          <SettingsDivider />
          <SettingsRow
            icon="lock-closed"
            iconColor="#6B7280"
            title="Security Lock / Face ID"
            showChevron={false}
            rightElement={
              <Switch
                value={faceIdEnabled}
                onValueChange={setFaceIdEnabled}
                trackColor={{ false: colors.border, true: colors.accent }}
                thumbColor="#fff"
              />
            }
          />
        </SettingsSection>

        <SettingsSection title="AUTOMATION">
          <SettingsRow icon="git-branch" iconColor="#6366F1" title="Auto-Rules" subtitle="Set up flows to track automatically" onPress={() => router.push('/settings/auto-rules')} />
        </SettingsSection>

        <SettingsSection title="GROWTH">
          <SettingsRow icon="gift" iconColor="#EF4444" title="Share & Get Rewards" onPress={() => router.push('/settings/share-rewards')} />
          <SettingsDivider />
          <SettingsRow icon="download" iconColor="#0EA5E9" title="Save a Copy of My Data" onPress={() => router.push('/settings/save-data')} />
        </SettingsSection>

        <SettingsSection title="SUPPORT">
          <SettingsRow icon="document-text" iconColor="#6B7280" title="Terms & Privacy" onPress={() => router.push('/settings/terms-privacy')} />
          <SettingsDivider />
          <SettingsRow icon="newspaper" iconColor="#3B82F6" title="What's New" onPress={() => router.push('/settings/whats-new')} />
          <SettingsDivider />
          <SettingsRow icon="help-circle" iconColor={colors.success} title="Get Help" onPress={() => router.push('/settings/get-help')} />
        </SettingsSection>

        <TouchableOpacity
          style={{
            backgroundColor: colors.surface,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: colors.border,
            alignItems: 'center',
            padding: 16,
            marginTop: 8,
          }}
          activeOpacity={0.7}
        >
          <Text style={{ color: colors.textPrimary, fontSize: 16, fontWeight: '600' }}>Sign Out</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7} style={{ alignItems: 'center', marginTop: 20, marginBottom: 12 }}>
          <Text style={{ color: colors.destructive, fontSize: 14, fontWeight: '500' }}>Remove My Account</Text>
        </TouchableOpacity>

        <Text style={{ textAlign: 'center', color: colors.textMuted, fontSize: 13, marginBottom: 20 }}>Spendly v2.4.1</Text>
      </ScrollView>
    </View>
  );
}
