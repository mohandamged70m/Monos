import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { theme } from '@/constants/theme';

const { colors } = theme;

type SettingsHeaderProps = {
  title: string;
  showBackButton?: boolean;
};

export default function SettingsHeader({ title, showBackButton = true }: SettingsHeaderProps) {
  const router = useRouter();

  return (
    <View style={{ marginBottom: 20 }}>
      {showBackButton && (
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ marginBottom: 12, width: 40, height: 40, justifyContent: 'center' }}
        >
          <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      )}
      <Text
        style={{
          fontSize: 28,
          fontWeight: '700',
          color: colors.textPrimary,
        }}
      >
        {title}
      </Text>
    </View>
  );
}
