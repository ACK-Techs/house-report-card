import { StyleSheet, View } from 'react-native';
import Svg, { Defs, LinearGradient, Line, Rect, Stop } from 'react-native-svg';

import { colors, radius, spacing } from '@/theme';

import { AppText } from '../ui/AppText';

/**
 * Bölge keşfi ekranındaki ısı haritası önizlemesi.
 *
 * Yumuşak lekeler yaşam kalitesi dağılımını temsil eder; kesin sınır veya
 * bina düzeyi bilgi taşımaz — bu nedenle kart içinde açıkça etiketlenir.
 */
export function AreaMapPreview({ label }: { label: string }) {
  return (
    <View style={styles.map}>
      <Svg style={StyleSheet.absoluteFill} width="100%" height="100%">
        {Array.from({ length: 14 }, (_, index) => (
          <Line
            key={`v${index}`}
            x1={index * 30}
            y1={0}
            x2={index * 30}
            y2={200}
            stroke="rgba(28,26,20,0.06)"
            strokeWidth={1}
          />
        ))}
        {Array.from({ length: 8 }, (_, index) => (
          <Line
            key={`h${index}`}
            x1={0}
            y1={index * 30}
            x2={400}
            y2={index * 30}
            stroke="rgba(28,26,20,0.06)"
            strokeWidth={1}
          />
        ))}
      </Svg>

      <View style={[styles.blob, styles.blobA]} />
      <View style={[styles.blob, styles.blobB]} />
      <View style={[styles.blob, styles.blobC]} />
      <View style={[styles.blob, styles.blobD]} />

      <View style={styles.boundary}>
        <AppText variant="captionStrong" color={colors.primaryDark}>
          {label}
        </AppText>
      </View>

      <View style={styles.legend}>
        <AppText variant="badge" color={colors.textMuted}>
          Yaşam kalitesi
        </AppText>
        <Svg width={34} height={6}>
          <Defs>
            <LinearGradient id="legendScale" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0" stopColor={colors.danger} />
              <Stop offset="0.5" stopColor={colors.caution} />
              <Stop offset="1" stopColor={colors.positive} />
            </LinearGradient>
          </Defs>
          <Rect x={0} y={0} width={34} height={6} rx={3} fill="url(#legendScale)" />
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    height: 200,
    overflow: 'hidden',
    borderRadius: radius.x20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMap,
  },
  blob: { position: 'absolute', borderRadius: 20 },
  blobA: {
    top: 22,
    left: 20,
    width: 130,
    height: 88,
    backgroundColor: 'rgba(46,125,91,0.30)',
  },
  blobB: {
    top: 74,
    left: 120,
    width: 150,
    height: 96,
    backgroundColor: 'rgba(169,106,22,0.26)',
  },
  blobC: {
    top: 20,
    left: 210,
    width: 120,
    height: 70,
    backgroundColor: 'rgba(46,125,91,0.20)',
  },
  blobD: {
    bottom: 16,
    left: 16,
    width: 96,
    height: 62,
    backgroundColor: 'rgba(180,64,44,0.20)',
  },
  boundary: {
    position: 'absolute',
    top: 18,
    left: 18,
    right: 18,
    bottom: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.primary,
    borderRadius: radius.x18,
    backgroundColor: 'rgba(27,94,74,0.06)',
  },
  legend: {
    position: 'absolute',
    right: spacing.sm,
    bottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 1,
    paddingVertical: 5,
    paddingHorizontal: spacing.sm + 1,
    borderRadius: radius.md,
    backgroundColor: 'rgba(255,255,255,0.92)',
  },
});
