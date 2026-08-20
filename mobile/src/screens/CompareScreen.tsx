import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';

import { AppText, Badge, Callout, Screen, ScreenHeader } from '@/components/ui';
import { compareConfidence, compareRows, compareSubjects, compareVerdictText } from '@/data/reports';
import type { MainTabParamList, RootStackParamList } from '@/navigation/types';
import { usePreferencesStore } from '@/store/usePreferencesStore';
import { useToast } from '@/store/useToastStore';
import { colors, radius, shadows, spacing } from '@/theme';
import type { CompareVerdict } from '@/types';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'CompareTab'>,
  NativeStackScreenProps<RootStackParamList>
>;

/**
 * Üstün metriğin renk kodu. Renk tek başına anlam taşımasın diye üstün olan
 * değere ayrıca "↑" işareti ve ekran okuyucu etiketi eklenir.
 */
const verdictStyle: Record<CompareVerdict, { bg: string; border: string; text: string; dashed?: boolean }> = {
  better: { bg: colors.positiveBg, border: colors.positiveBorder, text: colors.positiveText },
  worse: { bg: colors.cautionBg, border: colors.cautionBorder, text: colors.cautionText },
  neutral: { bg: colors.background, border: colors.border, text: colors.textSecondary },
  unknown: {
    bg: colors.background,
    border: colors.borderDashed,
    text: colors.textSecondary,
    dashed: true,
  },
};

const verdictSpeech: Record<CompareVerdict, string> = {
  better: 'bu metrikte üstün',
  worse: 'bu metrikte geride',
  neutral: 'nötr',
  unknown: 'veri doğrulanmadı',
};

/** 09 — İki binanın ortak ölçekte kıyaslanması. */
export function CompareScreen({ navigation }: Props) {
  const toast = useToast();
  const quakeWeight = usePreferencesStore((state) => state.weights.quake);

  return (
    <Screen
      header={
        <ScreenHeader
          title="Kıyaslama"
          onBack={() => navigation.navigate('HomeTab')}
          action={{ label: 'İndir', onPress: () => toast('PDF hazırlanıyor…') }}
        />
      }
    >
      <AppText variant="caption" color={colors.textSecondary} style={styles.intro}>
        İki binayı ortak göstergeler ve veri güven seviyeleriyle yan yana kıyaslayın. Üstün metrik
        yeşil rozetle vurgulanır.
      </AppText>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          {[compareSubjects.a, compareSubjects.b].map((subject) => (
            <View key={subject.badge} style={styles.subject}>
              <Badge label={subject.badge} />
              <AppText variant="cardTitle" style={styles.subjectName}>
                {subject.name}
              </AppText>
              <AppText
                variant="metricSmall"
                color={subject.score >= 75 ? colors.primary : colors.cautionText}
              >
                {subject.score} / 100
              </AppText>
            </View>
          ))}
        </View>

        <View style={styles.tableBody}>
          {compareRows.map((row) => (
            <View key={row.label} style={styles.metricGroup}>
              <AppText variant="badge" color={colors.textMuted} style={styles.metricLabel}>
                {row.label}
              </AppText>
              <View style={styles.metricRow}>
                <CompareCell
                  subject={compareSubjects.a.name}
                  metric={row.label}
                  text={row.a.text}
                  verdict={row.a.verdict}
                />
                <CompareCell
                  subject={compareSubjects.b.name}
                  metric={row.label}
                  text={row.b.text}
                  verdict={row.b.verdict}
                />
              </View>
            </View>
          ))}

          <AppText variant="badge" color={colors.textMuted} style={styles.metricLabel}>
            VERİ GÜVENİ
          </AppText>
          <View style={styles.metricRow}>
            <AppText variant="captionStrong" color={colors.primaryDark} style={styles.confidence}>
              ●●● {compareConfidence.a.text}
            </AppText>
            <AppText variant="captionStrong" color={colors.cautionText} style={styles.confidence}>
              ●●○ {compareConfidence.b.text}
            </AppText>
          </View>
        </View>
      </View>

      <Callout
        variant="info"
        title="Hangisi sizin için daha uygun?"
        body={compareVerdictText(`%${quakeWeight}`)}
        style={styles.verdict}
      />
    </Screen>
  );
}

function CompareCell({
  subject,
  metric,
  text,
  verdict,
}: {
  subject: string;
  metric: string;
  text: string;
  verdict: CompareVerdict;
}) {
  const style = verdictStyle[verdict];
  return (
    <View
      accessible
      accessibilityLabel={`${subject}, ${metric}: ${text}, ${verdictSpeech[verdict]}`}
      style={[
        styles.cell,
        {
          backgroundColor: style.bg,
          borderColor: style.border,
          borderStyle: style.dashed ? 'dashed' : 'solid',
        },
      ]}
    >
      <AppText variant="captionStrong" color={style.text}>
        {text}
        {verdict === 'better' ? ' ↑' : ''}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  intro: { marginBottom: spacing.xl },
  table: {
    overflow: 'hidden',
    borderRadius: radius.x20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    ...shadows.flat,
  },
  tableHeader: {
    flexDirection: 'row',
    gap: spacing.lg,
    padding: spacing.xl,
    backgroundColor: colors.surfaceMuted,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  subject: { flex: 1 },
  subjectName: { marginTop: 5, fontSize: 13 },
  tableBody: { padding: spacing.xl },
  metricGroup: { marginBottom: spacing.xl },
  metricLabel: { marginBottom: spacing.xs, letterSpacing: 0.4 },
  metricRow: { flexDirection: 'row', gap: spacing.sm },
  cell: {
    flex: 1,
    paddingVertical: spacing.xs + 1,
    paddingHorizontal: spacing.sm + 1,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
  },
  confidence: { flex: 1 },
  verdict: { marginTop: spacing.xl },
});
