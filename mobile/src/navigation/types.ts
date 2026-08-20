import type { NavigatorScreenParams } from '@react-navigation/native';

/** Alt sekme çubuğunun görünür olduğu ekranlar. */
export type MainTabParamList = {
  HomeTab: undefined;
  SearchTab: undefined;
  CompareTab: undefined;
  SavedTab: undefined;
  ProfileTab: undefined;
};

/**
 * Kök yığın.
 *
 * Karşılama, kayıt ve anket ekranları sekme çubuğunun dışında kalır
 * (bkz. docs/frontend-screen-architecture-and-flows.md — "Gizli" navigasyon).
 */
export type RootStackParamList = {
  Welcome: undefined;
  Register: undefined;
  Survey: undefined;
  Main: NavigatorScreenParams<MainTabParamList>;
  ConfirmLocation: { buildingId: string };
  PropertyReport: { propertyId: string };
  Area: undefined;
  AreaReport: { areaId: string };
  History: undefined;
  Settings: undefined;
  Help: undefined;
};

declare global {
  namespace ReactNavigation {
    // React Navigation'ın global rota tipini bu yığınla eşitler; üye eklenmez.
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends RootStackParamList {}
  }
}
