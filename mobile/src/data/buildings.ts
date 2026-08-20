import type { Building } from '@/types';

/** Harita üzerinde seçilebilen bina ayak izleri (prototip verisi). */
export interface BuildingFootprint extends Building {
  /** 390x844 tasarım çerçevesine göre normalize konum ve ölçü. */
  frame: { top: number; left: number; width: number; height: number };
  shortLabel: string;
}

export const buildingFootprints: BuildingFootprint[] = [
  {
    id: 'b38',
    shortLabel: 'No: 38',
    title: 'Moda Cd. No: 38',
    meta: '1996 Yapımı · 5 Kat · Parsel eşleşmesi: Orta güven',
    year: '1996',
    score: 61,
    frame: { top: 158, left: 186, width: 78, height: 62 },
  },
  {
    id: 'b42',
    shortLabel: 'No: 42',
    title: 'Moda Cd. No: 42',
    meta: '2014 Yapımı · 6 Kat · Parsel eşleşmesi: Yüksek güven',
    year: '2014',
    score: 82,
    frame: { top: 288, left: 190, width: 92, height: 66 },
  },
  {
    id: 'b7',
    shortLabel: 'No: 7',
    title: 'Şair Latifi Sk. No: 7',
    meta: '2005 Yapımı · 4 Kat · Parsel eşleşmesi: Yüksek güven',
    year: '2005',
    score: 74,
    frame: { top: 300, left: 34, width: 84, height: 74 },
  },
  {
    id: 'b12',
    shortLabel: 'No: 12',
    title: 'Aynalı Çeşme Sk. No: 12',
    meta: '1988 Yapımı · 5 Kat · Ruhsat kaydı doğrulanmadı',
    year: '1988',
    score: 54,
    frame: { top: 392, left: 196, width: 80, height: 52 },
  },
];

export const defaultBuildingId = 'b42';

export function findBuilding(id: string): BuildingFootprint {
  return buildingFootprints.find((b) => b.id === id) ?? buildingFootprints[1]!;
}

/** Haritada açılıp kapanabilen veri katmanları. */
export const mapLayers = [
  { id: 'lGround', label: 'Zemin Riski', icon: '🟡' },
  { id: 'lTransit', label: 'Ulaşım Ağı', icon: '🚇' },
  { id: 'lFlood', label: 'Taşkın / Heyelan', icon: '🌊' },
  { id: 'lPermit', label: 'Ruhsatlı Yapılar', icon: '🏛' },
] as const;

/** Bölge keşfi ekranındaki filtre grubu (tek seçim). */
export const areaFilters = [
  { id: 'fAll', label: 'Tümü' },
  { id: 'fGround', label: 'Zemin Grubu (ZA/ZB)' },
  { id: 'fRail', label: 'Raylı Sistem' },
  { id: 'fGreen', label: 'Yeşil Alan m²' },
] as const;
