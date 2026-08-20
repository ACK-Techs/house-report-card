import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';

import { AppText, Button, Card, Screen, ScreenHeader, StackedBar } from '@/components/ui';
import { areaReport } from '@/data/reports';
import type { RootStackParamList } from '@/navigation/types';
import { useToast } from '@/store/useToastStore';
import { colors, radius, spacing } from '@/theme';
import type { AreaStat } from '@/types';

type Props = NativeStackScreenProps<RootStackParamList, 'AreaReport'>;

const statColor: Record<AreaStat['tone'], string> = {
  positive: colors.positiveText,
  caution: colors.cautionText,
  primary: colors.primary,
  neutral: colors.ink,
};

/** 08 — Bölge raporu. Bina düzeyi kesinlik iddiası taşımaz. */
export function AreaReportScreen({ navigation }: Props) {
  const toast = useToast();
  const report = areaReport;

  return (
    <Screen
      header={
        <ScreenHeader
          title="Bölge Raporu"
          onBack={() => navigation.goBack()}
          action={{
            label: 'Takip Et',
            onPress: () => toast('Mahalle takip listesine eklendi'),
          }}
        />
      }
    >
      <View style={styles.hero}>
        <View style={styles.heroGlow} pointerEvents="none" />
        <View style={styles.heroTop}>
          <View style={styles.heroText}>
            <View style={styles.heroBadge}>
              <AppText variant="badge" color={colors.white}>
                {report.city} / {report.district}
              </AppText>
            </View>
            <AppText variant="title" color={colors.white} style={styles.heroTitle}>
              {report.name}
            </AppText>
            <AppText variant="caption" color={colors.positiveSoft}>
              {report.subtitle}
            </AppText>
          </View>
          <View
            style={styles.heroScore}
            accessible
            accessibilityLabel={`Bölge notu ${report.score}, 100 üzerinden`}
          >
            <AppText variant="metric" color={colors.white} style={styles.heroScoreValue}>
              {report.score}
            </AppText>
            <AppText variant="badge" color={colors.positiveBorderAlt}>
              Bölge notu
            </AppText>
          </View>
        </View>

        <View style={styles.resolutionNote}>
          <AppText variant="badge" color={colors.white}>
            🗺 Bölge tahmini — bina düzeyi kesinlik içermez
          </AppText>
        </View>
      </View>

      <View style={styles.statGrid}>
        {report.stats.map((stat) => (
          <Card key={stat.label} elevation="flat" padding={spacing.xl} style={styles.statCard}>
            <AppText variant="caption" color={colors.textMuted}>
              {stat.label}
            </AppText>
            <AppText variant="metric" color={statColor[stat.tone]} style={styles.statValue}>
              {stat.value}
            </AppText>
            <AppText variant="badge" color={colors.textMuted}>
              {stat.note}
            </AppText>
          </Card>
        ))}
      </View>

      <Card elevation="flat" style={styles.section}>
        <AppText variant="itemTitle" style={styles.sectionTitle}>
          Bina stoğu dağılımı
        </AppText>
        <StackedBar segments={report.buildingStock} />
        <View style={styles.stockLabels}>
          {report.buildingStock.map((segment) => (
            <AppText key={segment.label} variant="badge" color={colors.textSecondary}>
              {segment.label}
            </AppText>
          ))}
        </View>
      </Card>

      <Card elevation="flat" style={styles.section}>
        <AppText variant="itemTitle" style={styles.sectionTitle}>
          Altyapı & sosyal donatı
        </AppText>
        <View style={styles.amenityList}>
          {report.amenities.map((amenity) => (
            <View
              key={amenity.label}
              style={styles.amenityRow}
              accessible
              accessibilityLabel={`${amenity.label}: ${amenity.count} adet`}
            >
              <View style={[styles.amenityIcon, { backgroundColor: amenity.bg }]}>
                <AppText style={styles.amenityGlyph}>{amenity.icon}</AppText>
              </View>
              <AppText variant="captionStrong" color={colors.inkSoft} style={styles.amenityLabel}>
                {amenity.label}
              </AppText>
              <AppText variant="captionStrong" color={colors.ink}>
                {amenity.count}
              </AppText>
            </View>
          ))}
        </View>
      </Card>

      <Button
        label="Bu bölgede bir bina incele →"
        onPress={() => navigation.navigate('Main', { screen: 'SearchTab' })}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    overflow: 'hidden',
    marginBottom: spacing.lg,
    padding: spacing.x20 - 2,
    borderRadius: radius.x24,
    backgroundColor: colors.primary,
  },
  heroGlow: {
    position: 'absolute',
    top: -50,
    right: -30,
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: 'rgba(255,255,255,0.10)',
  },
  heroTop: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: spacing.lg },
  heroText: { flex: 1 },
  heroBadge: {
    alignSelf: 'flex-start',
    paddingVertical: 3,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.28)',
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  heroTitle: { marginTop: spacing.sm, marginBottom: 3, fontSize: 19 },
  heroScore: { alignItems: 'flex-end' },
  heroScoreValue: { fontSize: 30, lineHeight: 36 },
  resolutionNote: {
    alignSelf: 'flex-start',
    marginTop: spacing.xl,
    paddingVertical: 5,
    paddingHorizontal: spacing.sm + 1,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.24)',
    backgroundColor: 'rgba(255,255,255,0.14)',
  },

  statGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  statCard: { width: '47.6%', flexGrow: 1 },
  statValue: { marginTop: 5, fontSize: 18 },

  section: { marginBottom: spacing.lg },
  sectionTitle: { marginBottom: spacing.lg },
  stockLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm + 1,
  },
  amenityList: { gap: spacing.sm + 1 },
  amenityRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  amenityIcon: {
    width: 30,
    height: 30,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amenityGlyph: { fontSize: 14, lineHeight: 18 },
  amenityLabel: { flex: 1, fontSize: 12 },
});
