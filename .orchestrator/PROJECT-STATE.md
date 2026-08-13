# Proje Durumu

## Mevcut aşama

Ev Karnesi fikir tanımı ve ürün keşfi aşamasındadır. Uygulama stack'i, ilk pilot veri kaynakları, skor metodolojisi ve dağıtım hedefleri henüz kesinleştirilmemiştir.

## Bağlayıcı mevcut kararlar

- Ürün adı: **Ev Karnesi**.
- Ürün, konut satın alma/kiralama öncesi konuma dayalı bağımsız karar desteği sağlar.
- İlk doğrulama alanı için İstanbul güçlü adaydır; kesin pilot alan ayrıca kararlaştırılacaktır.
- Uygulama mühendislik ekspertizi veya güvenli bina sertifikası değildir.
- Sonuçlar kaynaklı, açıklanabilir ve belirsizliği görünür olmalıdır.
- Geliştirme, kalıcı run graph ve bağımsız kalite kapılarıyla yönetilir.
- Git teslimleri ortak commit diliyle yapılır; `git push` serbesttir ve commit-msg/CI aynı dili doğrular.

## Henüz karar verilmemiş alanlar

- Web, mobil veya birlikte başlama kararı
- Frontend/backend/veri altyapısı teknoloji seçimi
- Kullanılabilir resmî veri setleri ve lisansları
- Bina/parsel kimlik çözümleme yöntemi
- Skor formülü ve kategori ağırlıkları
- Ücretsiz/ücretli ürün sınırı
- Fotoğraf analizinin MVP kapsamı
- Pilot ilçe veya ilçeler

Bu alanlar varsayım olarak implementasyona gömülmez. İlgili run içinde discovery, ADR/contract ve acceptance ile karara bağlanır.

## İlk önerilen run

İlk kapsamlı run, “MVP ürün ve veri fizibilitesi” hedefiyle aşağıdaki çıktıları üretmelidir:

1. Kullanıcı ve karar senaryoları
2. İstanbul veri kaynağı/lisans/güncellik matrisi
3. Adres-bina-parsel kimlik sözleşmesi
4. Risk taksonomisi ve güven seviyesi modeli
5. MVP bilgi mimarisi/prototipi
6. Teknik mimari ADR'si ve uygulama backlog'u

Bu run tamamlanmadan üretim skor algoritması veya “güvenli/güvensiz” sonuç dili uygulanmaz.
