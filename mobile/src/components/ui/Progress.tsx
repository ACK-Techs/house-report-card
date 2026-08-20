import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, spacing } from '@/theme';

interface StepProgressProps {
  total: number;
  current: number;
  style?: StyleProp<ViewStyle>;
}

/** Anket adım göstergesi. Tamamlanan adımlar marka yeşiliyle dolar. */
export function StepProgress({ total, current, style }: StepProgressProps) {
  return (
    <View
      style={[styles.steps, style]}
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={`Adım ${current} / ${total}`}
      accessibilityValue={{ min: 1, max: total, now: current }}
    >
      {Array.from({ length: total }, (_, index) => (
        <View
          key={index}
          style={[
            styles.step,
            { backgroundColor: index < current ? colors.primary : colors.border },
          ]}
        />
      ))}
    </View>
  );
}

interface ProgressBarProps {
  /** 0-100 arası doluluk. */
  percent: number;
  accessibilityLabel: string;
  height?: number;
  trackColor?: string;
  fillColor?: string;
  style?: StyleProp<ViewStyle>;
}

export function ProgressBar({
  percent,
  accessibilityLabel,
  height = 6,
  trackColor = 'rgba(255,255,255,0.12)',
  fillColor = colors.positiveBright,
  style,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{ min: 0, max: 100, now: Math.round(clamped) }}
      style={[styles.track, { height, borderRadius: height / 2, backgroundColor: trackColor }, style]}
    >
      <View
        style={{
          width: `${clamped}%`,
          height: '100%',
          borderRadius: height / 2,
          backgroundColor: fillColor,
        }}
      />
    </View>
  );
}

interface StackedBarProps {
  segments: { label: string; percent: number; color: string }[];
}

/** Bina stoğu dağılımı gibi çok parçalı yatay bar. */
export function StackedBar({ segments }: StackedBarProps) {
  return (
    <View
      accessible
      accessibilityLabel={segments.map((s) => s.label).join(', ')}
      style={styles.stacked}
    >
      {segments.map((segment) => (
        <View
          key={segment.label}
          style={{
            flex: segment.percent,
            backgroundColor: segment.color,
            borderRadius: 7,
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  steps: { flexDirection: 'row', gap: spacing.xxs },
  step: { flex: 1, height: 6, borderRadius: 3 },
  track: { width: '100%', overflow: 'hidden' },
  stacked: { flexDirection: 'row', gap: 5, height: 12 },
});
