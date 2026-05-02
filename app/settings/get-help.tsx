import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import SettingsHeader from '@/components/settings/SettingsHeader';

const { colors } = theme;

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: 'How do I connect my bank account?',
    answer: 'Go to Settings > My Bank Accounts and tap "Connect Bank Account". Follow the prompts to securely link your account.',
  },
  {
    question: 'How does SMS import work?',
    answer: 'Enable SMS Import in Settings > Payment & SMS Import. The app will read payment-related SMS and automatically create transactions.',
  },
  {
    question: 'Can I export my data?',
    answer: 'Yes! Go to Settings > Save a Copy of My Data and choose your preferred export format (CSV or JSON).',
  },
];

export default function GetHelpScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ paddingHorizontal: 16, paddingTop: 60, paddingBottom: 20 }}>
        <SettingsHeader title="Get Help" />
        
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.surface,
            borderRadius: 18,
            padding: 16,
            borderWidth: 1,
            borderColor: colors.border,
            marginBottom: 20,
          }}
        >
          <View style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: colors.success + '20', justifyContent: 'center', alignItems: 'center', marginRight: 12 }}>
            <Ionicons name="mail-outline" size={20} color={colors.success} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 15, color: colors.textPrimary, fontWeight: '500' }}>Contact Support</Text>
            <Text style={{ fontSize: 13, color: colors.textSecondary, marginTop: 2 }}>support@spendly.com</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
        </TouchableOpacity>

        <Text style={{ fontSize: 16, color: colors.textSecondary, marginBottom: 16 }}>Frequently Asked Questions</Text>

        {faqs.map((faq, index) => (
          <View
            key={index}
            style={{
              backgroundColor: colors.surface,
              borderRadius: 18,
              padding: 16,
              borderWidth: 1,
              borderColor: colors.border,
              marginBottom: 12,
            }}
          >
            <Text style={{ fontSize: 15, color: colors.textPrimary, fontWeight: '500', marginBottom: 8 }}>{faq.question}</Text>
            <Text style={{ fontSize: 14, color: colors.textSecondary, lineHeight: 20 }}>{faq.answer}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
