import { StyleSheet, Text, type TextProps, type TextStyle } from 'react-native';

import { colors, type } from '@/theme';

type Variant = keyof typeof type;

export interface AppTextProps extends TextProps {
  variant?: Variant;
  color?: string;
  align?: TextStyle['textAlign'];
  /** Rakamları hizalı göstermek için mono aile. */
  numeric?: boolean;
}

/**
 * Uygulamadaki tüm metinlerin tek girişi. Ham `<Text>` kullanmak yerine bu
 * bileşen kullanılır; böylece tipografi ölçeği tek yerde tanımlı kalır.
 */
export function AppText({
  variant = 'body',
  color = colors.ink,
  align,
  style,
  ...rest
}: AppTextProps) {
  return <Text style={[type[variant] as TextStyle, { color, textAlign: align }, style]} {...rest} />;
}

export const textStyles = StyleSheet.create({
  center: { textAlign: 'center' },
});
