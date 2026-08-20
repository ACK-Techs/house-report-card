import { Pressable, StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '@/theme';

import { AppText } from './AppText';

interface OptionCardProps {
  icon: string;
  label: string;
  description?: string;
  selected: boolean;
  onPress: () => void;
}

/** Açıklamalı, tam genişlikte tek seçimli kart (anket 2. adım). */
export function OptionCard({ icon, label, description, selected, onPress }: OptionCardProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected, checked: selected }}
      accessibilityLabel={description ? `${label}. ${description}` : label}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: selected ? colors.primaryTint : 'transparent',
          borderColor: selected ? colors.primary : colors.border,
        },
        pressed && styles.pressed,
      ]}
    >
      <AppText variant="cardTitle" style={styles.icon}>
        {icon}
      </AppText>
      <View style={styles.body}>
        <AppText variant="itemTitle" color={selected ? colors.primaryInk : colors.inkSoft}>
          {label}
        </AppText>
        {description ? (
          <AppText variant="caption" color={colors.textMuted} style={styles.description}>
            {description}
          </AppText>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.xl,
    borderWidth: StyleSheet.hairlineWidth,
  },
  icon: { fontSize: 18, lineHeight: 22 },
  body: { flex: 1 },
  description: { marginTop: 2 },
  pressed: { opacity: 0.8 },
});
