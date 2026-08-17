# Frontend: Ürün Planı, Teknik Varsayımlar ve Risk İncelemesi (Issue #1)

Bu doküman, Ev Karnesi ürün planı ([README.md](file:///c:/Users/fbdog/Documents/GitHub/house-report-card/README.md)) ve mevcut deneyim çerçevesinin ([docs/frontend-experience-overview.md](file:///c:/Users/fbdog/Documents/GitHub/house-report-card/docs/frontend-experience-overview.md)) mobil frontend, kullanıcı deneyimi (UI/UX), harita/konum bağımlılıkları ve uygulanabilirlik riskleri açısından yapılan kapsamlı incelemesidir.

---

## 1. Genel UI / UX ve Mobil Deneyim Değerlendirmesi

Ev Karnesi, geleneksel bir emlak listeleme ya da reklam platformu değildir. Temel tasarım dili; **sakin, veri odaklı, şeffaf ve güven veren** bir yapıda olmalıdır.

### 1.1. Mobil Öncelikli Gezinme ve Yüzer Kapsül Navigasyon
* **Navigasyon Yapısı:** Ekranın en altına yapışmayan, sağdan ve soldan boşluk bırakan, alt-ortada konumlanan modern 3'lü yüzer kapsül grup:
  * **Sol:** Ana Sayfa (Araştırma Merkezi)
  * **Orta:** Arama / İncele (Ev konumu veya bölge seçimi)
  * **Sağ:** Profil & Önceliklerim
* **Odak Ekranlarında Navigasyon Davranışı:**
  * Karşılama, Kayıt, Onboarding Anketi, Konumu Doğrula ve Rapor İnceleme gibi derin odak/modal gerektiren akışlarda alt navigasyon gizlenerek kullanıcı dikkat dağınıklığı önlenmelidir.

### 1.2. Ürün Dili ve Görsel İletişim İlkeleri (UI/UX Kırmızı Çizgileri)
1. **Veri Yokluğu $\neq$ Düşük Risk:**
   * Bir alanda veri eksikse (örneğin sel haritası veya mikrobölgeleme verisi yoksa) arayüzde asla "yeşil/sorunsuz" badge gösterilemez. "Bilinmiyor / Veri Bulunamadı" durumları gri/nötr ve açıklayıcı metinle temsil edilmelidir.
2. **Bölgesel Tehlike $\neq$ Bina Dayanımı:**
   * Bölgenin deprem fay hattı mesafesi veya zemin büyütmesi ile binanın kendi yapısal kalitesi görsel olarak ayrı kartlarda, net bir hiyerarşiyle sunulmalıdır.
3. **Kesin Güvenlik Hükmü Verilemez:**
   * "Bu bina %100 güvenlidir" veya "Risksiz bina" gibi yanıltıcı ifadeler yerine "Ön İnceleme Göstergeleri" ve "Uzmana Sorulacak Sorular" dili benimsenmelidir.

---

## 2. Frontend — Harita, Geocoding ve Geo-Identity Bağımlılıkları

| Süreç / Bileşen | Frontend Beklentisi & İhtiyacı | Potansiyel Risk / Zorluk | Çözüm & Fallback Yaklaşımı |
|---|---|---|---|
| **Yönetimsel Konum Seçimi** | Şehir $\rightarrow$ İlçe $\rightarrow$ Mahalle ardışık seçim hiyerarşisi. | Büyük şehirlerde yüzlerce mahalle listesi mobil formda hantallaşabilir. | Bottom sheet içinde hızlı arama (search-in-list) ve tek elle erişilebilir seçim mekanizması. |
| **Harita Yakınlaşması (Zoom & Bounds)** | İlçe/mahalle seçildikçe haritanın otomatik olarak ilgili bölgenin sınırlarına (*bounding box*) yumuşak animasyonla odaklanması. | Mahalle sınır koordinatları (GeoJSON/Polygon) eksik veya gecikmeli gelirse harita kaybolabilir. | Mahalle merkez noktasına (*centroid*) varsayılan zoom seviyesi ile odaklanma. |
| **Bina / Nokta İşaretleme (Pinning)** | Kullanıcının haritaya dokunarak bina veya nokta seçmesi. | Bina poligonu (bina geometrisi) her şehirde/mahallede bulunmayabilir. | Vektör bina geometrisi varsa bina sınırını vurgulama; yoksa hassas nokta pini ve düzenlenebilir adres özeti kartı açma. |
| **Bina Numarası & Adres Düzenleme** | Sistemin getirdiği sokak/bina numarasını kullanıcının doğrudan düzenleyebilmesi. | Kullanıcının yanlış veya alakasız kapı numarası girmesi sonucu veri eşleşememesi. | "Kullanıcı Tarafından Belirtildi" etiketiyle güven derecesini ayrıştırmak ve bina eşleşme belirsizliğini açıkça göstermek. |
| **Konum İzni (Geolocation)** | Kullanıcının "Mevcut Konumumu Kullan" butonuna basmasıyla tarayıcı/cihaz konumu alma. | Kullanıcı konum iznini reddedebilir veya GPS sapması yaşanabilir. | Zorunlu izin istememe; izin reddinde sakin bir yönlendirmeyle manuel seçim akışına devam etme. |

---

## 3. Backend, Veri Sağlayıcı ve Performans Gereksinimleri

1. **Rapor Hazırlanma Süresi (Latency) & Yüklenme Durumu:**
   * Birden fazla kaynaktan (AFAD, İBB, OpenStreetMap, meteoroloji vb.) veri toplandığı için rapor üretimi birkaç saniye sürebilir.
   * **UX Çözümü:** "Rapor Hazırlanıyor" ekranında kullanıcıya adımlı skeleton veya süreç göstergesi sunulmalıdır (*"Zemin verileri inceleniyor..."*, *"Ulaşım hatları hesaplanıyor..."*).
2. **Çelişkili ve Eksik Veri Modeli:**
   * Backend API kontratı her veri alanı için şu 4 bilgiyi standart olarak dönmelidir:
     * `value`: Veri değeri
     * `source`: Veri kaynağı (ör. "İBB Deprem Zemin Raporu 2020")
     * `confidence`: Güven seviyesi (`high`, `medium`, `low`, `unknown`)
     * `geographic_resolution`: Coğrafi ölçek (`building`, `parcel`, `neighborhood`, `district`)
3. **Çevrimdışı & Bağlantı Hataları:**
   * Harita tile'ları veya veri sunucusu yüklenemediğinde ekranın tamamen çökmesini engelleyen "Tekrar Dene" veya "Yalnızca Kaydedilen Veriyi Göster" hata pencereleri hazırlanmalıdır.

---

## 4. Açık Ürün Soruları ve Karar Noktaları

| # | Konu | Açık Nokta / Soru | Frontend Önerisi |
|---|---|---|---|
| **Q1** | **Konumu Doğrula Ekranı** | Seçimden sonra konum teyidi ayrı bir tam ekran mı olmalı, yoksa harita üzeri modal / bottom sheet mi? | **Bottom Sheet Onayı:** Kullanıcı haritada binayı görürken alt sheet'te doğrulamayı yaparsa bağlam kopmaz; daha akıcı bir mobil UX sağlar. |
| **Q2** | **Fotoğraf Yükleme (MVP Kapsamı)** | Kullanıcı cephe fotoğrafı eklemeli mi? | MVP'de opsiyonel tutulmalı; fotoğrafın kesin dayanıklılık kanıtı olmadığı arayüzde belirgin bir notla vurgulanmalıdır. |
| **Q3** | **Kişiselleştirme Anketi (Bütçe Sorusu)** | 5-6 soruluk ankete bütçe sorusu eklenmeli mi? | Bütçe zorunlu olmamalı veya atlanabilir olmalıdır; Ev Karnesi emlak satış sitesi gibi hissettirmemelidir. |
| **Q4** | **Karşılaştırma Sınırı** | Kullanıcı kaç evi aynı anda karşılaştırabilir? | Mobilde ekran genişliği nedeniyle **en fazla 2 ev** yan yana karşılaştırılmalı; 3+ ev masaüstü veya detaylı sekmelere bırakılmalıdır. |
| **Q5** | **Ücretsiz / Ücretli Rapor Sınırı** | İlk sürümde hangi bölümler kilitli olacak? | MVP'de temel risk özeti ve ulaşım ücretsiz; ayrıntılı mikrobölgeleme ve uzman kontrol listeleri ileride premium modelde sunulabilir. |

---

## 5. Sonuç ve Sonraki Adım

Bu inceleme, ürünün veri sınırları ve kullanıcı deneyimi ilkeleriyle tam uyumlu olduğunu doğrulamaktadır. Bir sonraki adım olan **Issue #2 (Sayfa Mimarisi ve Ekran Akış Şeması)** için zemin hazırdır.
