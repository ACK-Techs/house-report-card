import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import {
  AppText,
  Badge,
  Callout,
  Card,
  Screen,
  ScoreBadge,
  SectionHeading,
} from '@/components/ui';
import { demoUser, legal, neighborhoodPulse, recentReports } from '@/data/content';
import type { MainTabParamList, RootStackParamList } from '@/navigation/types';
import { colors, radius, screenPaddingX, shadows, spacing, toneForScore, tonePalette } from '@/theme';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'HomeTab'>,
  NativeStackScreenProps<RootStackParamList>
>;

const QUICK_ACTIONS = [
  { id: 'building', icon: '📍', label: 'Bina\nSorgula', bg: colors.positiveBgAlt },
  { id: 'area', icon: '🗺', label: 'Bölge\nAnalizi', bg: colors.positiveBg },
  { id: 'compare', icon: '⚖', label: 'Kıyaslama\nYap', bg: colors.cautionBg },
  { id: 'history', icon: '📋', label: 'Son\nKarneler', bg: colors.surfaceMuted },
] as const;

/** 03 — Araştırma merkezi (kök ekran). */
export function HomeScreen({ navigation }: Props) {
  const openSearch = () => navigation.navigate('SearchTab');
  const openReport = (propertyId: string) => navigation.navigate('PropertyReport', { propertyId });
  const openAreaReport = (areaId: string) => navigation.navigate('AreaReport', { areaId });

  const quickActionHandlers: Record<string, () => void> = {
    building: openSearch,
    area: () => navigation.navigate('Area'),
    compare: () => navigation.navigate('CompareTab'),
    history: () => navigation.navigate('History'),
  };

  return (
    <Screen>
      <View style={styles.greetingRow}>
        <View style={styles.greetingText}>
          <AppText variant="title" accessibilityRole="header">
            Merhaba, {demoUser.fullName.split(' ')[0]} 👋
          </AppText>
          <AppText variant="body" color={colors.textSecondary} style={styles.greetingSub}>
            Bir evi incele veya bir bölgeyi keşfet.
          </AppText>
        </View>

        <View style={styles.greetingActions}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Bildirimler, okunmamış bildirim var"
            style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
          >
            <AppText style={styles.bell}>🔔</AppText>
            <View style={styles.notificationDot} />
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('ProfileTab')}
            accessibilityRole="button"
            accessibilityLabel="Profil"
            style={({ pressed }) => [styles.avatar, pressed && styles.pressed]}
          >
            <AppText variant="itemTitle" color={colors.primary}>
              {demoUser.initials}
            </AppText>
          </Pressable>
        </View>
      </View>

      <Pressable
        onPress={openSearch}
        accessibilityRole="search"
        accessibilityLabel="Adres, mahalle veya ada parsel ara"
        style={({ pressed }) => [styles.searchBar, pressed && styles.searchPressed]}
      >
        <AppText style={styles.searchGlyph}>🔍</AppText>
        <View style={styles.searchText}>
          <AppText variant="itemTitle" color={colors.primaryDark}>
            İlçe, mahalle, cadde veya ada/parsel
          </AppText>
          <AppText variant="caption" color={colors.primary}>
            Haritadan seç veya konumumu kullan
          </AppText>
        </View>
        <View style={styles.searchArrow}>
          <AppText variant="itemTitle" color={colors.white}>
            →
          </AppText>
        </View>
      </Pressable>

      <View style={styles.quickGrid}>
        {QUICK_ACTIONS.map((action) => (
          <Card
            key={action.id}
            onPress={quickActionHandlers[action.id]}
            accessibilityLabel={action.label.replace('\n', ' ')}
            padding={spacing.lg + 1}
            style={styles.quickCard}
          >
            <View style={[styles.quickIcon, { backgroundColor: action.bg }]}>
              <AppText style={styles.quickGlyph}>{action.icon}</AppText>
            </View>
            <AppText variant="badge" color={colors.inkSoft} align="center" style={styles.quickLabel}>
              {action.label}
            </AppText>
          </Card>
        ))}
      </View>

      <SectionHeading
        title="Mahalle Nabzı"
        action={{ label: 'Tümü →', onPress: () => navigation.navigate('Area') }}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.carousel}
        contentContainerStyle={styles.carouselContent}
      >
        {neighborhoodPulse.map((item) => (
          <Card
            key={item.id}
            onPress={() => openAreaReport(item.id)}
            accessibilityLabel={`${item.name}, bölge notu ${item.score}`}
            padding={spacing.xl}
            style={styles.pulseCard}
          >
            <View style={styles.pulseHeader}>
              <View style={styles.pulseTitle}>
                <AppText variant="bodyStrong">{item.name}</AppText>
                <AppText variant="badge" color={colors.textMuted}>
                  {item.city}
                </AppText>
              </View>
              <ScoreBadge score={item.score} />
            </View>
            <View style={styles.tagRow}>
              {item.tags.map((tag) => (
                <Badge key={tag.label} label={tag.label} soft />
              ))}
            </View>
          </Card>
        ))}
      </ScrollView>

      <SectionHeading
        title="Son İncelediklerin"
        action={{
          label: `Tümünü Gör (${recentReports.length + 1})`,
          onPress: () => navigation.navigate('History'),
        }}
      />
      {recentReports.map((report) => (
        <Card
          key={report.id}
          onPress={() => openReport(report.id)}
          accessibilityLabel={`${report.address}, ${report.district}, uyum skoru ${report.score}`}
          style={styles.recentCard}
        >
          <View style={styles.recentHeader}>
            <View style={styles.recentTitle}>
              <Badge label={report.district} />
              <AppText variant="itemTitle" style={styles.recentAddress}>
                {report.address}
              </AppText>
            </View>
            <View style={styles.recentScore}>
              <AppText variant="metric" color={tonePalette[toneForScore(report.score)].text}>
                {report.score}
                <AppText variant="captionStrong" color={colors.textMuted}>
                  /100
                </AppText>
              </AppText>
              <AppText variant="badge" color={colors.textMuted}>
                Uyum Skoru
              </AppText>
            </View>
          </View>
          <View style={styles.highlightRow}>
            {report.highlights.map((highlight) => (
              <Badge key={highlight.label} label={highlight.label} tone={highlight.tone} />
            ))}
          </View>
        </Card>
      ))}

      <Callout variant="neutral" icon="🛡" body={legal.homeDisclaimer} style={styles.disclaimer} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: spacing.xxl,
  },
  greetingText: { flex: 1 },
  greetingSub: { marginTop: 3 },
  greetingActions: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: radius.xl,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bell: { fontSize: 15, lineHeight: 20 },
  notificationDot: {
    position: 'absolute',
    top: 6,
    right: 7,
    width: 7,
    height: 7,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: colors.white,
    backgroundColor: colors.danger,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.white,
    backgroundColor: colors.positiveSoft,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.flat,
  },
  pressed: { opacity: 0.7 },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.xxl,
    marginBottom: spacing.xl,
    borderRadius: radius.x20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.positiveBorderAlt,
    backgroundColor: colors.positiveBgAlt,
  },
  searchPressed: { borderColor: colors.primaryOnDark },
  searchGlyph: { fontSize: 19, lineHeight: 24 },
  searchText: { flex: 1 },
  searchArrow: {
    width: 32,
    height: 32,
    borderRadius: radius.lg,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  quickGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.x20 + 2,
  },
  quickCard: { flex: 1, alignItems: 'center', gap: spacing.xs + 1 },
  quickIcon: {
    width: 34,
    height: 34,
    borderRadius: radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickGlyph: { fontSize: 16, lineHeight: 20 },
  quickLabel: { fontSize: 11, lineHeight: 14 },

  carousel: { marginHorizontal: -screenPaddingX, marginBottom: spacing.x20 + 2 },
  carouselContent: { paddingHorizontal: screenPaddingX, gap: spacing.md, paddingBottom: spacing.xxs },
  pulseCard: { width: 168 },
  pulseHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  pulseTitle: { flex: 1 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xxs },

  recentCard: { marginBottom: spacing.md },
  recentHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  recentTitle: { flex: 1 },
  recentAddress: { marginTop: spacing.xs },
  recentScore: { alignItems: 'flex-end' },
  highlightRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs, marginTop: spacing.md },

  disclaimer: { marginTop: spacing.xs },
});
