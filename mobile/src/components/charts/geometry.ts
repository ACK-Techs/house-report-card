/** Radar/pentagon grafiklerinde ortak köşe hesabı. */

export interface Point {
  x: number;
  y: number;
}

/**
 * Merkezden başlayarak saat 12 yönünden itibaren eşit açılı köşeler üretir.
 *
 * @param count Köşe sayısı
 * @param radius Merkezden köşeye uzaklık
 * @param center Merkez noktası
 */
export function polygonPoints(count: number, radius: number, center: Point): Point[] {
  const step = (Math.PI * 2) / count;
  return Array.from({ length: count }, (_, index) => {
    const angle = -Math.PI / 2 + index * step;
    return {
      x: center.x + Math.cos(angle) * radius,
      y: center.y + Math.sin(angle) * radius,
    };
  });
}

/** Her eksen için ayrı yarıçap kullanarak veri poligonu üretir. */
export function dataPolygon(
  values: number[],
  maxRadius: number,
  center: Point,
  maxValue = 100,
): Point[] {
  const step = (Math.PI * 2) / values.length;
  return values.map((value, index) => {
    const angle = -Math.PI / 2 + index * step;
    const ratio = Math.max(0, Math.min(1, value / maxValue));
    return {
      x: center.x + Math.cos(angle) * maxRadius * ratio,
      y: center.y + Math.sin(angle) * maxRadius * ratio,
    };
  });
}

export function toPointsAttr(points: Point[]): string {
  return points.map((p) => `${round(p.x)},${round(p.y)}`).join(' ');
}

function round(value: number): number {
  return Math.round(value * 10) / 10;
}
