import { View } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';

import { colors } from '@/theme';

import { dataPolygon, polygonPoints, toPointsAttr } from './geometry';

interface AreaGlyphProps {
  /** 0-100 arası bölge notu; poligonun doluluğunu belirler. */
  score: number;
  tone: 'primary' | 'positive' | 'caution';
  size?: number;
}

const CENTER = { x: 36, y: 34 };
const OUTER = 30;

const toneColors: Record<AreaGlyphProps['tone'], { fill: string; stroke: string }> = {
  primary: { fill: 'rgba(27,94,74,0.18)', stroke: colors.primary },
  positive: { fill: 'rgba(46,125,91,0.16)', stroke: colors.positive },
  caution: { fill: 'rgba(169,106,22,0.18)', stroke: colors.caution },
};

/**
 * Mahalle kartlarındaki küçük beşgen özet grafiği.
 * Dekoratiftir; skor her zaman yanındaki rozette sayı olarak da yer alır.
 */
export function AreaGlyph({ score, tone, size = 56 }: AreaGlyphProps) {
  const palette = toneColors[tone];
  const ratio = Math.max(0.35, Math.min(1, score / 100));
  const shape = dataPolygon(
    // Hafifçe düzensiz bir silüet için eksen değerleri skor etrafında salınır.
    [score, score * 0.94, score * 1.02, score * 0.9, score * 0.98],
    OUTER * ratio + OUTER * (1 - ratio) * 0.6,
    CENTER,
  );

  return (
    // Dekoratif: skoru zaten yanındaki rozet okur, çift okuma olmasın diye gizlenir.
    <View aria-hidden>
      <Svg width={size} height={size} viewBox="0 0 72 72">
        <Polygon
          points={toPointsAttr(polygonPoints(5, OUTER, CENTER))}
          fill="none"
          stroke={colors.border}
          strokeWidth={1}
        />
        <Polygon
          points={toPointsAttr(polygonPoints(5, OUTER * 0.55, CENTER))}
          fill="none"
          stroke={colors.surfaceMuted}
          strokeWidth={1}
        />
        <Polygon
          points={toPointsAttr(shape)}
          fill={palette.fill}
          stroke={palette.stroke}
          strokeWidth={1.5}
        />
      </Svg>
    </View>
  );
}
