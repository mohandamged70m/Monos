'use client';

import { Stack, Slot } from 'expo-router';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from '@/utils/tokenCache';
import { TransactionsProvider } from '@/context/TransactionsContext';
import { BillsProvider } from '@/context/BillsContext';
import { TargetsProvider } from '@/context/TargetsContext';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    'Sora-Regular': require('@/assets/fonts/Sora-Regular.ttf'),
    'Sora-Bold': require('@/assets/fonts/Sora-Bold.ttf'),
    'Sora-SemiBold': require('@/assets/fonts/Sora-SemiBold.ttf'),
    'Sora-ExtraBold': require('@/assets/fonts/Sora-ExtraBold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      console.log('[Auth] Not signed in, redirecting to sign-in');
      router.replace('/(auth)/sign-in');
    }
  }, [isLoaded, isSignedIn]);

  if (!fontsLoaded) {
    return null;
  }

  if (!isLoaded) {
    console.log('[Auth] Still loading...');
    return null;
  }

  if (!isSignedIn) {
    console.log('[Auth] Rendering auth screens (sign-in/sign-up)');
    return <Slot />;
  }

  console.log('[Auth] Rendering main app (tabs)');
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="transactions" />
        <Stack.Screen name="payments" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

  if (!publishableKey) {
    throw new Error('Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in .env');
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <TransactionsProvider>
          <BillsProvider>
            <TargetsProvider>
              <RootLayoutNav />
            </TargetsProvider>
          </BillsProvider>
        </TransactionsProvider>
      </ClerkProvider>
    </GestureHandlerRootView>
  );
}
