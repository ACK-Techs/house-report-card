import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { colors, hitSlopFor, minTouchTarget, radius, screenPaddingX, spacing } from '@/theme';

import { AppText } from './AppText';

interface ScreenHeaderProps {
  title: string;
  onBack?: () => void;
  /** Sağ üstteki metin eylemi (ör. "Atla", "Kıyasla"). */
  action?: { label: string; onPress: () => void; accessibilityLabel?: string };
  /** Sağ üstteki ikon eylemi (ör. ayarlar). */
  iconAction?: { icon: string; onPress: () => void; accessibilityLabel: string };
  /** Başlığın altında gösterilen kırıntı yolu vb. */
  below?: ReactNode;
}

/** Ekranların sabit üst çubuğu. Geri butonu 44pt dokunma alanına tamamlanır. */
export function ScreenHeader({ title, onBack, action, iconAction, below }: ScreenHeaderProps) {
  const hasRight = Boolean(action ?? iconAction);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {onBack ? (
          <Pressable
            onPress={onBack}
            accessibilityRole="button"
            accessibilityLabel="Geri"
            hitSlop={hitSlopFor(36)}
            style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
          >
            <AppText variant="navTitle" color={colors.ink}>
              ←
            </AppText>
          </Pressable>
        ) : (
          <View style={styles.spacer} />
        )}

        <AppText
          variant="navTitle"
          align="center"
          numberOfLines={1}
          style={styles.title}
          accessibilityRole="header"
        >
          {title}
        </AppText>

        {action ? (
          <Pressable
            onPress={action.onPress}
            accessibilityRole="button"
            accessibilityLabel={action.accessibilityLabel ?? action.label}
            hitSlop={8}
            style={styles.textAction}
          >
            <AppText variant="bodyStrong" color={colors.primary}>
              {action.label}
            </AppText>
          </Pressable>
        ) : null}

        {iconAction ? (
          <Pressable
            onPress={iconAction.onPress}
            accessibilityRole="button"
            accessibilityLabel={iconAction.accessibilityLabel}
            hitSlop={hitSlopFor(36)}
            style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
          >
            <AppText variant="navTitle">{iconAction.icon}</AppText>
          </Pressable>
        ) : null}

        {!hasRight ? <View style={styles.spacer} /> : null}
      </View>
      {below}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: screenPaddingX,
    paddingVertical: spacing.xl,
    backgroundColor: colors.background,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  title: { flex: 1 },
  spacer: { width: 36 },
  textAction: {
    minHeight: minTouchTarget,
    justifyContent: 'center',
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: radius.xl,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { backgroundColor: colors.surfaceMuted, borderColor: colors.borderStrong },
});
