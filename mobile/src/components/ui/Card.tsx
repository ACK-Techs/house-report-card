import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, radius, shadows, spacing } from '@/theme';

interface CardProps {
  children: ReactNode;
  /** Basılabilir kart; verilirse rol otomatik "button" olur. */
  onPress?: () => void;
  accessibilityLabel?: string;
  /** `flat` daha hafif gölge kullanır (statik bilgi panelleri). */
  elevation?: 'card' | 'flat' | 'none';
  padding?: number;
  style?: StyleProp<ViewStyle>;
}

/** Standart beyaz yüzey: 1px sınır, 20px köşe, hafif gölge. */
export function Card({
  children,
  onPress,
  accessibilityLabel,
  elevation = 'card',
  padding = spacing.xxl,
  style,
}: CardProps) {
  const base: StyleProp<ViewStyle> = [
    styles.card,
    { padding },
    elevation === 'card' ? shadows.card : elevation === 'flat' ? shadows.flat : {},
    style,
  ];

  if (!onPress) return <View style={base}>{children}</View>;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [base, pressed && styles.pressed]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.x20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  pressed: { borderColor: colors.borderStrong, opacity: 0.94 },
});
