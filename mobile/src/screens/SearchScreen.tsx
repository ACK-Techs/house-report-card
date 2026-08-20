import Slider from '@react-native-community/slider';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MapCanvas } from '@/components/map';
import { AppText, Badge, Button, Chip } from '@/components/ui';
import { findBuilding, mapLayers } from '@/data/buildings';
import type { MainTabParamList, RootStackParamList } from '@/navigation/types';
import { usePreferencesStore } from '@/store/usePreferencesStore';
import { useToast } from '@/store/useToastStore';
import { colors, fonts, radius, shadows, spacing } from '@/theme';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'SearchTab'>,
  NativeStackScreenProps<RootStackParamList>
>;

/** 04 — Bina arama ve harita seçimi. */
export function SearchScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const toast = useToast();
  const [query, setQuery] = useState('Caferağa Mah. Moda Cd.');

  const selections = usePreferencesStore((state) => state.selections);
  const toggleSelection = usePreferencesStore((state) => state.toggleSelection);
  const selectedBuildingId = usePreferencesStore((state) => state.selectedBuildingId);
  const selectBuilding = usePreferencesStore((state) => state.selectBuilding);
  const layerOpacity = usePreferencesStore((state) => state.layerOpacity);
  const setLayerOpacity = usePreferencesStore((state) => state.setLayerOpacity);

  const building = findBuilding(selectedBuildingId);

  return (
    <View style={styles.root}>
      <MapCanvas
        selectedId={selectedBuildingId}
        onSelect={selectBuilding}
        layerOpacity={layerOpacity}
        showGroundLayer={Boolean(selections.lGround)}
      />

      {/* Arama çubuğu ve katman filtreleri */}
      <View style={[styles.topBar, { top: insets.top + spacing.md }]}>
        <View style={styles.searchRow}>
          <Pressable
            onPress={() => navigation.navigate('HomeTab')}
            accessibilityRole="button"
            accessibilityLabel="Ana sayfaya dön"
            style={styles.roundButton}
          >
            <AppText variant="navTitle">←</AppText>
          </Pressable>
          <TextInput
            value={query}
            onChangeText={setQuery}
            accessibilityLabel="Adres arama"
            placeholder="İlçe, mahalle, cadde veya ada/parsel"
            placeholderTextColor={colors.textMuted}
            style={styles.searchInput}
          />
          <Pressable
            onPress={() => toast('GPS konumunuz bulundu')}
            accessibilityRole="button"
            accessibilityLabel="Konumumu kullan"
            style={[styles.roundButton, styles.gpsButton]}
          >
            <AppText variant="itemTitle" color={colors.primary}>
              🎯
            </AppText>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.layerRow}
        >
          {mapLayers.map((layer) => (
            <Chip
              key={layer.id}
              pill
              label={layer.label}
              icon={layer.icon}
              selected={Boolean(selections[layer.id])}
              onPress={() => toggleSelection(layer.id)}
              style={styles.layerChip}
            />
          ))}
        </ScrollView>
      </View>

      {/* Harita kontrolleri */}
      <View style={[styles.mapControls, { top: insets.top + 122 }]}>
        {(['+', '−', '3D'] as const).map((label) => (
          <Pressable
            key={label}
            accessibilityRole="button"
            accessibilityLabel={
              label === '+' ? 'Yakınlaştır' : label === '−' ? 'Uzaklaştır' : 'Üç boyutlu görünüm'
            }
            style={({ pressed }) => [styles.mapControl, pressed && styles.pressed]}
          >
            <AppText variant={label === '3D' ? 'badge' : 'navTitle'}>{label}</AppText>
          </Pressable>
        ))}
      </View>

      {/* Katman opaklığı HUD'u */}
      <View style={[styles.opacityHud, { bottom: 258 + insets.bottom }]}>
        <View style={styles.opacityHeader}>
          <AppText variant="badge" color={colors.textMuted}>
            Katman opaklığı
          </AppText>
          <AppText variant="metricSmall" color={colors.positiveGlow}>
            %{layerOpacity}
          </AppText>
        </View>
        <Slider
          value={layerOpacity}
          minimumValue={10}
          maximumValue={100}
          step={5}
          onValueChange={setLayerOpacity}
          minimumTrackTintColor={colors.positiveGlow}
          maximumTrackTintColor="rgba(255,255,255,0.18)"
          thumbTintColor={colors.positiveGlow}
          accessibilityLabel="Katman opaklığı"
          accessibilityValue={{ min: 10, max: 100, now: layerOpacity, text: `%${layerOpacity}` }}
          style={styles.opacitySlider}
        />
      </View>

      {/* Seçili bina kartı */}
      <View style={[styles.sheet, { bottom: spacing.xl }]}>
        <View style={styles.sheetHeader}>
          <View style={styles.thumbnail}>
            <AppText variant="badge" color={colors.textMuted} align="center">
              Bina{'\n'}görseli
            </AppText>
          </View>
          <View style={styles.sheetInfo}>
            <View style={styles.sheetTopRow}>
              <Badge label="🏠 Bina Düzeyi" />
              <AppText variant="metric" color={colors.primary} style={styles.sheetScore}>
                {building.score}
                <AppText variant="captionStrong" color={colors.textMuted}>
                  /100
                </AppText>
              </AppText>
            </View>
            <AppText variant="cardTitle" numberOfLines={1} style={styles.sheetTitle}>
              {building.title}
            </AppText>
            <AppText variant="caption" color={colors.textMuted}>
              {building.meta}
            </AppText>
          </View>
        </View>

        <View style={styles.factRow}>
          <Badge label="Zemin: Sağlam" tone="positive" style={styles.fact} />
          <Badge label="Metro: 4 dk" tone="positive" style={styles.fact} />
          <Badge label={`Yaş: ${building.year}`} tone="neutral" style={styles.fact} />
        </View>

        <Button
          label="Detaylı Raporu Gör →"
          onPress={() => navigation.navigate('ConfirmLocation', { buildingId: building.id })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.surfaceMap },

  topBar: { position: 'absolute', left: spacing.xl, right: spacing.xl, zIndex: 30 },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.x20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(226,232,240,0.9)',
    backgroundColor: 'rgba(255,255,255,0.95)',
    ...shadows.floating,
  },
  roundButton: {
    width: 32,
    height: 32,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gpsButton: { backgroundColor: colors.positiveBgAlt },
  searchInput: {
    flex: 1,
    minWidth: 0,
    paddingVertical: spacing.xs,
    fontFamily: fonts.bodySemibold,
    fontSize: 13,
    color: colors.ink,
  },
  layerRow: { gap: spacing.xs + 1, marginTop: spacing.sm + 1, paddingBottom: 2 },
  layerChip: { backgroundColor: 'rgba(255,255,255,0.92)', ...shadows.flat },

  mapControls: { position: 'absolute', right: spacing.xl, zIndex: 30, gap: spacing.xs + 1 },
  mapControl: {
    width: 38,
    height: 38,
    borderRadius: radius.xl,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.floating,
  },
  pressed: { opacity: 0.7 },

  opacityHud: {
    position: 'absolute',
    left: spacing.xl,
    zIndex: 30,
    width: 150,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.x18,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.14)',
    backgroundColor: 'rgba(20,32,28,0.88)',
  },
  opacityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  opacitySlider: { width: '100%', height: 28 },

  sheet: {
    position: 'absolute',
    left: spacing.xl,
    right: spacing.xl,
    zIndex: 40,
    padding: spacing.xl,
    borderRadius: radius.x24,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: 'rgba(255,255,255,0.97)',
    ...shadows.sheet,
  },
  sheetHeader: { flexDirection: 'row', gap: spacing.lg },
  thumbnail: {
    width: 56,
    height: 56,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.borderStrong,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetInfo: { flex: 1, minWidth: 0 },
  sheetTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  sheetScore: { fontSize: 15 },
  sheetTitle: { marginTop: spacing.xs, marginBottom: 2 },
  factRow: { flexDirection: 'row', gap: spacing.xs, marginVertical: spacing.lg },
  fact: { flex: 1, alignSelf: 'auto', alignItems: 'center' },
});
