# Ev / Bina Arama ve Haritadan Seçim

## Amaç

Bu ekran, kullanıcının belirli bir ev veya binayı inceleme sürecini başlattığı mobil çalışma alanıdır. Varsayılan arama modu **Ev / bina ara**dır. Bölge araştırması ikincil bir seçenek olabilir; ekranın ilk hissi ilçe keşfetmekten çok kullanıcının baktığı evi doğru yerde bulmasına yardım etmektir.

Bu doküman yalnız deneyimi tarif eder. Şehir/ilçe/mahalle verisinin nereden geldiği, bina kimliğinin nasıl doğrulandığı ve harita sağlayıcısı backend/geo sözleşmelerinde ayrıca kararlaştırılacaktır.

## Giriş ve geri dönüş

- Alt yüzer navigasyondaki ortadaki Arama düğmesi bu ekranı açar.
- Ana sayfadaki **Ev konumu ara** ve **Bir evi incele** eylemleri aynı ekrana, Ev / bina ara modu seçili şekilde gelir.
- Kullanıcı rapor öncesi konum seçimini değiştirmek isterse aynı ekrana seçili bilgileri koruyarak döner.
- Üst soldaki geri eylemi, kullanıcıyı geldiği ekrana döndürür; seçilmiş ama henüz onaylanmamış bilgiler kaybolacaksa bu durum açıkça belirtilir.

## Genel yerleşim

Ekran, seçimi adım adım kolaylaştıran iki parçalı bir yapıdır:

1. Üstte konum seçimi ve seçili binanın düzenlenebilir özeti
2. Altta kalan ana alanda harita

Harita dekor değil, kullanıcının son konumu görerek daraltması ve binaya dokunarak seçmesi için çalışma aracıdır. Form alanları sayfanın tamamını kaplamaz; kullanıcı hem seçimi hem haritayı aynı akışta görür.

## Üst bölüm

### Başlık ve mod

- Başlık: **Ev / bina ara**
- Kısa yardım metni: **Önce bölgeyi seç, sonra haritadan binayı işaretle.**
- Bölge araştırmasına geçmek için ikincil ve daha sakin bir metin eylemi olabilir: **Bölge ara**. Bu, ana eylemin önüne geçmez.

### Yönetimsel konum seçimi

Kullanıcı serbest metin yazmak yerine sıralı seçimlerle ilerler:

1. Şehir seç
2. İlçe seç
3. Mahalle seç

- Her alan açılır seçim, arama destekli seçim listesi veya bottom sheet olarak tasarlanabilir; mobilde tek elle kullanımı ve uzun listeler düşünülmelidir.
- İlçe, şehir seçilmeden etkin olmaz; mahalle de ilçe seçilmeden etkin olmaz.
- Seçim yapıldıkça harita ilgili alanın görünümüne yaklaşır. Geçişin kullanıcı tarafından anlaşılması için kısa bir durum metni veya seçili alan etiketi bulunur.
- Kullanıcı önceki seçimi değiştirebilir. Örneğin ilçeyi değiştirirse artık geçersiz mahalle ve bina seçimi temizlenir; bu temizleme görünür olmalıdır.
- İlk sürümde serbest yazılı tam adres girişi bu ekranın ana yolu değildir. Tasarım ileride eklenebilecek adres aramasını engellemez ama mevcut akışın odağı seçim + haritadır.

### Seçili konum / bina özeti

Mahalle seçilip kullanıcı haritadan bir noktaya veya binaya dokunduğunda formun altında düzenlenebilir bir özet kartı görünür.

- Kart örnek etiketi: **Seçilen konum**
- Görünen bilgiler, kullanılabilir olduğu ölçüde: şehir, ilçe, mahalle, sokak/cadde ve bina numarası.
- Bina numarası gibi ayrıntılar kullanıcı tarafından düzenlenebilir olmalıdır. Kullanıcı haritada doğru konumu bulup numara bilgisini düzeltebilir veya eksik alanı ekleyebilir.
- Düzenleme, küçük bir kalem ikonu yerine açık **Düzenle** eylemiyle başlatılmalıdır.
- Kartta **Haritada değiştir** eylemi de bulunur; bu eylem harita seçimine geri odaklanır.
- Kullanıcı tarafından girilmiş/değiştirilmiş alanlar ile sistemin haritadan getirdiği alanların görsel olarak ayırt edilmesi yararlı olabilir; kesin etiket dili veri sözleşmesine göre belirlenecektir.
- Bu kart seçimin kesin bina kimliği veya resmi kayıt doğrulaması anlamına gelmez. Onay akışında eşleşme güveni ayrıca açıklanmalıdır.

## Harita alanı

### Başlangıç durumu

- Şehir seçilmeden harita geniş ama pasif bir Türkiye/varsayılan alan görünümü ya da sakin bir yönlendirme yüzeyi gösterebilir.
- Şehir, ilçe ve mahalle seçildikçe harita seçilen bölgeye yakınlaşır.
- Harita üzerinde kullanıcıya net yönerge verilir: **Binayı bulmak için haritaya dokun.**
- Kullanıcının mevcut konumunu gösteren kontrol isteğe bağlıdır. İzin yalnız kullanıcı bu eyleme bastığında istenir; reddedilmesi manuel seçimi engellemez.

### Bina veya nokta seçimi

- Kullanıcı haritaya dokununca seçili işaretçi görünür ve alttaki/üstteki konum özeti güncellenir.
- Bina geometrisi veya bina verisi mevcutsa binaya dokunma desteklenir. Veri yoksa kullanıcı nokta işaretleyerek devam edebilir; uygulama bunu bina doğrulaması gibi göstermemelidir.
- İşaretçi seçilen alanın ortasını kapatmayacak, gerektiğinde sürüklenebilecek ya da yeniden dokunmayla taşınabilecek biçimde tasarlanır.
- Harita etiketleri, seçili işaretçi ve konum kontrolleri alt navigasyonla çakışmaz. Alt bölüm için güvenli boşluk bırakılır.

### Harita durumları

| Durum | Kullanıcıya görünen davranış |
| --- | --- |
| Konum seçilmedi | Kısa yönerge ve seçime yönlendirme |
| Bölge seçildi, bina seçilmedi | Harita yakınlaşır; bina işaretleme çağrısı görünür |
| Bina/nokta seçildi | İşaretçi ve düzenlenebilir özet kartı görünür |
| Harita yükleniyor | Harita alanında skeleton/soft loading, form kullanılabilir kalır |
| Harita yüklenemedi | Açıklama + tekrar dene; mümkünse yönetimsel seçim ve manuel ayrıntı girişi korunur |
| Veri bina düzeyinde yok | Kullanıcının seçtiği noktanın yalnız konum olduğunu anlatan nötr açıklama |

## Devam eylemi

- Alt kısımda sabit veya harita üzerinde güvenli alana yerleştirilmiş birincil eylem bulunur: **Bu konumu incele**.
- Eylem, en az şehir–ilçe–mahalle ve harita seçimi/konum bilgisi olmadan aktifleşmez. Tam bina numarası zorunluluğu veri kapsamı kararıyla belirlenmelidir.
- Basınca kullanıcı, seçilen konumun son kez görüldüğü **Konumu doğrula** ekranına gider. Bu ekran ayrı tasarlanacaktır.
- Devam eylemi seçimin bina düzeyinde kesin biçimde doğrulandığını iddia etmez.

## Önerilen mikro akış

`Arama açılır → Ev / bina ara seçili → şehir → ilçe → mahalle → harita yakınlaşır → bina/nokta işaretlenir → seçili konum kartında ayrıntı kontrol/düzenleme → Bu konumu incele → Konumu doğrula`

## Mobil etkileşim ve erişilebilirlik

- Seçim listeleri, klavyeyle ve ekran okuyucuyla kullanılabilir olmalıdır.
- Harita dokunma ile çalışan bir alan olduğundan, haritayı kullanamayan kullanıcı için düzenlenebilir seçili konum alanı ve açıklayıcı alternatif yol bulunmalıdır.
- Şehir/ilçe değişiminin mahalle ve bina seçimini sıfırladığı durum ekran okuyucuya da duyurulur.
- İşaretçi değiştiğinde seçilen konum özeti erişilebilir biçimde güncellenir.
- Dokunma hedefleri en az 44 × 44 CSS px olmalıdır. Harita kontrolleri birbirine çok yakın yerleştirilmez.
- Konum izni reddedildiğinde kullanıcı suçlanmaz; **Haritadan seçerek devam edebilirsin** gibi çözüm odaklı metin kullanılır.

## Frontend ekibine tasarım serbestliği

Ekip; seçim alanlarının chip, bottom sheet veya açılır liste görünümünü; haritadaki işaretçi stilini; seçili konum kartının üstte mi altta mı konumlanacağını ve yüklenme animasyonlarını belirleyebilir. Ancak aşağıdaki ürün davranışı korunmalıdır:

- Ev / bina ara varsayılan moddur.
- Kullanıcı şehir, ilçe ve mahalleyle konumu daraltır.
- Harita üzerinde seçim yapar ve buna göre yakınlaşır.
- Bina numarası dahil seçili ayrıntıları gözden geçirip değiştirebilir.
- Bina verisi yoksa bu eksiklik kesin bina eşleşmesi gibi gizlenmez.

## Açık kararlar

- Konumu doğrula ekranı ayrı bir ekran mı, aynı ekranda onay bottom sheet'i mi olacak?
- Haritada bina geometrisi olmadığında bina numarası girişinin zorunluluk seviyesi ne olacak?
- Kullanıcının mevcut konumu kontrolü ilk sürümde yer alacak mı?
- Bölge ara modu bu ekranda sekme olarak mı, ayrı bir ekran olarak mı tasarlanacak?
