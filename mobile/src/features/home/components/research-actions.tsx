import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { homeTheme as c } from '../home-theme';
import type { ResearchMode } from '../home.types';

export function ResearchActions({ onSearch, onModePress }: { onSearch: () => void; onModePress: (mode: ResearchMode) => void }) {
  const { width } = useWindowDimensions();
  return <><Text style={s.label}>Konut veya bölge ara</Text><Pressable accessibilityRole="search" accessibilityLabel="Adres, bina, mahalle veya ilçe ara" onPress={onSearch} style={({ pressed }) => [s.search, pressed && s.pressed]}><Ionicons name="search" size={21} color={c.accentDark} /><Text style={s.placeholder}>Adres, bina, mahalle veya ilçe ara</Text><Ionicons name="chevron-forward" size={20} color={c.accent} /></Pressable><View style={[s.grid, width < 360 && s.stacked]}><ModeCard title="Bir evi incele" description="Adres gir veya haritadan binayı seç." icon="home-outline" onPress={() => onModePress('property')} /><ModeCard title="Bölgeyi keşfet" description="Mahalle ya da ilçeyi yaşam ve konum açısından incele." icon="map-outline" onPress={() => onModePress('area')} /></View></>;
}

function ModeCard({ title, description, icon, onPress }: { title: string; description: string; icon: keyof typeof Ionicons.glyphMap; onPress: () => void }) {
  return <Pressable accessibilityRole="button" accessibilityLabel={title} onPress={onPress} style={({ pressed }) => [s.card, pressed && s.pressed]}><View style={s.icon}><Ionicons name={icon} size={25} color={c.accent} /></View><Text style={s.cardTitle}>{title}</Text><Text style={s.description}>{description}</Text><Text style={s.action}>Başla →</Text></Pressable>;
}

const s = StyleSheet.create({ label: { color: c.text, fontSize: 12, fontWeight: '700', marginBottom: 7 }, search: { minHeight: 64, flexDirection: 'row', alignItems: 'center', gap: 11, backgroundColor: c.accentSurface, borderColor: '#BAE6FD', borderWidth: 1, borderRadius: 18, paddingHorizontal: 16, marginBottom: 14 }, placeholder: { flex: 1, color: c.text, fontSize: 14, fontWeight: '600' }, grid: { flexDirection: 'row', gap: 12 }, stacked: { flexDirection: 'column' }, card: { flex: 1, minHeight: 166, backgroundColor: c.surface, borderColor: c.border, borderWidth: 1, borderRadius: 20, padding: 16 }, icon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: c.accentSurface, marginBottom: 12 }, cardTitle: { color: c.text, fontSize: 15, fontWeight: '800' }, description: { flex: 1, color: c.muted, fontSize: 12, lineHeight: 18, marginTop: 6 }, action: { color: c.accentDark, fontSize: 12, fontWeight: '800', marginTop: 10 }, pressed: { opacity: 0.72 } });
