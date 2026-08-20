import { View } from 'react-native';
import Svg, { Circle, Polygon, Text as SvgText } from 'react-native-svg';

import { colors, fonts } from '@/theme';

import { dataPolygon, polygonPoints, toPointsAttr } from './geometry';

interface RadarChartProps {
  axes: { label: string; value: number }[];
  width?: number;
  height?: number;
}

const VIEW = { width: 220, height: 210 };
const CENTER = { x: 110, y: 97 };
const OUTER_RADIUS = 72;

/**
 * 5 eksenli öncelik örtüşme grafiği.
 *
 * Halkalar ilçe ortalamasını temsil eden referans ızgarasıdır; dolu poligon
 * bu binanın eksen notlarıdır. Değerler grafikte ayrıca metin olarak yazılır,
 * böylece bilgi yalnızca şekle bağlı kalmaz.
 */
export function RadarChart({ axes, width = 170, height = 162 }: RadarChartProps) {
  const count = axes.length;
  const grid = [1, 0.66, 0.33].map((scale) =>
    toPointsAttr(polygonPoints(count, OUTER_RADIUS * scale, CENTER)),
  );
  const values = axes.map((axis) => axis.value);
  const dataPoints = dataPolygon(values, OUTER_RADIUS, CENTER);
  const labelPoints = polygonPoints(count, OUTER_RADIUS + 22, CENTER);

  const summary = axes.map((axis) => `${axis.label} ${axis.value}`).join(', ');

  return (
    <View accessible accessibilityLabel={`Eksen notları: ${summary}`}>
      <Svg width={width} height={height} viewBox={`0 0 ${VIEW.width} ${VIEW.height}`}>
        <Polygon
          points={grid[0]}
          fill={colors.background}
          stroke={colors.border}
          strokeWidth={1}
        />
        {grid.slice(1).map((points) => (
          <Polygon key={points} points={points} fill="none" stroke={colors.border} strokeWidth={1} />
        ))}

        <Polygon
          points={toPointsAttr(dataPoints)}
          fill="rgba(27,94,74,0.16)"
          stroke={colors.primary}
          strokeWidth={2}
        />
        {dataPoints.map((point, index) => (
          <Circle
            key={axes[index]?.label ?? index}
            cx={point.x}
            cy={point.y}
            r={3}
            fill={colors.primary}
          />
        ))}

        {axes.map((axis, index) => {
          const point = labelPoints[index];
          if (!point) return null;
          return (
            <SvgText
              key={axis.label}
              x={point.x}
              y={point.y}
              textAnchor="middle"
              fill={colors.textSecondary}
              fontSize={10}
              fontFamily={fonts.bodyBold}
            >
              {`${axis.label} ${axis.value}`}
            </SvgText>
          );
        })}
      </Svg>
    </View>
  );
}
