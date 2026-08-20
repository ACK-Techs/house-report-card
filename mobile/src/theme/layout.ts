/** 4px tabanlı ızgara. Prototipteki tüm boşluklar bu ölçekten türer. */
export const spacing = {
  xxs: 4,
  xs: 6,
  sm: 8,
  md: 10,
  lg: 12,
  xl: 14,
  xxl: 16,
  x20: 20,
  x24: 24,
  x26: 26,
} as const;

export const radius = {
  xs: 7,
  sm: 9,
  md: 11,
  lg: 12,
  xl: 14,
  x18: 18,
  x20: 20,
  x24: 24,
  x28: 28,
  pill: 9999,
} as const;

/** Ekran gövdesi yatay iç boşluğu (prototipte 20px). */
export const screenPaddingX = 20;

/** Erişilebilirlik: her dokunmatik hedef en az 44x44pt. */
export const minTouchTarget = 44;

/**
 * Görsel olarak küçük ama dokunmatik alanı 44pt'a tamamlanması gereken
 * kontroller için hitSlop üretir.
 */
export function hitSlopFor(size: number) {
  const pad = Math.max(0, Math.round((minTouchTarget - size) / 2));
  return { top: pad, bottom: pad, left: pad, right: pad };
}
