import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';

import {
  AppText,
  Button,
  Card,
  ListRow,
  Screen,
  ScreenHeader,
  SegmentedControl,
  SwitchRow,
} from '@/components/ui';
import type { RootStackParamList } from '@/navigation/types';
import { usePreferencesStore, type PrivacySettings } from '@/store/usePreferencesStore';
import { useToast } from '@/store/useToastStore';
import { colors, radius, spacing } from '@/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

/** 13 — Ayarlar ve gizlilik. Konum ve arama geçmişi hassas veri kabul edilir. */
export function SettingsScreen({ navigation }: Props) {
  const toast = useToast();
  const privacy = usePreferencesStore((state) => state.privacy);
  const setPrivacy = usePreferencesStore((state) => state.setPrivacy);

  return (
    <Screen
      header={<ScreenHeader title="Ayarlar & Gizlilik" onBack={() => navigation.goBack()} />}
    >
      <Card elevation="flat" style={styles.card}>
        <AppText variant="itemTitle" style={styles.cardTitle}>
          Gizlilik ve veri güvenliği
        </AppText>
        <AppText variant="caption" color={colors.textMuted} style={styles.cardIntro}>
          Konum ve arama geçmişi hassas veri kabul edilir.
        </AppText>

        <SwitchRow
          label="Tam konumumu maskele"
          description="Yaklaşık konum (~250 m) kullanılır"
          value={privacy.maskLocation}
          onChange={(value) => setPrivacy('maskLocation', value)}
        />
        <SwitchRow
          label="Arama geçmişimi sakla"
          description="Kapatılırsa geçmiş cihazda tutulmaz"
          value={privacy.keepSearchHistory}
          onChange={(value) => setPrivacy('keepSearchHistory', value)}
        />
        <SwitchRow
          label="Kişiselleştirilmiş öneriler"
          description="Öncelik ağırlıklarınıza göre sıralama"
          value={privacy.personalizedRanking}
          onChange={(value) => setPrivacy('personalizedRanking', value)}
          last
        />
      </Card>

      <Card elevation="flat" style={styles.card}>
        <AppText variant="itemTitle" style={styles.cardTitle}>
          Uygulama
        </AppText>

        <AppText variant="captionStrong" color={colors.inkSoft} style={styles.themeLabel}>
          Tema
        </AppText>
        <SegmentedControl<PrivacySettings['theme']>
          segments={[
            { value: 'light', label: 'Açık' },
            { value: 'dark', label: 'Koyu' },
            { value: 'system', label: 'Sistem' },
          ]}
          value={privacy.theme}
          onChange={(value) => setPrivacy('theme', value)}
          style={styles.themeControl}
        />

        <ListRow label="Uygulama dili" value="Türkçe (TR)" />
        <ListRow label="Metrik birimleri" value="Metre / m²" />
        <SwitchRow
          label="Rapor güncelleme bildirimleri"
          value={privacy.reportNotifications}
          onChange={(value) => setPrivacy('reportNotifications', value)}
          last
        />
      </Card>

      <View style={styles.dangerZone}>
        <AppText variant="cardTitle" color={colors.dangerText} style={styles.dangerTitle}>
          Verilerim
        </AppText>
        <AppText variant="caption" color={colors.dangerTextDeep} style={styles.dangerBody}>
          Hesabınızı ve tüm inceleme kayıtlarınızı kalıcı olarak silebilirsiniz. Bu işlem geri
          alınamaz.
        </AppText>
        <Button
          label="Tüm verilerimi ve hesabımı sil"
          variant="primary"
          size="sm"
          onPress={() => toast('Tüm verileriniz silinme kuyruğuna alındı')}
          style={styles.dangerButton}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: spacing.lg },
  cardTitle: { marginBottom: spacing.xxs },
  cardIntro: { marginBottom: spacing.lg },
  themeLabel: { fontSize: 12, marginBottom: spacing.xs },
  themeControl: { marginBottom: spacing.lg },
  dangerZone: {
    padding: spacing.xxl,
    borderRadius: radius.x20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.dangerBorder,
    backgroundColor: colors.dangerBg,
  },
  dangerTitle: { fontSize: 13, marginBottom: spacing.xxs },
  dangerBody: { marginBottom: spacing.lg },
  dangerButton: { backgroundColor: colors.dangerText },
});
