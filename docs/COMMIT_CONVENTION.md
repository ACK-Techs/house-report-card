# Ev Karnesi Ortak Commit ve Push Standardı

Bu belge insan ve AI tüm katkıcılar için bağlayıcı Git dilidir. Amaç; farklı bilgisayarlarda üretilen değişikliklerin aynı biçimde okunması, atomik incelenmesi ve remote'a kontrollü sırayla gönderilmesidir.

## 1. Tek commit biçimi

```text
type(scope): imperative English summary

Optional body explaining why and important constraints.

Optional footers:
Work-Item: <run-work-item-id>
Phase: <phase-id>
```

Zorunlu olan tek şey subject satırıdır: `type(scope): imperative English summary`.

Kurallar:

- `type` ve `scope` İngilizce, küçük harf ve ASCII olmalıdır.
- Özet İngilizce, emir kipinde, küçük harfle başlamalı ve nokta ile bitmemelidir.
- Subject en fazla 72 karakter olmalıdır.
- `Work-Item` ve `Phase` footer'ları opsiyoneldir; yazılırsa her birinden en fazla bir tane bulunur ve `Phase` değeri geçerli faz listesinden seçilir.
- Bir run graph içinde yürüyen iş için bu footer'ları eklemek izlenebilirlik açısından önerilir, fakat commit'in kabulü için şart değildir.
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

`Phase` footer'ı opsiyoneldir. Kullanılırsa yalnız şu değerlerden biri yazılır:

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
```

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
- Aynı footer'ı (`Work-Item`, `Phase`) birden fazla kez yazmak veya geçersiz faz değeri kullanmak

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

6. Atomik commit oluşturur ve SHA'yı result'a kaydeder. Run graph içinde çalışıyorsa izlenebilirlik için `Work-Item` ve `Phase` footer'larını ekler.
7. Kullanıcı açıkça push istemedikçe remote'a göndermez; istendiğinde `git push` kullanır.

## 8. Push protokolü

`git push` serbesttir. Checkpoint helper zorunlu değildir.

Push öncesi:

- Outgoing commit'ler bu belgeye uygun olmalıdır (`commit-msg` ve `pre-push` bunu doğrular)
- Remote hedefi ve branch bilinmelidir
- Push fast-forward olmalıdır; remote commit ezilmez
- Force-push yasaktır

İsteğe bağlı toplu teslim komutu:

```bash
node .orchestrator/bin/git-checkpoint.mjs push \
  --as upper-orchestrator \
  --run .orchestrator/runs/<run-id>/run.json \
  --item <git-checkpoint-item-id> \
  --remote origin \
  --branch main
```

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
- `pre-push` hook'u ile gönderilen commit dilini doğrular; `git push`'u engellemez.

GitHub Actions aynı commit standardını push ve pull request'lerde tekrar doğrular. Branch protection etkinleştirildiğinde bu kontrol required status check yapılmalıdır.
