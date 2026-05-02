import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import SettingsHeader from '@/components/settings/SettingsHeader';

const { colors } = theme;

export default function ShareRewardsScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ paddingHorizontal: 16, paddingTop: 60, paddingBottom: 20 }}>
        <SettingsHeader title="Share & Get Rewards" />
        
        <View style={{ backgroundColor: colors.surface, borderRadius: 18, padding: 24, borderWidth: 1, borderColor: colors.border, alignItems: 'center' }}>
          <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: '#EF4444' + '20', justifyContent: 'center', alignItems: 'center', marginBottom: 16 }}>
            <Ionicons name="gift" size={40} color="#EF4444" />
          </View>
          <Text style={{ fontSize: 20, fontWeight: '700', color: colors.textPrimary, marginBottom: 8 }}>Invite Friends</Text>
          <Text style={{ fontSize: 14, color: colors.textSecondary, textAlign: 'center', marginBottom: 20 }}>
            Share your referral code and earn rewards when friends join
          </Text>
          
          <View style={{ backgroundColor: colors.background, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: colors.border, width: '100%', alignItems: 'center', marginBottom: 16 }}>
            <Text style={{ fontSize: 24, fontWeight: '700', color: colors.accent, letterSpacing: 4 }}>SPEND20</Text>
            <Text style={{ fontSize: 12, color: colors.textMuted, marginTop: 4 }}>Your referral code</Text>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: colors.accent,
              borderRadius: 12,
              padding: 14,
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Share with Friends</Text>
          </TouchableOpacity>
        </View>

        <View style={{ backgroundColor: colors.surface, borderRadius: 18, padding: 20, borderWidth: 1, borderColor: colors.border, marginTop: 20 }}>
          <Text style={{ fontSize: 16, color: colors.textSecondary, marginBottom: 16 }}>Your Rewards</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 24, fontWeight: '700', color: colors.textPrimary }}>0</Text>
              <Text style={{ fontSize: 12, color: colors.textMuted, marginTop: 4 }}>Friends Invited</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 24, fontWeight: '700', color: colors.textPrimary }}>$0</Text>
              <Text style={{ fontSize: 12, color: colors.textMuted, marginTop: 4 }}>Rewards Earned</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 24, fontWeight: '700', color: colors.textPrimary }}>$50</Text>
              <Text style={{ fontSize: 12, color: colors.textMuted, marginTop: 4 }}>Potential</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
