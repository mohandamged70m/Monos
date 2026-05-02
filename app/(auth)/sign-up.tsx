import { useSignUp } from '@clerk/clerk-expo';
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

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSignUpPress = async () => {
    if (!isLoaded || isLoading) return;
    setError('');
    setIsLoading(true);

    console.log('[SignUp] Attempting sign up with email:', emailAddress);

    try {
      const result = await signUp.create({
        emailAddress,
        password,
      });

      console.log('[SignUp] Sign up result:', JSON.stringify(result, null, 2));

      console.log('[SignUp] Preparing email verification...');
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      console.log('[SignUp] Email verification sent successfully');
      setPendingVerification(true);
    } catch (err: any) {
      console.log('[SignUp] Full error object:', JSON.stringify(err, null, 2));
      const clerkError = err.errors?.[0];
      if (clerkError?.code === 'form_password_pwned') {
        setError('This password has been found in data breaches. Please use a different password.');
      } else if (clerkError?.code === 'form_identifier_exists') {
        setError('An account with this email already exists.');
      } else if (clerkError?.code === 'form_password_length_too_short') {
        setError('Password must be at least 8 characters long.');
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

    console.log('[SignUp] Verifying with code:', code);

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code,
      });

      console.log('[SignUp] Verification result:', JSON.stringify(result, null, 2));

      if (result.status === 'complete') {
        console.log('[SignUp] Verification complete, setting active session:', result.createdSessionId);
        await setActive({ session: result.createdSessionId });
        console.log('[SignUp] Session activated, navigating to tabs');
        router.replace('/(tabs)');
      } else {
        console.log('[SignUp] Verification incomplete, status:', result.status);
        setError('Verification failed. Please check the code and try again.');
      }
    } catch (err: any) {
      console.log('[SignUp] Verification error:', JSON.stringify(err, null, 2));
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
            {pendingVerification ? 'Verify Email' : 'Create Account'}
          </Text>
          <Text style={styles.subtitle}>
            {pendingVerification
              ? 'Enter the code sent to your email'
              : 'Start managing your finances'}
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
                placeholder="Create a password (min 8 chars)"
                placeholderTextColor={theme.colors.textMuted}
                secureTextEntry={true}
                onChangeText={(text) => {
                  setPassword(text);
                  setError('');
                }}
              />
              <Text style={styles.hint}>Must be at least 8 characters</Text>
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <TouchableOpacity
              style={[styles.button, (isLoading || !emailAddress || !password) && styles.buttonDisabled]}
              onPress={onSignUpPress}
              disabled={isLoading || !emailAddress || !password}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Create Account</Text>
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
              <Text style={styles.secondaryButtonText}>Back to sign up</Text>
            </TouchableOpacity>
          </View>
        )}

        {!pendingVerification && (
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/sign-in')}>
              <Text style={styles.link}>Sign In</Text>
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
