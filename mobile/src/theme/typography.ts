import { Platform, type TextStyle } from 'react-native';

/**
 * Prototip iki aile kullanır: başlıklar için Outfit, gövde ve veri metni için
 * IBM Plex Sans, sayısal göstergeler için IBM Plex Mono (tabular rakamlar).
 */
export const fonts = {
  displayRegular: 'Outfit_400Regular',
  displayMedium: 'Outfit_500Medium',
  displaySemibold: 'Outfit_600SemiBold',
  displayBold: 'Outfit_700Bold',
  displayBlack: 'Outfit_800ExtraBold',

  bodyRegular: 'IBMPlexSans_400Regular',
  bodyMedium: 'IBMPlexSans_500Medium',
  bodySemibold: 'IBMPlexSans_600SemiBold',
  bodyBold: 'IBMPlexSans_700Bold',

  monoMedium: 'IBMPlexMono_500Medium',
  monoSemibold: 'IBMPlexMono_600SemiBold',
} as const;

/** Sayısal göstergelerde rakam genişliğini sabitler. */
export const tabularNumbers: TextStyle = Platform.select<TextStyle>({
  ios: { fontVariant: ['tabular-nums'] },
  default: {},
}) as TextStyle;

export const type = {
  /** Karşılama başlığı */
  hero: {
    fontFamily: fonts.displayBlack,
    fontSize: 26,
    lineHeight: 32,
    letterSpacing: -0.6,
  },
  /** Ekran içi büyük başlık */
  title: {
    fontFamily: fonts.displayBlack,
    fontSize: 21,
    lineHeight: 27,
    letterSpacing: -0.4,
  },
  /** Header çubuğu başlığı */
  navTitle: {
    fontFamily: fonts.displaySemibold,
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: -0.2,
  },
  /** Kart başlığı */
  cardTitle: {
    fontFamily: fonts.displayBold,
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.2,
  },
  /** Bölüm başlığı */
  section: {
    fontFamily: fonts.displaySemibold,
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  /** Liste öğesi başlığı */
  itemTitle: { fontFamily: fonts.bodyBold, fontSize: 14, lineHeight: 19 },
  /** Gövde */
  body: { fontFamily: fonts.bodyRegular, fontSize: 13, lineHeight: 20 },
  bodyStrong: { fontFamily: fonts.bodySemibold, fontSize: 13, lineHeight: 18 },
  /** Yardımcı metin */
  caption: { fontFamily: fonts.bodyRegular, fontSize: 11, lineHeight: 16 },
  captionStrong: { fontFamily: fonts.bodySemibold, fontSize: 11, lineHeight: 15 },
  /** Rozet / mikro etiket */
  badge: { fontFamily: fonts.bodyBold, fontSize: 10, lineHeight: 14 },
  /** Buton etiketi */
  button: { fontFamily: fonts.displaySemibold, fontSize: 14, letterSpacing: 0.1 },
  /** Sayısal gösterge */
  metric: { fontFamily: fonts.monoSemibold, fontSize: 17, ...tabularNumbers },
  metricSmall: { fontFamily: fonts.monoSemibold, fontSize: 11, ...tabularNumbers },
} satisfies Record<string, TextStyle>;
