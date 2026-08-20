/**
 * Ürün alan modeli.
 *
 * Ürün değişmezi: risk seviyesi ile veri güven seviyesi ayrı alanlardır ve
 * asla tek bir rozette birleştirilmez. Veri yokluğu (`confidence: 'none'`)
 * düşük risk anlamına gelmez.
 */

/** Veri güven seviyesi — kaynak rozetlerinde ●●● / ●●○ / ●○○ olarak gösterilir. */
export type Confidence = 'high' | 'medium' | 'low' | 'none';

/** Verinin coğrafi çözünürlüğü. Bina düzeyi ile bölge tahmini karıştırılmaz. */
export type GeoResolution = 'building' | 'parcel' | 'street' | 'neighborhood' | 'district';

export interface SourceRef {
  /** Kaynak kurum / veri seti adı */
  label: string;
  confidence: Confidence;
  /** Verinin yayın / güncelleme yılı */
  year?: string;
  resolution?: GeoResolution;
}

export interface MetricRow {
  label: string;
  value: string;
  /** Değerin semantik tonu; verilmezse nötr gösterilir. */
  tone?: 'positive' | 'caution' | 'danger' | 'neutral';
}

/** Rapordaki 5 temel performans ekseninden biri. */
export interface ReportAxis {
  id: string;
  icon: string;
  title: string;
  summary: string;
  score: number;
  rows: MetricRow[];
  /** Eksenin coğrafi çözünürlüğü — bina düzeyi ile bölge tahmini karıştırılmaz. */
  resolution?: GeoResolution;
  sources: SourceRef[];
}

export interface Building {
  id: string;
  title: string;
  /** Harita kartındaki tek satırlık özet */
  meta: string;
  year: string;
  score: number;
}

export interface PropertyReport {
  id: string;
  district: string;
  address: string;
  generatedAt: string;
  methodologyVersion: string;
  score: number;
  grade: string;
  /** Veri tamlığı yüzdesi — skorun kendisinden bağımsız raporlanır. */
  dataCompleteness: number;
  completenessLabel: string;
  radar: { label: string; value: number }[];
  radarInsight: string;
  warnings: string[];
  axes: ReportAxis[];
}

export interface NeighborhoodSummary {
  id: string;
  name: string;
  city: string;
  district: string;
  score: number;
  tags: { label: string; missing?: boolean }[];
}

export interface AreaStat {
  label: string;
  value: string;
  note: string;
  tone: 'positive' | 'caution' | 'neutral' | 'primary';
}

export interface AreaReport {
  id: string;
  city: string;
  district: string;
  name: string;
  score: number;
  subtitle: string;
  stats: AreaStat[];
  buildingStock: { label: string; percent: number; color: string }[];
  amenities: { icon: string; label: string; count: number; bg: string }[];
}

export type CompareVerdict = 'better' | 'worse' | 'neutral' | 'unknown';

export interface CompareRow {
  label: string;
  a: { text: string; verdict: CompareVerdict };
  b: { text: string; verdict: CompareVerdict };
}

export interface HistoryEntry {
  id: string;
  title: string;
  meta: string;
  score: number;
  kind: 'property' | 'area';
}

export interface SavedProperty {
  id: string;
  district: string;
  address: string;
  meta: string;
  score: number;
  updateCount?: number;
}

export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
}
