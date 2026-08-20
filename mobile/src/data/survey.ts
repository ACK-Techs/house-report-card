/**
 * Kişiselleştirme anketinin içerik tanımı.
 *
 * Ekranlar bu tablodan render edilir; yeni bir soru eklemek için JSX değil
 * yalnızca bu dosya değişir.
 */

export interface SurveyOption {
  id: string;
  label: string;
  icon: string;
  /** Uzun formatlı seçenek kartlarında gösterilen açıklama. */
  description?: string;
}

export interface SurveyQuestion {
  id: string;
  title: string;
  /** `single` seçenekler radyo grubu gibi davranır. */
  mode: 'single' | 'multi';
  layout: 'wrap' | 'stack';
  options: SurveyOption[];
}

export interface SurveyStep {
  step: number;
  label: string;
  category: string;
  questions: SurveyQuestion[];
  /** Adıma özel ek kontroller (slider, bölge seçimi, özet kartı). */
  extras?: ('sensitivity' | 'regionPicker' | 'weightSummary')[];
}

export const surveySteps: SurveyStep[] = [
  {
    step: 1,
    label: 'Adım 1 / 5',
    category: 'Hane ve Kullanım Amacı',
    questions: [
      {
        id: 'household',
        title: 'Bu evi kimin için araştırıyorsun?',
        mode: 'multi',
        layout: 'wrap',
        options: [
          { id: 'fam', label: 'Çocuklu Aile', icon: '👪' },
          { id: 'pair', label: 'Tek / Çift Yaşayan', icon: '💼' },
          { id: 'student', label: 'Öğrenci', icon: '🎓' },
          { id: 'remote', label: 'Uzaktan Çalışan', icon: '💻' },
          { id: 'elder', label: 'Yaşlı / Kısıtlı Birey', icon: '👩' },
          { id: 'invest', label: 'Yatırım Amaçlı', icon: '📈' },
        ],
      },
      {
        id: 'intent',
        title: 'Konut kararınız nedir?',
        mode: 'single',
        layout: 'wrap',
        options: [
          { id: 'buy', label: 'Satın Almak İstiyorum', icon: '🔑' },
          { id: 'rent', label: 'Kiralamak İstiyorum', icon: '📋' },
          { id: 'undecided', label: 'Karşılaştırıyorum', icon: '🔍' },
        ],
      },
    ],
  },
  {
    step: 2,
    label: 'Adım 2 / 5',
    category: 'Afet ve Zemin Hassasiyeti',
    questions: [
      {
        id: 'quake',
        title: 'Deprem ve zemin güvenliği yaklaşımınız',
        mode: 'single',
        layout: 'stack',
        options: [
          {
            id: 'qmax',
            label: 'Maksimum Güvenlik Öncelikli',
            icon: '🛡',
            description: 'Kaya/sağlam zemin, 2018 TDY sonrası yapı veya güçlendirilmiş bina',
          },
          {
            id: 'qbal',
            label: 'Dengeli Güvenlik ve Yaşam',
            icon: '⚖',
            description: 'Genel güvenlik kriterleri ve sosyal yaşam/ulaşım dengesi',
          },
          {
            id: 'qinfo',
            label: 'Bilgi ve Şeffaflık Odaklı',
            icon: '🔍',
            description: 'Riskleri şeffaf görmek yeterli, önceliklerim farklı',
          },
        ],
      },
      {
        id: 'hazards',
        title: 'İzlenmesini istediğiniz diğer afetler',
        mode: 'multi',
        layout: 'wrap',
        options: [
          { id: 'flood', label: 'Sel ve Su Baskını', icon: '🌊' },
          { id: 'slope', label: 'Dik Eğim / Heyelan', icon: '⛰' },
          { id: 'fire', label: 'Yangın Maruziyeti', icon: '🌲' },
          { id: 'coast', label: 'Kıyı Taşkını & Rüzgâr', icon: '💨' },
        ],
      },
    ],
    extras: ['sensitivity'],
  },
  {
    step: 3,
    label: 'Adım 3 / 5',
    category: 'Ulaşım ve Hareketlilik',
    questions: [
      {
        id: 'mobility',
        title: 'Günlük hayatta en çok nasıl seyahat ediyorsunuz?',
        mode: 'multi',
        layout: 'wrap',
        options: [
          { id: 'rail', label: 'Metro & Raylı Sistem', icon: '🚇' },
          { id: 'walkbike', label: 'Yürüyerek & Bisiklet', icon: '🚶' },
          { id: 'car', label: 'Özel Araç (Otopark)', icon: '🚗' },
          { id: 'wfh', label: 'Evden Çalışan', icon: '🏠' },
        ],
      },
      {
        id: 'walk',
        title: 'Toplu taşımaya maksimum yürüme süreniz',
        mode: 'single',
        layout: 'wrap',
        options: [
          { id: 'w5', label: 'En fazla 5-7 dk (~400 m)', icon: '⚡' },
          { id: 'w15', label: '10-15 dk (~1 km)', icon: '🚶' },
          { id: 'w20', label: '20+ dk (Fark etmez)', icon: '⏱' },
        ],
      },
    ],
  },
  {
    step: 4,
    label: 'Adım 4 / 5',
    category: 'Mahalle ve Çevre',
    questions: [
      {
        id: 'amenities',
        title: 'Evinizin çevresinde zorunlu gördükleriniz',
        mode: 'multi',
        layout: 'wrap',
        options: [
          { id: 'school', label: 'Okul ve Kreş', icon: '🏫' },
          { id: 'park', label: 'Park ve Yeşil Alan', icon: '🌳' },
          { id: 'health', label: 'Hastane ve Eczane', icon: '🏥' },
          { id: 'gather', label: 'Acil Toplanma Alanı', icon: '⚡' },
          { id: 'market', label: 'Süpermarket & Pazar', icon: '🛒' },
          { id: 'cafe', label: 'Kafe ve Sosyal Mekân', icon: '☕' },
        ],
      },
      {
        id: 'noise',
        title: 'Gürültü ve sokak ortamı beklentiniz',
        mode: 'single',
        layout: 'wrap',
        options: [
          { id: 'quiet', label: 'Sakin Ara Sokak', icon: '🤫' },
          { id: 'lively', label: 'Canlı ve Sosyal', icon: '☕' },
          { id: 'avenue', label: 'Ana Caddeye Yakın', icon: '🏙' },
        ],
      },
    ],
  },
  {
    step: 5,
    label: 'Adım 5 / 5',
    category: 'İklim ve Hedef Bölge',
    questions: [
      {
        id: 'sun',
        title: 'Güneş ve cephe tercihiniz',
        mode: 'single',
        layout: 'wrap',
        options: [
          { id: 'sunS', label: 'Bol Güneş (Güney)', icon: '☀' },
          { id: 'sunE', label: 'Sabah Güneşi (Doğu)', icon: '⛅' },
          { id: 'sunN', label: 'Serin (Kuzey)', icon: '❄' },
          { id: 'sunAny', label: 'Fark etmez', icon: '🔄' },
        ],
      },
    ],
    extras: ['regionPicker', 'weightSummary'],
  },
];

/** Afet hassasiyet sürgüsünün etiketleri (1..5). */
export const sensitivityLabels: Record<number, string> = {
  1: 'Düşük',
  2: 'Az',
  3: 'Orta',
  4: 'Yüksek',
  5: 'Hayati Önem',
};

/** Öncelikli bölge seçici için örnek kaskad. */
export const regionOptions = {
  cities: ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Kocaeli'],
  districts: ['Kadıköy', 'Beşiktaş', 'Üsküdar', 'Şişli', 'Bakırköy', 'Avcılar'],
  neighborhoods: ['Caferağa / Moda', 'Caddebostan', 'Fenerbahçe', 'Göztepe'],
} as const;

/** Anket tamamlandığında gösterilen özet modalindeki kriter satırları. */
export const completionCriteria = [
  'Çocuklu Aile',
  'Maks. Deprem Güvenliği',
  'Raylı Sisteme Yakınlık',
  'Sakin Mahalle',
];
