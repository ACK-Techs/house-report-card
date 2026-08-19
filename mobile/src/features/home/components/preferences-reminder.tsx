import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export function PreferencesReminder({ onPress }: { onPress: () => void }) {
  return <Pressable accessibilityRole="button" accessibilityLabel="Önceliklerimi belirle" onPress={onPress} style={({ pressed }) => [s.card, pressed && s.pressed]}><View style={s.icon}><Ionicons name="options-outline" size={21} color="#92400E" /></View><View style={s.copy}><Text style={s.title}>Sana göre düzenleyelim</Text><Text style={s.description}>Ulaşım, aile yaşamı ve diğer önceliklerini seç.</Text><Text style={s.link}>Önceliklerimi belirle</Text></View><Ionicons name="chevron-forward" size={18} color="#B45309" /></Pressable>;
}
const s = StyleSheet.create({ card: { minHeight: 96, flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#FFFBEB', borderColor: '#FDE68A', borderWidth: 1, borderRadius: 20, padding: 15, marginTop: 16 }, icon: { width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FEF3C7' }, copy: { flex: 1 }, title: { color: '#78350F', fontSize: 14, fontWeight: '800' }, description: { color: '#92400E', fontSize: 12, lineHeight: 17, marginTop: 3 }, link: { color: '#B45309', fontSize: 12, fontWeight: '800', marginTop: 6 }, pressed: { opacity: 0.72 } });
