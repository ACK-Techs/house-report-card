import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, radius, spacing, tonePalette, toneForScore } from '@/theme';

import { AppText } from './AppText';

export type BadgeTone = 'positive' | 'caution' | 'danger' | 'neutral' | 'brand' | 'missing';

const palette: Record<BadgeTone, { bg: string; border: string; text: string; dashed?: boolean }> = {
  positive: {
    bg: colors.positiveBg,
    border: colors.positiveBorder,
    text: colors.positiveText,
  },
  caution: {
    bg: colors.cautionBg,
    border: colors.cautionBorder,
    text: colors.cautionText,
  },
  danger: { bg: colors.dangerBg, border: colors.dangerBorder, text: colors.dangerText },
  neutral: {
    bg: colors.surfaceMuted,
    border: colors.borderStrong,
    text: colors.textSecondary,
  },
  brand: {
    bg: colors.positiveBgAlt,
    border: colors.positiveBorderAlt,
    text: colors.primaryDark,
  },
  /** Veri yok: kesikli sınır — düşük risk ile karıştırılmaması için. */
  missing: {
    bg: colors.background,
    border: colors.borderDashed,
    text: colors.textSecondary,
    dashed: true,
  },
};

interface BadgeProps {
  label: string;
  tone?: BadgeTone;
  /** Zeminsiz, yalnız dolgu rengi olan yumuşak etiket. */
  soft?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function Badge({ label, tone = 'brand', soft = false, style }: BadgeProps) {
  const p = palette[tone];
  return (
    <View
      style={[
        styles.badge,
        soft
          ? { backgroundColor: colors.surfaceMuted }
          : {
              backgroundColor: p.bg,
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: p.border,
              borderStyle: p.dashed ? 'dashed' : 'solid',
            },
        style,
      ]}
    >
      <AppText variant="badge" color={soft ? colors.textSecondary : p.text}>
        {label}
      </AppText>
    </View>
  );
}

interface ScoreBadgeProps {
  score: number;
  /** 100'lük ölçek etiketi gösterilsin mi. */
  showScale?: boolean;
  size?: 'sm' | 'md';
  style?: StyleProp<ViewStyle>;
}

/** Skor rozeti. Skor ekran okuyucuya "x, 100 üzerinden" olarak okunur. */
export function ScoreBadge({ score, showScale = false, size = 'sm', style }: ScoreBadgeProps) {
  const p = tonePalette[toneForScore(score)];
  return (
    <View
      accessible
      accessibilityLabel={`Uyum skoru ${score}, 100 üzerinden`}
      style={[
        styles.score,
        size === 'md' && styles.scoreMd,
        { backgroundColor: p.bg, borderColor: p.border },
        style,
      ]}
    >
      <AppText variant="metricSmall" color={p.text} style={size === 'md' && styles.scoreMdText}>
        {score}
        {showScale ? '/100' : ''}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingVertical: spacing.xxs,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.sm,
  },
  score: {
    paddingVertical: 3,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.sm,
    borderWidth: StyleSheet.hairlineWidth,
    alignSelf: 'flex-start',
  },
  scoreMd: { paddingVertical: spacing.xxs, paddingHorizontal: spacing.md },
  scoreMdText: { fontSize: 14 },
});
