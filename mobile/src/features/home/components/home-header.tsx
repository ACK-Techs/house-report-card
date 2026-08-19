import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { homeTheme as c } from '../home-theme';

export function HomeHeader({ userName, onProfilePress }: { userName: string | null; onProfilePress: () => void }) {
  return <View style={s.header}><View style={s.copy}><Text style={s.eyebrow}>ARAŞTIRMA MERKEZİ</Text><Text style={s.title}>{userName ? `Merhaba, ${userName}` : 'Merhaba'}</Text><Text style={s.subtitle}>Bir adresi incele veya bir bölgeyi keşfet.</Text></View><Pressable accessibilityRole="button" accessibilityLabel="Profili aç" hitSlop={8} onPress={onProfilePress} style={({ pressed }) => [s.avatar, pressed && s.pressed]}><Ionicons name="person-outline" size={22} color={c.accentDark} /></Pressable></View>;
}

const s = StyleSheet.create({ header: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 22 }, copy: { flex: 1, paddingRight: 16 }, eyebrow: { color: c.accent, fontSize: 11, fontWeight: '800', letterSpacing: 1.2, marginBottom: 5 }, title: { color: c.text, fontSize: 28, fontWeight: '800' }, subtitle: { color: c.muted, fontSize: 14, lineHeight: 21, marginTop: 4 }, avatar: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center', backgroundColor: c.accentLight, borderColor: '#BAE6FD', borderWidth: 1 }, pressed: { opacity: 0.72 } });
