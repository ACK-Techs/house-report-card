---
name: orchestrate-ev-karnesi
description: Manage Ev Karnesi product discovery, architecture, implementation, data-source integration, geospatial identity, hazard and liveability analysis, scoring, review, verification, integration, resume work, and phase-based Git delivery through the repository's persistent .orchestrator run graph. Use for non-trivial or multi-step Ev Karnesi work, cross-layer changes, multiple agents, API/data contracts, map/location logic, risk claims, personal data, migrations, deployments, or any task requiring durable handoffs and quality gates.
---

# Orchestrate Ev Karnesi

Use `.orchestrator` as the source of truth for non-trivial project work. Do not manage a multi-step implementation only in conversation memory.

## Start

1. Read `README.md` completely.
2. Read `.orchestrator/PROJECT-STATE.md`, `.orchestrator/ARCHITECTURE.md`, `.orchestrator/SYSTEM.md`, and `docs/COMMIT_CONVENTION.md` completely.
3. Read the assigned role under `.orchestrator/roles/`.
4. Run `node .orchestrator/bin/orchestrator.mjs discover` when the catalog is missing or repository structure changed.
5. Inspect active runs before creating a duplicate.
6. Read [phase-routing.md](references/phase-routing.md) to choose phase/capabilities; read [run-patterns.md](references/run-patterns.md) to shape the graph.

## Choose workflow

### Answer, audit, or design only

Use a read-only `analysis`, `source-assessment`, `specification`, or `architecture-review` item. Do not infer implementation authorization.

### Build or change

Create or resume a run. Apply this dependency order:

```text
PM scope -> discovery/source assessment -> contract -> implement -> review -> verify -> integration -> PM acceptance -> Git checkpoint
```

Add every quality gate required by `.orchestrator/config.json`.

### Diagnose

Create read-only discovery/reproduction items first. Add a fix item only when the request includes implementation authority.

### Resume

Run `validate` and `status`; inspect `events.jsonl` and `results/`; reconcile stale `active` ownership; inspect Git/remote state before redispatch or push.

## PM protocol

- Preserve approved scope and record durable decisions in `run.decisions`.
- Make data source, license, geo resolution, provenance, schema, score and confidence contracts explicit before implementation.
- Assign role, capabilities, write scope, risk, approval boundary, outputs and exact acceptance to every item.
- Keep implementation, review, verification and integration ownership separate.
- Create revision items; never rewrite failed history.
- Do not accept integration until code, contracts, tests, methodology and user-facing explanations agree.

## Product invariants

- Treat missing data as unknown, never low risk.
- Keep regional hazard, exposure, ground effects and actual building capacity distinct.
- Attach source, observed/published time, geographic resolution, method version and confidence to derived results.
- Expose uncertainty in address/building/parcel matching.
- Treat photo/AI inference as unverified unless confirmed by an authoritative source or qualified inspection.
- Version score weights and make explanations reproducible.
- Treat precise location, address history, profile and photos as sensitive data.
- Require specialist review for discrimination proxies, public risk language and commercial neutrality.

## Dispatch and result protocol

1. Run `sync` and `status`.
2. Select the first dependency-safe batch.
3. Parallelize read-only work; parallelize writers only with disjoint semantic/write scopes and safe isolation.
4. Render a handoff when native delegation is unavailable:

```bash
node .orchestrator/bin/orchestrator.mjs render <run.json> <item-id> --platform codex
```

5. Require `.orchestrator/contracts/result.schema.json` output.
6. Record an attempt with `record`; never manually set an item to `done`.
7. Add a revision item on incomplete acceptance.

## Git delivery

- Follow `docs/COMMIT_CONVENTION.md` exactly.
- Let a writer commit only its validated assigned scope with `Work-Item` and `Phase` footers.
- Never let a writer or child agent push.
- Let the upper orchestrator push only after independent review, verification, integration and PM acceptance of the checkpoint.
- Fetch before push; stop and report non-fast-forward or ownership conflicts rather than overwriting remote work.
- Never force-push.
- Record commit SHA and, after push, remote/branch/SHA evidence.
- Obey any task-specific user instruction that disables commit or push.

## Completion

Return accepted outcomes, artifacts, checks, unverified risks, commit SHAs, push evidence and the next graph state. Never claim that a check or push succeeded without evidence.
