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

export interface PrivacySettings {
  maskLocation: boolean;
  keepSearchHistory: boolean;
  personalizedRanking: boolean;
  reportNotifications: boolean;
  theme: 'light' | 'dark' | 'system';
}

interface PreferencesState {
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

export const usePreferencesStore = create<PreferencesState>((set, get) => ({
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
        // Tek seçimli grup: diğer üyeleri temizle, seçileni işaretle.
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

  setWeight: (key, value) =>
    set((state) => ({ weights: { ...state.weights, [key]: value } })),

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

/** Ağırlık toplamı — profil ekranında "Toplam %100" göstergesi için. */
export function selectWeightTotal(state: PreferencesState): number {
  return Object.values(state.weights).reduce((sum, value) => sum + value, 0);
}
