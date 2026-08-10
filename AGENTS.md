# Ev Karnesi — Agent Giriş Protokolü

Bu depo, konut kararlarını konum, yapı, doğal afet, çevre, ulaşım ve yaşam verileriyle destekleyen Ev Karnesi ürünüdür.

## Zorunlu okuma sırası

1. `README.md`
2. `.orchestrator/PROJECT-STATE.md`
3. `.orchestrator/ARCHITECTURE.md`
4. `.orchestrator/SYSTEM.md`
5. `docs/COMMIT_CONVENTION.md`
6. Aktif `.orchestrator/runs/<run-id>/run.json`
7. Atanmış `.orchestrator/roles/<role>.md`

Kapsamlı planlama, mimari, implementasyon, review, doğrulama, entegrasyon veya kesintiden sonra devam işi için `.agents/skills/orchestrate-ev-karnesi/SKILL.md` ve `.orchestrator` kontrol düzlemi zorunludur.

## Orchestrator seçim kuralı

- Küçük, tek dosyalı, düşük riskli ve davranış değiştirmeyen doküman düzeltmesi doğrudan yapılabilir.
- Yeni özellik, birden fazla katman, veri kaynağı, harita/konum eşleştirme, risk skoru, kişisel veri, API contract, migration, deployment veya birden fazla agent içeren iş run graph ile yürütülür.
- Konuşma belleği tamamlanma kanıtı değildir; run, result, review ve doğrulama artifact'leri kanıttır.

## Ürün değişmezleri

- “Güvenli bina” veya “kesin risksiz” hükmü üretme.
- Veri yokluğunu düşük risk olarak yorumlama.
- Tehlike, maruziyet, zemin etkisi ve gerçek bina dayanımını birbirine karıştırma.
- Mahalle/bölge verisini bina düzeyinde kesin bilgi gibi sunma.
- Her önemli türetilmiş sonuca kaynak, tarih, coğrafi çözünürlük, yöntem sürümü ve güven seviyesi bağla.
- Fotoğraf veya yapay zekâ çıkarımını doğrulanmış resmî kayıt gibi gösterme.
- Konum, fotoğraf, adres geçmişi ve kullanıcı profilini hassas veri kabul et.
- Ayrımcılık veya mahalle damgalaması yaratabilecek vekil değişkenleri ürün/hukuk incelemesi olmadan skora katma.
- Ticari ilişki veya sponsorlu içerik skor ve risk sonuçlarını etkileyemez.

## Çalışma ve kalite kuralları

- Contract-first ilerle: producer/consumer şeması ve veri lineage'ı implementasyondan önce tanımlanır.
- Her work item tek amaç, açık write scope ve doğrulanabilir acceptance taşır.
- High/critical işler ile config'teki zorunlu türler bağımsız review ve verification olmadan kabul edilmez.
- Implementer kendi çalışmasını bağımsız review veya verification olarak kabul edemez.
- Paralel writer'lar yalnız ayrık write scope ve güvenli izolasyonla çalışır; ortak contracts, schema, migration, skor metodolojisi ve Git teslimi serialize edilir.
- Kullanıcının ilgisiz veya başka agent'a ait değişikliklerini değiştirme, stage etme ya da commit'e alma.
- Secret, token, tam kişisel adres, ham kullanıcı fotoğrafı veya üretim verisini run/result/log içine yazma.

## Git teslim yetkisi

Bu depo için kullanıcı, tamamlanan geliştirme işlerinin `docs/COMMIT_CONVENTION.md` uyarınca commit edilip kabul edilmiş faz/checkpoint sonunda remote'a push edilmesine proje düzeyinde izin vermiştir. Kullanıcının belirli bir görevde “commit/push yapma” veya farklı branch talimatı bu varsayılanı geçersiz kılar.

- Writer, yalnız atanmış ve kontrolleri geçen write item'ı atomik Conventional Commit olarak kaydeder.
- Alt agent/writer remote'a push yapmaz.
- Üst orchestrator; review, verification ve integration kabulünden sonra commit dizisini kontrol eder, remote değişikliklerini güvenli biçimde senkronlar ve checkpoint'i varsayılan olarak `origin/main`e push eder.
- Force-push, ilgisiz dosyaları stage etmek, doğrulanmamış işi push etmek ve belirsiz commit mesajı yasaktır.
- Push yapılamıyorsa hata gizlenmez; remote/branch/kimlik doğrulama eksiği açık blocker olarak raporlanır.

## Teslim biçimi

Her agent sonucu şunları içerir:

1. Yapılan iş ve work item kimliği
2. Değişen artifact'ler
3. Acceptance kanıtı
4. Çalıştırılan kontroller ve çalıştırılamayanlar
5. Açık riskler veya takip işleri
6. Varsa commit SHA; push yalnız üst orchestrator sonucunda remote/branch/SHA kanıtıyla bildirilir
