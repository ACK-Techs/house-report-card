# Frontend Uygulama Eksikleri Denetimi

**Denetim tarihi:** 2026-08-21  
**Kapsam:** `mobile/src`, `mobile/package.json`, mevcut frontend tasarım ve akış belgeleri  
**Sonuç:** Görsel prototip kapsamı geniş; gerçek ürün davranışı, veri bağlantısı ve dayanıklı ekran durumları henüz tamamlanmamış.

## Kısa sonuç

14 çekirdek ekranın çoğu React Native içinde mevcut. Ancak ekranlar ağırlıklı olarak sabit fixture verileri, yerel Zustand state'i ve toast geri bildirimleriyle çalışıyor. Gerçek kullanıcı hesabı, API, harita/geocoding, kalıcı kayıt, rapor üretimi, paylaşım ve hata/boş/yükleniyor durumları bulunmuyor.

Bu nedenle mevcut frontend **uygulanmış ürün değil, yüksek görsel ayrıntılı bir mobil prototip** olarak sınıflandırılmalıdır.

## Ekran matrisi

| Ekran                        | Durum                     | Mevcut                                                                                                                                                                                                                                        | Tamamlanmamış ana işler                                                                                                        |
| ---------------------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Karşılama, giriş, kayıt      | Kısmi / mock              | Akış ve formlar mevcut: [RootNavigator.tsx](../mobile/src/navigation/RootNavigator.tsx), [WelcomeScreen.tsx](../mobile/src/screens/WelcomeScreen.tsx), [RegisterScreen.tsx](../mobile/src/screens/RegisterScreen.tsx)                         | Gerçek auth, session, e-posta doğrulama, şifre sıfırlama, form/API hataları ve güvenli credential akışı                        |
| Hızlı kişiselleştirme anketi | Kısmi / yerel state       | 5 adım, ilerleme, atlama ve slider arayüzü mevcut: [SurveyScreen.tsx](../mobile/src/screens/SurveyScreen.tsx)                                                                                                                                 | Cevapların kullanıcı profiline kalıcı yazılması, backend senkronizasyonu, anket versiyonlama ve rapor skorlarına gerçek etkisi |
| Ana sayfa                    | Kısmi / statik            | Arama girişleri, son inceleme ve öneri yüzeyleri mevcut: [HomeScreen.tsx](../mobile/src/screens/HomeScreen.tsx)                                                                                                                               | Gerçek kullanıcı verisi, dolu/boş/yükleniyor/hata durumları, önerilerin tercihlere göre hesaplanması ve yenileme davranışı     |
| Ev/bina arama ve harita      | Kısmi / şematik           | Bina seçimi, katman chip'leri ve opaklık kontrolü mevcut: [SearchScreen.tsx](../mobile/src/screens/SearchScreen.tsx), [MapCanvas.tsx](../mobile/src/components/map/MapCanvas.tsx)                                                             | Gerçek harita, adres arama, il-ilçe-mahalle seçimi, geocoding, bina/parsel seçimi, zoom, GPS/konum izni ve manuel fallback     |
| Konumu doğrula               | Kısmi / statik            | Bottom sheet, adres alanı ve güven etiketi mevcut: [ConfirmLocationScreen.tsx](../mobile/src/screens/ConfirmLocationScreen.tsx)                                                                                                               | Gerçek adres-bina-parsel eşleştirmesi, pin sürükleme, belirsizlik hesabı, kullanıcı onayı ve eşleşme hatası                    |
| Bölge keşfi                  | Kısmi / fixture           | Filtreler, bölge kartları ve harita önizlemesi mevcut: [AreaScreen.tsx](../mobile/src/screens/AreaScreen.tsx)                                                                                                                                 | Gerçek polygon/bounds, ilçe/mahalle araması, bölge verisi, filtre sonucu, yüklenme ve hata akışı                               |
| Bina/ev raporu               | Görsel tamam / statik     | Grafikler, akordeonlar, kaynak/güven/çözünürlük sunumu mevcut: [PropertyReportScreen.tsx](../mobile/src/screens/PropertyReportScreen.tsx)                                                                                                     | `propertyId` ile gerçek rapor seçimi, API verisi, hesaplama, sürümlü metodoloji, kaydetme, PDF ve paylaşma                     |
| Bölge raporu                 | Görsel tamam / statik     | Bölgesel uyarı ve grafik yüzeyleri mevcut: [AreaReportScreen.tsx](../mobile/src/screens/AreaReportScreen.tsx)                                                                                                                                 | `areaId` ile rapor seçimi, gerçek kaynak/provenance, dinamik bölge verisi, kaydetme/takip etme ve hata durumu                  |
| Karşılaştırma                | Kısmi / statik            | İki kolon, bilinmeyen veri ve güven göstergeleri mevcut: [CompareScreen.tsx](../mobile/src/screens/CompareScreen.tsx)                                                                                                                         | Raporlardan gerçek ekleme/çıkarma, karşılaştırma tepsisi, dinamik veri, sınır durumları ve indirme                             |
| Kaydedilenler                | Kısmi / statik            | Ev/bölge/kıyas sekmeleri ve açma akışları mevcut: [SavedScreen.tsx](../mobile/src/screens/SavedScreen.tsx)                                                                                                                                    | Kalıcı kayıt, silme, not, paylaşma, boş/yükleniyor/hata durumları ve hesapla ilişkilendirme                                    |
| İnceleme geçmişi             | Kısmi / statik            | Zaman grupları ve rapora dönüş mevcut: [HistoryScreen.tsx](../mobile/src/screens/HistoryScreen.tsx)                                                                                                                                           | Gerçek geçmiş, saklama tercihi, temizleme, dışa aktarma, silme ve kalıcı veri politikası                                       |
| Profil ve öncelikler         | Kısmi / yerel persistence | Profil adı düzenleme, salt okunur e-posta, %100 ağırlık normalizasyonu ve AsyncStorage persistence mevcut: [ProfileScreen.tsx](../mobile/src/screens/ProfileScreen.tsx), [usePreferencesStore.ts](../mobile/src/store/usePreferencesStore.ts) | Gerçek auth hesabı, backend senkronizasyonu ve ağırlık değişince raporların yeniden hesaplanması                               |
| Ayarlar ve gizlilik          | Kısmi / yerel mock        | Gizlilik toggle'ları ve tema seçimi mevcut: [SettingsScreen.tsx](../mobile/src/screens/SettingsScreen.tsx)                                                                                                                                    | AsyncStorage/SecureStore, gerçek tema uygulaması, izin yönetimi, veri dışa aktarma/silme ve hesap silme                        |
| Yardım ve metodoloji         | İçerik tamam / statik     | FAQ, metodoloji ve kaynak metinleri mevcut: [HelpScreen.tsx](../mobile/src/screens/HelpScreen.tsx), [content.ts](../mobile/src/data/content.ts)                                                                                               | Kaynak bağlantıları, tarih/versiyon lineage'ı, güncel içerik yönetimi ve erişilebilir hata/boş durumları                       |

## Öncelikli çapraz eksikler

### P0 — Ürün akışını gerçek hale getiren temel işler

1. **Servis ve API katmanı:** [mobile/src/data](../mobile/src/data) altındaki sabit fixture'ların yerine typed repository/API client eklenmeli. Bina, bölge, rapor, kullanıcı, kaynak ve provenance sözleşmeleri backend ile eşleşmeli.
2. **Konum ve bina kimliği:** Şematik harita [MapCanvas.tsx](../mobile/src/components/map/MapCanvas.tsx) yerine gerçek harita sağlayıcısı, geolocation, geocoding ve bina/parsel eşleştirme akışı kullanılmalı. Belirsizlik bina, parsel ve adres için ayrı gösterilmeli.
3. **Auth ve ürün verisi state'i:** Profil ve tercihler artık cihazda kalıcı tutuluyor. Gerçek session/auth, backend senkronizasyonu, kaydedilenler ve geçmiş için ayrı güvenli veri katmanı hâlâ gerekli.
4. **Rapor üretim akışı:** Konum onayından rapora geçişte gerçek loading/progress, API bekleme, kısmi veri ve tekrar deneme akışları eklenmeli. `propertyId` ve `areaId` gerçekten kullanılmalı.
5. **Gerçek eylemler:** Kaydet, takip et, karşılaştırmaya ekle/çıkar, geçmişi temizle, PDF indir, paylaş, CSV dışa aktar ve hesap/veri silme toast yerine gerçek işlemler olmalı.

### P1 — Güvenilirlik ve ürün ilkeleri

1. Tüm ekranlarda dokümanda tanımlanan **dolu, boş, yükleniyor, hata** durumları uygulanmalı; hata durumunda retry ve mümkünse kayıtlı veriye fallback bulunmalı.
2. Risk, veri güveni, coğrafi çözünürlük, kaynak tarihi ve yöntem sürümü API'den eksiksiz taşınmalı. Eksik veri hiçbir yerde düşük risk gibi gösterilmemeli.
3. Bölgesel tehlike, zemin etkisi ve bina dayanımı arayüzde ayrı kalmalı; bina düzeyi kesinlik izlenimi verilmemeli.
4. Hassas konum, adres geçmişi, fotoğraf ve profil için izin, maskeleme, saklama süresi, silme ve veri minimizasyonu akışları eklenmeli.
5. Koyu/ sistem teması gerçekten uygulanmalı; ayarlarda seçilen tema şu anda uygulamanın renk temasını değiştirmiyor.

### P2 — Deneyim kalitesi ve yayın hazırlığı

1. Tasarım dokümanındaki üçlü yüzer alt navigasyon ile mevcut beş sekmeli standart tab bar arasındaki karar kesinleştirilmeli ve tek modele uygulanmalı.
2. Planlar/üyelik ekranı ürün kapsamına dahilse ayrı bir ekran ve erişim durumu eklenmeli; dahil değilse çekirdek ekran envanterinden çıkarılmalı.
3. 44 pt dokunma alanı, ekran okuyucu metinleri, kontrast, reduced-motion ve küçük/büyük ekran davranışları gerçek cihazlarda doğrulanmalı.
4. Native paylaşım, dosya üretimi ve PDF için platforma uygun çözüm seçilmeli.
5. Test, build ve ekran görüntüsü doğrulaması eklenmeli; en azından navigation smoke, store, form, loading/error/empty ve rapor parametresi testleri yazılmalı.

## Belgelerle tespit edilen uyumsuzluklar

- [frontend-experience-overview.md](frontend-experience-overview.md) üçlü yüzer navigasyon tarif ediyor; [MainTabs.tsx](../mobile/src/navigation/MainTabs.tsx) beş sekmeli standart navigasyon kullanıyor.
- Deneyim çerçevesinde planlar/üyelik gelecek kapsamı olarak geçerken ekran mimarisi ve uygulama 14. ekranı yardım/metodoloji olarak ele alıyor. Planlar/üyelik fiilen yok.
- [mobile/README.md](../mobile/README.md) “15 ekran” diyor; aynı belgede ekran tablosu 14 çekirdek ekran ve kayıt için ayrı `01b` gösteriyor.
- Tasarım belgeleri her ekran için boş, yükleniyor ve hata durumlarını zorunlu tutuyor; ekranların mevcut implementasyonunda bu durumlar genel ve tekrar kullanılabilir bir model olarak bulunmuyor.

## Önerilen uygulama sırası

1. API/contract ve kalıcı state temelini kur.
2. Auth ve onboarding persistence akışını tamamla.
3. Gerçek harita, geocoding, konum izni ve bina/parsel doğrulamayı ekle.
4. Rapor üretim, provenance, confidence ve skor açıklama sözleşmesini bağla.
5. Kaydetme, geçmiş, karşılaştırma ve profil ağırlıklarını gerçek veriye bağla.
6. PDF/paylaşım ve gizlilik işlemlerini tamamla.
7. Dört standart ekran durumunu ortak bileşenlerle uygula.
8. Navigasyon ve ekran envanteri kararını düzelt; ardından cihaz/test/build doğrulaması yap.

## Bu turda tamamlanan profil işleri

- Profil adı artık düzenlenebilir, boş veya tek karakterli değerler kaydedilmiyor.
- E-posta profil ekranında salt okunur gösteriliyor; hesap doğrulaması uydurulmuyor.
- Öncelik slider'ları her değişiklikte 5 puanlık adımlarla toplamı %100'e normalize ediyor.
- Profil, anket tercihleri, ağırlıklar, seçili bina, harita ve gizlilik tercihleri AsyncStorage üzerinden yeniden açılışta korunuyor.

## Kontrol durumu

- `npm run typecheck --prefix mobile`: **Başarılı.**
- `npm run lint --prefix mobile`: **Başarılı.**
- İlk denetimde bu kontroller bağımlılıklar kurulmadığı için çalıştırılamamıştı; bu turda gerekli bağımlılık kurulumu tamamlandı.
- Denetim yöntemi: kaynak kodu, package script'leri ve frontend ürün belgeleri karşılaştırıldı; bu belge runtime/API entegrasyon testi yerine mevcut kod kapsamını raporlar.
