import { useSignIn } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { theme } from '@/constants/theme';

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSignInPress = async () => {
    if (!isLoaded || isLoading) return;
    setError('');
    setIsLoading(true);

    console.log('[SignIn] Attempting sign in with email:', emailAddress);

    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      console.log('[SignIn] Sign in result:', JSON.stringify(result, null, 2));

      if (result.status === 'complete') {
        console.log('[SignIn] Sign in complete, setting active session:', result.createdSessionId);
        await setActive({ session: result.createdSessionId });
        console.log('[SignIn] Session activated, navigating to tabs');
        router.replace('/(tabs)');
      } else if (result.status === 'needs_second_factor') {
        console.log('[SignIn] Needs second factor, preparing email verification');
        // Get the email code factor
        const emailCodeFactor = result.supportedSecondFactors?.find(
          (factor) => factor.strategy === 'email_code'
        );
        
        if (emailCodeFactor) {
          await signIn.prepareSecondFactor({ strategy: 'email_code' });
          console.log('[SignIn] Email verification sent');
          setPendingVerification(true);
        } else {
          setError('Two-factor authentication is required but email verification is not available.');
        }
      } else {
        console.log('[SignIn] Sign in incomplete, status:', result.status);
        setError('Sign in failed. Please check your credentials.');
      }
    } catch (err: any) {
      console.log('[SignIn] Full error:', JSON.stringify(err, null, 2));
      const clerkError = err.errors?.[0];
      if (clerkError?.code === 'form_password_incorrect') {
        setError('Incorrect password. Please try again.');
      } else if (clerkError?.code === 'form_identifier_not_found') {
        setError('No account found with this email.');
      } else if (clerkError?.code === 'verification_missing') {
        setError('Please verify your email before signing in.');
      } else {
        setError(clerkError?.message || 'An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded || isLoading) return;
    setError('');
    setIsLoading(true);

    console.log('[SignIn] Verifying with code:', code);

    try {
      const result = await signIn.attemptSecondFactor({
        strategy: 'email_code',
        code,
      });

      console.log('[SignIn] Second factor result:', JSON.stringify(result, null, 2));

      if (result.status === 'complete') {
        console.log('[SignIn] Second factor complete, setting active session:', result.createdSessionId);
        await setActive({ session: result.createdSessionId });
        console.log('[SignIn] Session activated, navigating to tabs');
        router.replace('/(tabs)');
      } else {
        console.log('[SignIn] Second factor incomplete, status:', result.status);
        setError('Verification failed. Please check the code and try again.');
      }
    } catch (err: any) {
      console.log('[SignIn] Verification error:', JSON.stringify(err, null, 2));
      const clerkError = err.errors?.[0];
      if (clerkError?.code === 'verification_invalid') {
        setError('Invalid verification code. Please try again.');
      } else if (clerkError?.code === 'verification_expired') {
        setError('Verification code expired. Please request a new one.');
      } else {
        setError(clerkError?.message || 'Verification failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.inner}>
        <View style={styles.header}>
          <Text style={styles.logo}>M</Text>
          <Text style={styles.title}>
            {pendingVerification ? 'Verify Email' : 'Welcome Back'}
          </Text>
          <Text style={styles.subtitle}>
            {pendingVerification
              ? 'Enter the code sent to your email'
              : 'Sign in to continue'}
          </Text>
        </View>

        {!pendingVerification ? (
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                value={emailAddress}
                placeholder="Enter your email"
                placeholderTextColor={theme.colors.textMuted}
                onChangeText={(text) => {
                  setEmailAddress(text);
                  setError('');
                }}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                value={password}
                placeholder="Enter your password"
                placeholderTextColor={theme.colors.textMuted}
                secureTextEntry={true}
                onChangeText={(text) => {
                  setPassword(text);
                  setError('');
                }}
              />
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <TouchableOpacity
              style={[styles.button, (isLoading || !emailAddress || !password) && styles.buttonDisabled]}
              onPress={onSignInPress}
              disabled={isLoading || !emailAddress || !password}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Sign In</Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Verification Code</Text>
              <TextInput
                style={styles.input}
                value={code}
                placeholder="Enter 6-digit code"
                placeholderTextColor={theme.colors.textMuted}
                onChangeText={(text) => {
                  setCode(text);
                  setError('');
                }}
                keyboardType="number-pad"
                maxLength={6}
              />
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <TouchableOpacity
              style={[styles.button, (isLoading || code.length < 6) && styles.buttonDisabled]}
              onPress={onVerifyPress}
              disabled={isLoading || code.length < 6}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Verify & Continue</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => {
                setPendingVerification(false);
                setCode('');
                setError('');
              }}
            >
              <Text style={styles.secondaryButtonText}>Back to sign in</Text>
            </TouchableOpacity>
          </View>
        )}

        {!pendingVerification && (
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/sign-up')}>
              <Text style={styles.link}>Create account</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  header: {
    marginBottom: 40,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: theme.colors.accent,
    marginBottom: 16,
    width: 64,
    height: 64,
    backgroundColor: theme.colors.accentLight,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 16,
    overflow: 'hidden',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textMuted,
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 16,
    color: theme.colors.textPrimary,
    fontSize: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  hint: {
    fontSize: 12,
    color: theme.colors.textMuted,
    marginTop: 4,
  },
  button: {
    backgroundColor: theme.colors.accent,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    alignItems: 'center',
    marginTop: 16,
  },
  secondaryButtonText: {
    color: theme.colors.textMuted,
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
    gap: 8,
  },
  footerText: {
    color: theme.colors.textMuted,
  },
  link: {
    color: theme.colors.accent,
    fontWeight: '600',
  },
  error: {
    color: theme.colors.destructive,
    fontSize: 14,
    marginTop: 4,
  },
});
