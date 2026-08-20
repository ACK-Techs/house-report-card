import { StyleSheet, View } from 'react-native';
import Svg, { Line } from 'react-native-svg';

import { colors, radius, spacing } from '@/theme';

import { AppText } from '../ui/AppText';

interface ConfirmMapProps {
  /** TKGM parsel kimliği. */
  parcel: string;
  /** Adres-parsel eşleşme güveni (%). */
  matchConfidence: number;
}

/** Konum doğrulama sayfasındaki parsel önizlemesi. */
export function ConfirmMap({ parcel, matchConfidence }: ConfirmMapProps) {
  return (
    <View style={styles.map}>
      <Svg style={StyleSheet.absoluteFill} width="100%" height="100%">
        {Array.from({ length: 16 }, (_, index) => (
          <Line
            key={`v${index}`}
            x1={index * 26}
            y1={0}
            x2={index * 26}
            y2={132}
            stroke="rgba(28,26,20,0.06)"
            strokeWidth={1}
          />
        ))}
        {Array.from({ length: 6 }, (_, index) => (
          <Line
            key={`h${index}`}
            x1={0}
            y1={index * 26}
            x2={400}
            y2={index * 26}
            stroke="rgba(28,26,20,0.06)"
            strokeWidth={1}
          />
        ))}
      </Svg>

      <View style={styles.parcel} />
      <View style={styles.pin}>
        <AppText variant="badge" color={colors.white}>
          📍
        </AppText>
      </View>

      <View style={styles.parcelTag}>
        <AppText variant="badge" color={colors.background}>
          TKGM Parsel: {parcel}
        </AppText>
      </View>
      <View style={styles.confidenceTag}>
        <AppText variant="badge" color={colors.positiveText}>
          %{matchConfidence} Eşleşme Güveni
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    height: 132,
    overflow: 'hidden',
    borderRadius: radius.x20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMap,
  },
  parcel: {
    position: 'absolute',
    top: 26,
    left: 96,
    width: 110,
    height: 80,
    borderWidth: 2,
    borderColor: colors.positive,
    borderRadius: radius.xs,
    backgroundColor: 'rgba(46,125,91,0.12)',
  },
  pin: {
    position: 'absolute',
    top: 60,
    left: 145,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.white,
    backgroundColor: colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
  },
  parcelTag: {
    position: 'absolute',
    left: spacing.sm,
    bottom: spacing.sm,
    paddingVertical: spacing.xxs,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.sm,
    backgroundColor: 'rgba(20,32,28,0.82)',
  },
  confidenceTag: {
    position: 'absolute',
    right: spacing.sm,
    top: spacing.sm,
    paddingVertical: spacing.xxs,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.positiveBorder,
    backgroundColor: 'rgba(236,253,245,0.94)',
  },
});
