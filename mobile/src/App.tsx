import {
  IBMPlexMono_500Medium,
  IBMPlexMono_600SemiBold,
} from '@expo-google-fonts/ibm-plex-mono';
import {
  IBMPlexSans_400Regular,
  IBMPlexSans_500Medium,
  IBMPlexSans_600SemiBold,
  IBMPlexSans_700Bold,
} from '@expo-google-fonts/ibm-plex-sans';
import {
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_600SemiBold,
  Outfit_700Bold,
  Outfit_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/outfit';
import { StatusBar } from 'expo-status-bar';
import { useCallback } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ToastHost } from '@/components/ui';
import { RootNavigator } from '@/navigation/RootNavigator';
import { colors } from '@/theme';

/**
 * Uygulama kökü.
 *
 * Tipografi tasarımın ayrılmaz parçası olduğu için yazı tipleri yüklenene
 * kadar hiçbir ekran render edilmez; böylece sistem yazı tipiyle bir kare
 * "sıçrama" yaşanmaz.
 */
export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_600SemiBold,
    Outfit_700Bold,
    Outfit_800ExtraBold,
    IBMPlexSans_400Regular,
    IBMPlexSans_500Medium,
    IBMPlexSans_600SemiBold,
    IBMPlexSans_700Bold,
    IBMPlexMono_500Medium,
    IBMPlexMono_600SemiBold,
  });

  const ready = fontsLoaded || Boolean(fontError);

  const renderApp = useCallback(
    () => (
      <>
        <RootNavigator />
        <ToastHost />
      </>
    ),
    [],
  );

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" backgroundColor={colors.background} />
      {ready ? renderApp() : <View style={{ flex: 1, backgroundColor: colors.background }} />}
    </SafeAreaProvider>
  );
}
