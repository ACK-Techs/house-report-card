# Run Patterns

## Düşük riskli tek modül

```text
scope/contract -> implement -> verify -> acceptance -> git-checkpoint
```

Review, config risk policy tarafından zorunluysa eklenir.

## Veri kaynağı veya connector

```text
source-assessment + license-review
  -> data-contract
     -> connector
        -> geo/data-review + verification
           -> integration -> acceptance -> git-checkpoint
```

## Risk veya skor modeli

```text
methodology-spec + evaluation-set
  -> model-implementation
     -> independent-review + geo-safety-data-review + evaluation
        -> report-integration -> acceptance -> git-checkpoint
```

## Cross-layer özellik

```text
product-scope -> architecture-contract
  -> backend/data implementation
  -> client implementation
  -> contract/integration tests
  -> independent review + verification
  -> integration -> PM acceptance -> git-checkpoint
```

## Revision

Başarısız veya eksik item'ı değiştirme. Yeni item oluştur, `relations.revises` ile eski attempt'e bağla ve yalnız eksik acceptance'ı hedefle.

## Git checkpoint

Checkpoint item'ı ilgili fazın acceptance item'larına bağımlı olmalı. Acceptance; doğrulanmış commit SHA listesi, ortak commit dili kontrolü, remote/branch hedefi, fetch sonucu ve başarılı push SHA'sı istemelidir.
