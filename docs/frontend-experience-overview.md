# Frontend Deneyim Çerçevesi

Bu belge, Ev Karnesi'nin sayfa bazlı tasarımına başlamadan önceki bilgi mimarisi ve yönlendirme çerçevesidir. Sayfa içeriği, görsel yön ve bileşen detayları ayrı tasarım notlarında kararlaştırılacaktır.

## Ürün hissi

Ev Karnesi bir ilan platformu değil, konut için kaynaklı karar destek aracıdır. Arayüz sakin, anlaşılır ve veri odaklı olmalıdır. Risk seviyesi, veri güveni ve veri eksikliği her zaman ayrı anlamlara gelir; eksik veri olumlu sonuç gibi gösterilmez.

## Ana gezinme

Yalnız mobil uygulama deneyiminde ekranın alt-ortasında, kenarlarda boşluk bırakan yüzer bir navigasyon kullanılır:

- Sol: Ana sayfa
- Orta: Arama / yeni inceleme
- Sağ: Profil

Bu üç hedef sürekli erişilebilir kalır. Bağlama bağlı ikincil eylemler (kaydetme, filtre, karşılaştırma, geri) sayfa üstünde veya ilgili içerik içinde yer alır. Rapor hazırlama ve onboarding gibi odak gerektiren ekranlarda alt navigasyon gizlenebilir.

## Çekirdek ekranlar

1. Karşılama, kayıt ve giriş
2. Hızlı kişiselleştirme anketi
3. Ana sayfa / araştırma merkezi
4. Arama ve harita seçimi
5. Bölge keşfi
6. Bina veya ev raporu
7. Bölge raporu
8. Kaydedilenler
9. İnceleme geçmişi
10. Karşılaştırma
11. Profil ve öncelikler
12. Ayarlar ve gizlilik
13. Yardım ve metodoloji
14. Planlar / üyelik (ürün sınırı netleşince etkinleştirilecek)

## Ana akışlar

### İlk kullanım

Karşılama → kayıt/giriş → 5–6 soruluk hızlı anket → ana sayfa.

Anket; ev arama amacı, hane tipi, en önemli öncelikler, günlük ulaşım tercihi ile isteğe bağlı bütçe ve hedef bölgeyi toplar. Kullanıcı adımları hızlı geçebilir; bunlar kesin profil tanımı değildir ve sonradan değiştirilebilir.

### Belirli bir evi araştırma

Ana sayfa veya orta arama düğmesi → "Bir evi incele" → adres girme ya da haritada bina seçme → konum/adres eşleşmesini doğrulama → rapor hazırlanıyor → bina/ev raporu → kaydetme, detaylara inme veya karşılaştırmaya ekleme.

### Bir bölgeyi araştırma

Ana sayfa veya orta arama düğmesi → "Bölgeyi keşfet" → il/ilçe/mahalle arama (ör. Avcılar) → harita ve bölge özeti → bölge raporu → filtreli keşif, kaydetme veya bir binayı tekil incelemeye geçme.

### Tercihleri güncelleme

Profil → Önceliklerim → öncelik ve ağırlıkların düzenlenmesi → kaydetme → ana sayfa, bölge keşfi ve rapor önerilerinin yeni tercihlere göre güncellenmesi.

## Ana sayfanın görevi

Ana sayfa tam ekran bir harita olmak yerine araştırma merkezi olarak başlar. İlk görünümde:

- Adres, bina, mahalle veya ilçe arama alanı
- "Bir evi incele" ve "Bölgeyi keşfet" için net girişler
- Kullanıcının kaydedilenleri ve son incelemeleri
- Tercihlerine göre anlamlı bölge/araştırma önerileri

Harita, arama ve keşif ekranlarında ana çalışma alanıdır. Böylece ilk açılış sade kalırken konuma dayalı araştırma güçlü bir şekilde desteklenir.

## Filtre ve kişiselleştirme

Öncelikler iki yerde görünür: profil içindeki kalıcı ayarlar ve arama/bölge keşfi içindeki geçici filtreler. Örnekler: ulaşım, okul, yeşil alan, spor alanları, sessizlik, iklim konforu ve afet/zemin bilgisinin kullanıcı için önemi. Filtre sonuçları "en iyi" ya da kesin güvenlik hükmü olarak değil, seçilen önceliklere göre daha uygun görünen seçenekler olarak ifade edilir.

## Açık kararlar

- Ana sayfanın ilk görünümündeki harita yoğunluğu ve kart düzeni
- Konut/ilan verisinin hangi kaynakla ve hangi ifadeyle gösterileceği
- Planlar/üyelik ekranının kapsamı ve ücretsiz-ücretli ayrımı
- Karşılaştırmanın ücretsiz kullanım sınırı
- Anketin zorunlu/atla davranışı ve bütçe sorusunun dahil edilip edilmeyeceği
- Her ekranın görsel dili, boş durumları ve detaylı içerik hiyerarşisi
