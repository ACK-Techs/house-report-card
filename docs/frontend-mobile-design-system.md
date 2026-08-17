# Ev Karnesi — Mobil Görsel Dil ve Tasarım Sistemi (Issue #3)

Bu doküman, Ev Karnesi mobil deneyiminin görsel dilini, renk paletini, tipografisini, bileşen tasarım standartlarını ve erişilebilirlik kurallarını tanımlar.

---

## 1. Tasarım Felsefesi ve Görsel Kimlik

Ev Karnesi; ne reklam kokan parlak renkli bir emlak satış sitesi, ne de kullanıcıda panik yaratan bir afet alarm uygulamasıdır.

* **Tasarım Karakteri:** Analitik, sakin, modern, şeffaf, güven veren ve veri odaklı.
* **Biçim Dili:** Yumuşak köşeli yüzeyler, ince açık sınırlar, hafif gölgeler, ferah boşluklar ve ekranın alt-ortasında yüzen kapsül navigasyon.

---

## 2. Renk Sistemi (Color Tokens)

### 2.1. Temel Marka ve Nötr Renkler

| Renk Adı | Hex Kodu | Kullanım Alanı |
|---|---|---|
| **Primary (Slate Dark)** | `#0F172A` | Ana başlıklar, koyu butonlar, yüzer navigasyon gövdesi |
| **Primary Accent (Teal/Cyan)** | `#0284C7` | Aktif sekmeler, birincil linkler, harita pin vurguları |
| **Accent Light** | `#E0F2FE` | Seçili chip arka planları, hafif vurgulu alanlar |
| **Surface Background** | `#F8FAFC` | Genel ekran arka planı |
| **Surface Card** | `#FFFFFF` | Kartlar, bottom sheet yüzeyleri, modal zeminleri |
| **Border Neutral** | `#E2E8F0` | Kart ve input sınır çizgileri (1px) |
| **Text Primary** | `#0F172A` | Birincil metinler ve okunması kritik veriler |
| **Text Secondary** | `#475569` | Alt açıklamalar, etiketler, yardımcı metinler |
| **Text Muted / Placeholder** | `#94A3B8` | Yer tutucu metinler, pasif durumlar, pasif ikonlar |

---

### 2.2. Semantik Risk ve Değerlendirme Renkleri

> [!IMPORTANT]
> **Kritik Kural:** Renk hiçbir zaman tek başına anlam taşımaz. Her semantik renge mutlaka açıklayıcı bir metin ve net bir ikon eşlik eder.

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                          SEMANTİK RİSK RENK SKALASI                         │
├─────────────────┬─────────────────┬─────────────────┬───────────────────────┤
│ 1. DÜŞÜK RİSK   │ 2. ORTA DİKKAT  │ 3. YÜKSEK RİSK  │ 4. BİLİNMEYEN / EKSİK │
│    / OLUMLU     │    / İNCELE     │    / ÖNCELİKLİ  │    VERİ (NÖTR)        │
├─────────────────┼─────────────────┼─────────────────┼───────────────────────┤
│ Emerald Green   │ Warm Amber      │ Rose / Crimson  │ Slate Muted           │
│ Hex: #059669    │ Hex: #D97706    │ Hex: #E11D48    │ Hex: #64748B          │
│ Bg:  #ECFDF5    │ Bg:  #FFFBEB    │ Bg:  #FFF1F2    │ Bg:  #F1F5F9          │
│ İkon: Kalkan/Tik│ İkon: Üçgen/Ünl.│ İkon: Çember/Ünl│ İkon: Soru İşareti    │
└─────────────────┴─────────────────┴─────────────────┴───────────────────────┘
```

---

### 2.3. Veri Güven Seviyesi ve Kaynak Rozetleri (Confidence Badges)

Risk seviyesi ile verinin güven seviyesi görsel olarak **asla aynı rozette birleştirilmez**.

* **Yüksek Güven (High Confidence):**
  * *Görsel:* 3 dolu nokta `●●●` + Kaynak Adı (Ör. `●●● İBB 2023`)
  * *Stil:* Açık mavi zemin (`#F0F9FF`), mavi sınır (`#BAE6FD`), koyu mavi metin (`#0369A1`).
* **Orta Güven (Medium Confidence):**
  * *Görsel:* 2 dolu, 1 boş nokta `●●○` + Kaynak Adı (Ör. `●●○ Açık Veri`)
  * *Stil:* Nötr gri zemin (`#F8FAFC`), gri sınır (`#CBD5E1`), gri metin (`#475569`).
* **Düşük / Belirsiz Güven (Low Confidence / Unverified):**
  * *Görsel:* 1 dolu nokta `●○○` + *"Doğrulanmamış / Tahmini"*
  * *Stil:* Kesikli sınır (`border: 1px dashed #94A3B8`), açık gri zemin.

---

## 3. Tipografi Hiyerarşisi

Yazı Tipi Ailesi: **Inter** veya **Plus Jakarta Sans** (Sistem yazı tipi yedeği: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`).

| Tipografi Rolü | Boyut / Satır Yüksekliği | Ağırlık (Weight) | Örnek Kullanım Alanı |
|---|---|---|---|
| **Display / Hero** | `28px / 34px` | 700 (Bold) | Karşılama başlığı, ana skor göstergesi |
| **Heading 1 (H1)** | `22px / 28px` | 600 (Semi-Bold) | Ekran başlıkları (Ev Raporu, Bölge Keşfi) |
| **Heading 2 (H2)** | `18px / 24px` | 600 (Semi-Bold) | Kart başlıkları, kategori isimleri |
| **Heading 3 (H3)** | `16px / 22px` | 600 (Semi-Bold) | Alt bölüm başlıkları, liste grup adları |
| **Body Large** | `16px / 24px` | 400 (Regular) | Ana paragraf metinleri, girdi alanları |
| **Body Small** | `14px / 20px` | 400 (Regular) | Yardımcı metinler, kart açıklamaları |
| **Caption / Meta** | `12px / 16px` | 500 (Medium) | Veri kaynakları, tarih bilgisi, rozetler |
| **Badge / Micro** | `11px / 14px` | 700 (Bold) | Küçük durum etiketleri (TÜMÜ BÜYÜK) |

---

## 4. Spacing, Elevation & Yüzey Standartları

* **8px Izgara Sistemi (Grid):** `4px`, `8px`, `12px`, `16px`, `20px`, `24px`, `32px`, `48px`.
* **Köşe Yarıçapları (Border Radius):**
  * Kartlar & Modallar: `16px` (`rounded-2xl`)
  * Butonlar, Inputlar & Seçim Kutuları: `12px` (`rounded-xl`)
  * Rozetler (Badges) & Chip'ler: `8px` (`rounded-lg`)
  * Yüzer Kapsül Navigasyon & İkon Butonlar: `9999px` (`rounded-full`)
* **Gölge Standartları (Shadows):**
  * *Card Shadow (Hafif):* `box-shadow: 0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.04);`
  * *Floating Nav Shadow (Yüzer):* `box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.08);`

---

## 5. Çekirdek Mobil Bileşenler (Core Components)

### 5.1. Yüzer Kapsül Alt Navigasyon (Floating Bottom Nav)
* **Konum:** Sabit alt-orta (`position: fixed; bottom: 20px; left: 24px; right: 24px; max-width: 360px; margin: 0 auto;`).
* **Görünüm:** Kapsül biçimli, arka planı hafif bulanıklaştıran cam efekti (`backdrop-filter: blur(16px); background: rgba(15, 23, 42, 0.92); border: 1px solid rgba(255, 255, 255, 0.1);`).
* **Yapı:**
  * **Sol:** Ana Sayfa (İkon + Küçük Etiket)
  * **Orta:** Arama / İncele (Öne çıkarılmış yuvarlak mavi buton, `48x48px`)
  * **Sağ:** Profil (İkon + Küçük Etiket)

```text
┌────────────────────────────────────────────────────────┐
│                   YÜZER KAPSÜL DÜZENİ                  │
│                                                        │
│       ┌───────────┐     ┌───────────┐    ┌───────────┐ │
│       │  ⌂ Home   │     │  🔍 ARA   │    │  👤 Profil│ │
│       └───────────┘     └───────────┘    └───────────┘ │
└────────────────────────────────────────────────────────┘
```

---

### 5.2. Kategori Kartı ve Veri Satırı Bileşeni
* **Üst Başlık:** Kategori İkonu + Kategori Adı (Ör. `🏗️ Bina & Yapı Bilgileri`)
* **Alt Göstergeler:** 
  * Durum Rozeti (Ör. `1999 Öncesi Yapı`)
  * Güven Rozeti (Ör. `●●● İBB Bina Envanteri`)
  * Çözünürlük Etiketi (Ör. `Mahalle Düzeyi`)
* **Genişletilebilir Detay (Accordion):** Dokunulduğunda yumuşak animasyonla açılan detay listesi ve uzman tavsiyesi.

---

### 5.3. "Uzmana Sorulacaklar / Dikkat Noktaları" Çağrı Kutusu (Callout)
* **Arka Plan:** Yumuşak Kehribar/Mavi Zemin (`#FEF3C7` / `#EFF6FF`).
* **Sınır:** Sol kenarda `3px` kalın belirteç çizgisi.
* **İçerik:** *"Bu binayı kiralarken/satın alırken mutlaka yerinde kontrol edilmesi önerilen 3 konu..."*

---

## 6. Mobil Erişilebilirlik (A11y) Standartları

1. **Dokunma Hedefleri (Touch Targets):** Tüm interaktif öğeler (butonlar, ikonlar, harita pinleri) en az **44 × 44 CSS px** dokunma alanına sahip olmalıdır.
2. **Kontrast Oranları:** Tüm metin ve kritik UI kontrolleri WCAG AA standardında (en az **4.5:1**) kontrast sunar.
3. **Ekran Okuyucu Desteği (Screen Readers):**
   * Her skor ve risk göstergesi `aria-label` ile seslendirilir (Ör. `aria-label="Deprem tehlikesi orta seviye, veri güveni yüksek"`).
   * Haritadaki seçim durumları ve form değişiklikleri sesli duyurulur.
4. **Hareketi Azaltma (Prefers-Reduced-Motion):** Kullanıcı cihazında hareket azaltmayı seçmişse tüm akışlar ani geçişlere uyar ve ağır animasyonlar devre dışı bırakılır.

---

## 7. Sonuç

Bu tasarım sistemi; **Issue #3** gereksinimlerini eksiksiz karşılayarak Ev Karnesi'nin mobil arayüzünde tutarlı, estetik, erişilebilir ve ürün ilkelerine sıkı sıkıya bağlı bir görsel temel sağlar.
