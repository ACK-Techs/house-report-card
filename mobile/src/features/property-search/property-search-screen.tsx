import Ionicons from '@expo/vector-icons/Ionicons';
import * as Location from 'expo-location';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { AccessibilityInfo, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { MapSelectionSurface } from './map-selection-surface';
import { cities, getDistricts, getMapTarget, getNeighborhoods, searchAddressFixture } from './property-search-fixtures';
import { clearPendingResearch, setPendingResearch } from './property-search-session';
import { emptyLocationDraft, type AddressCandidate, type Coordinate, type LocationDraft, type ResearchMode, type SearchStatus } from './property-search.types';

export function PropertySearchScreen() {
  const params = useLocalSearchParams<{ mode?: string }>();
  const [mode, setMode] = useState<ResearchMode>(params.mode === 'area' ? 'area' : 'property');
  const [drafts, setDrafts] = useState<Record<ResearchMode, LocationDraft>>({ property: emptyLocationDraft(), area: emptyLocationDraft() });
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<AddressCandidate[]>([]);
  const [searchStatus, setSearchStatus] = useState<SearchStatus>('idle');
  const [searchAttempt, setSearchAttempt] = useState(0);
  const [manualOpen, setManualOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [locationMessage, setLocationMessage] = useState<string | null>(null);
  const scrollRef = useRef<ScrollView>(null);
  const lastModeParam = useRef(params.mode);
  const [mapY, setMapY] = useState(0);
  const draft = drafts[mode];
  const districts = getDistricts(draft.city);
  const neighborhoods = getNeighborhoods(draft.city, draft.district);
  const mapTarget = getMapTarget(draft.city, draft.district, draft.neighborhood, draft.coordinate);
  const ready = Boolean(draft.city && draft.district && draft.neighborhood && (mode === 'area' || draft.coordinate || (draft.selectionMethod === 'manual' && draft.street.trim())));

  const update = (patch: Partial<LocationDraft>) => setDrafts((current) => ({ ...current, [mode]: { ...current[mode], ...patch } }));
  const resetSearch = () => { setQuery(''); setResults([]); setSearchStatus('idle'); };
  const changeMode = (next: ResearchMode) => { setMode(next); resetSearch(); setManualOpen(false); AccessibilityInfo.announceForAccessibility(next === 'property' ? 'Ev ve bina arama modu açıldı.' : 'Bölge keşfi modu açıldı.'); };
  const changeCity = (city: string) => { update({ city, district: '', neighborhood: '', street: '', buildingNumber: '', coordinate: null, selectionMethod: null }); AccessibilityInfo.announceForAccessibility('Şehir değişti. İlçe, mahalle ve konum seçimi temizlendi.'); };
  const changeDistrict = (district: string) => { update({ district, neighborhood: '', street: '', buildingNumber: '', coordinate: null, selectionMethod: null }); AccessibilityInfo.announceForAccessibility('İlçe değişti. Mahalle ve konum seçimi temizlendi.'); };
  const changeNeighborhood = (neighborhood: string) => { update({ neighborhood, street: '', buildingNumber: '', coordinate: null, selectionMethod: null }); resetSearch(); AccessibilityInfo.announceForAccessibility('Mahalle değişti. Sokak, bina ve harita seçimi temizlendi.'); };
  const selectCoordinate = (coordinate: Coordinate, method: 'map' | 'device' = 'map') => { update({ coordinate, selectionMethod: method }); AccessibilityInfo.announceForAccessibility(method === 'device' ? 'Cihaz konumu seçildi. Adres ve bina kaydı doğrulanmadı.' : 'Haritada bir nokta seçildi. Bina kaydı doğrulanmadı.'); };
  const selectAddress = (candidate: AddressCandidate) => { setDrafts((current) => ({ ...current, [mode]: { ...candidate } })); resetSearch(); AccessibilityInfo.announceForAccessibility('Adres geliştirme eşleşmesi seçildi. Resmî kayıt değildir.'); };

  useEffect(() => { clearPendingResearch(); }, []);
  useEffect(() => { if (lastModeParam.current === params.mode) return; lastModeParam.current = params.mode; const requested = params.mode === 'area' ? 'area' : 'property'; const timeout = setTimeout(() => { setMode(requested); setQuery(''); setResults([]); setSearchStatus('idle'); setManualOpen(false); AccessibilityInfo.announceForAccessibility(requested === 'property' ? 'Ev ve bina arama modu açıldı.' : 'Bölge keşfi modu açıldı.'); }, 0); return () => clearTimeout(timeout); }, [params.mode]);
  useEffect(() => {
    const normalized = query.trim();
    if (normalized.length < 2) return;
    let cancelled = false;
    const lookup = searchAddressFixture(normalized, draft.city, draft.district);
    const timeout = new Promise<AddressCandidate[]>((_, reject) => setTimeout(() => reject(new Error('search-timeout')), 4000));
    Promise.race([lookup, timeout]).then((items) => { if (!cancelled) { setResults(items); setSearchStatus(items.length ? 'success' : 'empty'); } }).catch(() => { if (!cancelled) setSearchStatus('error'); });
    return () => { cancelled = true; };
  }, [query, draft.city, draft.district, searchAttempt]);

  const requestLocation = async () => {
    setLocationMessage('Konum izni kontrol ediliyor…');
    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (!permission.granted) { setLocationMessage('Konum izni verilmedi. Haritadan seçebilir veya manuel konum girebilirsin.'); return; }
      const current = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      selectCoordinate({ latitude: current.coords.latitude, longitude: current.coords.longitude }, 'device');
      setLocationMessage('Cihaz konumu seçildi. Adres ve bina bilgisi doğrulanmadı.');
    } catch { setLocationMessage('Konum alınamadı. Haritadan seçebilir veya manuel konum girebilirsin.'); }
  };
  const continueToConfirmation = () => { if (!ready) return; setPendingResearch({ mode, draft }); router.push('/search/confirm-location'); };
  const summary = useMemo(() => [draft.neighborhood, draft.district, draft.city].filter(Boolean).join(', '), [draft]);

  return <SafeAreaView style={s.safe}>
    <ScrollView ref={scrollRef} contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
      <Text style={s.eyebrow}>ARAMA VE KONUM</Text>
      <Text style={s.title}>{mode === 'property' ? 'Ev / bina ara' : 'Bölgeyi keşfet'}</Text>
      <Text style={s.subtitle}>{mode === 'property' ? 'Önce bölgeyi seç, sonra haritadan binayı veya konumu işaretle.' : 'İlçe veya mahalleyi seçerek bölge araştırmasına başla.'}</Text>
      <View style={s.notice}><Ionicons name="flask-outline" size={18} color="#92400E" /><Text style={s.noticeText}>İdari seçenekler ve adres adayları frontend geliştirme verisidir; resmî adres veya bina kaydı değildir.</Text></View>
      <View accessibilityRole="tablist" style={s.modeRow}><ModeButton label="Ev / bina" selected={mode === 'property'} onPress={() => changeMode('property')} /><ModeButton label="Bölge" selected={mode === 'area'} onPress={() => changeMode('area')} /></View>
      <Text style={s.sectionTitle}>Yönetimsel konum</Text>
      <Selector label="Şehir" options={cities} value={draft.city} onChange={changeCity} />
      <Selector label="İlçe" options={districts} value={draft.district} disabled={!draft.city} onChange={changeDistrict} />
      <Selector label="Mahalle" options={neighborhoods} value={draft.neighborhood} disabled={!draft.district} onChange={changeNeighborhood} />
      <Text style={s.label}>Adres veya mahalle ara</Text>
      <View style={s.inputRow}><Ionicons name="search" size={20} color="#475569" /><TextInput accessibilityLabel="Adres veya mahalle ara" value={query} onChangeText={(value) => { setQuery(value); setSearchStatus(value.trim().length >= 2 ? 'loading' : 'idle'); if (value.trim().length < 2) setResults([]); }} placeholder="En az 2 karakter yaz" placeholderTextColor="#64748B" style={s.input} /></View>
      <SearchResults status={searchStatus} results={results} onSelect={selectAddress} onRetry={() => { setSearchStatus('loading'); setSearchAttempt((value) => value + 1); }} />
      {mode === 'property' && <>
        <Text style={s.sectionTitle}>Harita seçimi</Text>
        <Text style={s.helper}>{draft.neighborhood ? 'Binayı bulmak için haritaya dokun.' : 'Haritayı etkinleştirmek için önce mahalle seç.'}</Text>
        <View onLayout={(event) => setMapY(event.nativeEvent.layout.y)}><MapSelectionSurface enabled={Boolean(draft.neighborhood)} coordinate={draft.coordinate} target={mapTarget} onSelect={(value) => selectCoordinate(value)} /></View>
        <View style={s.actionRow}><Pressable accessibilityRole="button" onPress={() => void requestLocation()} style={s.textButton}><Ionicons name="navigate-outline" size={18} color="#0369A1" /><Text style={s.textButtonLabel}>Konumumu kullan</Text></Pressable><Pressable accessibilityRole="button" onPress={() => setManualOpen((value) => !value)} style={s.textButton}><Ionicons name="create-outline" size={18} color="#0369A1" /><Text style={s.textButtonLabel}>Manuel konum gir</Text></Pressable></View>
        {locationMessage && <Text accessibilityLiveRegion="polite" style={s.message}>{locationMessage}</Text>}
        {manualOpen && <ManualFields draft={draft} onChange={update} />}
      </>}
      {draft.neighborhood && <View style={s.summary}>
        <Text style={s.summaryLabel}>SEÇİLEN KONUM</Text><Text style={s.summaryTitle}>{summary}</Text>
        <Text style={s.summaryMeta}>{mode === 'area' ? 'Bölge seçimi' : draft.selectionMethod === 'manual' ? 'Kullanıcı tarafından girilen konum' : draft.coordinate ? 'Haritada seçilen doğrulanmamış nokta' : 'Bina veya nokta seçilmedi'}</Text>
        {mode === 'property' && editing && <ManualFields draft={draft} onChange={update} />}
        {mode === 'property' && <View style={s.actionRow}><Pressable accessibilityRole="button" onPress={() => { setEditing((value) => !value); setManualOpen(false); }} style={s.textButton}><Text style={s.textButtonLabel}>Düzenle</Text></Pressable><Pressable accessibilityRole="button" onPress={() => { setManualOpen(false); scrollRef.current?.scrollTo({ y: Math.max(0, mapY - 24), animated: true }); AccessibilityInfo.announceForAccessibility('Harita seçimi bölümüne dönüldü.'); }} style={s.textButton}><Text style={s.textButtonLabel}>Haritada değiştir</Text></Pressable></View>}
        <Text style={s.unknown}>Bu seçim kesin bina kimliği veya resmî kayıt doğrulaması değildir.</Text>
      </View>}
      <Pressable accessibilityRole="button" accessibilityState={{ disabled: !ready }} disabled={!ready} onPress={continueToConfirmation} style={[s.primary, !ready && s.primaryDisabled]}><Text style={s.primaryText}>{mode === 'property' ? 'Bu konumu incele' : 'Bu bölgeyi incele'}</Text></Pressable>
    </ScrollView>
  </SafeAreaView>;
}

function SearchResults({ status, results, onSelect, onRetry }: { status: SearchStatus; results: AddressCandidate[]; onSelect: (value: AddressCandidate) => void; onRetry: () => void }) {
  if (status === 'idle') return null;
  if (status === 'loading') return <View accessibilityRole="progressbar" accessibilityLabel="Arama sonuçları yükleniyor" style={s.results}><Text style={s.resultState}>Sonuçlar yükleniyor…</Text></View>;
  if (status === 'error') return <View style={s.results}><Text style={s.resultState}>Arama sonuçları yüklenemedi.</Text><Pressable accessibilityRole="button" onPress={onRetry} style={s.retry}><Text style={s.textButtonLabel}>Tekrar dene</Text></Pressable></View>;
  if (status === 'empty') return <View style={s.results}><Text style={s.resultState}>Bu geliştirme verisinde sonuç bulunamadı.</Text></View>;
  return <View style={s.results}>{results.map((item) => <Pressable key={item.id} accessibilityRole="button" accessibilityLabel={`${item.label}, ${item.matchLabel}`} onPress={() => onSelect(item)} style={s.result}><Text style={s.resultText}>{item.label}</Text><Text style={s.resultMeta}>{item.matchLabel}</Text></Pressable>)}</View>;
}
function Selector({ label, options, value, disabled, onChange }: { label: string; options: string[]; value: string; disabled?: boolean; onChange: (value: string) => void }) { return <View style={s.selector}><Text style={s.label}>{label}</Text><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.chips}>{options.length ? options.map((item) => <Pressable key={item} accessibilityRole="radio" accessibilityState={{ checked: value === item, disabled }} disabled={disabled} onPress={() => onChange(item)} style={[s.chip, value === item && s.chipSelected]}><Text style={[s.chipText, value === item && s.chipTextSelected]}>{value === item ? '✓ ' : ''}{item}</Text></Pressable>) : <View style={[s.chip, s.disabled]}><Text style={s.chipText}>{disabled ? 'Önce önceki alanı seç' : 'Seçenek yok'}</Text></View>}</ScrollView></View>; }
function ModeButton({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) { return <Pressable accessibilityRole="tab" accessibilityState={{ selected }} onPress={onPress} style={[s.mode, selected && s.modeSelected]}><Text style={[s.modeText, selected && s.modeTextSelected]}>{selected ? '✓ ' : ''}{label}</Text></Pressable>; }
function ManualFields({ draft, onChange }: { draft: LocationDraft; onChange: (patch: Partial<LocationDraft>) => void }) { return <View style={s.manual}><Text style={s.manualTitle}>Manuel konum ayrıntıları</Text><TextInput accessibilityLabel="Sokak veya cadde" value={draft.street} onChangeText={(street) => onChange({ street, selectionMethod: 'manual', coordinate: null })} placeholder="Sokak veya cadde" placeholderTextColor="#64748B" style={s.manualInput} /><TextInput accessibilityLabel="Bina numarası" value={draft.buildingNumber} onChangeText={(buildingNumber) => onChange({ buildingNumber, selectionMethod: 'manual', coordinate: null })} placeholder="Bina numarası (isteğe bağlı)" placeholderTextColor="#64748B" style={s.manualInput} /><Text style={s.unknown}>Bu alanlar kullanıcı girişidir ve resmî kayıttan doğrulanmamıştır.</Text></View>; }

const s = StyleSheet.create({ safe: { flex: 1, backgroundColor: '#F8FAFC' }, content: { padding: 20, paddingBottom: 112 }, eyebrow: { color: '#0369A1', fontSize: 11, fontWeight: '800', letterSpacing: 1.2 }, title: { color: '#0F172A', fontSize: 27, fontWeight: '800', marginTop: 7 }, subtitle: { color: '#475569', fontSize: 14, lineHeight: 21, marginTop: 5 }, notice: { flexDirection: 'row', gap: 8, backgroundColor: '#FFFBEB', borderColor: '#FDE68A', borderWidth: 1, borderRadius: 14, padding: 12, marginTop: 16 }, noticeText: { flex: 1, color: '#78350F', fontSize: 11, lineHeight: 17 }, modeRow: { flexDirection: 'row', gap: 8, marginTop: 18 }, mode: { flex: 1, minHeight: 46, alignItems: 'center', justifyContent: 'center', borderRadius: 14, borderWidth: 1, borderColor: '#CBD5E1', backgroundColor: '#FFFFFF' }, modeSelected: { borderColor: '#0369A1', backgroundColor: '#E0F2FE' }, modeText: { color: '#475569', fontWeight: '700' }, modeTextSelected: { color: '#075985' }, sectionTitle: { color: '#0F172A', fontSize: 17, fontWeight: '800', marginTop: 24, marginBottom: 4 }, helper: { color: '#475569', fontSize: 12, lineHeight: 18 }, selector: { marginTop: 10 }, label: { color: '#334155', fontSize: 12, fontWeight: '700', marginBottom: 7, marginTop: 12 }, chips: { gap: 8 }, chip: { minHeight: 44, justifyContent: 'center', paddingHorizontal: 14, borderRadius: 12, borderWidth: 1, borderColor: '#CBD5E1', backgroundColor: '#FFFFFF' }, chipSelected: { borderColor: '#0369A1', backgroundColor: '#E0F2FE' }, chipText: { color: '#475569', fontWeight: '600' }, chipTextSelected: { color: '#075985', fontWeight: '800' }, disabled: { opacity: 0.48 }, inputRow: { minHeight: 56, flexDirection: 'row', alignItems: 'center', gap: 10, borderWidth: 1, borderColor: '#94A3B8', borderRadius: 15, paddingHorizontal: 14, backgroundColor: '#FFFFFF' }, input: { flex: 1, minHeight: 54, color: '#0F172A' }, results: { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 14, marginTop: 8, overflow: 'hidden', backgroundColor: '#FFFFFF' }, result: { minHeight: 58, justifyContent: 'center', paddingHorizontal: 14, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' }, resultText: { color: '#0F172A', fontWeight: '700' }, resultMeta: { color: '#64748B', fontSize: 11, marginTop: 3 }, resultState: { color: '#64748B', padding: 14 }, retry: { minHeight: 44, justifyContent: 'center', paddingHorizontal: 14 }, actionRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 }, textButton: { minHeight: 44, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, paddingHorizontal: 10 }, textButtonLabel: { color: '#0369A1', fontWeight: '800' }, message: { color: '#9A3412', backgroundColor: '#FFF7ED', borderRadius: 12, padding: 12, lineHeight: 18 }, summary: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 18, padding: 16, marginTop: 16 }, summaryLabel: { color: '#0369A1', fontSize: 11, fontWeight: '800' }, summaryTitle: { color: '#0F172A', fontSize: 17, fontWeight: '800', marginTop: 6 }, summaryMeta: { color: '#475569', fontSize: 12, marginTop: 5 }, manual: { marginTop: 10, gap: 8 }, manualTitle: { color: '#334155', fontWeight: '800' }, manualInput: { minHeight: 50, borderWidth: 1, borderColor: '#94A3B8', borderRadius: 13, paddingHorizontal: 13, color: '#0F172A', backgroundColor: '#FFFFFF' }, unknown: { color: '#64748B', fontSize: 11, lineHeight: 16, marginTop: 7 }, primary: { minHeight: 52, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0369A1', borderRadius: 15, marginTop: 16, paddingHorizontal: 18 }, primaryDisabled: { backgroundColor: '#94A3B8' }, primaryText: { color: '#FFFFFF', fontWeight: '800' } });
