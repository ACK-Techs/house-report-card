import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';

import { AppText, Button, ButtonRow, Screen, ScreenHeader, StepProgress } from '@/components/ui';
import { completionCriteria, surveySteps } from '@/data/survey';
import type { RootStackParamList } from '@/navigation/types';
import { colors, radius, shadows, spacing } from '@/theme';

import { RegionPicker, SensitivitySlider, WeightSummary } from './survey/SurveyExtras';
import { SurveyQuestionCard } from './survey/SurveyQuestionCard';

type Props = NativeStackScreenProps<RootStackParamList, 'Survey'>;

const TOTAL_STEPS = surveySteps.length;

/** 02 — 5 adımlı hızlı kişiselleştirme anketi. */
export function SurveyScreen({ navigation }: Props) {
  const [stepIndex, setStepIndex] = useState(0);
  const [completed, setCompleted] = useState(false);

  const step = surveySteps[stepIndex]!;
  const isLastStep = stepIndex === TOTAL_STEPS - 1;

  const goHome = () => navigation.reset({ index: 0, routes: [{ name: 'Main' }] });

  const goPrevious = () => {
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
    else navigation.goBack();
  };

  const goNext = () => {
    if (isLastStep) setCompleted(true);
    else setStepIndex(stepIndex + 1);
  };

  return (
    <>
      <Screen
        header={
          <ScreenHeader
            title="Önceliklerini Belirle"
            onBack={goPrevious}
            action={{ label: 'Atla', onPress: goHome, accessibilityLabel: 'Anketi atla' }}
          />
        }
        contentStyle={styles.content}
      >
        <View style={styles.stepHeader}>
          <AppText variant="badge" color={colors.primary} style={styles.stepLabel}>
            {step.label}
          </AppText>
          <AppText variant="captionStrong" color={colors.textSecondary} style={styles.stepCategory}>
            {step.category}
          </AppText>
        </View>
        <StepProgress total={TOTAL_STEPS} current={stepIndex + 1} style={styles.progress} />

        {step.questions.map((question, index) => (
          <View key={question.id}>
            <SurveyQuestionCard question={question} />
            {/* Hassasiyet sürgüsü son sorunun kartının hemen ardında yer alır. */}
            {step.extras?.includes('sensitivity') && index === step.questions.length - 1 ? (
              <View style={styles.sensitivityWrap}>
                <SensitivitySlider />
              </View>
            ) : null}
          </View>
        ))}

        {step.extras?.includes('regionPicker') ? <RegionPicker /> : null}
        {step.extras?.includes('weightSummary') ? <WeightSummary /> : null}

        <ButtonRow>
          {stepIndex > 0 ? (
            <Button label="← Önceki Adım" variant="secondary" flex={1} onPress={goPrevious} />
          ) : null}
          <Button
            label={isLastStep ? 'Analizi Tamamla ✨' : 'Sonraki Adım →'}
            flex={2}
            onPress={goNext}
          />
        </ButtonRow>
      </Screen>

      <CompletionModal visible={completed} onDismiss={goHome} />
    </>
  );
}

/** Anket bitiminde gösterilen özet modali. */
function CompletionModal({ visible, onDismiss }: { visible: boolean; onDismiss: () => void }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onDismiss}>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalCard} accessibilityViewIsModal>
          <View style={styles.modalIcon}>
            <AppText style={styles.modalGlyph}>🎉</AppText>
          </View>
          <AppText variant="cardTitle" align="center" style={styles.modalTitle} accessibilityRole="header">
            Profiliniz Hazır
          </AppText>
          <AppText variant="body" align="center" color={colors.textSecondary} style={styles.modalBody}>
            Öncelikleriniz kaydedildi. Ev Karnesi tüm analizleri sizin kriterlerinize göre
            hesaplayacak.
          </AppText>

          <View style={styles.criteriaBox}>
            <AppText variant="badge" color={colors.textMuted} style={styles.criteriaLabel}>
              AKTİF KRİTERLERİNİZ
            </AppText>
            {completionCriteria.map((criterion) => (
              <AppText key={criterion} variant="captionStrong" color={colors.ink}>
                · {criterion}
              </AppText>
            ))}
          </View>

          <Button label="Araştırma Merkezine Başla →" onPress={onDismiss} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: spacing.x20 - 2 },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  stepLabel: { fontSize: 12 },
  stepCategory: { fontSize: 12 },
  progress: { marginBottom: spacing.x20 - 2 },
  sensitivityWrap: { marginTop: -spacing.lg, marginBottom: spacing.lg },

  modalBackdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.x24,
    backgroundColor: colors.overlayStrong,
  },
  modalCard: {
    width: '100%',
    maxWidth: 330,
    padding: spacing.x26,
    paddingHorizontal: spacing.x20 + 2,
    borderRadius: radius.x28,
    backgroundColor: colors.surface,
    ...shadows.overlay,
  },
  modalIcon: {
    width: 64,
    height: 64,
    alignSelf: 'center',
    marginBottom: spacing.xl,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: colors.positiveBorder,
    backgroundColor: colors.positiveSofter,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalGlyph: { fontSize: 26, lineHeight: 34 },
  modalTitle: { fontSize: 18, marginBottom: spacing.xs },
  modalBody: { marginBottom: spacing.xxl },
  criteriaBox: {
    marginBottom: spacing.xxl,
    padding: spacing.lg,
    borderRadius: radius.xl,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  criteriaLabel: { marginBottom: spacing.xs, letterSpacing: 0.4 },
});
