import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams } from 'expo-router';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const priorities = ['Ulaşım', 'Aile yaşamı', 'Yeşil alan', 'İklim konforu'];
export default function ProfileScreen() {
  const { section } = useLocalSearchParams<{ section?: string }>();
  const showPriorities = section === 'priorities';
  return <SafeAreaView style={s.safe}><View style={s.content}><Text style={s.eyebrow}>PROFİL</Text><Text style={s.title}>{showPriorities ? 'Önceliklerim' : 'Profil ve tercihler'}</Text><Text style={s.subtitle}>Tercihlerin sonuçları sana göre düzenlemek için kullanılır; güvenlik sınırlarını değiştirmez.</Text><View style={s.card}><Text style={s.cardTitle}>Araştırma öncelikleri</Text>{priorities.map((item) => <Pressable key={item} accessibilityRole="checkbox" accessibilityState={{ checked: false }} style={s.row}><Ionicons name="square-outline" size={22} color="#475569" /><Text style={s.rowText}>{item}</Text></Pressable>)}</View></View></SafeAreaView>;
}
const s = StyleSheet.create({ safe: { flex: 1, backgroundColor: '#F8FAFC' }, content: { padding: 20, paddingBottom: 100 }, eyebrow: { color: '#0369A1', fontSize: 11, fontWeight: '800', letterSpacing: 1.2 }, title: { color: '#0F172A', fontSize: 27, fontWeight: '800', marginTop: 7 }, subtitle: { color: '#475569', fontSize: 14, lineHeight: 21, marginTop: 6 }, card: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 20, padding: 16, marginTop: 24 }, cardTitle: { color: '#0F172A', fontSize: 16, fontWeight: '800', marginBottom: 8 }, row: { minHeight: 50, flexDirection: 'row', alignItems: 'center', gap: 10, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' }, rowText: { color: '#334155', fontSize: 14, fontWeight: '600' } });
