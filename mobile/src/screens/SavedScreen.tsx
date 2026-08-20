import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText, Badge, Card, Screen, ScreenHeader, ScoreBadge, SegmentedControl } from '@/components/ui';
import { savedAreas, savedComparisons, savedProperties } from '@/data/content';
import type { MainTabParamList, RootStackParamList } from '@/navigation/types';
import { useToast } from '@/store/useToastStore';
import { colors, radius, spacing } from '@/theme';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'SavedTab'>,
  NativeStackScreenProps<RootStackParamList>
>;

type Tab = 'homes' | 'areas' | 'comparisons';

/** 10 — Kaydedilen ev, mahalle ve kıyaslamalar. */
export function SavedScreen({ navigation }: Props) {
  const toast = useToast();
  const [tab, setTab] = useState<Tab>('homes');

  return (
    <Screen
      header={<ScreenHeader title="Kaydedilenler" onBack={() => navigation.navigate('HomeTab')} />}
      contentStyle={styles.content}
    >
      <SegmentedControl<Tab>
        segments={[
          { value: 'homes', label: `Evler (${savedProperties.length})` },
          { value: 'areas', label: `Mahalleler (${savedAreas.length})` },
          { value: 'comparisons', label: `Kıyaslar (${savedComparisons.length})` },
        ]}
        value={tab}
        onChange={setTab}
        style={styles.tabs}
      />

      {tab === 'homes'
        ? savedProperties.map((property) => (
            <Card key={property.id} elevation="flat" padding={spacing.xl} style={styles.card}>
              <View style={styles.cardHeader}>
                <Pressable
                  onPress={() => navigation.navigate('PropertyReport', { propertyId: property.id })}
                  accessibilityRole="button"
                  accessibilityLabel={`${property.address} raporunu aç`}
                  style={styles.cardTitle}
                >
                  <Badge label={property.district} />
                  <AppText variant="cardTitle" style={styles.address}>
                    {property.address}
                  </AppText>
                  <AppText variant="caption" color={colors.textMuted}>
                    {property.meta}
                  </AppText>
                </Pressable>

                <View style={styles.cardMeta}>
                  <ScoreBadge score={property.score} />
                  {property.updateCount ? (
                    <View style={styles.updateBadge}>
                      <AppText variant="badge" color={colors.dangerText}>
                        {property.updateCount} güncelleme
                      </AppText>
                    </View>
                  ) : null}
                </View>
              </View>

              <View style={styles.actionRow}>
                <QuickAction label="Not ekle" onPress={() => toast('Not eklendi')} />
                <QuickAction
                  label="Kıyasla"
                  onPress={() => navigation.navigate('CompareTab')}
                />
                <QuickAction
                  label="Paylaş"
                  onPress={() => toast('Rapor bağlantısı kopyalandı')}
                />
              </View>
            </Card>
          ))
        : null}

      {tab === 'areas'
        ? savedAreas.map((area) => (
            <Card
              key={area.id}
              onPress={() => navigation.navigate('AreaReport', { areaId: area.id })}
              accessibilityLabel={`${area.name}, bölge notu ${area.score}`}
              padding={spacing.xl}
              style={[styles.card, styles.rowCard]}
            >
              <View style={styles.rowText}>
                <AppText variant="cardTitle">{area.name}</AppText>
                <AppText variant="caption" color={colors.textMuted} style={styles.rowMeta}>
                  {area.meta}
                </AppText>
              </View>
              <ScoreBadge score={area.score} />
            </Card>
          ))
        : null}

      {tab === 'comparisons'
        ? savedComparisons.map((comparison) => (
            <Card
              key={comparison.id}
              onPress={() => navigation.navigate('CompareTab')}
              accessibilityLabel={`${comparison.title} kıyaslamasını aç`}
              padding={spacing.xl}
              style={[styles.card, styles.rowCard]}
            >
              <View style={styles.rowText}>
                <AppText variant="cardTitle" style={styles.comparisonTitle}>
                  {comparison.title}
                </AppText>
                <AppText variant="caption" color={colors.textMuted} style={styles.rowMeta}>
                  {comparison.meta}
                </AppText>
              </View>
              <AppText variant="itemTitle" color={colors.textMuted}>
                →
              </AppText>
            </Card>
          ))
        : null}
    </Screen>
  );
}

function QuickAction({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [styles.quickAction, pressed && styles.pressed]}
    >
      <AppText variant="badge" color={colors.inkSoft} align="center" style={styles.quickLabel}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: spacing.xl },
  tabs: { marginBottom: spacing.xl },
  card: { marginBottom: spacing.md },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  cardTitle: { flex: 1 },
  address: { marginTop: spacing.xs, marginBottom: 2 },
  cardMeta: { alignItems: 'flex-end', gap: spacing.xs },
  updateBadge: {
    paddingVertical: 2,
    paddingHorizontal: spacing.xs,
    borderRadius: radius.xs,
    backgroundColor: colors.dangerBg,
  },
  actionRow: { flexDirection: 'row', gap: spacing.xs, marginTop: spacing.lg },
  quickAction: {
    flex: 1,
    minHeight: 36,
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  quickLabel: { fontSize: 11 },
  pressed: { backgroundColor: colors.surfaceMuted },
  rowCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md },
  rowText: { flex: 1 },
  rowMeta: { marginTop: 3 },
  comparisonTitle: { fontSize: 13 },
});
