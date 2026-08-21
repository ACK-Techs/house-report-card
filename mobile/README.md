# Ev Karnesi — Mobil Uygulama (React Native)

Claude Design'daki **"Ev Karnesi v2"** prototipinin React Native implementasyonu.
Prototipteki 15 ekranın tamamı, ölçülebilir tasarım token'ları ve yeniden
kullanılabilir bileşenler üzerinden yeniden yazılmıştır.

## Teknoloji

| Katman         | Seçim                                                                        |
| -------------- | ---------------------------------------------------------------------------- |
| Çalışma zamanı | Expo SDK 54 · React Native 0.81 · React 19                                   |
| Dil            | TypeScript (`strict`, `noUncheckedIndexedAccess`)                            |
| Navigasyon     | React Navigation 7 (native-stack + bottom-tabs)                              |
| Durum          | Zustand                                                                      |
| Grafik         | `react-native-svg` (skor halkası, radar, mahalle beşgenleri, sekme ikonları) |
| Tipografi      | Outfit + IBM Plex Sans + IBM Plex Mono (`@expo-google-fonts`)                |

## Çalıştırma

```bash
npm install --prefix mobile
```

```bash
npm start --prefix mobile
```

Ardından Expo Go ile QR kodu okutun ya da `i` / `a` ile simülatör açın.
Tarayıcıda hızlı önizleme için:

```bash
npm run web --prefix mobile
```

Kalite kapıları:

```bash
npm run typecheck --prefix mobile && npm run lint --prefix mobile
```

## Dizin yapısı

```
src/
  theme/        Tasarım token'ları (renk, tipografi, ızgara, gölge)
  types/        Alan modeli (Confidence, GeoResolution, ReportAxis, …)
  data/         Prototipten çıkarılan içerik ve örnek veriler
  store/        Zustand depoları (tercihler, toast)
  components/
    ui/         Bileşen kütüphanesi (Card, Chip, Accordion, SourceBadge, …)
    charts/     SVG grafikler (ScoreRing, RadarChart, AreaGlyph)
    map/        Şematik harita yüzeyleri
  navigation/   Kök yığın + alt sekme navigasyonu
  screens/      15 ekran
```

## Ekran envanteri

| #   | Ekran               | Dosya                       | Sekme çubuğu |
| --- | ------------------- | --------------------------- | ------------ |
| 01  | Karşılama & giriş   | `WelcomeScreen.tsx`         | Gizli        |
| 01b | Kayıt               | `RegisterScreen.tsx`        | Gizli        |
| 02  | 5 adımlı anket      | `SurveyScreen.tsx`          | Gizli        |
| 03  | Ana sayfa           | `HomeScreen.tsx`            | Görünür      |
| 04  | Bina arama & harita | `SearchScreen.tsx`          | Görünür      |
| 05  | Konum doğrulama     | `ConfirmLocationScreen.tsx` | Modal sheet  |
| 06  | Bölge keşfi         | `AreaScreen.tsx`            | Gizli        |
| 07  | Bina karnesi        | `PropertyReportScreen.tsx`  | Gizli        |
| 08  | Bölge raporu        | `AreaReportScreen.tsx`      | Gizli        |
| 09  | Kıyaslama           | `CompareScreen.tsx`         | Görünür      |
| 10  | Kaydedilenler       | `SavedScreen.tsx`           | Görünür      |
| 11  | İnceleme geçmişi    | `HistoryScreen.tsx`         | Gizli        |
| 12  | Profil & öncelikler | `ProfileScreen.tsx`         | Görünür      |
| 13  | Ayarlar & gizlilik  | `SettingsScreen.tsx`        | Gizli        |
| 14  | Yardım & metodoloji | `HelpScreen.tsx`            | Gizli        |

## Ürün ilkelerinin arayüzdeki karşılığı

Kök `AGENTS.md`'deki ürün değişmezleri kozmetik değil, bileşen sözleşmesidir:

- **Risk ≠ veri güveni.** `ScoreBadge` risk/skor tonunu, `SourceBadge` güven
  seviyesini gösterir; ikisi asla tek rozette birleşmez.
- **Veri yokluğu düşük risk değildir.** `Confidence: 'none'` kesikli sınırlı,
  nötr gri bir rozet üretir — yeşil hiçbir zaman kullanılmaz.
- **Bina düzeyi ≠ bölge tahmini.** `ResolutionBadge` her eksenin coğrafi
  çözünürlüğünü ayrı gösterir; bölge raporu hero alanında bunu açıkça yazar.
- **Renk tek başına anlam taşımaz.** Her semantik renk bir metin etiketi veya
  ikonla birlikte gelir; kıyaslama ekranında üstün metrik ayrıca `↑` alır.
- **Sorumluluk reddi kalıcıdır.** Yasal metinler `data/content.ts` içindeki tek
  `legal` nesnesinden gelir, ekranlarda kopyalanmaz.

## Erişilebilirlik

- Tüm dokunmatik hedefler en az 44×44pt (`minTouchTarget`, `hitSlopFor`).
- Skorlar, sürgüler ve ilerleme çubukları `accessibilityValue` ile seslendirilir
  (ör. _"Uyum skoru 82, 100 üzerinden"_).
- Chip'ler seçim durumunu `radio`/`checkbox` rolüyle bildirir; akordeonlar
  `expanded` durumunu taşır.
- Toast mesajları `AccessibilityInfo.announceForAccessibility` ile duyurulur.

## Veri katmanı

Ekranlar `src/data/` altındaki tipli sabitleri okur. Gerçek API'ye geçerken
yalnızca bu modüllerin yerini bir servis katmanı alır; ekranlar ve bileşenler
değişmez. `src/types/index.ts` producer/consumer sözleşmesinin başlangıç
noktasıdır.

## Bilinen sınırlar

- Harita şematiktir (prototipin kendisi gibi). Gerçek kartografi için
  `react-native-maps` veya MapLibre entegrasyonu ayrı bir iştir.
- Profil ve tercih state'i AsyncStorage ile cihazda kalıcı tutulur. Kimlik
  doğrulama, backend senkronizasyonu, kaydedilenler/geçmiş veri katmanı ve
  PDF/paylaşım eylemleri hâlâ arayüz düzeyindedir; ilgili butonlar bazı
  akışlarda toast üretir.
- Tema seçimi (açık/koyu/sistem) ayarlarda tutulur ancak koyu tema paleti henüz
  tanımlı değildir.
