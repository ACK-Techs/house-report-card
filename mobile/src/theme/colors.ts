/**
 * Ev Karnesi renk paleti.
 *
 * Değerler "Ev Karnesi v2" prototipinden birebir çıkarılmıştır. Ürün ilkesi
 * gereği renk tek başına anlam taşımaz: her semantik renk mutlaka bir metin
 * etiketi veya ikonla birlikte kullanılır.
 */
export const colors = {
  /** Uygulama dışı çerçeve / cihaz zemini */
  canvas: '#EDE9E1',
  /** Ekran zemini */
  background: '#FAF8F5',
  /** Kart, sheet ve modal yüzeyi */
  surface: '#FFFFFF',
  /** İkincil nötr yüzey (segment kontrol, pasif rozet) */
  surfaceMuted: '#F2EFE9',
  /** Harita zemini */
  surfaceMap: '#EFEDE7',

  border: '#E7E2DA',
  borderStrong: '#D3CFC6',
  borderDashed: '#97A19A',

  /** Birincil metin */
  ink: '#14201C',
  /** Gövde metni */
  inkSoft: '#3C4741',
  /** Yardımcı metin */
  textSecondary: '#55605A',
  /** Meta / placeholder */
  textMuted: '#6C776F',

  /** Marka yeşili */
  primary: '#1B5E4A',
  primaryDark: '#16503F',
  primaryDeep: '#123B2F',
  primaryInk: '#14392E',
  primaryTint: '#DEEDE6',
  primaryOnDark: '#9CCBB9',

  /** Olumlu / düşük risk */
  positive: '#2E7D5B',
  positiveText: '#1F6549',
  positiveBg: '#EFF7F1',
  positiveBgAlt: '#F1F7F3',
  positiveBorder: '#BFE3D0',
  positiveBorderAlt: '#C9E2D7',
  positiveBright: '#5FB894',
  positiveGlow: '#4FA88A',
  positiveSoft: '#E8F2ED',
  positiveSofter: '#DCF0E4',

  /** Orta dikkat / incele */
  caution: '#A96A16',
  cautionText: '#8A5412',
  cautionBg: '#FBF5E7',
  cautionBorder: '#EBD6A6',
  /** Uyarı callout kutusu (sol şeritli) */
  calloutBar: '#C98A29',
  calloutBg: '#F7EBD3',
  calloutText: '#6E4310',

  /** Yüksek risk / yıkıcı eylem */
  danger: '#B4402C',
  dangerText: '#9B3524',
  dangerTextDeep: '#7E2A1C',
  dangerBg: '#FBEDE8',
  dangerBorder: '#EDCFC6',

  /** Koyu yüzeyler (rapor hero, toast, harita HUD) */
  inkSurface: '#14201C',
  overlay: 'rgba(20,32,28,0.60)',
  overlayStrong: 'rgba(20,32,28,0.75)',

  white: '#FFFFFF',
} as const;

export type ColorToken = keyof typeof colors;

/** Skor eşiklerinden semantik ton. Renk her zaman metinle birlikte sunulur. */
export type ScoreTone = 'positive' | 'caution' | 'neutral';

export function toneForScore(score: number | null | undefined): ScoreTone {
  if (score === null || score === undefined) return 'neutral';
  if (score >= 75) return 'positive';
  if (score >= 60) return 'caution';
  return 'neutral';
}

export const tonePalette: Record<ScoreTone, { bg: string; border: string; text: string }> = {
  positive: {
    bg: colors.positiveBg,
    border: colors.positiveBorder,
    text: colors.positiveText,
  },
  caution: {
    bg: colors.cautionBg,
    border: colors.cautionBorder,
    text: colors.cautionText,
  },
  neutral: {
    bg: colors.surfaceMuted,
    border: colors.borderStrong,
    text: colors.textSecondary,
  },
};
