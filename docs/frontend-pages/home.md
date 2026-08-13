# Ana Sayfa — Araştırma Merkezi

## Amaç

Ana sayfa, kullanıcının Ev Karnesi'ne her gelişinde araştırmaya devam ettiği başlangıç noktasıdır. Bir ilan akışı, reklam vitrini veya "en çok aranan yerler" listesi değildir. Kullanıcıyı iki açık eyleme yönlendirir: belirli bir evi/binası incelemek veya bir bölgeyi keşfetmek. Varsa kullanıcının kendi son araştırmalarını öne çıkarır.

## Sayfa konumu ve erişim

- Uygulama açıldığında, onboarding tamamlanmış kullanıcı bu sayfaya gelir.
- Alt yüzer navigasyondaki sol Ana Sayfa düğmesi bu sayfaya getirir.
- Alt navigasyonda Ana Sayfa aktif durumdadır.
- Sayfa, rapor veya arama sonuçlarından geri gelindiğinde kullanıcının en son bağlamını korur; örneğin yeni tamamlanan inceleme "Son araştırmalar" başına eklenir.

## Görsel yön

- Hava: sakin, modern, güven veren ve bilgi odaklı. Emlak ilanı sitesi veya alarm veren bir risk uygulaması gibi görünmez.
- İlk ekranda harita zorunlu değildir; arama eylemi ve kişisel devam alanı daha değerlidir. Harita arama/bölge keşfi sonrası açılır.
- Kartlar temiz bir yüzey, yumuşak köşeler, belirgin ama ağır olmayan sınırlar kullanır. Gölge sınırlıdır.
- Ana çağrı düğmesi belirgin, ikincil eylem daha sakin olmalıdır.
- Renk tek başına anlam taşımamalıdır. Özellikle ileride eklenecek risk ve güven bilgileri için metin/ikon da kullanılmalıdır.
- Alt navigasyon ekranın en dibine yapışmaz: alt-ortada yüzer, kapsül biçimli bir grup olarak durur. Sağ ve solda ferah boşluk kalır; içerik altta bu bileşenin altında görünmez kalmayacak kadar iç boşluk taşır.

## Bilgi hiyerarşisi

Sayfa yukarıdan aşağıya şu sırayı izler:

1. İsimli karşılama ve bağlam
2. Ana arama alanı
3. Araştırma modu seçimi
4. Son araştırmalar veya ilk-kullanım boş durumu
5. İsteğe bağlı kişiselleştirme hatırlatıcısı
6. Sabit alt navigasyon

Bu deneyim yalnız mobil uygulama için tasarlanır ve bölüm sırası tek sütunda korunur. Alt navigasyon mobil ekranın alt-ortasında yüzer biçimde kalır.

## Bölüm detayları

### 1. İsimli karşılama ve bağlam

- Kısa ve kişisel bir başlık: "Merhaba, Ayşe"; ad yoksa "Merhaba".
- Alt metin tek cümle: "Bir adresi incele veya bir bölgeyi keşfet." 
- Profil tamamlama eksikse baskın bir uyarı yerine küçük bir bağlamsal satır gösterilebilir: "Önceliklerini belirle, sonuçları sana göre düzenleyelim." Bu satır Profil > Önceliklerim'e gider.
- Burada bildirim, üyelik promosyonu veya karmaşık metrik gösterilmez.

### 2. Ana arama alanı

Bu, sayfanın en güçlü öğesidir.

- Yer tutucu: "Adres, bina, mahalle veya ilçe ara"
- Sol tarafta arama ikonu; sağ tarafta isteğe bağlı konum/harita ikonu bulunabilir.
- Dokununca kullanıcı doğrudan arama ekranına gider; ana sayfa içinde ağır bir sonuç listesi açmak zorunda değildir.
- Arama ekranı iki modu açıkça sunar: "Bir evi incele" ve "Bölgeyi keşfet".
- Tarayıcı konumu izni burada zorunlu istenmez. Kullanıcı konum simgesine basarsa izin akışı başlatılır; izin reddi sakin bir açıklama ve manuel arama seçeneğiyle ele alınır.
- Arama alanı, örnek olarak kullanıcı verisi olmayan gerçek adres veya hassas bir konumu otomatik doldurmaz.

### 3. Araştırma modu seçimi

Arama alanının hemen altında iki eşit öneme yakın, görsel olarak ayırt edilebilir eylem kartı bulunur.

| Kart | Başlık | Kısa açıklama | Hedef |
| --- | --- | --- | --- |
| 1 | Bir evi incele | Adres gir veya haritadan binayı seç. | Ev/bina araması ve ardından konum doğrulama |
| 2 | Bölgeyi keşfet | Mahalle ya da ilçeyi yaşam ve konum açısından incele. | Bölge araması ve harita/bölge özeti |

- Kartların tamamı dokunulabilir olmalıdır; yalnız küçük bir ok ikonu tıklanabilir alan olmamalıdır.
- "Ev" kartı tekil bina/konut bağlamını, "Bölge" kartı alan bağlamını vurgulayan sade bir ikon/illüstrasyon kullanabilir.
- Bu kartlarda henüz skor, kesin risk dili veya "en iyi" gibi kıyas iddiası bulunmaz.

### 4A. Dolu durum — Son araştırmalar

Kullanıcının daha önce açtığı konum veya rapor varsa, bu alan gösterilir.

- Bölüm başlığı: "Son araştırmalar"
- Yardımcı metin gerekmez; gerekirse "Kaldığın yerden devam et" kullanılabilir.
- Kartlar mobilde yatay kaydırılabilir bir dizide gösterilir.
- İlk sürümde en fazla 3 kart gösterilir. Fazlası için "Tüm geçmişi gör" bağlantısı Geçmiş ekranına gider.
- Kartın bilgileri: anlaşılır konum adı, bağlam etiketi ("Ev incelemesi" / "Bölge araştırması"), son görüntülenme zamanı ve mümkünse küçük durum bilgisi ("Rapor hazır", "İnceleme sürüyor", "Veri güncellendi").
- Ev raporu kartında tam hassas adresi ana sayfada göstermeyin. Konum etiketi genel tutulur: örneğin "Ambarlı, Avcılar". Tam adres gerekiyorsa yalnız ilgili rapor içinde görüntülenir.
- Kart dokunması ilgili raporun en son görüntülenen yerine gider. Kart içindeki üç nokta menüsü varsa kaydetme, geçmişten kaldırma gibi eylemleri teyitli biçimde sunar.
- Kartlardaki konum bilgisi "önerilen" veya "popüler" değildir; yalnız o kullanıcının kendi geçmişidir.

### 4B. İlk-kullanım boş durumu — Henüz araştırma yok

Kullanıcının son araştırması yoksa alan boş bırakılmaz ve kurgusal/popüler lokasyonlar gösterilmez.

- Büyük, sıcak bir ev/harita/pin illüstrasyonu kullanılır; dekoratifse ekran okuyucuda gizlenir. Bu alan ekranda yeterli görsel ağırlığa sahip olmalı; sayfa boş bir hata/başlangıç ekranı gibi hissettirmemelidir.
- Başlık: "İlk ev araştırmana başlayalım"
- Açıklama: "Bir adres ara veya haritadan bir bina seç; bilgileri tek bir raporda toplayalım."
- Birincil düğme: büyük ve belirgin "Ev konumu ara" → Bir evi incele akışı
- İkincil metin bağlantısı: "Bir bölgeyi keşfet" → Bölge keşfi akışı
- Metin, uygulamanın bina güvenliği garantisi veya kesin sonuç verdiğini ima etmez.

### 4C. Yükleniyor ve hata durumları

- Son araştırmalar yüklenirken kartların yerini alan 2–3 skeleton kullanılır. Arama alanı ve iki ana giriş eylemi çalışmaya devam eder.
- Geçmiş yüklemesi başarısız olursa ana sayfa tümden hata ekranına dönüşmez. Bölüm içinde: "Son araştırmalar yüklenemedi." ve "Tekrar dene" eylemi gösterilir.
- Ağ yoksa arama alanı yine görünür; gönderim anında anlaşılır bağlantı hatası verilir. Daha önce cihazda saklanmasına izin verilen geçmiş varsa son bilinen içerik "Çevrimdışı" etiketiyle gösterilebilir; bu davranış veri saklama politikası netleşince uygulanır.
- Hiçbir hata durumunda "veri yok = iyi sonuç" türünde olumlu mesaj kullanılmaz.
- Harita, bu sayfanın ana içeriği değildir. Bir hata/boş durumunda küçük, statik bir harita önizlemesinin yararlı olup olmayacağına frontend tasarımcısı; ekran yoğunluğu, hata türü ve uygulama bileşenleriyle uyumuna göre karar verebilir. Kullanılırsa arama ve tekrar dene eylemlerinin önüne geçmez.

### 5. Kişiselleştirme hatırlatıcısı

Bu alan yalnız gerekli olduğunda gösterilir: onboarding atlandıysa veya kullanıcı önceliklerini hiç tanımlamadıysa.

- İnce, ikincil kart/şerit biçimindedir; ana arama eyleminin önüne geçmez.
- Başlık: "Sana göre düzenleyelim"
- Açıklama: "Ulaşım, aile yaşamı ve diğer önceliklerini seç." 
- Eylem: "Önceliklerimi belirle" → Profil > Önceliklerim
- Öncelikler mevcutsa bu alan tamamen gizlenir; kullanıcıyı tekrar tekrar anketle rahatsız etmez.

## Navigasyon ve hedef haritası

| Kaynak öğe | Kullanıcı eylemi | Varış / sonuç |
| --- | --- | --- |
| Ana arama alanı | Dokunma veya arama metni girme | Arama ekranı; mod seçimi |
| Konum ikonu | Dokunma | Konum izni, ardından harita merkezleme veya manuel arama |
| Bir evi incele | Dokunma | Tekil adres/bina araması |
| Bölgeyi keşfet | Dokunma | Bölge araması |
| Son araştırma kartı | Dokunma | İlgili rapor veya araştırma bağlamı |
| Tüm geçmişi gör | Dokunma | Geçmiş |
| Önceliklerimi belirle | Dokunma | Profil > Önceliklerim |
| Alt nav: Ana Sayfa | Dokunma | Ana sayfa; gerekirse üst konuma kaydırma |
| Alt nav: Arama | Dokunma | Arama ekranı |
| Alt nav: Profil | Dokunma | Profil özeti |

## Davranış ve etkileşim ayrıntıları

- Arama alanına dokunulduğunda klavye açılır ve arama ekranının giriş alanı odaklanır.
- Bir akıştan geri dönüldüğünde ana sayfa kaydırma konumu korunur.
- Son araştırmalar en yeniden en eskiye sıralanır. Sıralama kuralı frontend'in varsayımı değil, ileride backend contract'ı ile sağlanmalıdır.
- Araştırma başlatan kullanıcı, konum doğrulaması olmadan kritik raporu kesinleşmiş gibi görmez. Ana sayfa bu kuralı değiştirmez.
- Alt navigasyon klavyeyle ve ekran okuyucuyla kullanılabilir; aktif sayfa programatik ve görsel olarak ifade edilir.

## Mobil uyumluluk ve erişilebilirlik

- Tasarım 320 px genişlikten başlayarak bozulmadan çalışır; kartlar tek sütunlu akış ve yatay son-araştırmalar dizisiyle çalışır.
- Dokunma hedefleri en az 44 × 44 CSS px olmalıdır.
- Metin yakınlaştırıldığında içerik kesilmez ve yatay kaydırma oluşmaz.
- Arama alanının görünür etiketi ya da erişilebilir adı vardır; yalnız placeholder etiket yerine geçmez.
- İkonlu düğmeler erişilebilir ada sahiptir; dekoratif ikonlar ekran okuyucudan gizlenir.
- Kontrast WCAG AA seviyesini hedefler. Aktif alt navigasyon sadece renk değişimiyle belirtilmez.
- Hareket azaltma tercihi olan kullanıcılarda kart geçişleri/skeleton animasyonları azaltılır.

## Bu sayfada olmaması gerekenler

- "En çok aranan yerler", "en iyi evler" veya doğrulanmamış popülerlik listeleri
- Üçüncü taraf ilanları, sponsorlu içerik ya da bunları bağımsız sonuç gibi gösterecek kartlar
- Kesin "güvenli bina" / "risksiz bölge" dili
- Veri kapsamı bilinmeyen bir skor ya da sıralama
- İlk kullanımda zorlayıcı harita, çok sayıda filtre veya uzun anket

## Frontend ekibine teslim checklist'i

- [ ] Dolu, boş, yükleniyor ve hata ekranları ayrı tasarlandı.
- [ ] Arama, tekil ev inceleme ve bölge keşfi girişleri görünür.
- [ ] Son araştırmalar kişisel geçmiş olarak, popüler içerik olarak değil gösterildi.
- [ ] Yüzer alt navigasyon içerikle çakışmıyor ve üç hedefi içeriyor.
- [ ] Mobil yerleşim; küçük ve büyük telefon ekranlarında kontrol edildi.
- [ ] Odak, klavye, ekran okuyucu, kontrast ve dokunma hedefleri kontrol edildi.
- [ ] Kesin risk/güvenlik dili ve sahte veri kullanılmadı.

## Açık tasarım kararları

- Harita/konum simgesi ana arama alanında ilk sürümde bulunmalı mı?
- İlk kullanım illüstrasyonunun stil yönü: soyut, çizgisel veya üç boyutlu?
