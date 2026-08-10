# Ev Karnesi Ortak Commit ve Push Standardı

Bu belge insan ve AI tüm katkıcılar için bağlayıcı Git dilidir. Amaç; farklı bilgisayarlarda üretilen değişikliklerin aynı biçimde okunması, work item ve faza kadar izlenmesi, atomik incelenmesi ve remote'a kontrollü sırayla gönderilmesidir.

## 1. Tek commit biçimi

```text
type(scope): imperative English summary

Optional body explaining why and important constraints.

Work-Item: <run-work-item-id>
Phase: <phase-id>
```

Kurallar:

- `type` ve `scope` İngilizce, küçük harf ve ASCII olmalıdır.
- Özet İngilizce, emir kipinde, küçük harfle başlamalı ve nokta ile bitmemelidir.
- Subject en fazla 72 karakter olmalıdır.
- Her görev commit'i `Work-Item` ve `Phase` footer'ı taşımalıdır.
- Body “ne değişti” listesini tekrar etmek yerine neden ve önemli davranış değişikliğini açıklar.
- Commit tek bir mantıksal amacı kapsamalıdır.
- Agent/model/bilgisayar adı subject veya scope olarak kullanılmaz.

## 2. İzin verilen type değerleri

| Type | Kullanım |
|---|---|
| `feat` | Kullanıcıya veya tüketiciye yeni davranış |
| `fix` | Hatalı davranışın düzeltilmesi |
| `docs` | Yalnız dokümantasyon |
| `test` | Yalnız test/fixture kapsamı |
| `refactor` | Davranışı değiştirmeyen kod yapısı değişikliği |
| `perf` | Ölçülmüş performans iyileştirmesi |
| `build` | Build/dependency/toolchain |
| `ci` | CI/CD ve otomasyon |
| `chore` | Ürün davranışı olmayan bakım/repo işlemi |
| `revert` | Önceki commit'in kontrollü geri alınması |

## 3. Scope seçimi

Scope, agentı değil değişen ürün alanını anlatır. Önerilen ortak sözlük:

- `discovery`
- `foundation`
- `geo`
- `property`
- `data`
- `earthquake`
- `ground`
- `flood`
- `landslide`
- `climate`
- `solar`
- `transit`
- `neighborhood`
- `scoring`
- `confidence`
- `report`
- `comparison`
- `api`
- `web`
- `mobile`
- `privacy`
- `security`
- `infra`
- `orchestrator`
- `repo`
- `release`

Yeni scope gerekiyorsa kısa, teknoloji bağımsız ve tekrar kullanılabilir olmalıdır. `backend`, `frontend` gibi katman scope'ları ancak daha anlamlı ürün alanı yoksa kullanılır.

## 4. Faz değerleri

`Phase` footer'ında yalnız şu değerlerden biri kullanılır:

- `phase-0-discovery`
- `phase-1-foundation`
- `phase-2-property-identity`
- `phase-3-risk-intelligence`
- `phase-4-liveability`
- `phase-5-scoring-report`
- `phase-6-experience`
- `phase-7-scale-trust`

Repo bakım işi, en yakın ürün fazına bağlanamıyorsa `phase-1-foundation` altında yürütülür.

## 5. Doğru örnekler

```text
docs(discovery): define the Ev Karnesi product concept

Work-Item: product-definition-001
Phase: phase-0-discovery
```

```text
feat(geo): resolve selected coordinates to a building identity

Preserve parcel-level confidence separately from address confidence.

Work-Item: property-identity-014
Phase: phase-2-property-identity
```

```text
fix(scoring): keep missing flood data out of the low-risk score

Work-Item: scoring-revision-008
Phase: phase-5-scoring-report
```

## 6. Yasak örnekler

```text
updates
fix stuff
wip
feat: changes
codex(agent): finish task
feat(scoring): Added some things.
```

Şunlar da yasaktır:

- Birbiriyle ilgisiz dosyaları tek commit'e toplamak
- Başka agent veya kullanıcı değişikliğini stage etmek
- Testler başarısızken başarı commit'i oluşturmak
- Review-only iş için boş commit üretmek
- `fixup!` veya `squash!` commit'ini remote checkpoint'e taşımak
- Work item/faz footer'ını atlamak

## 7. Agent commit protokolü

Writer:

1. Atanmış write scope ve worktree durumunu kontrol eder.
2. İlgisiz değişiklikleri stage etmez.
3. Acceptance için gerekli kontrolleri çalıştırır.
4. Yalnız kendi artifact'lerini explicit path'lerle stage eder.
5. Commit mesajını doğrular:

   ```bash
   node .orchestrator/bin/git-checkpoint.mjs validate-message <commit-message-file>
   ```

6. Atomik commit oluşturur ve SHA'yı result'a kaydeder.
7. Push yapmadan üst orchestrator'a teslim eder.

## 8. Faz/checkpoint push protokolü

Üst orchestrator ancak aşağıdakiler tamamlandığında push yapar:

- İlgili implement work item'ları `pass/done`
- Zorunlu independent review item'ları `pass/done`
- Zorunlu verification item'ları `pass/done`
- Integration ve PM acceptance tamamlanmış
- Checkpoint item'ının dependency'leri `done`
- Outgoing commit'ler bu belgeye uygun
- Remote hedefi ve branch doğrulanmış
- Push fast-forward; remote commit ezilmiyor

Bağlayıcı komut:

```bash
node .orchestrator/bin/git-checkpoint.mjs push \
  --as upper-orchestrator \
  --run .orchestrator/runs/<run-id>/run.json \
  --item <git-checkpoint-item-id> \
  --remote origin \
  --branch main
```

Komut; orchestrator sistemini doğrular, checkpoint dependency'lerini kontrol eder, remote'u fetch eder, outgoing commit dilini doğrular, yalnız fast-forward push yapar ve başarılı remote/branch/SHA bilgisini çıktı olarak verir.

## 9. Çakışma ve başarısız push

- Non-fast-forward durumunda force-push yapılmaz.
- Üst orchestrator remote değişikliklerini inceleyip rebase/merge kararını kontrollü bir work item olarak ele alır.
- Çakışma başka agentın scope'una giriyorsa ilgili owner ile reconciliation yapılır.
- Kimlik doğrulama, remote veya branch eksikliği blocker olarak raporlanır.
- Başarılı komut çıktısı görülmeden “push tamamlandı” denmez.

## 10. Bilgisayarlar arası uygulama

Depoyu ilk alan katkıcı bir kez şu komutu çalıştırır:

```bash
git config core.hooksPath .githooks
```

Bu ayar:

- `commit-msg` hook'u ile commit dilini yerelde doğrular.
- `pre-push` hook'u ile üst orchestrator checkpoint komutu dışındaki doğrudan push'ları engeller.

GitHub Actions aynı commit standardını push ve pull request'lerde tekrar doğrular. Branch protection etkinleştirildiğinde bu kontrol required status check yapılmalıdır.
