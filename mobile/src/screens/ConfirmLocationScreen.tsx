import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ConfirmMap } from '@/components/map';
import { AppText, Button, Callout, TextField } from '@/components/ui';
import { legal } from '@/data/content';
import { findBuilding } from '@/data/buildings';
import type { RootStackParamList } from '@/navigation/types';
import { colors, radius, shadows, spacing } from '@/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'ConfirmLocation'>;

/**
 * 05 — Konum ve parsel doğrulama (bottom sheet).
 *
 * Rapor üretilmeden önce adres/parsel eşleşmesi kullanıcıya teyit ettirilir;
 * eşleşme güveni ayrı bir gösterge olarak sunulur.
 */
export function ConfirmLocationScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const building = findBuilding(route.params.buildingId);

  const [address, setAddress] = useState('Caferağa Mah. Moda Cd. Kadıköy / İstanbul');
  const [doorNumber, setDoorNumber] = useState(building.title.split('No: ')[1] ?? '42');
  const [floor, setFloor] = useState('');

  const close = () => navigation.goBack();

  return (
    <View style={styles.root}>
      <Pressable
        style={styles.backdrop}
        onPress={close}
        accessibilityRole="button"
        accessibilityLabel="Doğrulama panelini kapat"
      />

      <View style={[styles.sheet, { paddingBottom: insets.bottom + spacing.x26 }]}>
        <View style={styles.grabber} />

        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.titleRow}>
            <AppText variant="cardTitle" style={styles.title} accessibilityRole="header">
              Konum ve Parsel Doğrulama
            </AppText>
            <Pressable onPress={close} accessibilityRole="button" accessibilityLabel="Kapat" hitSlop={12}>
              <AppText variant="navTitle" color={colors.textMuted}>
                ✕
              </AppText>
            </Pressable>
          </View>

          <AppText variant="caption" color={colors.textSecondary} style={styles.intro}>
            Rapor üretilmeden önce sistemin bulduğu adres ve parsel eşleşmesini gözden geçirin.
          </AppText>

          <ConfirmMap parcel="1245 / 8" matchConfidence={98} />

          <AppText variant="caption" color={colors.textMuted} style={styles.hint}>
            Pin&apos;i haritada sürükleyerek bina girişini tam konumlandırabilirsiniz.
          </AppText>

          <TextField
            label="Seçilen Adres"
            value={address}
            onChangeText={setAddress}
            containerStyle={styles.field}
          />
          <View style={styles.grid}>
            <TextField
              label="Bina / Kapı No"
              value={doorNumber}
              onChangeText={setDoorNumber}
              keyboardType="number-pad"
              containerStyle={styles.gridItem}
            />
            <TextField
              label="Daire / Kat"
              value={floor}
              onChangeText={setFloor}
              placeholder="Kat: 3"
              containerStyle={styles.gridItem}
            />
          </View>

          <Callout
            title="Ön bilgilendirme"
            body={legal.confirmNotice}
            style={styles.notice}
          />

          <Button
            label="Konumu Onayla ve Karneyi Üret →"
            onPress={() => {
              navigation.replace('PropertyReport', { propertyId: building.id });
            }}
          />
          <Button
            label="Farklı Adres Ara"
            variant="secondary"
            onPress={close}
            style={styles.secondary}
          />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: colors.overlay },
  sheet: {
    maxHeight: '86%',
    paddingTop: spacing.x20 - 2,
    paddingHorizontal: spacing.x20,
    borderTopLeftRadius: radius.x28,
    borderTopRightRadius: radius.x24,
    backgroundColor: colors.surface,
    ...shadows.sheet,
  },
  grabber: {
    width: 40,
    height: 4,
    alignSelf: 'center',
    marginBottom: spacing.xxl,
    borderRadius: 2,
    backgroundColor: colors.borderStrong,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginBottom: spacing.xs,
  },
  title: { flex: 1, fontSize: 16 },
  intro: { marginBottom: spacing.xl },
  hint: { marginTop: spacing.lg, marginBottom: spacing.xl },
  field: { marginBottom: spacing.lg },
  grid: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.xl },
  gridItem: { flex: 1 },
  notice: { marginBottom: spacing.xl },
  secondary: { marginTop: spacing.sm + 1 },
});
