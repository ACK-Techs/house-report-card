import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  Accordion,
  AppText,
  Callout,
  Card,
  Screen,
  ScreenHeader,
  SectionHeading,
  SourceBadge,
} from '@/components/ui';
import { faqs, legal, methodologySteps, sourceLibrary } from '@/data/content';
import type { RootStackParamList } from '@/navigation/types';
import { colors, radius, spacing } from '@/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Help'>;

/** 14 — Yardım ve metodoloji. */
export function HelpScreen({ navigation }: Props) {
  const [openFaq, setOpenFaq] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <Screen
      header={<ScreenHeader title="Yardım & Metodoloji" onBack={() => navigation.goBack()} />}
    >
      <View style={styles.methodology}>
        <AppText variant="cardTitle" color={colors.primaryDark} style={styles.methodTitle}>
          Skorlar nasıl hesaplanıyor?
        </AppText>
        <AppText variant="caption" color={colors.primaryDeep} style={styles.methodIntro}>
          Her eksen ham veriden normalize edilir, güven katsayısıyla çarpılır ve sizin öncelik
          ağırlıklarınızla toplanır.
        </AppText>

        {methodologySteps.map((step, index) => {
          const isLast = index === methodologySteps.length - 1;
          return (
            <View
              key={step}
              style={[styles.step, isLast && styles.stepLast]}
              accessible
              accessibilityLabel={`Adım ${index + 1}: ${step}`}
            >
              <View style={[styles.stepNumber, isLast && styles.stepNumberLast]}>
                <AppText variant="badge" color={isLast ? colors.white : colors.primaryDark}>
                  {index + 1}
                </AppText>
              </View>
              <AppText
                variant="caption"
                color={isLast ? colors.ink : colors.inkSoft}
                style={styles.stepText}
              >
                {step}
              </AppText>
            </View>
          );
        })}
      </View>

      <Card elevation="flat" style={styles.card}>
        <AppText variant="itemTitle" style={styles.cardTitle}>
          Veri kaynakları kütüphanesi
        </AppText>
        {sourceLibrary.map((source, index) => (
          <View
            key={source.label}
            style={[styles.sourceRow, index < sourceLibrary.length - 1 && styles.sourceBorder]}
          >
            <View style={styles.sourceText}>
              <AppText variant="captionStrong" color={colors.ink} style={styles.sourceName}>
                {source.label}
              </AppText>
              <AppText variant="badge" color={colors.textMuted}>
                {source.description}
              </AppText>
            </View>
            <SourceBadge source={source} compact />
          </View>
        ))}
      </Card>

      <SectionHeading title="Sıkça sorulan sorular" />

      {faqs.map((faq) => (
        <Accordion
          key={faq.id}
          title={faq.question}
          expanded={openFaq === faq.id}
          onToggle={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
          style={styles.faq}
        >
          <AppText variant="caption" color={colors.textSecondary} style={styles.faqAnswer}>
            {faq.answer}
          </AppText>
        </Accordion>
      ))}

      <Callout
        variant="neutral"
        title="Yasal dayanak ve sorumluluk reddi"
        body={legal.helpDisclaimer}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  methodology: {
    marginBottom: spacing.lg,
    padding: spacing.xxl,
    borderRadius: radius.x20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.positiveBorderAlt,
    backgroundColor: colors.positiveBgAlt,
  },
  methodTitle: { marginBottom: spacing.xs },
  methodIntro: { marginBottom: spacing.xl },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm + 1,
    marginBottom: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.xl,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.positiveBorderAlt,
    backgroundColor: colors.surface,
  },
  stepLast: { marginBottom: 0, borderColor: colors.primary },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: radius.sm,
    backgroundColor: colors.positiveSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberLast: { backgroundColor: colors.primary },
  stepText: { flex: 1, lineHeight: 15 },

  card: { marginBottom: spacing.lg },
  cardTitle: { marginBottom: spacing.lg },
  sourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingBottom: spacing.md,
    marginBottom: spacing.md,
  },
  sourceBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.surfaceMuted,
  },
  sourceText: { flex: 1 },
  sourceName: { fontSize: 12 },

  faq: { marginBottom: spacing.md },
  faqAnswer: { lineHeight: 19 },
});
