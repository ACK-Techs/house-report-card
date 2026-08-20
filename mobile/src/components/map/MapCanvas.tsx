import { useState } from 'react';
import { LayoutChangeEvent, Pressable, StyleSheet, View } from 'react-native';
import Svg, { Line } from 'react-native-svg';

import { buildingFootprints } from '@/data/buildings';
import { colors, radius } from '@/theme';

import { AppText } from '../ui/AppText';

/**
 * Şematik harita yüzeyi.
 *
 * Gerçek kartografi yerine prototipin şematik gösterimi birebir taşınmıştır:
 * ızgara, cadde şeritleri, zemin sınıfı katmanı ve seçilebilir bina ayak
 * izleri. Konumlar 390x844'lük tasarım çerçevesine göre tanımlıdır ve kapsayıcı
 * genişliğine göre ölçeklenir.
 */

const DESIGN_WIDTH = 390;
const DESIGN_HEIGHT = 844;
const GRID_SIZE = 34;

interface MapCanvasProps {
  selectedId: string;
  onSelect: (id: string) => void;
  /** Zemin riski katmanının opaklığı (0-100). */
  layerOpacity: number;
  /** Zemin riski katmanı açık mı. */
  showGroundLayer: boolean;
}

export function MapCanvas({
  selectedId,
  onSelect,
  layerOpacity,
  showGroundLayer,
}: MapCanvasProps) {
  const [size, setSize] = useState({ width: DESIGN_WIDTH, height: DESIGN_HEIGHT });

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setSize({ width, height });
  };

  const scale = size.width / DESIGN_WIDTH;
  const s = (value: number) => value * scale;

  const columns = Math.ceil(size.width / (GRID_SIZE * scale));
  const rows = Math.ceil(size.height / (GRID_SIZE * scale));

  return (
    <View style={styles.canvas} onLayout={onLayout}>
      <Svg width={size.width} height={size.height} style={StyleSheet.absoluteFill}>
        {Array.from({ length: columns }, (_, index) => (
          <Line
            key={`v${index}`}
            x1={index * GRID_SIZE * scale}
            y1={0}
            x2={index * GRID_SIZE * scale}
            y2={size.height}
            stroke="rgba(28,26,20,0.06)"
            strokeWidth={1}
          />
        ))}
        {Array.from({ length: rows }, (_, index) => (
          <Line
            key={`h${index}`}
            x1={0}
            y1={index * GRID_SIZE * scale}
            x2={size.width}
            y2={index * GRID_SIZE * scale}
            stroke="rgba(28,26,20,0.06)"
            strokeWidth={1}
          />
        ))}
      </Svg>

      {/* Cadde şeritleri */}
      <View style={[styles.streetH, { top: s(238), height: s(26) }]} />
      <View style={[styles.streetH, { top: s(452), height: s(16) }]} />
      <View style={[styles.streetV, { left: s(150), width: s(24) }]} />

      {/* Zemin sınıfı katmanı */}
      {showGroundLayer ? (
        <View
          style={[
            styles.groundLayer,
            {
              top: s(150),
              left: s(24),
              width: s(104),
              height: s(78),
              opacity: layerOpacity / 100,
            },
          ]}
        >
          <AppText variant="badge" color={colors.positiveText} style={styles.groundLabel}>
            ZB · Kaya zemin
          </AppText>
        </View>
      ) : null}

      {/* Bina ayak izleri */}
      {buildingFootprints.map((building) => {
        const selected = building.id === selectedId;
        return (
          <Pressable
            key={building.id}
            onPress={() => onSelect(building.id)}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            accessibilityLabel={`${building.title}. ${building.meta}`}
            style={[
              styles.footprint,
              {
                top: s(building.frame.top),
                left: s(building.frame.left),
                width: s(building.frame.width),
                height: s(building.frame.height),
                borderColor: selected ? colors.primary : colors.borderStrong,
              },
            ]}
          >
            <AppText variant="badge" color={colors.inkSoft}>
              {building.shortLabel}
            </AppText>
          </Pressable>
        );
      })}

      {/* Raylı sistem istasyonu */}
      <View
        style={[styles.transitPin, { top: s(196), left: s(60) }]}
        accessible
        accessibilityLabel="Metro istasyonu"
      >
        <AppText variant="badge" color={colors.white}>
          🚇
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  canvas: { ...StyleSheet.absoluteFillObject, backgroundColor: colors.surfaceMap },
  streetH: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderStrong,
  },
  streetV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: colors.surface,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderStrong,
  },
  groundLayer: {
    position: 'absolute',
    justifyContent: 'flex-end',
    padding: 5,
    borderRadius: radius.xs,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.positiveBright,
    backgroundColor: 'rgba(46,125,91,0.14)',
  },
  groundLabel: { fontSize: 10 },
  footprint: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: colors.background,
  },
  transitPin: {
    position: 'absolute',
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: colors.white,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
