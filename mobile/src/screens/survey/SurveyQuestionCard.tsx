import { StyleSheet } from 'react-native';

import { AppText, Card, Chip, ChipGroup, OptionCard } from '@/components/ui';
import type { SurveyQuestion } from '@/data/survey';
import { usePreferencesStore } from '@/store/usePreferencesStore';
import { spacing } from '@/theme';

/**
 * Tek bir anket sorusunu render eder.
 *
 * `layout: 'stack'` açıklamalı seçenek kartlarını, `'wrap'` chip ızgarasını
 * kullanır. Seçim durumu doğrudan tercih deposundan okunur.
 */
export function SurveyQuestionCard({ question }: { question: SurveyQuestion }) {
  const selections = usePreferencesStore((state) => state.selections);
  const toggleSelection = usePreferencesStore((state) => state.toggleSelection);

  return (
    <Card style={styles.card}>
      <AppText variant="cardTitle" style={styles.title} accessibilityRole="header">
        {question.title}
      </AppText>

      {question.layout === 'stack' ? (
        <ChipGroup role="radiogroup" style={styles.stack}>
          {question.options.map((option) => (
            <OptionCard
              key={option.id}
              icon={option.icon}
              label={option.label}
              description={option.description}
              selected={Boolean(selections[option.id])}
              onPress={() => toggleSelection(option.id)}
            />
          ))}
        </ChipGroup>
      ) : (
        <ChipGroup role={question.mode === 'single' ? 'radiogroup' : 'none'}>
          {question.options.map((option) => (
            <Chip
              key={option.id}
              label={option.label}
              icon={option.icon}
              singleSelect={question.mode === 'single'}
              selected={Boolean(selections[option.id])}
              onPress={() => toggleSelection(option.id)}
            />
          ))}
        </ChipGroup>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: spacing.lg },
  title: { marginBottom: spacing.lg },
  stack: { flexDirection: 'column', flexWrap: 'nowrap' },
});
