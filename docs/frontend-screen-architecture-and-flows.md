# Frontend: 14 Ekran Mimarisi ve Kullanıcı Akış Şeması (Issue #2)

Bu doküman, Ev Karnesi mobil deneyiminin 14 çekirdek ekranını, navigasyon modelini, ekranlar arası geçişleri (User Flows) ve ekran durumlarını (Dolu, Boş, Yükleniyor, Hata) tanımlar.

---

## 1. Çekirdek Ekran Envanteri ve Navigasyon Matrisi

| # | Ekran Adı | Rota / Ekran Kodu | Navigasyon Türü | Alt Navigasyon Durumu | Ana Görev / Amaç |
|---|---|---|---|---|---|
| **01** | Karşılama, Giriş & Kayıt | `/welcome`, `/auth` | Modal / Bağımsız | Gizli | Kullanıcıyı karşılamak ve hızlı hesap oluşturma / misafir girişi sunmak. |
| **02** | Hızlı Kişiselleştirme Anketi | `/onboarding/survey` | Adımlı Modal | Gizli | 5–6 soruda temel öncelikleri (çocuk, ulaşım, afet duyarlılığı) almak. |
| **03** | Ana Sayfa (Araştırma Merkezi) | `/home` | Kök Ekran | **Görünür (Sol Aktif)** | Son araştırmaları göstermek ve ev/bölge arama modlarına giriş sağlamak. |
| **04** | Ev / Bina Arama & Harita Seçimi | `/search/property` | Kök / Çalışma Alanı | **Görünür (Orta Aktif)** | Şehir/ilçe/mahalle seçimi ve haritadan bina/nokta işaretleme. |
| **05** | Konumu Doğrula | `/search/confirm-location` | Bottom Sheet / Modal | Gizli | Seçilen adres/parsel ve bina numarasını kullanıcıya teyit ettirmek. |
| **06** | Bölge Keşfi | `/search/area` | Kök / Çalışma Alanı | **Görünür (Orta Aktif)** | İlçe/mahalle düzeyinde genel harita ve filtreli bölge araştırması. |
| **07** | Bina / Ev Raporu | `/report/property/:id` | Detay Ekranı | Gizli veya Sabit Eylem | 7 kategoride açıklanabilir Ev Karnesi'ni sunmak. |
| **08** | Bölge Raporu | `/report/area/:id` | Detay Ekranı | Gizli veya Sabit Eylem | Mahalle/ilçe bazında zemin, afet, ulaşım ve yaşam özetini sunmak. |
| **09** | Karşılaştırma | `/compare` | Alt Ekran | Görünür | Seçilen en az iki evin karnesini yan yana, ortak ölçekte kıyaslamak. |
| **10** | Kaydedilenler | `/saved` | Profil Alt Ekranı | Görünür | Kullanıcının kaydettiği ev ve bölge raporlarını listelemek. |
| **11** | İnceleme Geçmişi | `/history` | Profil Alt Ekranı | Görünür | Kullanıcının son baktığı raporları zamansal sırayla göstermek. |
| **12** | Profil ve Önceliklerim | `/profile`, `/profile/priorities` | Kök Ekran | **Görünür (Sağ Aktif)** | Hesap yönetimi ve anket tercihlerini/ağırlıklarını yeniden düzenleme. |
| **13** | Ayarlar ve Gizlilik | `/settings` | Alt Ekran | Görünür | Bildirim, dil ve hassas konum/geçmiş silme kontrolleri. |
| **14** | Yardım ve Metodoloji | `/help/methodology` | Bilgilendirme Ekranı | Görünür | Skorların nasıl hesaplandığını, veri sınırlarını ve SSS'yi açıklamak. |

---

## 2. Detaylı Kullanıcı Akış Şemaları (Mermaid)

### Akış 1: İlk Kullanım ve Kişiselleştirme Akışı
```mermaid
flowchart TD
    A[Uygulama Açılışı] --> B{İlk Kullanım mı?}
    B -->|Evet| C[01. Karşılama & Giriş / Kayıt]
    C --> D[02. 5-6 Soruluk Hızlı Anket]
    D -->|Tamamla veya Atla| E[03. Ana Sayfa - Araştırma Merkezi]
    B -->|Hayır| E
```

---

### Akış 2: Bir Evi İnceleme ve Rapor Üretim Akışı
```mermaid
flowchart TD
    A[03. Ana Sayfa] -->|'Bir Evi İncele'ye Dokun| B[04. Ev / Bina Arama & Harita]
    B --> C[Şehir > İlçe > Mahalle Seç]
    C --> D[Haritada Harita İlgili Yere Odaklanır]
    D --> E[Kullanıcı Haritadan Binaya / Noktaya Dokunur]
    E --> F[Seçilen Konum Kartı & 'Düzenle' Butonu]
    F --> G[05. Konumu Doğrula Bottom Sheet]
    G -->|Teyit Et| H[Rapor Hazırlanıyor - Skeleton Yüklenme]
    H --> I[07. Bina / Ev Raporu]
    I --> J{Kullanıcı Eylemi}
    J -->|Kaydet| K[10. Kaydedilenler]
    J -->|Kıyasla| L[09. Karşılaştırma]
    J -->|Geri Dön| A
```

---

### Akış 3: Bölge Keşfi ve Bölge Raporu Akışı
```mermaid
flowchart TD
    A[03. Ana Sayfa] -->|'Bölgeyi Keşfet'e Dokun| B[06. Bölge Keşfi Ekranı]
    B --> C[İlçe / Mahalle Seç veya Haritadan Gezin]
    C --> D[08. Bölge Raporu]
    D --> E{Seçim}
    E -->|Bölgedeki Bir Binayı Seç| F[04. Ev / Bina Arama & Harita]
    E -->|Bölgeyi Kaydet| G[10. Kaydedilenler]
```

---

### Akış 4: İki Evi Karşılaştırma Akışı
```mermaid
flowchart TD
    A[07. Ev Raporu A] -->|'Karşılaştırmaya Ekle'| B[Karşılaştırma Tepsisi]
    C[07. Ev Raporu B] -->|'Karşılaştırmaya Ekle'| B
    B --> D[09. Karşılaştırma Ekranı]
    D --> E[Kategori Kategori Yan Yana Analiz]
    E --> F[Eksik Veri & Güven Seviyesi Farkları Vurgulanır]
```

---

### Akış 5: Tercihleri ve Öncelikleri Güncelleme Akışı
```mermaid
flowchart TD
    A[Alt Navigasyon: Profil] --> B[12. Profil Ekranı]
    B --> C[Önceliklerim / Tercihlerimi Düzenle]
    C --> D[Kategori Ağırlıklarını Güncelle: Deprem, Okul, Metro, Park]
    D -->|Kaydet| E[Ana Sayfa ve Rapor Uygunluk Skorları Yeniden Hesaplanır]
```

---

## 3. Ekran Durum Modelleri (State Patterns)

Her mobil ekran aşağıdaki 4 temel durumu standart olarak desteklemelidir:

```text
┌───────────────────────────────────────────────────────────────────┐
│                        STANDART EKRAN DURUMLARI                   │
├─────────────────┬─────────────────┬─────────────────┬─────────────┤
│   1. DOLU       │   2. BOŞ        │   3. YÜKLENİYOR │   4. HATA   │
│   (Populated)   │   (Empty State) │   (Loading)     │   (Error)   │
├─────────────────┼─────────────────┼─────────────────┼─────────────┤
│ Normal veri     │ İlk kullanımda  │ Skeleton loader │ Bağlantı    │
│ gösterimi ve    │ net çağrı (CTA) │ ve aşama        │ veya veri   │
│ kart listeleri  │ ve açıklayıcı   │ bildirimleri    │ hatasında   │
│                 │ illüstrasyon    │                 │ tekrar dene │
└─────────────────┴─────────────────┴─────────────────┴─────────────┘
```

1. **Ana Sayfa Boş Durumu:**
   * Kullanıcının henüz geçmişi yoksa gri bir boşluk yerine büyük bir araştırma kartı ve "İlk evini veya bölgeni inceleyerek başla" çağrısı gösterilir.
2. **Harita Hata Durumu:**
   * Harita sunucusu yanıt vermezse, yönetimsel form (Şehir/İlçe/Mahalle) kullanılabilir kalır ve manuel sokak/bina no girişiyle akış sürdürülür.
3. **Rapor Yüklenme Durumu:**
   * "Veriler toplanıyor" metni yerine kategorik süreç adımları gösterilir (*"Zemin haritaları taranıyor...", "Ulaşım hatları taranıyor..."*).

---

## 4. Sonuç

Bu ekran mimarisi ve kullanıcı akışları, **Issue #2** gereksinimlerini eksiksiz karşılamakta olup bir sonraki aşama olan **Issue #3 (Mobil Görsel Dil ve Tasarım Sistemi)** için sağlam bir omurga oluşturmaktadır.
