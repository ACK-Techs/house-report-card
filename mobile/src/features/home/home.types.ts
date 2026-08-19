export type ResearchMode = 'property' | 'area';

export type RecentResearch = {
  id: string;
  locationLabel: string;
  contextLabel: 'Ev incelemesi' | 'Bölge araştırması';
  lastViewedLabel: string;
  statusLabel?: 'Rapor hazır' | 'İnceleme sürüyor' | 'Veri güncellendi' | 'Çevrimdışı';
  target: string;
};

export type RecentResearchState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'empty' }
  | { status: 'populated'; items: RecentResearch[] };

export type HomeViewModel = {
  userName: string | null;
  needsPreferences: boolean;
  recentResearch: RecentResearchState;
};
