import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, spacing } from '@/theme';

import { AppText } from './AppText';

interface SectionHeadingProps {
  title: string;
  /** Sağdaki "Tümü →" bağlantısı. */
  action?: { label: string; onPress?: () => void };
  style?: StyleProp<ViewStyle>;
}

export function SectionHeading({ title, action, style }: SectionHeadingProps) {
  return (
    <View style={[styles.row, style]}>
      <AppText variant="section" accessibilityRole="header">
        {title}
      </AppText>
      {action ? (
        action.onPress ? (
          <Pressable
            onPress={action.onPress}
            accessibilityRole="link"
            accessibilityLabel={action.label}
            hitSlop={10}
          >
            <AppText variant="captionStrong" color={colors.primary} style={styles.action}>
              {action.label}
            </AppText>
          </Pressable>
        ) : (
          <AppText variant="captionStrong" color={colors.textMuted} style={styles.action}>
            {action.label}
          </AppText>
        )
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  action: { fontSize: 12 },
});
