# Ev Karnesi Orchestrator Mimari Kararları

## Kontrol düzlemi

`.orchestrator`, ürünün çalışma zamanı değil; ürünü geliştiren agentların planlama, görev devri, kalite kapısı, kanıt ve Git teslim kontrol düzlemidir.

```text
Manager reasoning
  + JSON dependency graph
  + append-only JSONL events
  + immutable result artifacts
  + role protocols
  + platform adapters
  + controlled Git checkpoints
```

Ürünün ilerideki veri toplama, harita, analiz veya rapor pipeline'ı bu dizinden ayrı tutulur.

## Neden run graph?

Ev Karnesi'nde tek bir görünen sonuç birden fazla bağımlı kaynaktan oluşur:

```text
adres/bina kimliği
  -> veri kaynağı ve lisans
     -> normalizasyon ve coğrafi çözünürlük
        -> risk/yaşam göstergesi
           -> güven seviyesi ve açıklama
              -> kullanıcı raporu
```

Bir halkadaki hata skorun anlamını değiştirebilir. Bu yüzden kaynak, contract, implementasyon, bağımsız review ve doğrulama ayrı work item'lar olarak izlenir.

## Kalıcı roller ve dinamik uzmanlık

Kalıcı roller yönetim sorumluluğunu tanımlar:

- PM Manager
- Architecture Manager
- Code Implementer
- Independent Reviewer
- Verifier
- Geo, Safety & Data Reviewer
- Integration Manager

GIS, jeoloji, deprem mühendisliği, ulaşım, iklim, veri lisansı, mobil veya backend gibi uzmanlıklar sabit agent kimliği değildir; work item `domains` ve `capabilities` alanlarıyla atanır.

## Contract-first graph

Kapsamlı işlerin varsayılan şekli:

```text
pm-scope
  -> discovery/source-assessment
     -> architecture/data-contract
        -> implementation(s)
           -> independent-review
           -> verification
              -> integration
                 -> pm-acceptance
                    -> git-checkpoint
```

Review, verification, integration ve Git checkpoint birer lifecycle etiketi değil; ayrı girdisi ve acceptance kanıtı olan graph item'larıdır.

## Önerilen geliştirme fazları

Fazlar ürün kapsamını sonsuza kadar kilitlemez; commit scope'u, dependency ve checkpoint sınırı sağlar.

| Faz | Amaç | Örnek capabilities |
|---|---|---|
| `phase-0-discovery` | Problem, kullanıcı, mevzuat ve veri fizibilitesi | product-discovery, source-inventory, legal-review |
| `phase-1-foundation` | Ortak geo/veri contracts ve platform temeli | geo-contract, provenance, data-quality, observability |
| `phase-2-property-identity` | Adres, koordinat, bina ve parsel eşleştirme | geocoding, map-selection, entity-resolution |
| `phase-3-risk-intelligence` | Deprem, zemin, sel, heyelan ve diğer riskler | hazard-model, geology, elevation, uncertainty |
| `phase-4-liveability` | Ulaşım, iklim, güneş ve mahalle erişimi | routing, transit, solar, climate, poi |
| `phase-5-scoring-report` | Açıklanabilir skor, güven ve karşılaştırma | scoring, confidence, explanation, report-versioning |
| `phase-6-experience` | Web/mobil deneyimi ve hesap özellikleri | web, mobile, accessibility, privacy |
| `phase-7-scale-trust` | Yeni şehirler, kalite, güvenlik ve kurumsal kullanım | source-onboarding, evaluation, security, api |

## Projeye özgü kalite invariant'ları

1. Veri yokluğu düşük risk değildir.
2. Bölgesel tehlike gerçek bina dayanımı değildir.
3. Her sonuç kaynak, zaman, çözünürlük ve yöntem sürümü taşır.
4. Adres/koordinat/bina/parsel eşleşmesinin güveni raporlanır.
5. Kullanıcı bina eşleşmesini doğrulamadan kritik rapor kesinleştirilmez.
6. Fotoğraf çıkarımı resmî kayıt veya mühendislik incelemesi değildir.
7. Ana skor, alt faktörler ve ağırlıklar açıklanabilir ve sürümlü olur.
8. Kişiselleştirme güvenlik sınırlarını sessizce azaltamaz.
9. Ticari ortaklık risk sonucunu değiştiremez.
10. Hassas konum ve fotoğraf verisi minimum süre ve minimum kapsamla işlenir.
11. Demografik/mahallî vekil değişkenler ayrımcılık incelemesi olmadan skora girmez.
12. Bir şehrin veri modeli başka şehre doğrulamasız genellenmez.

Bu invariant'ları etkileyen iş `high` veya `critical` risk alır ve bağımsız Geo, Safety & Data review ile verification gerektirir.

## History ve concurrency

- `run.json`: güncel graph snapshot'ı
- `events.jsonl`: append-only audit geçmişi
- `results/`: immutable attempt sonuçları
- `revision`: optimistic concurrency
- `.lock`: kısa filesystem mutation kilidi

Writer'lar aynı contract, migration, skor metodolojisi, ortak config veya Git checkpoint üzerinde paralel çalışamaz. Ayrı path, tek başına semantik bağımsızlık kanıtı değildir.

## Git checkpoint mimarisi

Writer commit'leri work item sınırında atomiktir. Remote push tek tek writer'lar tarafından yapılmaz. Üst orchestrator:

1. İlgili fazın implementasyon sonuçlarını toplar.
2. Review, verification ve integration gate'lerini kabul eder.
3. Commit mesajlarını `docs/COMMIT_CONVENTION.md` ile doğrular.
4. Remote branch'i güvenli biçimde senkronlar.
5. Kabul edilen commit dizisini tek bir faz/checkpoint push'u olarak gönderir.
6. Remote, branch ve commit SHA kanıtını run sonucuna kaydeder.

Bu model farklı bilgisayarlardaki agentların aynı dili kullanmasını ve push yarışlarının merkezi biçimde yönetilmesini sağlar.

## Genişletme kuralı

Yeni kalıcı rol ancak farklı run'larda tekrar eden bağımsız sorumluluk ve farklı yetki/araç ihtiyacı kanıtlandığında eklenir. Yeni lifecycle state veya relation, mevcut graph ile kayıpsız ifade edilemiyorsa eklenir.
