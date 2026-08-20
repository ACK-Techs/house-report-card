import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, minTouchTarget, radius, shadows, spacing } from '@/theme';

import { AppText } from './AppText';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'md' | 'sm';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: Variant;
  size?: Size;
  /** Satır içi butonlarda esneme oranı. */
  flex?: number;
  disabled?: boolean;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

const surfaces: Record<Variant, ViewStyle> = {
  primary: { backgroundColor: colors.primary, ...shadows.button },
  secondary: {
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  ghost: { backgroundColor: 'transparent' },
  danger: {
    backgroundColor: colors.dangerBg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.dangerBorder,
  },
};

const labelColors: Record<Variant, string> = {
  primary: colors.white,
  secondary: colors.inkSoft,
  ghost: colors.primary,
  danger: colors.dangerText,
};

/** Birincil eylem butonu. Basılı durumda hafif küçülme uygulanır. */
export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  flex,
  disabled = false,
  accessibilityLabel,
  style,
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        styles.base,
        size === 'sm' && styles.small,
        surfaces[variant],
        flex !== undefined && { flex },
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <AppText variant="button" color={labelColors[variant]} align="center">
        {label}
      </AppText>
    </Pressable>
  );
}

/** Butonları yatay dizen yardımcı. */
export function ButtonRow({ children }: { children: React.ReactNode }) {
  return <View style={styles.row}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    minHeight: minTouchTarget,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.x20,
    borderRadius: radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  small: { paddingVertical: spacing.md, paddingHorizontal: spacing.lg },
  pressed: { transform: [{ scale: 0.98 }], opacity: 0.92 },
  disabled: { opacity: 0.45 },
  row: { flexDirection: 'row', gap: spacing.md },
});
