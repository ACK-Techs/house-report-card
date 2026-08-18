import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    router.replace('/(tabs)');
  };

  const handleGuestLogin = () => {
    router.replace('/(tabs)');
  };

  const handleRegister = () => {
    router.push('/(auth)/register');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.brandSection}>
            <View style={styles.logoContainer}>
              <Ionicons name="home-outline" size={36} color="#0284C7" />
            </View>

            <Text style={styles.title}>Ev Karnesi</Text>

            <Text style={styles.subtitle}>
              Evinizi tanıyın, doğru kararı verin.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Hoş Geldiniz</Text>

            <Text style={styles.cardDescription}>
              Ev Karnesi hesabınıza giriş yapın.
            </Text>

            <View style={styles.form}>
              <View>
                <Text style={styles.label}>E-posta</Text>

                <View style={styles.inputContainer}>
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color="#64748B"
                    style={styles.inputIcon}
                  />

                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="ornek@email.com"
                    placeholderTextColor="#94A3B8"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                  />
                </View>
              </View>

              <View>
                <Text style={styles.label}>Şifre</Text>

                <View style={styles.inputContainer}>
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="#64748B"
                    style={styles.inputIcon}
                  />

                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Şifrenizi girin"
                    placeholderTextColor="#94A3B8"
                    secureTextEntry={!showPassword}
                    style={styles.input}
                  />

                  <Pressable
                    onPress={() => setShowPassword((current) => !current)}
                    hitSlop={10}
                  >
                    <Ionicons
                      name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={21}
                      color="#64748B"
                    />
                  </Pressable>
                </View>
              </View>

              <Pressable style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Giriş Yap</Text>

                <Ionicons name="arrow-forward" size={19} color="#FFFFFF" />
              </Pressable>

              <View style={styles.divider}>
                <View style={styles.dividerLine} />

                <Text style={styles.dividerText}>veya</Text>

                <View style={styles.dividerLine} />
              </View>

              <Pressable
                style={styles.guestButton}
                onPress={handleGuestLogin}
              >
                <Ionicons name="compass-outline" size={20} color="#0F172A" />

                <Text style={styles.guestButtonText}>
                  Giriş Yapmadan Keşfet
                </Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Henüz hesabınız yok mu?</Text>

            <Pressable onPress={handleRegister}>
              <Text style={styles.registerLink}>Kayıt Ol</Text>
            </Pressable>
          </View>

          <Text style={styles.terms}>
            Devam ederek Kullanım Koşulları ve Gizlilik Politikası'nı kabul
            etmiş olursunuz.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  container: {
    flex: 1,
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 40,
  },

  brandSection: {
    alignItems: 'center',
    marginBottom: 36,
  },

  logoContainer: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },

  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.8,
  },

  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 24,
    shadowColor: '#0F172A',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 4,
  },

  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
  },

  cardDescription: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 6,
    marginBottom: 26,
  },

  form: {
    gap: 18,
  },

  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },

  inputContainer: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    paddingHorizontal: 16,
  },

  inputIcon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    height: '100%',
    fontSize: 15,
    color: '#0F172A',
  },

  loginButton: {
    height: 56,
    borderRadius: 18,
    backgroundColor: '#0284C7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 4,
  },

  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  divider: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },

  dividerText: {
    marginHorizontal: 12,
    fontSize: 13,
    color: '#94A3B8',
  },

  guestButton: {
    height: 54,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
  },

  guestButtonText: {
    color: '#0F172A',
    fontSize: 15,
    fontWeight: '600',
  },

  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 28,
    gap: 5,
  },

  registerText: {
    fontSize: 14,
    color: '#64748B',
  },

  registerLink: {
    fontSize: 14,
    color: '#0284C7',
    fontWeight: '700',
  },

  terms: {
    marginTop: 24,
    paddingHorizontal: 12,
    textAlign: 'center',
    fontSize: 11,
    lineHeight: 17,
    color: '#94A3B8',
  },
});