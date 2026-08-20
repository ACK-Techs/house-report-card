import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, View } from 'react-native';

import { AreaGlyph } from '@/components/charts';
import { AreaMapPreview } from '@/components/map';
import {
  AppText,
  Badge,
  Card,
  Chip,
  Screen,
  ScreenHeader,
  ScoreBadge,
  SectionHeading,
} from '@/components/ui';
import { areaFilters } from '@/data/buildings';
import { areaNeighborhoods } from '@/data/content';
import type { RootStackParamList } from '@/navigation/types';
import { usePreferencesStore } from '@/store/usePreferencesStore';
import { colors, screenPaddingX, spacing } from '@/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Area'>;

/** 06 — Bölge keşfi. */
export function AreaScreen({ navigation }: Props) {
  const selections = usePreferencesStore((state) => state.selections);
  const toggleSelection = usePreferencesStore((state) => state.toggleSelection);

  return (
    <Screen
      header={
        <ScreenHeader
          title="Bölge Keşfi"
          onBack={() => navigation.goBack()}
          action={{
            label: 'Bina Ara',
            onPress: () => navigation.navigate('Main', { screen: 'SearchTab' }),
          }}
          below={
            <View style={styles.breadcrumb} accessible accessibilityLabel="İstanbul, Kadıköy, Caferağa Mahallesi">
              <AppText variant="badge" color={colors.textMuted}>
                İstanbul
              </AppText>
              <AppText variant="badge" color={colors.textMuted}>
                ›
              </AppText>
              <AppText variant="badge" color={colors.textMuted}>
                Kadıköy
              </AppText>
              <AppText variant="badge" color={colors.textMuted}>
                ›
              </AppText>
              <AppText variant="badge" color={colors.ink}>
                Caferağa Mahallesi
              </AppText>
            </View>
          }
        />
      }
      contentStyle={styles.content}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterRow}
      >
        {areaFilters.map((filter) => (
          <Chip
            key={filter.id}
            pill
            singleSelect
            label={filter.label}
            selected={Boolean(selections[filter.id])}
            onPress={() => toggleSelection(filter.id)}
          />
        ))}
      </ScrollView>

      <View style={styles.mapWrap}>
        <AreaMapPreview label="Caferağa & Moda sınırları" />
      </View>

      <SectionHeading title="Mahalleler" action={{ label: 'Karne notuna göre ↓' }} />

      {areaNeighborhoods.map((area) => (
        <Card
          key={area.id}
          onPress={() => navigation.navigate('AreaReport', { areaId: area.id })}
          accessibilityLabel={`${area.name} mahallesi, bölge notu ${area.score}`}
          padding={spacing.xl}
          style={styles.areaCard}
        >
          <View style={styles.areaRow}>
            <AreaGlyph
              score={area.score}
              tone={area.shapeTone as 'primary' | 'positive' | 'caution'}
            />
            <View style={styles.areaBody}>
              <View style={styles.areaHeader}>
                <AppText variant="cardTitle">{area.name}</AppText>
                <ScoreBadge score={area.score} />
              </View>
              <View style={styles.tagRow}>
                {area.tags.map((tag) => (
                  <Badge
                    key={tag.label}
                    label={tag.label}
                    tone={tag.missing ? 'missing' : undefined}
                    soft={!tag.missing}
                  />
                ))}
              </View>
            </View>
          </View>
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: spacing.xl },
  breadcrumb: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.md,
  },
  filterScroll: { marginHorizontal: -screenPaddingX, marginBottom: spacing.xl },
  filterRow: { gap: spacing.xs + 1, paddingHorizontal: screenPaddingX, paddingBottom: 2 },
  mapWrap: { marginBottom: spacing.xl },
  areaCard: { marginBottom: spacing.md },
  areaRow: { flexDirection: 'row', gap: spacing.lg },
  areaBody: { flex: 1, minWidth: 0 },
  areaHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginTop: spacing.sm },
});
