# Phase Routing

| Hedef | Faz | Örnek capability |
|---|---|---|
| Kullanıcı/problem/veri fizibilitesi | `phase-0-discovery` | product-discovery, source-inventory, legal-review |
| Ortak platform ve geo/veri sözleşmeleri | `phase-1-foundation` | geo-contract, provenance, data-quality |
| Adres/bina/parsel seçimi | `phase-2-property-identity` | geocoding, map-selection, entity-resolution |
| Deprem/zemin/sel/heyelan ve diğer tehlikeler | `phase-3-risk-intelligence` | hazard-model, geology, uncertainty |
| Ulaşım/güneş/iklim/POI | `phase-4-liveability` | routing, transit, solar, climate, poi |
| Skor/güven/açıklama/rapor | `phase-5-scoring-report` | scoring, confidence, explanation, comparison |
| Web/mobil/kullanıcı deneyimi | `phase-6-experience` | web, mobile, accessibility, privacy |
| Şehir ölçekleme/kalite/kurumsal API | `phase-7-scale-trust` | source-onboarding, evaluation, security, api |

Bir iş birden fazla fazı etkiliyorsa en erken producer contract fazını önce tamamla; tüketici fazlarını dependency ile bağla. Commit scope için faz adı yerine mümkün olan en anlaşılır modül/alan adını kullan.
