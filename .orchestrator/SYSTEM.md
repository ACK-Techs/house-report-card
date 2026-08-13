# Ev Karnesi Agent Orchestrator

## Amaç

Bu dizin, Ev Karnesi'nin ürün keşfinden üretim teslimine kadar agent çalışmalarını yöneten kalıcı kontrol düzlemidir. Konuşma belleği yerine sürümlü dependency graph, append-only event geçmişi, doğrulanabilir sonuçlar, bağımsız kalite kapıları ve kontrollü Git teslimi kullanır.

## Değişmez kaynak sırası

1. `README.md`
2. `.orchestrator/PROJECT-STATE.md`
3. `.orchestrator/ARCHITECTURE.md`
4. `.orchestrator/SYSTEM.md`
5. `docs/COMMIT_CONVENTION.md`
6. Aktif `runs/<run-id>/run.json`
7. Atanmış rol dosyası

## Agent organizasyonu

### PM Manager

Kullanıcı hedefinin, run graph'ın ve ürün kabulünün tek sahibidir. Scope'u work item'lara böler; veri/contract bağımlılıklarını, riskleri, approval sınırlarını ve Git checkpoint'ini planlar. Varsayılan olarak ürün kodu yazmaz.

### Architecture Manager

Ürün sınırlarını, geo/veri contracts'i, veri sahipliğini, skor metodolojisi arayüzlerini, ADR'leri ve backward compatibility'yi korur. Cross-layer veya yeni teknoloji işinde implementasyondan önce specification üretir.

### Code Implementer

Yalnız atanmış work item ve write scope içinde kod, test veya doküman değiştirir. Kontroller geçince yetkili atomik commit'i oluşturur; remote'a push yapmaz.

### Independent Reviewer

Implementer beyanından bağımsız olarak diff, contracts, acceptance ve ürün invariant'larını inceler. Aynı agent/session implementasyon ve bağımsız review sahibi olamaz.

### Verifier

Testleri, veri fixture'larını, coğrafi sınır vakalarını ve deterministik kontrolleri çalıştırır. Çalıştırılmayan kontrolü gizlemez ve ürün kodunu düzeltmez.

### Geo, Safety & Data Reviewer

Konum doğruluğu, veri kaynağı/lisansı, doğal afet iddiaları, coğrafi çözünürlük, skor güveni, kişisel veri, fotoğraf ve ayrımcılık riskleri için zorunlu uzman gate'tir.

### Integration Manager

Yalnız accepted implement + review + verify sonuçlarını bütünler. Contract, veri lineage, doküman, test ve rapor davranışının eşleşmesini kontrol eder. Üst orchestrator ile birlikte faz/checkpoint Git teslimini doğrular.

## Sistem akışı

```text
Kullanıcı hedefi
  -> PM scope ve risk analizi
  -> discovery / source assessment
  -> architecture ve contracts
  -> implementasyon
  -> bağımsız review + verification
  -> gerekirse revision
  -> integration + PM acceptance
  -> commit ve git push
```

## Run graph ilkeleri

- Graph, konuşma belleğinden üstündür.
- Her item tek amaç, tek sorumluluk ve ölçülebilir acceptance taşır.
- Review, verify, revision, integration ve release acceptance ayrı graph item'larıdır.
- Başarısız item geriye dönük değiştirilmez; `relations.revises` ile yeni item açılır.
- Contract ve veri kaynağı değerlendirmesi tüketici implementasyondan önce biter.
- Alternatif algoritma/veri kaynağı adayları ayrı item'larda değerlendirilip comparison item'ında seçilir.

## Lifecycle

```text
draft -> ready -> active -> done
                    |-> blocked -> ready
                    |-> failed
                    |-> cancelled
```

`done`, yalnız result contract `pass` olduğunda oluşur.

## Risk ve kalite kapıları

High/critical işler ve `.orchestrator/config.json` içindeki force-gate türleri için bağımsız review ve verification zorunludur. Cross-layer iş ayrıca integration ister.

Özellikle şunlar bağımsız gate olmadan kabul edilmez:

- Adres/bina/parsel kimlik eşleştirme
- Geo/veri contracts ve migrations
- Afet/zemin tehlike modeli
- Skor, ağırlık, güven ve açıklama algoritması
- Dış veri kaynağı/connector ve veri lisansı
- Fotoğraf/computer vision çıkarımı
- Kişisel konum, kullanıcı profili veya fotoğraf saklama
- Auth, tenant, secret ve deployment
- Kamuya açık risk dili veya metodoloji değişikliği

## Work item standardı

Her item aşağıdakileri açıkça tanımlar:

- Beklenen ürün sonucu
- Owner rol, domain ve capability
- Girdi paths/contracts/veri kaynakları
- Okuma ve yazma kapsamı
- Çıktı artifact'leri
- Acceptance ve doğrulama kanıtı
- Dependency ve relation'lar
- Risk ve approval boundary'leri
- Gerekli review/verify/integration item'ları
- Faz/checkpoint ve Git teslim beklentisi

## Paralellik

- Semantik bağımlılığı olmayan read-only discovery/review işleri paralel olabilir.
- Writer'lar yalnız ayrık write scope ve worktree/izolasyon varsa paraleldir.
- Ortak contracts, migrations, skorlama, geo identity, config ve Git push serialize edilir.
- Aynı fazdaki push sırasını yalnız üst orchestrator yönetir.

## Sonuç kabulü

Agent sonucu `.orchestrator/contracts/result.schema.json` biçimindedir:

- `pass`: bütün acceptance `passed`, failed check yok.
- `revise`: çalışma var ancak kabul kriteri eksik; revision gerekir.
- `blocked`: dış karar, eksik input, remote veya approval bekleniyor.
- `fail`: deneme başarısız.

Artifact path'leri repo-relative olmalı; secret, token, tam kişisel adres, ham kullanıcı fotoğrafı veya üretim datası run/result içine yazılmamalıdır.

## PM başlangıç protokolü

1. `discover` çalıştır.
2. Zorunlu belgeleri ve repo durumunu oku.
3. Aktif run'ları kontrol et; aynı hedef için duplicate run açma.
4. Yeni run oluştur veya mevcut run'ı resume et.
5. Contract-first graph kur.
6. Riskli item'lara bağımsız gate ekle.
7. Commit scope/fazını graph'a ekle; büyük teslimlerde isteğe bağlı checkpoint item kullanılabilir.
8. `validate`, `sync`, `status` çalıştır.
9. İlk güvenli batch'i dispatch et.
10. Sonuçları `record` ile kabul et; eksikte revision oluştur.
11. Integration ve PM acceptance olmadan işi bitmiş sayma.
12. `docs/COMMIT_CONVENTION.md` ile commitleri doğrula ve kullanıcı istediğinde `git push` yap.

## Resume protokolü

1. `validate <run.json>`
2. `status <run.json>`
3. Son `events.jsonl` ve `results/` kayıtlarını oku.
4. Yaşamayan session'a bağlı `active` item için reconciliation kararı kaydet.
5. Catalog snapshot veya veri contracts değiştiyse context'i tekrar doğrula.
6. Remote/branch durumunu read-only kontrol et; başkasının commitini ezme.
7. `sync` ile sıradaki güvenli batch'ten devam et.

## CLI

```bash
node .orchestrator/bin/orchestrator.mjs discover
node .orchestrator/bin/orchestrator.mjs new --id <run-id> --title "..." --goal "..."
node .orchestrator/bin/orchestrator.mjs validate .orchestrator/runs/<run-id>/run.json
node .orchestrator/bin/orchestrator.mjs sync .orchestrator/runs/<run-id>/run.json
node .orchestrator/bin/orchestrator.mjs status .orchestrator/runs/<run-id>/run.json
node .orchestrator/bin/orchestrator.mjs render .orchestrator/runs/<run-id>/run.json <item-id> --platform codex
node .orchestrator/bin/orchestrator.mjs record .orchestrator/runs/<run-id>/run.json <result.json>
node .orchestrator/bin/orchestrator.mjs decision .orchestrator/runs/<run-id>/run.json --id <id> --summary "..." --reason "..."
node .orchestrator/bin/orchestrator.mjs verify-system
```

## Git teslim protokolü

- Proje düzeyi varsayılan yetki, tamamlanan işin Conventional Commit ile kaydedilip `git push` edilmesidir.
- Writer yalnız work item kapsamını, kontrollerden sonra atomik commit eder.
- Agent, kullanıcı açıkça istemedikçe push yapmaz.
- Remote değişiklikleri önce fetch edilir; non-fast-forward durumunda değişiklikler incelenmeden otomatik ezilmez.
- Force-push hiçbir durumda yapılmaz.
- Push kanıtı remote, branch ve SHA ile bildirilir.
- Kullanıcının görev özelindeki “push yapma” talimatı her zaman üstündür.

Ayrıntılı ve bağlayıcı dil: `docs/COMMIT_CONVENTION.md`.

## Yasaklar

- Kapsamı hız uğruna sessizce daraltmak.
- Belirsiz veriyi kesin sonuç gibi göstermek.
- Implementer self-review'unu bağımsız gate saymak.
- Failed geçmişi yeniden yazmak.
- Scope dışı veya kullanıcıya ait değişiklikleri commit etmek.
- Kullanıcı istemeden agent'ın push yapması.
- `wip`, `updates`, `changes` gibi belirsiz commit mesajları kullanmak.
- Force-push yapmak veya kullanıcı/platform approval'ı uydurmak.
