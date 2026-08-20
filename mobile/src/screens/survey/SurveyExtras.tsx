import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText, Badge, Card, SelectField, SliderRow } from '@/components/ui';
import { regionOptions, sensitivityLabels } from '@/data/survey';
import { usePreferencesStore } from '@/store/usePreferencesStore';
import { colors, radius, spacing } from '@/theme';

/** Adım 2 — afet hassasiyet ağırlığı sürgüsü. */
export function SensitivitySlider() {
  const sensitivity = usePreferencesStore((state) => state.sensitivity);
  const setSensitivity = usePreferencesStore((state) => state.setSensitivity);

  return (
    <View style={styles.sensitivity}>
      <SliderRow
        label="Afet hassasiyet ağırlığı"
        valueLabel={sensitivityLabels[sensitivity] ?? ''}
        value={sensitivity}
        minimum={1}
        maximum={5}
        step={1}
        onChange={setSensitivity}
        bounds={['Düşük', 'Hayati Önem']}
        labelColor={colors.ink}
      />
    </View>
  );
}

/** Adım 5 — öncelikli bölge kaskadı (il → ilçe → mahalle). */
export function RegionPicker() {
  const [city, setCity] = useState<string>(regionOptions.cities[0]);
  const [district, setDistrict] = useState<string>(regionOptions.districts[0]);
  const [neighborhood, setNeighborhood] = useState<string>(regionOptions.neighborhoods[0]);

  return (
    <Card style={styles.card}>
      <AppText variant="cardTitle" style={styles.title}>
        Öncelikli bölge{' '}
        <AppText variant="caption" color={colors.textMuted}>
          (isteğe bağlı)
        </AppText>
      </AppText>

      <SelectField
        label="📍 İl"
        value={city}
        options={regionOptions.cities}
        onChange={setCity}
        containerStyle={styles.field}
      />
      <View style={styles.grid}>
        <SelectField
          label="🏢 İlçe"
          value={district}
          options={regionOptions.districts}
          onChange={setDistrict}
          containerStyle={styles.gridItem}
        />
        <SelectField
          label="🏘 Mahalle"
          value={neighborhood}
          options={regionOptions.neighborhoods}
          onChange={setNeighborhood}
          containerStyle={styles.gridItem}
        />
      </View>
    </Card>
  );
}

/** Adım 5 — oluşan öncelik ağırlıklarının özeti. */
export function WeightSummary() {
  const weights = usePreferencesStore((state) => state.weights);

  const chips = [
    { icon: '🛡', label: 'Deprem', value: weights.quake },
    { icon: '🚇', label: 'Ulaşım', value: weights.transit },
    { icon: '🏫', label: 'Okul', value: weights.school },
    { icon: '☀', label: 'İklim', value: weights.climate },
  ];

  return (
    <View style={styles.summary}>
      <View style={styles.summaryHeader}>
        <View style={styles.summaryIcon}>
          <AppText style={styles.summaryGlyph}>✨</AppText>
        </View>
        <View style={styles.summaryText}>
          <AppText variant="itemTitle" color={colors.primaryDark}>
            Kişisel Profiliniz Oluşturuldu
          </AppText>
          <AppText variant="caption" color={colors.positiveText}>
            Tüm incelemeler bu ağırlıklara göre puanlanacaktır.
          </AppText>
        </View>
      </View>

      <View style={styles.summaryChips}>
        {chips.map((chip) => (
          <Badge key={chip.label} label={`${chip.icon} ${chip.label}: ${chip.value}%`} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: spacing.lg },
  title: { marginBottom: spacing.lg },
  field: { marginBottom: spacing.md },
  grid: { flexDirection: 'row', gap: spacing.md },
  gridItem: { flex: 1 },
  sensitivity: {
    marginTop: spacing.xl,
    paddingTop: spacing.xl,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.surfaceMuted,
  },
  summary: {
    padding: spacing.xxl,
    borderRadius: radius.x20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.positiveBorder,
    backgroundColor: colors.positiveSofter,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    marginBottom: spacing.md,
  },
  summaryIcon: {
    width: 36,
    height: 36,
    borderRadius: radius.lg,
    backgroundColor: colors.positive,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryGlyph: { fontSize: 18, lineHeight: 22 },
  summaryText: { flex: 1 },
  summaryChips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
});
