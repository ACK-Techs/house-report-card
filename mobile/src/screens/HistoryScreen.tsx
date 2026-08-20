import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';

import { AppText, Button, ButtonRow, Card, Screen, ScreenHeader, ScoreBadge } from '@/components/ui';
import { historyGroups } from '@/data/content';
import type { RootStackParamList } from '@/navigation/types';
import { useToast } from '@/store/useToastStore';
import { colors, spacing } from '@/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'History'>;

/** 11 — İnceleme geçmişi (zaman çizelgesi). */
export function HistoryScreen({ navigation }: Props) {
  const toast = useToast();

  return (
    <Screen
      header={
        <ScreenHeader
          title="İnceleme Geçmişi"
          onBack={() => navigation.goBack()}
          action={{ label: 'Temizle', onPress: () => toast('İnceleme geçmişi temizlendi') }}
        />
      }
    >
      {historyGroups.map((group, groupIndex) => (
        <View key={group.label} style={groupIndex > 0 && styles.groupSpacing}>
          <View style={styles.groupHeader}>
            <View
              style={[
                styles.groupDot,
                { backgroundColor: group.active ? colors.primary : colors.borderStrong },
              ]}
            />
            <AppText variant="badge" color={colors.textMuted} style={styles.groupLabel}>
              {group.label}
            </AppText>
          </View>

          <View style={styles.timeline}>
            {group.entries.map((entry, index) => (
              <Card
                key={entry.id}
                onPress={() =>
                  entry.kind === 'area'
                    ? navigation.navigate('AreaReport', { areaId: entry.id })
                    : navigation.navigate('PropertyReport', { propertyId: entry.id })
                }
                accessibilityLabel={`${entry.title}, ${entry.meta}, skor ${entry.score}`}
                padding={spacing.lg + 1}
                style={index < group.entries.length - 1 ? styles.entry : undefined}
              >
                <View style={styles.entryRow}>
                  <View style={styles.entryText}>
                    <AppText variant="bodyStrong">{entry.title}</AppText>
                    <AppText variant="badge" color={colors.textMuted} style={styles.entryMeta}>
                      {entry.meta}
                    </AppText>
                  </View>
                  <ScoreBadge score={entry.score} />
                </View>
              </Card>
            ))}
          </View>
        </View>
      ))}

      <ButtonRow>
        <Button
          label="Geçmişi dışa aktar (CSV)"
          variant="secondary"
          flex={1}
          size="sm"
          onPress={() => toast('CSV dışa aktarıldı')}
        />
        <Button
          label="Listeyi temizle"
          variant="danger"
          flex={1}
          size="sm"
          onPress={() => toast('İnceleme geçmişi temizlendi')}
        />
      </ButtonRow>
    </Screen>
  );
}

const styles = StyleSheet.create({
  groupSpacing: { marginTop: spacing.x20 - 2 },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm + 1,
    marginBottom: spacing.lg,
  },
  groupDot: { width: 7, height: 7, borderRadius: 4 },
  groupLabel: { letterSpacing: 0.4 },
  timeline: {
    paddingLeft: spacing.xxl,
    marginBottom: spacing.x20 - 2,
    borderLeftWidth: 2,
    borderLeftColor: colors.border,
  },
  entry: { marginBottom: spacing.md },
  entryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  entryText: { flex: 1 },
  entryMeta: { marginTop: 2 },
});
