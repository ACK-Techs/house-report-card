import { Pressable, StyleSheet, Switch, View } from 'react-native';

import { colors, hitSlopFor, minTouchTarget, spacing } from '@/theme';

import { AppText } from './AppText';

interface CheckboxProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  /** Etiketin ikinci satırı. */
  description?: string;
}

/** Onay kutusu. Etiketin tamamı dokunma hedefidir. */
export function Checkbox({ checked, onChange, label, description }: CheckboxProps) {
  return (
    <Pressable
      onPress={() => onChange(!checked)}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      accessibilityLabel={description ? `${label}. ${description}` : label}
      style={({ pressed }) => [styles.checkboxRow, pressed && styles.pressed]}
    >
      <View style={[styles.box, checked && styles.boxChecked]}>
        {checked ? (
          <AppText variant="badge" color={colors.white}>
            ✓
          </AppText>
        ) : null}
      </View>
      <View style={styles.checkboxText}>
        <AppText variant="caption" color={colors.textSecondary}>
          {label}
        </AppText>
        {description ? (
          <AppText variant="caption" color={colors.textMuted}>
            {description}
          </AppText>
        ) : null}
      </View>
    </Pressable>
  );
}

interface SwitchRowProps {
  label: string;
  description?: string;
  value: boolean;
  onChange: (value: boolean) => void;
  last?: boolean;
}

/** Ayarlar ekranındaki açık/kapalı satırı. */
export function SwitchRow({ label, description, value, onChange, last = false }: SwitchRowProps) {
  return (
    <View style={[styles.switchRow, !last && styles.border]}>
      <View style={styles.switchText}>
        <AppText variant="captionStrong" color={colors.ink} style={styles.switchLabel}>
          {label}
        </AppText>
        {description ? (
          <AppText variant="caption" color={colors.textMuted}>
            {description}
          </AppText>
        ) : null}
      </View>
      <Switch
        value={value}
        onValueChange={onChange}
        accessibilityLabel={label}
        hitSlop={hitSlopFor(32)}
        trackColor={{ false: colors.borderStrong, true: colors.primary }}
        thumbColor={colors.white}
        ios_backgroundColor={colors.borderStrong}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm + 1,
    minHeight: minTouchTarget,
    paddingVertical: spacing.sm,
  },
  box: {
    width: 18,
    height: 18,
    marginTop: 1,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxChecked: { backgroundColor: colors.primary, borderColor: colors.primary },
  checkboxText: { flex: 1 },
  pressed: { opacity: 0.7 },
  switchRow: {
    minHeight: minTouchTarget,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.lg,
    paddingVertical: spacing.md,
  },
  switchText: { flex: 1 },
  switchLabel: { fontSize: 12 },
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.surfaceMuted,
  },
});
