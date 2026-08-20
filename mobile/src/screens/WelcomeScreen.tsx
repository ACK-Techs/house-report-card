import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText, Button, Card, Checkbox, Screen, SegmentedControl, TextField } from '@/components/ui';
import { legal } from '@/data/content';
import type { RootStackParamList } from '@/navigation/types';
import { colors, radius, spacing } from '@/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

/** 01 — Karşılama ve giriş. Misafir girişi de buradan yapılır. */
export function WelcomeScreen({ navigation }: Props) {
  const [email, setEmail] = useState('dogukan@acktechs.com');
  const [password, setPassword] = useState('GucluSifre2026!');
  const [remember, setRemember] = useState(true);

  const goHome = () => navigation.reset({ index: 0, routes: [{ name: 'Main' }] });

  return (
    <Screen contentStyle={styles.content}>
      <View style={styles.glow} pointerEvents="none" />

      <View style={styles.brand}>
        <View style={styles.logo}>
          <AppText style={styles.logoGlyph}>🏠</AppText>
        </View>
        <AppText variant="hero" align="center" accessibilityRole="header">
          Ev Karnesi
        </AppText>
        <AppText variant="body" align="center" color={colors.textSecondary} style={styles.tagline}>
          Konut kararlarında kaynaklı, şeffaf ve bağımsız karar desteği.
        </AppText>
      </View>

      <Card>
        <SegmentedControl
          segments={[
            { value: 'login', label: 'Giriş Yap' },
            { value: 'register', label: 'Kayıt Ol' },
          ]}
          value="login"
          onChange={(value) => {
            if (value === 'register') navigation.navigate('Register');
          }}
          style={styles.tabs}
        />

        <TextField
          label="E-posta Adresi"
          icon="✉"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
          containerStyle={styles.field}
        />
        <TextField
          label="Şifre"
          icon="🔒"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="current-password"
          textContentType="password"
          containerStyle={styles.field}
        />

        <View style={styles.rememberRow}>
          <Checkbox checked={remember} onChange={setRemember} label="Beni Hatırla" />
          <Pressable accessibilityRole="link" hitSlop={8}>
            <AppText variant="captionStrong" color={colors.primary} style={styles.link}>
              Şifremi Unuttum
            </AppText>
          </Pressable>
        </View>

        <Button label="Giriş Yap →" onPress={goHome} />
        <Button
          label="Giriş Yapmadan Keşfet"
          variant="secondary"
          onPress={goHome}
          style={styles.secondaryButton}
        />
      </Card>

      <View style={styles.footer}>
        <AppText variant="body" align="center" color={colors.textSecondary}>
          Hesabınız yok mu?{' '}
          <AppText
            variant="bodyStrong"
            color={colors.primary}
            onPress={() => navigation.navigate('Register')}
            accessibilityRole="link"
          >
            Hemen Kayıt Ol
          </AppText>
        </AppText>

        <View style={styles.kvkk}>
          <AppText variant="badge">🛡</AppText>
          <AppText variant="badge" color={colors.textMuted} style={styles.kvkkText}>
            {legal.kvkkBadge}
          </AppText>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.x26 - 2,
    paddingTop: spacing.x26 + 4,
    gap: spacing.x20 - 2,
  },
  glow: {
    position: 'absolute',
    top: -60,
    alignSelf: 'center',
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: 'rgba(79,168,138,0.10)',
  },
  brand: { alignItems: 'center', paddingTop: spacing.xs },
  logo: {
    width: 68,
    height: 68,
    marginBottom: spacing.xxl,
    borderRadius: radius.x24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoGlyph: { fontSize: 32, lineHeight: 40 },
  tagline: { maxWidth: 280, marginTop: spacing.xs },
  tabs: { marginBottom: spacing.x20 - 2 },
  field: { marginBottom: spacing.xl },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  link: { fontSize: 12 },
  secondaryButton: { marginTop: spacing.md },
  footer: { alignItems: 'center', gap: spacing.lg, paddingTop: spacing.sm },
  kvkk: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: 'rgba(255,255,255,0.85)',
  },
  kvkkText: { flexShrink: 1 },
});
