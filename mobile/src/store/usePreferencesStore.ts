import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

import { defaultBuildingId } from '@/data/buildings';

/**
 * Kullanıcının anket cevapları, öncelik ağırlıkları ve harita/gizlilik
 * tercihleri. Prototipteki tek bileşenlik `state` nesnesinin yerini alır.
 */

/** Tek seçimli (radyo gibi davranan) chip grupları. */
const RADIO_GROUPS: Record<string, readonly string[]> = {
  intent: ['buy', 'rent', 'undecided'],
  quake: ['qmax', 'qbal', 'qinfo'],
  walk: ['w5', 'w15', 'w20'],
  noise: ['quiet', 'lively', 'avenue'],
  sun: ['sunS', 'sunE', 'sunN', 'sunAny'],
  areaFilter: ['fAll', 'fGround', 'fRail', 'fGreen'],
};

export type WeightKey = 'quake' | 'transit' | 'school' | 'climate';

export interface UserProfile {
  fullName: string;
  email: string;
}

export interface PrivacySettings {
  maskLocation: boolean;
  keepSearchHistory: boolean;
  personalizedRanking: boolean;
  reportNotifications: boolean;
  theme: 'light' | 'dark' | 'system';
}

interface PreferencesState {
  profile: UserProfile;
  /** Seçili chip kimlikleri. */
  selections: Record<string, boolean>;
  /** Afet hassasiyet ağırlığı (1..5). */
  sensitivity: number;
  /** Öncelik çarkı ağırlıkları (%). */
  weights: Record<WeightKey, number>;
  /** Haritada seçili bina. */
  selectedBuildingId: string;
  /** Harita katman opaklığı (%). */
  layerOpacity: number;
  privacy: PrivacySettings;

  toggleSelection: (id: string) => void;
  isSelected: (id: string) => boolean;
  setSensitivity: (value: number) => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  setWeight: (key: WeightKey, value: number) => void;
  selectBuilding: (id: string) => void;
  setLayerOpacity: (value: number) => void;
  setPrivacy: <K extends keyof PrivacySettings>(key: K, value: PrivacySettings[K]) => void;
  resetSurvey: () => void;
}

const DEFAULT_SELECTIONS: Record<string, boolean> = {
  fam: true,
  buy: true,
  qmax: true,
  flood: true,
  slope: true,
  rail: true,
  w5: true,
  school: true,
  park: true,
  health: true,
  gather: true,
  quiet: true,
  sunS: true,
  fAll: true,
  lGround: true,
};

function groupOf(id: string): readonly string[] | undefined {
  return Object.values(RADIO_GROUPS).find((group) => group.includes(id));
}

const WEIGHT_KEYS: readonly WeightKey[] = ['quake', 'transit', 'school', 'climate'];
const STORAGE_KEY = 'ev-karnesi-preferences';

function normalizeWeight(value: number): number {
  return Math.max(0, Math.min(60, Math.round(value / 5) * 5));
}

function rebalanceWeights(
  current: Record<WeightKey, number>,
  changedKey: WeightKey,
  value: number,
): Record<WeightKey, number> {
  const next = { ...current, [changedKey]: normalizeWeight(value) };
  const otherKeys = WEIGHT_KEYS.filter((key) => key !== changedKey);
  let difference = 100 - Object.values(next).reduce((sum, weight) => sum + weight, 0);

  for (let pass = 0; pass < 20 && difference !== 0; pass += 1) {
    for (const key of otherKeys) {
      if (difference > 0 && next[key] < 60) {
        next[key] += 5;
        difference -= 5;
      } else if (difference < 0 && next[key] > 0) {
        next[key] -= 5;
        difference += 5;
      }

      if (difference === 0) break;
    }
  }

  return next;
}

export const usePreferencesStore = create<PreferencesState>((set, get) => ({
      profile: {
        fullName: 'Deniz Yılmaz',
        email: 'deniz.yilmaz@example.com',
      },
      selections: { ...DEFAULT_SELECTIONS },
      sensitivity: 4,
      weights: { quake: 35, transit: 25, school: 20, climate: 20 },
      selectedBuildingId: defaultBuildingId,
      layerOpacity: 70,
      privacy: {
        maskLocation: true,
        keepSearchHistory: true,
        personalizedRanking: true,
        reportNotifications: true,
        theme: 'light',
      },

      toggleSelection: (id) =>
        set((state) => {
          const next = { ...state.selections };
          const group = groupOf(id);
          if (group) {
            group.forEach((member) => delete next[member]);
            next[id] = true;
          } else if (next[id]) {
            delete next[id];
          } else {
            next[id] = true;
          }
          return { selections: next };
        }),

      isSelected: (id) => Boolean(get().selections[id]),

      setSensitivity: (value) => set({ sensitivity: value }),

      updateProfile: (profile) =>
        set((state) => ({ profile: { ...state.profile, ...profile } })),

      setWeight: (key, value) =>
        set((state) => ({ weights: rebalanceWeights(state.weights, key, value) })),

      selectBuilding: (id) => set({ selectedBuildingId: id }),

      setLayerOpacity: (value) => set({ layerOpacity: value }),

      setPrivacy: (key, value) =>
        set((state) => ({ privacy: { ...state.privacy, [key]: value } })),

      resetSurvey: () =>
        set({
          selections: { ...DEFAULT_SELECTIONS },
          sensitivity: 4,
          weights: { quake: 35, transit: 25, school: 20, climate: 20 },
        }),
}));

type PersistedPreferences = Pick<
  PreferencesState,
  'profile' | 'selections' | 'sensitivity' | 'weights' | 'selectedBuildingId' | 'layerOpacity' | 'privacy'
>;

function persistedPreferences(state: PreferencesState): PersistedPreferences {
  return {
    profile: state.profile,
    selections: state.selections,
    sensitivity: state.sensitivity,
    weights: state.weights,
    selectedBuildingId: state.selectedBuildingId,
    layerOpacity: state.layerOpacity,
    privacy: state.privacy,
  };
}

usePreferencesStore.subscribe((state) => {
  void AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(persistedPreferences(state)));
});

void AsyncStorage.getItem(STORAGE_KEY).then((stored) => {
  if (!stored) return;

  try {
    usePreferencesStore.setState(JSON.parse(stored) as Partial<PreferencesState>);
  } catch {
    void AsyncStorage.removeItem(STORAGE_KEY);
  }
});

/** Ağırlık toplamı — profil ekranında "Toplam %100" göstergesi için. */
export function selectWeightTotal(state: PreferencesState): number {
  return Object.values(state.weights).reduce((sum, value) => sum + value, 0);
}
