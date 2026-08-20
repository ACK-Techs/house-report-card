import { useEffect, useRef, type ReactNode } from 'react';
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { colors, radius, shadows, spacing } from '@/theme';

import { AppText } from './AppText';

interface AccordionProps {
  /** Sol taraftaki ikon kutusu (rapor eksenleri). */
  icon?: string;
  iconBackground?: string;
  title: string;
  summary?: string;
  /** Sağ üstteki skor rozeti gibi ek içerik. */
  trailing?: ReactNode;
  expanded: boolean;
  onToggle: () => void;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

/** Açılır detay kartı. Ok işareti açılma durumuna göre döner. */
export function Accordion({
  icon,
  iconBackground = colors.positiveBg,
  title,
  summary,
  trailing,
  expanded,
  onToggle,
  children,
  style,
}: AccordionProps) {
  const rotation = useRef(new Animated.Value(expanded ? 1 : 0)).current;
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      rotation.setValue(expanded ? 1 : 0);
      return;
    }
    Animated.timing(rotation, {
      toValue: expanded ? 1 : 0,
      duration: 200,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [expanded, rotation]);

  const spin = rotation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });

  return (
    <View style={[styles.card, style]}>
      <Pressable
        onPress={onToggle}
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        accessibilityLabel={summary ? `${title}. ${summary}` : title}
        accessibilityHint={expanded ? 'Detayları gizlemek için dokunun' : 'Detayları görmek için dokunun'}
        style={({ pressed }) => [styles.header, pressed && styles.pressed]}
      >
        <View style={styles.headerLeft}>
          {icon ? (
            <View style={[styles.iconBox, { backgroundColor: iconBackground }]}>
              <AppText style={styles.icon}>{icon}</AppText>
            </View>
          ) : null}
          <View style={styles.headerText}>
            <AppText variant="bodyStrong">{title}</AppText>
            {summary ? (
              <AppText variant="caption" color={colors.textMuted} style={styles.summary}>
                {summary}
              </AppText>
            ) : null}
          </View>
        </View>
        <View style={styles.headerRight}>
          {trailing}
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <AppText variant="badge" color={colors.textMuted}>
              ▼
            </AppText>
          </Animated.View>
        </View>
      </Pressable>

      {expanded ? <View style={styles.body}>{children}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    borderRadius: radius.x20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    ...shadows.flat,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    padding: spacing.xl,
  },
  pressed: { backgroundColor: colors.background },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, flex: 1 },
  headerText: { flex: 1 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  iconBox: {
    width: 34,
    height: 34,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { fontSize: 16, lineHeight: 20 },
  summary: { marginTop: 2 },
  body: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    paddingTop: spacing.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.surfaceMuted,
  },
});
