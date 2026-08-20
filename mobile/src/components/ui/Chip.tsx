import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, minTouchTarget, radius, spacing } from '@/theme';

import { AppText } from './AppText';

interface ChipProps {
  label: string;
  icon?: string;
  selected: boolean;
  onPress: () => void;
  /** Tek seçimli gruplarda `radio` semantiği ekran okuyucuya bildirilir. */
  singleSelect?: boolean;
  /** Kapsül biçimi (harita katmanları, bölge filtreleri). */
  pill?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * Seçilebilir etiket. Seçili durumda yalnızca renk değil, ekran okuyucuya
 * `selected` durumu da bildirilir — renk tek başına anlam taşımaz.
 */
export function Chip({
  label,
  icon,
  selected,
  onPress,
  singleSelect = false,
  pill = false,
  style,
}: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole={singleSelect ? 'radio' : 'checkbox'}
      accessibilityState={{ selected, checked: selected }}
      accessibilityLabel={label}
      style={({ pressed }) => [
        styles.base,
        pill && styles.pill,
        {
          backgroundColor: selected ? colors.primaryTint : 'transparent',
          borderColor: selected ? colors.primary : colors.border,
        },
        pressed && styles.pressed,
        style,
      ]}
    >
      <AppText
        variant="bodyStrong"
        color={selected ? colors.primaryInk : colors.inkSoft}
        style={pill ? styles.pillLabel : undefined}
      >
        {icon ? `${icon} ` : ''}
        {label}
      </AppText>
    </Pressable>
  );
}

/** Chip'leri sarmalayan akışkan satır. */
export function ChipGroup({
  children,
  role = 'radiogroup',
  style,
}: {
  children: React.ReactNode;
  role?: 'radiogroup' | 'none';
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      style={[styles.group, style]}
      accessibilityRole={role === 'radiogroup' ? 'radiogroup' : undefined}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: minTouchTarget - 8,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg + 1,
    borderRadius: radius.xl,
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
  },
  pill: {
    borderRadius: radius.pill,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    minHeight: 34,
  },
  pillLabel: { fontSize: 11 },
  pressed: { opacity: 0.75 },
  group: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
});
