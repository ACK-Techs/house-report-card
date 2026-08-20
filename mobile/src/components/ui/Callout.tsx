import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, radius, spacing } from '@/theme';

import { AppText } from './AppText';

type CalloutVariant = 'warning' | 'info' | 'neutral';

interface CalloutProps {
  title?: string;
  /** Tek paragraf ya da madde listesi. */
  body: string | string[];
  variant?: CalloutVariant;
  icon?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * "Dikkat edilmesi gerekenler" / "Sorumluluk reddi" kutusu.
 * `warning` sol kenarında 3px belirteç şeridi taşır.
 */
export function Callout({ title, body, variant = 'warning', icon, style }: CalloutProps) {
  const lines = Array.isArray(body) ? body : [body];
  const isWarning = variant === 'warning';
  const isInfo = variant === 'info';

  const textColor = isWarning
    ? colors.calloutText
    : isInfo
      ? colors.primaryDeep
      : colors.textMuted;

  return (
    <View
      style={[
        styles.base,
        isWarning && styles.warning,
        isInfo && styles.info,
        variant === 'neutral' && styles.neutral,
        style,
      ]}
    >
      {title ? (
        <AppText
          variant="captionStrong"
          color={isWarning ? colors.calloutText : isInfo ? colors.primaryDark : colors.inkSoft}
          style={styles.title}
        >
          {icon ? `${icon} ` : ''}
          {title}
        </AppText>
      ) : null}
      {lines.map((line, index) => (
        <AppText key={line} variant="caption" color={textColor} style={index > 0 && styles.gap}>
          {lines.length > 1 ? '· ' : ''}
          {line}
        </AppText>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    padding: spacing.xl,
    borderRadius: radius.xl,
  },
  warning: {
    backgroundColor: colors.calloutBg,
    borderLeftWidth: 3,
    borderLeftColor: colors.calloutBar,
  },
  info: {
    backgroundColor: colors.positiveBgAlt,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.positiveBorderAlt,
    borderRadius: radius.x20,
  },
  neutral: {
    backgroundColor: colors.surfaceMuted,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderRadius: radius.x18,
  },
  title: { marginBottom: spacing.xxs },
  gap: { marginTop: spacing.xxs },
});
