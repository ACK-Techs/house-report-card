import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { RadarChart, ScoreRing } from '@/components/charts';
import {
  Accordion,
  AppText,
  Callout,
  Card,
  MetricRow,
  ProgressBar,
  Screen,
  ScreenHeader,
  ScoreBadge,
  SectionHeading,
  SourceBadgeRow,
} from '@/components/ui';
import { legal } from '@/data/content';
import { propertyReport } from '@/data/reports';
import type { RootStackParamList } from '@/navigation/types';
import { useToast } from '@/store/useToastStore';
import { colors, radius, spacing } from '@/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'PropertyReport'>;

const AXIS_ICON_BG: Record<string, string> = {
  a1: colors.positiveBg,
  a2: colors.cautionBg,
  a3: colors.positiveBgAlt,
  a4: colors.positiveBg,
  a5: colors.cautionBg,
};

/** 07 — Bina / ev karnesi. */
export function PropertyReportScreen({ navigation }: Props) {
  const toast = useToast();
  const report = propertyReport;
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ a1: true });

  const toggle = (id: string) =>
    setExpanded((current) => ({ ...current, [id]: !current[id] }));

  return (
    <Screen
      header={
        <ScreenHeader
          title="Ev Karnesi"
          onBack={() => navigation.goBack()}
          action={{
            label: 'Kıyasla',
            onPress: () => navigation.navigate('Main', { screen: 'CompareTab' }),
          }}
        />
      }
    >
      {/* Hero — koyu yüzey üzerinde uyum skoru */}
      <View style={styles.hero}>
        <View style={styles.heroGlow} pointerEvents="none" />

        <View style={styles.heroTop}>
          <View style={styles.heroTitle}>
            <View style={styles.heroBadge}>
              <AppText variant="badge" color={colors.primaryOnDark}>
                {report.district}
              </AppText>
            </View>
            <AppText variant="cardTitle" color={colors.white} style={styles.heroAddress}>
              {report.address}
            </AppText>
            <AppText variant="caption" color={colors.textMuted}>
              Rapor: {report.generatedAt} · {report.methodologyVersion}
            </AppText>
          </View>

          <View style={styles.heroActions}>
            <HeroAction
              icon="💾"
              label="Raporu kaydet"
              onPress={() => toast('Rapor kaydedilenlere eklendi')}
            />
            <HeroAction icon="⬇" label="PDF indir" onPress={() => toast('PDF hazırlanıyor…')} />
            <HeroAction
              icon="🔗"
              label="Raporu paylaş"
              onPress={() => toast('Rapor bağlantısı kopyalandı')}
            />
          </View>
        </View>

        <View style={styles.heroBody}>
          <ScoreRing score={report.score} grade={report.grade} />
          <View style={styles.heroMeta}>
            <AppText variant="badge" color={colors.textMuted}>
              Kişisel uyum skoru
            </AppText>
            <AppText variant="caption" color={colors.borderStrong} style={styles.heroMetaText}>
              Önceliklerinize göre ağırlıklandırılmış toplam not.
            </AppText>

            <View style={styles.completenessRow}>
              <AppText variant="badge" color={colors.textMuted}>
                Veri tamlığı
              </AppText>
              <AppText variant="badge" color={colors.positiveBorder}>
                {report.completenessLabel}
              </AppText>
            </View>
            <ProgressBar
              percent={report.dataCompleteness}
              accessibilityLabel={`Veri tamlığı ${report.dataCompleteness} yüzde`}
            />
          </View>
        </View>
      </View>

      {/* Öncelik örtüşmesi */}
      <Card elevation="flat" padding={spacing.xl} style={styles.radarCard}>
        <View style={styles.radarHeader}>
          <AppText variant="itemTitle">Öncelik Örtüşmesi</AppText>
          <AppText variant="badge" color={colors.textMuted}>
            Bina notu · sizin ağırlıklarınız
          </AppText>
        </View>
        <View style={styles.radarBody}>
          <RadarChart axes={report.radar} />
          <View style={styles.legend}>
            <LegendRow color={colors.primary} label="Bu binanın eksen notları" />
            <LegendRow color={colors.border} label="Kadıköy ortalaması" />
            <View style={styles.insight}>
              <AppText variant="badge" color={colors.primaryDark} style={styles.insightText}>
                {report.radarInsight}
              </AppText>
            </View>
          </View>
        </View>
      </Card>

      <Callout
        title="Dikkat edilmesi gerekenler"
        icon="⚠"
        body={report.warnings}
        style={styles.warnings}
      />

      <SectionHeading title="5 Temel Performans Ekseni" />

      {report.axes.map((axis) => (
        <Accordion
          key={axis.id}
          icon={axis.icon}
          iconBackground={AXIS_ICON_BG[axis.id] ?? colors.positiveBg}
          title={axis.title}
          summary={axis.summary}
          trailing={<ScoreBadge score={axis.score} />}
          expanded={Boolean(expanded[axis.id])}
          onToggle={() => toggle(axis.id)}
          style={styles.axis}
        >
          {axis.rows.map((row, index) => (
            <MetricRow key={row.label} row={row} last={index === axis.rows.length - 1} />
          ))}
          <SourceBadgeRow sources={axis.sources} resolution={axis.resolution} />
        </Accordion>
      ))}

      <Callout
        variant="neutral"
        title="Sorumluluk reddi"
        body={legal.reportDisclaimer}
        style={styles.disclaimer}
      />
    </Screen>
  );
}

function HeroAction({
  icon,
  label,
  onPress,
}: {
  icon: string;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={6}
      style={({ pressed }) => [styles.heroActionButton, pressed && styles.pressed]}
    >
      <AppText style={styles.heroActionIcon}>{icon}</AppText>
    </Pressable>
  );
}

function LegendRow({ color, label }: { color: string; label: string }) {
  return (
    <View style={styles.legendRow}>
      <View style={[styles.legendSwatch, { backgroundColor: color }]} />
      <AppText variant="badge" color={colors.textSecondary}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    overflow: 'hidden',
    marginBottom: spacing.xl,
    padding: spacing.x20 - 2,
    borderRadius: radius.x24,
    backgroundColor: colors.inkSurface,
  },
  heroGlow: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(79,168,138,0.12)',
  },
  heroTop: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: spacing.md },
  heroTitle: { flex: 1 },
  heroBadge: {
    alignSelf: 'flex-start',
    paddingVertical: 3,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  heroAddress: { marginTop: spacing.sm, marginBottom: 2, fontSize: 17 },
  heroActions: { gap: spacing.xs },
  heroActionButton: {
    width: 34,
    height: 34,
    borderRadius: radius.xl,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.16)',
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroActionIcon: { fontSize: 14, lineHeight: 18 },
  pressed: { opacity: 0.6 },
  heroBody: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxl,
    marginTop: spacing.xxl,
  },
  heroMeta: { flex: 1, minWidth: 0 },
  heroMetaText: { marginTop: spacing.xxs, marginBottom: spacing.lg },
  completenessRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },

  radarCard: { marginBottom: spacing.xxl },
  radarHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  radarBody: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  legend: { flex: 1, minWidth: 0, gap: spacing.xs + 1 },
  legendRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs + 1 },
  legendSwatch: { width: 7, height: 7, borderRadius: 2 },
  insight: {
    marginTop: 2,
    padding: spacing.sm,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.positiveBorderAlt,
    backgroundColor: colors.positiveBgAlt,
  },
  insightText: { lineHeight: 15 },

  warnings: { marginBottom: spacing.xxl },
  axis: { marginBottom: spacing.md },
  disclaimer: { marginTop: spacing.xs },
});
