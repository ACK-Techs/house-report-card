import { useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';

import { colors, minTouchTarget, radius, shadows, spacing } from '@/theme';

import { AppText } from './AppText';

interface TextFieldProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  /** Girdi solundaki dekoratif ikon. */
  icon?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export function TextField({ label, icon, containerStyle, ...inputProps }: TextFieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={containerStyle}>
      {label ? (
        <AppText variant="bodyStrong" style={styles.label}>
          {label}
        </AppText>
      ) : null}
      <View style={[styles.inputWrap, focused && styles.inputFocused]}>
        {icon ? <AppText style={styles.icon}>{icon}</AppText> : null}
        <TextInput
          accessibilityLabel={label}
          placeholderTextColor={colors.textMuted}
          {...inputProps}
          onFocus={(e) => {
            setFocused(true);
            inputProps.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            inputProps.onBlur?.(e);
          }}
          style={styles.input}
        />
      </View>
    </View>
  );
}

interface SelectFieldProps {
  label?: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

/**
 * Basit tek seçimli açılır liste. Platform `Picker` bağımlılığı eklemek yerine
 * tasarımın köşe/renk diline uyan bir modal listesi kullanılır.
 */
export function SelectField({
  label,
  value,
  options,
  onChange,
  containerStyle,
}: SelectFieldProps) {
  const [open, setOpen] = useState(false);

  return (
    <View style={containerStyle}>
      {label ? (
        <AppText variant="captionStrong" color={colors.ink} style={styles.label}>
          {label}
        </AppText>
      ) : null}
      <Pressable
        onPress={() => setOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={label ? `${label}: ${value}` : value}
        accessibilityHint="Seçenekleri açmak için dokunun"
        style={({ pressed }) => [styles.inputWrap, styles.select, pressed && styles.pressed]}
      >
        <AppText variant="bodyStrong" numberOfLines={1} style={styles.selectValue}>
          {value}
        </AppText>
        <AppText variant="badge" color={colors.textMuted}>
          ▼
        </AppText>
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <Pressable style={styles.sheet} onPress={() => undefined}>
            {label ? (
              <AppText variant="cardTitle" style={styles.sheetTitle}>
                {label}
              </AppText>
            ) : null}
            {options.map((option) => {
              const selected = option === value;
              return (
                <Pressable
                  key={option}
                  accessibilityRole="radio"
                  accessibilityState={{ selected }}
                  onPress={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                  style={({ pressed }) => [
                    styles.option,
                    selected && styles.optionSelected,
                    pressed && styles.pressed,
                  ]}
                >
                  <AppText
                    variant="bodyStrong"
                    color={selected ? colors.primaryInk : colors.inkSoft}
                  >
                    {option}
                  </AppText>
                  {selected ? (
                    <AppText variant="bodyStrong" color={colors.primary}>
                      ✓
                    </AppText>
                  ) : null}
                </Pressable>
              );
            })}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  label: { marginBottom: spacing.xs },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    minHeight: minTouchTarget,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.xl,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  inputFocused: { borderColor: colors.primary },
  select: { justifyContent: 'space-between' },
  selectValue: { flex: 1 },
  icon: { fontSize: 14, opacity: 0.5 },
  input: {
    flex: 1,
    paddingVertical: spacing.lg,
    fontSize: 14,
    fontFamily: 'IBMPlexSans_400Regular',
    color: colors.ink,
  },
  pressed: { opacity: 0.7 },
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: colors.overlay,
  },
  sheet: {
    padding: spacing.x20,
    paddingBottom: spacing.x26 + spacing.x20,
    borderTopLeftRadius: radius.x28,
    borderTopRightRadius: radius.x24,
    backgroundColor: colors.surface,
    ...shadows.sheet,
  },
  sheetTitle: { marginBottom: spacing.lg },
  option: {
    minHeight: minTouchTarget,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    borderRadius: radius.xl,
  },
  optionSelected: { backgroundColor: colors.primaryTint },
});
