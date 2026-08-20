import { Platform, type ViewStyle } from 'react-native';

type Shadow = Pick<
  ViewStyle,
  'shadowColor' | 'shadowOffset' | 'shadowOpacity' | 'shadowRadius' | 'elevation'
>;

function shadow(opacity: number, radius: number, offsetY: number, elevation: number): Shadow {
  return Platform.select<Shadow>({
    android: { elevation },
    default: {
      shadowColor: '#1C1A14',
      shadowOffset: { width: 0, height: offsetY },
      shadowOpacity: opacity,
      shadowRadius: radius,
    },
  }) as Shadow;
}

export const shadows = {
  /** Kart yüzeyi — 0 4px 12px rgba(28,26,20,.05) */
  card: shadow(0.05, 12, 4, 2),
  /** Statik panel — 0 1px 2px rgba(28,26,20,.04) */
  flat: shadow(0.04, 2, 1, 1),
  /** Birincil buton — 0 6px 16px -8px rgba(20,32,28,.45) */
  button: shadow(0.22, 10, 6, 4),
  /** Harita üstündeki yüzen yüzeyler */
  floating: shadow(0.25, 14, 6, 8),
  /** Bottom sheet */
  sheet: shadow(0.2, 24, -10, 16),
  /** Toast / modal */
  overlay: shadow(0.4, 24, 12, 24),
} as const;
