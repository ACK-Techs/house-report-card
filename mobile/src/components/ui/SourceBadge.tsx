import { StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '@/theme';
import type { Confidence, GeoResolution, SourceRef } from '@/types';

import { AppText } from './AppText';

/**
 * Veri güven ve çözünürlük rozetleri.
 *
 * Ürün değişmezi: güven seviyesi risk seviyesinden ayrı gösterilir ve coğrafi
 * çözünürlük ayrı bir rozette yer alır — bölge tahmini bina düzeyi kesinlik
 * gibi okunmamalıdır. Nokta dizisi (●●● / ●●○ / ●○○) görsel kısayoldur; ekran
 * okuyucuya güven seviyesi her zaman açık metinle bildirilir.
 */

const dots: Record<Confidence, string> = {
  high: '●●●',
  medium: '●●○',
  low: '●○○',
  none: '○○○',
};

const confidenceSpeech: Record<Confidence, string> = {
  high: 'yüksek güven',
  medium: 'orta güven',
  low: 'düşük güven',
  none: 'veri yok',
};

const resolutionLabel: Record<GeoResolution, { icon: string; text: string }> = {
  building: { icon: '🏠', text: 'Bina düzeyi' },
  parcel: { icon: '🏠', text: 'Parsel düzeyi' },
  street: { icon: '🛣', text: 'Sokak düzeyi' },
  neighborhood: { icon: '🗺', text: 'Mahalle düzeyi' },
  district: { icon: '🗺', text: 'İlçe düzeyi' },
};

const styleFor: Record<Confidence, { bg: string; border: string; text: string; dashed: boolean }> = {
  high: {
    bg: colors.positiveBgAlt,
    border: colors.positiveBorderAlt,
    text: colors.primaryDark,
    dashed: false,
  },
  medium: {
    bg: colors.background,
    border: colors.borderStrong,
    text: colors.textSecondary,
    dashed: false,
  },
  low: {
    bg: colors.background,
    border: colors.borderDashed,
    text: colors.textSecondary,
    dashed: true,
  },
  /** Veri yok: kesikli sınır — düşük risk ile karıştırılmaması için. */
  none: {
    bg: colors.background,
    border: colors.borderDashed,
    text: colors.textSecondary,
    dashed: true,
  },
};

export function SourceBadge({
  source,
  compact = false,
}: {
  source: SourceRef;
  /** Kaynak adı zaten yanında yazılıyorsa rozette tekrarlanmaz. */
  compact?: boolean;
}) {
  const s = styleFor[source.confidence];
  // "veri yok" rozetlerinde nokta dizisi gösterilmez; etiket zaten bunu söyler.
  const prefix = source.confidence === 'none' ? '' : dots[source.confidence];
  const text = [prefix, compact ? null : source.label, source.year].filter(Boolean).join(' ');

  return (
    <View
      accessible
      accessibilityLabel={`Kaynak ${source.label}${source.year ? `, ${source.year}` : ''}, ${
        confidenceSpeech[source.confidence]
      }`}
      style={[
        styles.badge,
        {
          backgroundColor: s.bg,
          borderColor: s.border,
          borderStyle: s.dashed ? 'dashed' : 'solid',
        },
      ]}
    >
      <AppText variant="badge" color={s.text}>
        {text}
      </AppText>
    </View>
  );
}

/** Coğrafi çözünürlük rozeti — güven rozetinden ayrı tutulur. */
export function ResolutionBadge({ resolution }: { resolution: GeoResolution }) {
  const { icon, text } = resolutionLabel[resolution];
  const isBuildingLevel = resolution === 'building' || resolution === 'parcel';

  return (
    <View
      accessible
      accessibilityLabel={`Veri çözünürlüğü: ${text}`}
      style={[
        styles.badge,
        isBuildingLevel ? styles.resolutionPrecise : styles.resolutionBroad,
      ]}
    >
      <AppText
        variant="badge"
        color={isBuildingLevel ? colors.primaryDark : colors.textSecondary}
      >
        {icon} {text}
      </AppText>
    </View>
  );
}

export function SourceBadgeRow({
  sources,
  resolution,
}: {
  sources: SourceRef[];
  resolution?: GeoResolution;
}) {
  if (sources.length === 0 && !resolution) return null;

  return (
    <View style={styles.row}>
      {sources.map((source) => (
        <SourceBadge key={`${source.label}-${source.year ?? ''}`} source={source} />
      ))}
      {resolution ? <ResolutionBadge resolution={resolution} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingVertical: spacing.xxs,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.sm,
    borderWidth: StyleSheet.hairlineWidth,
  },
  resolutionPrecise: {
    backgroundColor: colors.positiveBgAlt,
    borderColor: colors.positiveBorderAlt,
  },
  resolutionBroad: {
    backgroundColor: colors.background,
    borderColor: colors.borderStrong,
  },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs, marginTop: spacing.md },
});
