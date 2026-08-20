import { DefaultTheme, NavigationContainer, type Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AreaReportScreen } from '@/screens/AreaReportScreen';
import { AreaScreen } from '@/screens/AreaScreen';
import { ConfirmLocationScreen } from '@/screens/ConfirmLocationScreen';
import { HelpScreen } from '@/screens/HelpScreen';
import { HistoryScreen } from '@/screens/HistoryScreen';
import { PropertyReportScreen } from '@/screens/PropertyReportScreen';
import { RegisterScreen } from '@/screens/RegisterScreen';
import { SettingsScreen } from '@/screens/SettingsScreen';
import { SurveyScreen } from '@/screens/SurveyScreen';
import { WelcomeScreen } from '@/screens/WelcomeScreen';
import { colors, fonts } from '@/theme';

import { MainTabs } from './MainTabs';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const navigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.background,
    card: colors.surface,
    text: colors.ink,
    border: colors.border,
  },
  fonts: {
    regular: { fontFamily: fonts.bodyRegular, fontWeight: '400' },
    medium: { fontFamily: fonts.bodyMedium, fontWeight: '500' },
    bold: { fontFamily: fonts.bodyBold, fontWeight: '700' },
    heavy: { fontFamily: fonts.displayBlack, fontWeight: '800' },
  },
};

export function RootNavigator() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: 'slide_from_right',
        }}
      >
        {/* Onboarding — alt sekme çubuğu gizli */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ animation: 'fade' }} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen
          name="Survey"
          component={SurveyScreen}
          options={{ gestureEnabled: false }}
        />

        {/* Ana uygulama */}
        <Stack.Screen name="Main" component={MainTabs} options={{ animation: 'fade' }} />

        {/* Detay ekranları */}
        <Stack.Screen
          name="ConfirmLocation"
          component={ConfirmLocationScreen}
          options={{ presentation: 'transparentModal', animation: 'slide_from_bottom' }}
        />
        <Stack.Screen name="PropertyReport" component={PropertyReportScreen} />
        <Stack.Screen name="Area" component={AreaScreen} />
        <Stack.Screen name="AreaReport" component={AreaReportScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
