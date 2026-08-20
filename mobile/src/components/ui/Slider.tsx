import RNSlider from '@react-native-community/slider';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, spacing } from '@/theme';

import { AppText } from './AppText';

interface SliderRowProps {
  label: string;
  /** Sağ üstte gösterilen anlık değer etiketi. */
  valueLabel: string;
  value: number;
  minimum: number;
  maximum: number;
  step: number;
  onChange: (value: number) => void;
  /** Sürgünün altındaki uç etiketleri. */
  bounds?: [string, string];
  accentColor?: string;
  labelColor?: string;
  valueColor?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Etiketli sürgü. Ekran okuyucu için `accessibilityValue` doldurulur, böylece
 * ağırlık değişiklikleri sesli olarak duyurulur.
 */
export function SliderRow({
  label,
  valueLabel,
  value,
  minimum,
  maximum,
  step,
  onChange,
  bounds,
  accentColor = colors.primary,
  labelColor = colors.inkSoft,
  valueColor = colors.primary,
  style,
}: SliderRowProps) {
  return (
    <View style={style}>
      <View style={styles.header}>
        <AppText variant="captionStrong" color={labelColor} style={styles.label}>
          {label}
        </AppText>
        <AppText variant="metricSmall" color={valueColor} style={styles.value}>
          {valueLabel}
        </AppText>
      </View>
      <RNSlider
        value={value}
        minimumValue={minimum}
        maximumValue={maximum}
        step={step}
        onValueChange={onChange}
        minimumTrackTintColor={accentColor}
        maximumTrackTintColor={colors.border}
        thumbTintColor={accentColor}
        accessibilityLabel={label}
        accessibilityValue={{ min: minimum, max: maximum, now: value, text: valueLabel }}
        style={styles.slider}
      />
      {bounds ? (
        <View style={styles.bounds}>
          <AppText variant="badge" color={colors.textMuted}>
            {bounds[0]}
          </AppText>
          <AppText variant="badge" color={colors.textMuted}>
            {bounds[1]}
          </AppText>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xxs + 1,
  },
  label: { fontSize: 12, flexShrink: 1 },
  value: { fontSize: 12 },
  slider: { width: '100%', height: 32 },
  bounds: { flexDirection: 'row', justifyContent: 'space-between' },
});
