import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';

import {
  AppText,
  Badge,
  Button,
  Card,
  ListRow,
  Screen,
  ScreenHeader,
  SliderRow,
} from '@/components/ui';
import { demoUser } from '@/data/content';
import type { MainTabParamList, RootStackParamList } from '@/navigation/types';
import { selectWeightTotal, usePreferencesStore, type WeightKey } from '@/store/usePreferencesStore';
import { colors, spacing } from '@/theme';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'ProfileTab'>,
  NativeStackScreenProps<RootStackParamList>
>;

const WEIGHT_LABELS: { key: WeightKey; label: string }[] = [
  { key: 'quake', label: '🛡 Zemin & deprem' },
  { key: 'transit', label: '🚇 Ulaşım erişimi' },
  { key: 'school', label: '🏫 Okul & çocuk yaşamı' },
  { key: 'climate', label: '☀ İklim & güneş konforu' },
];

/** 12 — Profil ve öncelik çarkı. */
export function ProfileScreen({ navigation }: Props) {
  const weights = usePreferencesStore((state) => state.weights);
  const setWeight = usePreferencesStore((state) => state.setWeight);
  const total = usePreferencesStore(selectWeightTotal);

  return (
    <Screen
      header={
        <ScreenHeader
          title="Profil & Öncelikler"
          iconAction={{
            icon: '⚙',
            onPress: () => navigation.navigate('Settings'),
            accessibilityLabel: 'Ayarlar',
          }}
        />
      }
    >
      <Card elevation="flat" style={styles.identityCard}>
        <View style={styles.avatar}>
          <AppText variant="cardTitle" color={colors.white} style={styles.avatarText}>
            {demoUser.initials}
          </AppText>
        </View>
        <View style={styles.identityText}>
          <AppText variant="cardTitle" style={styles.name}>
            {demoUser.fullName}
          </AppText>
          <AppText variant="caption" color={colors.textMuted} style={styles.email}>
            {demoUser.email}
          </AppText>
          <Badge label={demoUser.badge} tone="positive" />
        </View>
      </Card>

      <Card elevation="flat" style={styles.card}>
        <View style={styles.weightHeader}>
          <AppText variant="section">Öncelik Çarkım</AppText>
          <AppText variant="captionStrong" color={total === 100 ? colors.textMuted : colors.cautionText}>
            Toplam %{total}
          </AppText>
        </View>
        <AppText variant="caption" color={colors.textMuted} style={styles.weightIntro}>
          Ağırlıkları değiştirdiğinizde tüm karneler yeniden hesaplanır.
        </AppText>

        {WEIGHT_LABELS.map(({ key, label }, index) => (
          <SliderRow
            key={key}
            label={label}
            valueLabel={`%${weights[key]}`}
            value={weights[key]}
            minimum={0}
            maximum={60}
            step={5}
            onChange={(value) => setWeight(key, value)}
            style={index < WEIGHT_LABELS.length - 1 ? styles.slider : undefined}
          />
        ))}

        <Button
          label="Anketi yeniden çalıştır"
          variant="secondary"
          size="sm"
          onPress={() => navigation.navigate('Survey')}
          style={styles.resurvey}
        />
      </Card>

      <Card elevation="flat" padding={spacing.xxl} style={styles.menuCard}>
        <ListRow label="Kaydedilen raporlarım" onPress={() => navigation.navigate('SavedTab')} />
        <ListRow label="İnceleme geçmişim" onPress={() => navigation.navigate('History')} />
        <ListRow label="Yardım ve metodoloji" onPress={() => navigation.navigate('Help')} />
        <ListRow label="Gizlilik ve güvenlik" onPress={() => navigation.navigate('Settings')} last />
      </Card>

      <Button
        label="Çıkış Yap"
        variant="danger"
        onPress={() =>
          navigation
            .getParent<NativeStackNavigationProp<RootStackParamList>>()
            ?.reset({ index: 0, routes: [{ name: 'Welcome' }] })
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  identityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xl,
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 18 },
  identityText: { flex: 1, minWidth: 0 },
  name: { fontSize: 16 },
  email: { marginTop: 2, marginBottom: spacing.xs },
  card: { marginBottom: spacing.lg },
  weightHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: spacing.xxs,
  },
  weightIntro: { marginBottom: spacing.xl },
  slider: { marginBottom: spacing.xl },
  resurvey: { marginTop: spacing.xxl },
  menuCard: { paddingVertical: spacing.xxs, marginBottom: spacing.lg },
});
