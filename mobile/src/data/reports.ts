import { colors } from '@/theme';
import type { AreaReport, CompareRow, PropertyReport } from '@/types';

export const propertyReport: PropertyReport = {
  id: 'moda-42',
  district: 'Kadıköy / Caferağa',
  address: 'Moda Cd. No: 42',
  generatedAt: '19 Ağustos 2026',
  methodologyVersion: 'v1.2',
  score: 82,
  grade: 'A− Güçlü Denge',
  dataCompleteness: 88,
  completenessLabel: '%88 Yüksek güven',
  radar: [
    { label: 'Zemin', value: 88 },
    { label: 'Yapı', value: 74 },
    { label: 'Ulaşım', value: 95 },
    { label: 'Çevre', value: 86 },
    { label: 'İklim', value: 68 },
  ],
  radarInsight: 'En güçlü eksen ulaşım; en zayıf eksen iklim ve güneşlenme.',
  warnings: [
    'Bölgedeki otopark kapasitesi düşük; zemin katta ticari dükkân bulunuyor.',
    '2018 TDY sonrası güçlendirme kaydı doğrulanamadı — ev sahibine sorun.',
  ],
  axes: [
    {
      id: 'a1',
      icon: '🌋',
      title: 'Zemin & Deprem Dayanımı',
      summary: 'ZB kaya/sıkı · Faya 14.2 km',
      score: 88,
      rows: [
        { label: 'Zemin sınıfı', value: 'ZB (Kaya / Sıkı)' },
        { label: 'Fay hattına mesafe', value: '~14.2 km (K. Marmara)' },
        { label: 'Sıvılaşma riski', value: 'Çok düşük', tone: 'positive' },
      ],
      resolution: 'parcel',
      sources: [{ label: 'AFAD & MTA', year: '2024', confidence: 'high' }],
    },
    {
      id: 'a2',
      icon: '🏗',
      title: 'Yapı, Ruhsat & Mevzuat',
      summary: '2016 yapımı · 5 kat · İskânlı',
      score: 74,
      rows: [
        { label: 'Yapım yılı', value: '2016 (2007 TDY sonrası)' },
        { label: 'İskân durumu', value: 'Var (Kat Mülkiyeti)' },
        { label: 'Güçlendirme kaydı', value: 'Doğrulanmadı', tone: 'neutral' },
      ],
      sources: [
        { label: 'Belediye İmar / TKGM', confidence: 'medium' },
        { label: 'Güçlendirme: veri yok', confidence: 'none' },
      ],
    },
    {
      id: 'a3',
      icon: '🚇',
      title: 'Ulaşım & Erişilebilirlik',
      summary: 'Metro 4 dk · Vapur 8 dk',
      score: 95,
      rows: [
        { label: 'M4 Metro (Kadıköy)', value: '320 m · ~4 dk' },
        { label: 'Vapur iskelesi', value: '640 m · ~8 dk' },
        { label: 'Otobüs durağı', value: '50 m' },
      ],
      sources: [{ label: 'İBB Ulaşım CBS', year: '2026', confidence: 'high' }],
    },
    {
      id: 'a4',
      icon: '🌳',
      title: 'Çevre, Donatı & Yaşam',
      summary: 'Park 120 m · Gürültü 52 dB',
      score: 86,
      rows: [
        { label: 'En yakın park', value: '120 m (Moda Sahil)' },
        { label: 'Gürültü seviyesi', value: 'Düşük-orta (52 dB)', tone: 'caution' },
        { label: '300 m içinde okul/sağlık', value: '4 adet' },
      ],
      resolution: 'neighborhood',
      sources: [{ label: 'Açık Veri Portalı', confidence: 'medium' }],
    },
    {
      id: 'a5',
      icon: '☀',
      title: 'İklim, Güneşlenme & Altyapı',
      summary: 'Güney-doğu cephe · 6.5 sa/gün',
      score: 68,
      rows: [
        { label: 'Cephe / günlük ışık', value: 'Güney-doğu · 6.5 sa' },
        { label: 'Su baskını riski', value: 'Taşkın havzası dışında', tone: 'positive' },
        { label: 'Fiber internet', value: '1000 Mbps aktif' },
      ],
      sources: [
        { label: 'MGM', year: '2025', confidence: 'high' },
        { label: 'Altyapı haritası', confidence: 'medium' },
      ],
    },
  ],
};

export const areaReport: AreaReport = {
  id: 'caferaga',
  city: 'İstanbul',
  district: 'Kadıköy',
  name: 'Caferağa Mahallesi',
  score: 89,
  subtitle: 'Yaşam ve güvenlik göstergeleri özeti',
  stats: [
    {
      label: 'Kişi başı yeşil alan',
      value: '4.8 m²',
      note: 'İlçe ortalaması üstünde',
      tone: 'positive',
    },
    { label: 'Toplanma alanı', value: '3 adet', note: 'En yakını 180 m', tone: 'neutral' },
    { label: 'Ortalama bina yaşı', value: '24 yıl', note: "%25'i 1999 öncesi", tone: 'caution' },
    { label: 'Sosyal canlılık', value: '96/100', note: 'Kafe, pazar, sahil', tone: 'primary' },
  ],
  buildingStock: [
    { label: '2018 sonrası %35', percent: 35, color: colors.positive },
    { label: '2000-2018 %40', percent: 40, color: colors.caution },
    { label: '1999 öncesi %25', percent: 25, color: colors.danger },
  ],
  amenities: [
    { icon: '🏥', label: 'Hastane & sağlık merkezi', count: 6, bg: colors.dangerBg },
    { icon: '🏫', label: 'Okul & kreş', count: 11, bg: colors.positiveBgAlt },
    { icon: '🌳', label: 'Park & yeşil alan', count: 8, bg: colors.positiveBg },
    { icon: '⚡', label: 'Acil toplanma alanı', count: 3, bg: colors.cautionBg },
  ],
};

export const compareSubjects = {
  a: { badge: 'Bina A', name: 'Moda Apt.', score: 82 },
  b: { badge: 'Bina B', name: 'Fenerbahçe Park Evleri', score: 68 },
} as const;

export const compareRows: CompareRow[] = [
  {
    label: 'BİNA YAŞI',
    a: { text: '2016 · 10 yıl', verdict: 'better' },
    b: { text: '1994 · 32 yıl', verdict: 'worse' },
  },
  {
    label: 'ZEMİN & DEPREM',
    a: { text: 'ZB kaya · 88', verdict: 'better' },
    b: { text: 'ZD alüvyon · 61', verdict: 'worse' },
  },
  {
    label: 'ULAŞIM SÜRESİ',
    a: { text: 'Metro 4 dk', verdict: 'better' },
    b: { text: 'Otobüs 3 dk / Metro 16 dk', verdict: 'neutral' },
  },
  {
    label: 'GÜNEŞ ALMA',
    a: { text: '6.5 sa · GD cephe', verdict: 'neutral' },
    b: { text: '7.8 sa · G cephe', verdict: 'better' },
  },
  {
    label: 'İSKÂN / RUHSAT',
    a: { text: 'İskânlı', verdict: 'better' },
    b: { text: 'Doğrulanmadı', verdict: 'unknown' },
  },
];

export const compareConfidence = {
  a: { text: 'Yüksek', confidence: 'high' as const },
  b: { text: 'Orta (tahmini)', confidence: 'medium' as const },
};

/** Kıyaslama sonucundaki açıklama; öncelik ağırlığı runtime'da eklenir. */
export function compareVerdictText(quakeWeightPercent: string): string {
  return (
    `Önceliklerinizde deprem ve zemin ekseni ${quakeWeightPercent} ağırlıkta. ` +
    'Bina A zemin ve ruhsat eksenlerinde belirgin biçimde üstün; Bina B yalnızca ' +
    "güneşlenmede öne geçiyor. Bina B'nin ruhsat verisi doğrulanmadığı için " +
    'karşılaştırma eksik veriyle yapılmıştır.'
  );
}
