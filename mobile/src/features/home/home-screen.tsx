import { router } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { HomeHeader } from './components/home-header';
import { PreferencesReminder } from './components/preferences-reminder';
import { RecentResearchSection } from './components/recent-research-section';
import { ResearchActions } from './components/research-actions';
import { homeTheme as c } from './home-theme';
import type { ResearchMode } from './home.types';
import { useHomeState } from './hooks/use-home-state';

export function HomeScreen() {
  const { viewModel, retryRecentResearch } = useHomeState();
  const openMode = (mode: ResearchMode) => router.push({ pathname: '/(tabs)/map', params: { mode } });
  const openProfile = () => router.push({ pathname: '/(tabs)/profile', params: { section: 'priorities' } });
  return <SafeAreaView style={s.safeArea}><ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled"><HomeHeader userName={viewModel.userName} onProfilePress={() => router.push('/(tabs)/profile')} /><ResearchActions onSearch={() => openMode('property')} onModePress={openMode} /><RecentResearchSection state={viewModel.recentResearch} onPropertySearch={() => openMode('property')} onAreaSearch={() => openMode('area')} onRetry={retryRecentResearch} onResearchPress={(target) => router.push(target as never)} />{viewModel.needsPreferences && <PreferencesReminder onPress={openProfile} />}</ScrollView></SafeAreaView>;
}
const s = StyleSheet.create({ safeArea: { flex: 1, backgroundColor: c.background }, content: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 112 } });
