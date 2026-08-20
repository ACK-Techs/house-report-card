import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import {
  AppText,
  Button,
  Card,
  Checkbox,
  Chip,
  ChipGroup,
  Screen,
  ScreenHeader,
  TextField,
} from '@/components/ui';
import { AppleMark, GoogleMark } from '@/components/ui/BrandMarks';
import { usePreferencesStore } from '@/store/usePreferencesStore';
import { colors, radius, spacing } from '@/theme';
import type { RootStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const INTENT_OPTIONS = [
  { id: 'buy', label: 'Ev Alacağım', icon: '🔑' },
  { id: 'rent', label: 'Kiralayacağım', icon: '📋' },
  { id: 'undecided', label: 'Araştırıyorum', icon: '🔍' },
];

/** Basit şifre gücü göstergesi — 4 kademeli. */
function passwordStrength(value: string): { level: number; label: string } {
  let level = 0;
  if (value.length >= 8) level += 1;
  if (/[A-Z]/.test(value) && /[a-z]/.test(value)) level += 1;
  if (/\d/.test(value)) level += 1;
  if (/[^A-Za-z0-9]/.test(value)) level += 1;

  const labels = ['Çok zayıf', 'Zayıf', 'Orta', 'Güçlü Şifre', 'Çok Güçlü'];
  return { level, label: labels[level] ?? labels[0]! };
}

/** 01b — Hesap oluşturma. */
export function RegisterScreen({ navigation }: Props) {
  const [fullName, setFullName] = useState('Doğukan Taha Tıraş');
  const [email, setEmail] = useState('dogukan@acktechs.com');
  const [password, setPassword] = useState('GucluSifre2026!');
  const [consent, setConsent] = useState(true);

  const selections = usePreferencesStore((state) => state.selections);
  const toggleSelection = usePreferencesStore((state) => state.toggleSelection);

  const strength = useMemo(() => passwordStrength(password), [password]);

  return (
    <Screen
      header={<ScreenHeader title="Hesap Oluştur" onBack={() => navigation.goBack()} />}
      contentStyle={styles.content}
    >
      <AppText variant="title" style={styles.heading} accessibilityRole="header">
        Aramıza Katılın 👋
      </AppText>
      <AppText variant="body" color={colors.textSecondary} style={styles.subheading}>
        Önceliklerinizi kaydedin, ev ve bölge raporlarını size özel analiz edelim.
      </AppText>

      <Card>
        <TextField
          label="Ad Soyad"
          value={fullName}
          onChangeText={setFullName}
          autoComplete="name"
          textContentType="name"
          containerStyle={styles.field}
        />
        <TextField
          label="E-posta Adresi"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
          containerStyle={styles.field}
        />
        <TextField
          label="Şifre Oluştur"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="new-password"
          textContentType="newPassword"
        />

        <View
          style={styles.strengthTrack}
          accessible
          accessibilityLabel={`Şifre gücü: ${strength.label}`}
        >
          {[0, 1, 2, 3].map((index) => (
            <View
              key={index}
              style={[
                styles.strengthSegment,
                { backgroundColor: index < strength.level ? colors.positive : colors.border },
              ]}
            />
          ))}
        </View>
        <AppText variant="badge" color={colors.positiveText} style={styles.strengthLabel}>
          {strength.label}
        </AppText>

        <AppText variant="bodyStrong" style={styles.groupLabel}>
          Kullanım Amacınız
        </AppText>
        <ChipGroup style={styles.chips}>
          {INTENT_OPTIONS.map((option) => (
            <Chip
              key={option.id}
              label={option.label}
              icon={option.icon}
              singleSelect
              selected={Boolean(selections[option.id])}
              onPress={() => toggleSelection(option.id)}
            />
          ))}
        </ChipGroup>

        <Checkbox
          checked={consent}
          onChange={setConsent}
          label="Kullanım Koşulları ve KVKK Açık Rıza Metni'ni okudum, onaylıyorum."
        />

        <Button
          label="Hesabımı Oluştur & Öncelikleri Belirle →"
          onPress={() => navigation.navigate('Survey')}
          disabled={!consent}
          style={styles.submit}
        />
      </Card>

      <View style={styles.socialRow}>
        <SocialButton label="Google" onPress={() => navigation.navigate('Survey')}>
          <GoogleMark />
        </SocialButton>
        <SocialButton label="Apple" onPress={() => navigation.navigate('Survey')}>
          <AppleMark />
        </SocialButton>
      </View>

      <AppText variant="body" align="center" color={colors.textSecondary} style={styles.footer}>
        Zaten bir hesabınız var mı?{' '}
        <AppText
          variant="bodyStrong"
          color={colors.primary}
          accessibilityRole="link"
          onPress={() => navigation.navigate('Welcome')}
        >
          Giriş Yap
        </AppText>
      </AppText>
    </Screen>
  );
}

function SocialButton({
  label,
  onPress,
  children,
}: {
  label: string;
  onPress: () => void;
  children: React.ReactNode;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${label} ile devam et`}
      style={({ pressed }) => [styles.socialButton, pressed && styles.pressed]}
    >
      {children}
      <AppText variant="captionStrong" style={styles.socialLabel}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: spacing.x26 - 2, paddingTop: spacing.x20 },
  heading: { marginBottom: 2 },
  subheading: { marginBottom: spacing.xxl },
  field: { marginBottom: spacing.xl },
  strengthTrack: { flexDirection: 'row', gap: spacing.xxs, marginTop: spacing.xs + 1 },
  strengthSegment: { flex: 1, height: 3, borderRadius: 2 },
  strengthLabel: { marginTop: 3, marginBottom: spacing.xxl },
  groupLabel: { marginBottom: spacing.xs },
  chips: { marginBottom: spacing.xxl },
  submit: { marginTop: spacing.x20 - 2 },
  socialRow: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.xl },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    minHeight: 44,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.xl,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  socialLabel: { fontSize: 12 },
  pressed: { backgroundColor: colors.surfaceMuted },
  footer: { marginTop: spacing.xl },
});
