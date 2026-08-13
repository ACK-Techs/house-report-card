# Rapor ve Destekleyici Ekranlar — Tasarım Yönü

Bu belge, henüz ayrıntılı ürün içeriği belirlenmemiş ekranlar için frontend ekibine yön verir. Amaç tasarımı kilitlemek değildir: ekip, mobil akışı ve görsel sistemi güçlü kılan düzenleri önerebilir. Buradaki amaçlar, yönlendirmeler ve ürün sınırları korunmalıdır.

## Bina / ev raporu

### Amaç ve genel görünüm

Rapor, kullanıcının seçtiği konum için kaynaklı karar desteği aldığı ana sonuç ekranıdır. Üstte konumun genel etiketi, rapor durumu ve geriye dönüş olmalıdır. Aşağıda kullanıcının hızla anlayabileceği bir özet alanı, ardından kategori bazlı ayrıntılar gelir.

İlk tasarımda görünmesi beklenen örnek başlıklar:

- Bina yaşı / temel yapı bilgisi
- Deprem tehlikesi ve zeminle ilgili göstergeler
- Sel, heyelan gibi konuma uygun diğer afet göstergeleri
- Ulaşım ve günlük yaşam erişimi
- İklim / fiziksel konfor

Bu başlıkların içindeki veri alanları, skorlar, görseller ve kesin hiyerarşi daha sonra ayrıca verilecektir. Frontend ekip bu nedenle esnek kategori kartları, açılır ayrıntılar ve kaynak bilgisi taşıyabilecek bir rapor kabuğu tasarlamalıdır.

### Zorunlu ürün dili

- Rapor "güvenli bina" veya "kesin risksiz" hükmü vermez.
- Bölgesel deprem tehlikesi, zemin etkisi ve gerçek bina dayanımı aynı şey gibi tasarlanmaz.
- Eksik veri olumlu sonuç olarak gösterilmez; kullanıcı belirsizliği fark eder.
- Her önemli sonuç için ileride kaynak, tarih, coğrafi çözünürlük, yöntem sürümü ve güven bilgisinin eklenebileceği yer ayrılır.
- Kullanıcı raporu kaydedebilir, karşılaştırmaya ekleyebilir ve bir önceki seçime dönebilir.

### Tasarım ekibine açık alan

Özetin kart mı, sabit üst alan mı olacağı; kategori geçişlerinin sekme, accordion veya uzun akış şeklinde sunulacağı; veri güveni bileşeninin biçimi; rapor hazırlanırkenki yüklenme deneyimi ve boş/hata durumları ekip tarafından önerilecektir. Ayrıntılı kategori içerikleri netleşmeden sahte sayı, skor veya risk dili kullanılmamalıdır.

## Kaydedilenler

Bu ekran, kullanıcının daha sonra tekrar bakmak istediği raporları/konumları kişisel koleksiyonunda toplar. Ana sayfada ayrı bir modül zorunlu değildir; kullanıcı Profil veya ilgili rapor içinden Kaydedilenler'e erişebilir.

Frontend ekip, kaydedilen öğeleri bulmayı, açmayı, kaldırmayı ve boş durumu anlaşılır kılacak mobil bir tasarım önerir. Konum bilgisi ana ekrandaki gizlilik yaklaşımıyla uyumlu, genel seviyede tutulmalıdır. Sıralama, klasörleme, etiketleme ya da not ekleme özellikleri ancak ürün kararı sonrası eklenir.

## İnceleme geçmişi

Geçmiş, kullanıcının açtığı araştırmaları zamansal sırayla geri bulmasını sağlar; kaydedilenler ile aynı amaçta değildir. Kullanıcı buradan önceki rapora dönebilir veya yeni bir konum araştırabilir.

Frontend ekip liste/zaman grubu, yüklenme, boş ve hata durumlarını tasarlayabilir. Geçmiş temizleme ve saklama süreleri, hassas konum verisi politikasıyla birlikte sonradan netleşecektir; silme eylemi varsa geri döndürülemez etkisi açıkça anlatılmalıdır.

## Karşılaştırma

Karşılaştırma, kullanıcının seçtiği en az iki raporu aynı ölçekte değerlendirmesine yardım eder. Rapor içinden **Karşılaştırmaya ekle** eylemiyle, ayrıca Kaydedilenler veya Geçmiş içinden erişilebilir.

Mobilde iki konumu aynı anda okunabilir tutmak zor olduğundan frontend ekip yatay kaydırma, kategori bazlı geçiş veya özet + ayrıntı yaklaşımını önerebilir. Tasarım; aynı verinin mevcut olmadığı durumları eşit/iyi gibi göstermemeli, veri eksikliğini ve farklı güven düzeylerini görünür tutmalıdır. Ayrıntılı karşılaştırma metrikleri henüz belirlenmemiştir.

## Profil ve öncelikler

Profil, kullanıcının hesap bilgilerine ve **Önceliklerim** alanına giriş noktasıdır. İlk ankette alınan bilgiler burada düzenlenebilir olmalıdır: arama amacı, hane tipi, ulaşım ve yaşam tercihleri gibi seçimler. Bu seçimler kullanıcıya sonuçların kendi önceliklerine göre düzenlenebileceği fikrini açıklar; güvenlik veya veri güveni sınırlarını sessizce değiştirmez.

Ekip; profil özeti, öncelik düzenleme düzeni ve tamamlanma göstergesi önerebilir. Uzun form hissi yaratmayan, hızlı düzenlenebilir mobil etkileşim hedeflenir.

## Ayarlar ve gizlilik

Ayarlar; hesap, bildirim, dil/erişilebilirlik tercihleri ve konum/geçmiş gizliliği gibi kontrol alanlarını bir araya getirir. Hassas konum, adres geçmişi ve kullanıcı profili burada anlaşılır biçimde kontrol edilebilir olmalıdır.

Gizlilik tercihleri için tasarım, teknik ayrıntı bombardımanı yerine kullanıcıya neyin saklandığını ve hangi etkisinin olacağını açıklar. Veri silme ya da hesap silme gibi geri dönüşü zor eylemler belirgin onay gerektirir. Kesin ayar listesi backend ve gizlilik kararlarıyla netleşecektir.

## İlk kişiselleştirme anketi

Kayıt sonrası anket 5–6 kısa, hızlı geçilebilir adımdan oluşur. Ev arama amacı, hane tipi, öncelikler, ulaşım tercihi ile isteğe bağlı bütçe/hedef bölgeyi toplar. Kullanıcı bazı adımları atlayabilir ve daha sonra Profil > Önceliklerim'den değişiklik yapabilir.

Frontend ekip ilerleme göstergesi, seçim kartları, geri/atla davranışı ve bitiş ekranını tasarlar. Anket bir zorunlu veri toplama formu gibi değil, uygulamayı kişiselleştiren kısa bir başlangıç gibi hissettirmelidir.

## Yardım ve metodoloji

Bu alan kullanıcının Ev Karnesi'nin ne yaptığını, ne yapmadığını; raporların nasıl okunacağını ve belirsizliklerin ne anlama geldiğini anlayabildiği yerdir. Rapor ekranlarından ilgili yardım maddelerine bağlanabilmelidir.

Ekip; arama, sık sorulanlar ve okunabilir açıklama düzeni önerebilir. İçerik daha sonra metodoloji ve hukuk değerlendirmesiyle sağlanacaktır; tasarım şimdiden uzun metin, kaynak bağlantısı ve uyarı alanları için uygun olmalıdır.

## Planlar / üyelik

Bu ekran, ürünün ücretsiz ve ücretli sınırları kararlaştırıldığında kullanılır. Şimdilik frontend ekip bunu gelecekte eklenebilecek bir hedef olarak düşünebilir; ödeme akışı, fiyat, özellik sınırı veya yükseltme çağrısı tasarlamak için henüz ürün kararı yoktur.

## Ortak mobil tasarım ilkeleri

- Alt navigasyon yalnız Ana Sayfa, Arama ve Profil ana hedeflerini taşır; diğer ekranlar bağlamsal eylemlerden açılır.
- Dolu, boş, yükleniyor ve hata durumları her ekran için düşünülmelidir.
- Konum/risk verisi kesin ve eksiksizmiş gibi gösterilmez.
- Tam hassas adresi ihtiyaç yokken yüzeye çıkarma; mobil ekranda genel konum etiketlerini tercih et.
- Dokunma hedefleri, kontrast, ekran okuyucu etiketleri ve metin büyütme mobil erişilebilirlik gereksinimlerini karşılar.
