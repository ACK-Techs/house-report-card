import type {
  FaqEntry,
  HistoryEntry,
  NeighborhoodSummary,
  SavedProperty,
  SourceRef,
} from '@/types';

/** Ana sayfadaki "Mahalle Nabzı" karuseli. */
export const neighborhoodPulse: NeighborhoodSummary[] = [
  {
    id: 'moda',
    name: 'Kadıköy / Moda',
    city: 'İstanbul',
    district: 'Kadıköy',
    score: 84,
    tags: [{ label: 'Zemin: ZB' }, { label: 'Ulaşım: A' }],
  },
  {
    id: 'abbasaga',
    name: 'Beşiktaş / Abbasağa',
    city: 'İstanbul',
    district: 'Beşiktaş',
    score: 71,
    tags: [{ label: 'Zemin: ZC' }, { label: 'Eski stok' }],
  },
  {
    id: 'kosuyolu',
    name: 'Üsküdar / Koşuyolu',
    city: 'İstanbul',
    district: 'Üsküdar',
    score: 79,
    tags: [{ label: 'Yeşil alan' }, { label: 'Sakin' }],
  },
];

/** Ana sayfadaki son incelenen bina kartları. */
export const recentReports = [
  {
    id: 'moda-42',
    district: 'Kadıköy / Caferağa',
    address: 'Moda Cd. No: 42',
    score: 82,
    highlights: [
      { label: '🛡 DÜŞÜK ZEMİN RİSKİ', tone: 'positive' as const },
      { label: '🚇 4 DK METRO', tone: 'positive' as const },
    ],
  },
  {
    id: 'ihlamur-18',
    district: 'Beşiktaş / Abbasağa',
    address: 'Ihlamur Yolu Sk. No: 18',
    score: 68,
    highlights: [
      { label: '⚠ 1999 ÖNCESİ BİNA', tone: 'caution' as const },
      { label: '? RUHSAT DOĞRULANMADI', tone: 'neutral' as const },
    ],
  },
];

/** Bölge keşfi listesindeki mahalleler. */
export const areaNeighborhoods: (NeighborhoodSummary & { shapeTone: string })[] = [
  {
    id: 'caferaga',
    name: 'Caferağa',
    city: 'İstanbul',
    district: 'Kadıköy',
    score: 89,
    shapeTone: 'primary',
    tags: [{ label: 'Zemin ZB' }, { label: 'Ulaşım 95' }, { label: 'Yeşil 4.8 m²' }],
  },
  {
    id: 'rasimpasa',
    name: 'Rasimpaşa',
    city: 'İstanbul',
    district: 'Kadıköy',
    score: 72,
    shapeTone: 'caution',
    tags: [
      { label: 'Zemin ZC' },
      { label: 'Eski stok %48' },
      { label: 'Gürültü: veri yok', missing: true },
    ],
  },
  {
    id: 'fenerbahce',
    name: 'Fenerbahçe',
    city: 'İstanbul',
    district: 'Kadıköy',
    score: 85,
    shapeTone: 'positive',
    tags: [{ label: 'Zemin ZB' }, { label: 'Yeşil 6.1 m²' }, { label: 'Kıyı taşkını: izle' }],
  },
];

export const savedProperties: SavedProperty[] = [
  {
    id: 'moda-42',
    district: 'Kadıköy / Caferağa',
    address: 'Moda Cd. No: 42',
    meta: '2016 yapımı · 82 uyum skoru',
    score: 82,
    updateCount: 1,
  },
  {
    id: 'ihlamur-18',
    district: 'Beşiktaş / Abbasağa',
    address: 'Ihlamur Yolu Sk. No: 18',
    meta: '1994 yapımı · 68 uyum skoru',
    score: 68,
  },
];

export const savedAreas = [
  { id: 'caferaga', name: 'Kadıköy / Caferağa', meta: 'Takip ediliyor · bölge notu 89', score: 89 },
  { id: 'kosuyolu', name: 'Üsküdar / Koşuyolu', meta: 'Takip ediliyor · bölge notu 79', score: 79 },
];

export const savedComparisons = [
  { id: 'cmp-1', title: 'Moda Apt. ↔ Fenerbahçe Park', meta: '2 bina · 19 Ağustos' },
  { id: 'cmp-2', title: 'Abbasağa ↔ Koşuyolu ↔ Moda', meta: '3 bina · 12 Ağustos' },
];

export const historyGroups: { label: string; active: boolean; entries: HistoryEntry[] }[] = [
  {
    label: 'BUGÜN',
    active: true,
    entries: [
      {
        id: 'h1',
        title: 'Moda Cd. No: 42',
        meta: 'Kadıköy · 14:20 · bina raporu',
        score: 82,
        kind: 'property',
      },
      {
        id: 'h2',
        title: 'Şair Latifi Sk. No: 7',
        meta: 'Kadıköy · 11:05 · bina raporu',
        score: 74,
        kind: 'property',
      },
    ],
  },
  {
    label: 'BU HAFTA',
    active: false,
    entries: [
      {
        id: 'h3',
        title: 'Avcılar / Ambarlı',
        meta: '17 Ağustos · 18:45 · bölge raporu',
        score: 58,
        kind: 'area',
      },
      {
        id: 'h4',
        title: 'Aynalı Çeşme Sk. No: 12',
        meta: '15 Ağustos · 09:30 · bina raporu',
        score: 54,
        kind: 'property',
      },
    ],
  },
];

/** Yardım ekranındaki metodoloji adımları. */
export const methodologySteps = [
  'Kaynak veri çekilir (AFAD, TKGM, İBB, MGM)',
  '0-100 aralığına normalize edilir, coğrafi çözünürlük etiketlenir',
  'Güven katsayısı uygulanır; eksik veri nötr kalır, düşük riske dönüşmez',
  'Öncelik ağırlıklarınızla toplanır → kişisel uyum skoru',
];

export const sourceLibrary: (SourceRef & { description: string })[] = [
  {
    label: 'AFAD & MTA',
    description: 'Deprem tehlike, fay, sıvılaşma',
    year: '2024',
    confidence: 'high',
  },
  {
    label: 'İBB Mikrobölgeleme',
    description: 'Zemin sınıfı, büyütme katsayısı',
    year: '2023',
    confidence: 'high',
  },
  {
    label: 'TKGM / Belediye İmar',
    description: 'Parsel, ruhsat, iskân',
    year: '2025',
    confidence: 'medium',
  },
  {
    label: 'MGM & OpenStreetMap',
    description: 'İklim, güneşlenme, donatı',
    year: '2026',
    confidence: 'medium',
  },
];

export const faqs: FaqEntry[] = [
  {
    id: 'f1',
    question: 'Ev Karnesi kesin dayanıklılık raporu mudur?',
    answer:
      'Hayır. Ev Karnesi resmî bir inşaat mühendisliği ekspertizi değildir. Karar vermeden ' +
      'önce bilmeniz gereken verileri ve yerinde uzmana sormanız gereken noktaları listeler.',
  },
  {
    id: 'f2',
    question: 'Veri bulunamayan alanlar ne anlama gelir?',
    answer:
      'Veri yokluğu “düşük risk” anlamına gelmez. Verisi eksik göstergeler nötr gri rozetle ' +
      'belirtilir ve yerinde kontrol önerilir.',
  },
  {
    id: 'f3',
    question: 'Bölge verisi ile bina verisi farkı nedir?',
    answer:
      'Bina düzeyi veriler parsele özgüdür ve 🏠 ikonuyla gösterilir. Mahalle/bölge tahminleri ' +
      '🗺 ikonuyla ayrılır; bir binanın gerçek performansını garanti etmez.',
  },
];

/** Tekrar eden yasal metinler tek yerde tutulur. */
export const legal = {
  homeDisclaimer:
    'Veriler AFAD, TKGM, İBB, MGM ve resmî CBS katmanlarından derlenir. Veri yokluğu düşük ' +
    'risk anlamına gelmez.',
  confirmNotice:
    'Ev Karnesi mühendislik dayanıklılık testi değildir; resmî ve açık verileri derleyen bir ' +
    'ön karar destek raporudur.',
  reportDisclaimer:
    'Bu karne resmî bilirkişi veya yapı denetim raporu yerine geçmez. Açık kamu verileri ve ' +
    'uydu analizlerinden derlenmiştir. Yapısal dayanım için yetkili mühendis incelemesi gerekir.',
  helpDisclaimer:
    'Ev Karnesi bağımsız bir karar destek platformudur; resmî ekspertiz, değerleme, sigorta ' +
    'veya kamu kurumu kararı niteliği taşımaz. Yapısal dayanım değerlendirmesi yalnızca ' +
    'yetkili mühendisin yerinde incelemesiyle yapılabilir.',
  kvkkBadge: 'KVKK uyumlu · Verileriniz şifrelenir, 3. taraflarla paylaşılmaz',
} as const;

/** Demo kullanıcı profili. */
export const demoUser = {
  fullName: 'Doğukan Taha Tıraş',
  email: 'dogukan@acktechs.com',
  initials: 'DT',
  badge: 'DOĞRULANMIŞ BİREYSEL KULLANICI',
} as const;
