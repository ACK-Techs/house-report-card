import { useEffect, useRef } from 'react';
import { AccessibilityInfo, Animated, Easing, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useToastStore } from '@/store/useToastStore';
import { colors, radius, screenPaddingX, shadows, spacing } from '@/theme';

import { AppText } from './AppText';

/**
 * Uygulama genelinde tek toast. Navigasyon ağacının üstünde render edilir,
 * böylece ekran değişse de konumu sabit kalır.
 */
export function ToastHost() {
  const message = useToastStore((state) => state.message);
  const insets = useSafeAreaInsets();
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(8)).current;

  useEffect(() => {
    if (message) {
      AccessibilityInfo.announceForAccessibility(message);
    }
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: message ? 1 : 0,
        duration: 180,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: message ? 0 : 8,
        duration: 180,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, [message, opacity, translateY]);

  if (!message) return null;

  return (
    <Animated.View
      pointerEvents="none"
      accessibilityLiveRegion="polite"
      style={[
        styles.toast,
        { bottom: insets.bottom + 84, opacity, transform: [{ translateY }] },
      ]}
    >
      <AppText variant="captionStrong" color={colors.background} style={styles.icon}>
        ✓
      </AppText>
      <AppText variant="captionStrong" color={colors.background} style={styles.message}>
        {message}
      </AppText>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    left: screenPaddingX,
    right: screenPaddingX,
    zIndex: 95,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm + 1,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.x18,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.14)',
    backgroundColor: 'rgba(20,32,28,0.94)',
    ...shadows.overlay,
  },
  icon: { fontSize: 13 },
  message: { flex: 1, fontSize: 12 },
});
