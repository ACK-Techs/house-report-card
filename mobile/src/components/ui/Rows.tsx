import { Pressable, StyleSheet, View } from 'react-native';

import { colors, minTouchTarget, spacing } from '@/theme';
import type { MetricRow as MetricRowModel } from '@/types';

import { AppText } from './AppText';

const toneColor = {
  positive: colors.positiveText,
  caution: colors.cautionText,
  danger: colors.dangerText,
  neutral: colors.textSecondary,
} as const;

/** Rapor detaylarındaki "etiket → değer" satırı. */
export function MetricRow({ row, last = false }: { row: MetricRowModel; last?: boolean }) {
  return (
    <View
      accessible
      accessibilityLabel={`${row.label}: ${row.value}`}
      style={[styles.metricRow, !last && styles.dashedBorder]}
    >
      <AppText variant="caption" color={colors.textSecondary} style={styles.metricLabel}>
        {row.label}
      </AppText>
      <AppText
        variant="captionStrong"
        color={row.tone ? toneColor[row.tone] : colors.ink}
        style={styles.metricValue}
      >
        {row.value}
      </AppText>
    </View>
  );
}

interface ListRowProps {
  label: string;
  value?: string;
  onPress?: () => void;
  last?: boolean;
}

/** Profil / ayarlar menülerindeki gezinme satırı. */
export function ListRow({ label, value, onPress, last = false }: ListRowProps) {
  const content = (
    <>
      <AppText variant="bodyStrong">{label}</AppText>
      {value ? (
        <AppText variant="bodyStrong" color={colors.textMuted}>
          {value}
        </AppText>
      ) : onPress ? (
        <AppText variant="bodyStrong" color={colors.textMuted}>
          →
        </AppText>
      ) : null}
    </>
  );

  if (!onPress) {
    return <View style={[styles.listRow, !last && styles.solidBorder]}>{content}</View>;
  }

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [
        styles.listRow,
        !last && styles.solidBorder,
        pressed && styles.pressed,
      ]}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  metricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.lg,
    paddingVertical: spacing.xs + 1,
  },
  metricLabel: { flexShrink: 1 },
  metricValue: { flexShrink: 1, textAlign: 'right' },
  dashedBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.surfaceMuted,
    borderStyle: 'dashed',
  },
  listRow: {
    minHeight: minTouchTarget,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg + 1,
  },
  solidBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.surfaceMuted,
  },
  pressed: { opacity: 0.6 },
});
