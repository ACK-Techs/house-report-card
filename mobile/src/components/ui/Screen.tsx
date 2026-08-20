import type { ReactNode } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  type ScrollViewProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, screenPaddingX, spacing } from '@/theme';

interface ScreenProps extends Pick<ScrollViewProps, 'stickyHeaderIndices' | 'onScroll'> {
  children: ReactNode;
  /** Sabit üst başlık; kaydırma alanının dışında kalır. */
  header?: ReactNode;
  /** Kaydırma kapatılırsa içerik tam ekran yerleşir (harita ekranları). */
  scroll?: boolean;
  padded?: boolean;
  background?: string;
  contentStyle?: StyleProp<ViewStyle>;
  /** Alt sekme çubuğunun üzerine ek boşluk bırakır. */
  bottomInset?: number;
}

/**
 * Ekran iskeleti: güvenli alan, zemin rengi ve standart iç boşluk.
 * Alt sekme çubuğu React Navigation tarafından yönetildiği için burada
 * yalnızca içerik alanının alt boşluğu ayarlanır.
 */
export function Screen({
  children,
  header,
  scroll = true,
  padded = true,
  background = colors.background,
  contentStyle,
  bottomInset = spacing.x26,
  ...scrollProps
}: ScreenProps) {
  const insets = useSafeAreaInsets();

  const body = (
    <View
      style={[
        padded && { paddingHorizontal: screenPaddingX, paddingTop: spacing.xxl },
        contentStyle,
      ]}
    >
      {children}
    </View>
  );

  return (
    <View style={[styles.root, { backgroundColor: background }]}>
      {header}
      {scroll ? (
        <ScrollView
          style={styles.flex}
          contentContainerStyle={{ paddingBottom: bottomInset + insets.bottom }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          {...scrollProps}
        >
          {body}
        </ScrollView>
      ) : (
        <View style={styles.flex}>{children}</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  flex: { flex: 1 },
});
