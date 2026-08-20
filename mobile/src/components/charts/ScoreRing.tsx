import { View } from 'react-native';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';

import { colors, fonts } from '@/theme';

interface ScoreRingProps {
  score: number;
  /** Skorun harf karşılığı (ör. "A− Güçlü Denge"). */
  grade: string;
  size?: number;
  max?: number;
}

const RADIUS = 66;
const STROKE = 13;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** Rapor hero alanındaki dairesel uyum skoru göstergesi. */
export function ScoreRing({ score, grade, size = 126, max = 100 }: ScoreRingProps) {
  const ratio = Math.max(0, Math.min(1, score / max));
  const dashOffset = CIRCUMFERENCE * (1 - ratio);

  return (
    <View accessible accessibilityLabel={`Kişisel uyum skoru ${score}, ${max} üzerinden. ${grade}`}>
      <Svg width={size} height={size} viewBox="0 0 160 160">
        <Circle
          cx={80}
          cy={80}
          r={RADIUS}
          fill="none"
          stroke="rgba(255,255,255,0.10)"
          strokeWidth={STROKE}
        />
        <Circle
          cx={80}
          cy={80}
          r={RADIUS}
          fill="none"
          stroke={colors.positiveGlow}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          transform="rotate(-90 80 80)"
        />
        <SvgText
          x={80}
          y={74}
          textAnchor="middle"
          fill={colors.white}
          fontSize={40}
          fontFamily={fonts.monoSemibold}
        >
          {String(score)}
        </SvgText>
        <SvgText
          x={80}
          y={94}
          textAnchor="middle"
          fill={colors.borderDashed}
          fontSize={12}
          fontFamily={fonts.bodySemibold}
        >
          {`/ ${max}`}
        </SvgText>
        <SvgText
          x={80}
          y={116}
          textAnchor="middle"
          fill={colors.primaryOnDark}
          fontSize={13}
          fontFamily={fonts.bodyBold}
        >
          {grade}
        </SvgText>
      </Svg>
    </View>
  );
}
