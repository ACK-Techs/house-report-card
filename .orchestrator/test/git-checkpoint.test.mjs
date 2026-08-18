import test from 'node:test';
import assert from 'node:assert/strict';
import { validateCommitMessage } from '../bin/git-checkpoint.mjs';

test('accepts the shared commit format', () => {
  const message = `feat(geo): resolve coordinates to a building identity

Work-Item: property-identity-014
Phase: phase-2-property-identity`;
  assert.deepEqual(validateCommitMessage(message), []);
});

test('accepts a subject-only commit without footers', () => {
  assert.deepEqual(validateCommitMessage('docs(discovery): define the product boundary'), []);
});

test('accepts a body without footers', () => {
  const message = `fix(scoring): keep missing flood data out of the low-risk score

Missing data must stay visible instead of lowering the score.`;
  assert.deepEqual(validateCommitMessage(message), []);
});

test('rejects vague subjects', () => {
  const errors = validateCommitMessage('updates');
  assert.equal(errors.length, 1);
  assert.match(errors.join('\n'), /subject must match/);
});

test('rejects unsupported phases when the footer is present', () => {
  const message = `docs(discovery): define the product boundary

Phase: someday`;
  assert.match(validateCommitMessage(message).join('\n'), /unsupported Phase/);
});

test('rejects duplicated footers', () => {
  const message = `docs(discovery): define the product boundary

Work-Item: product-001
Work-Item: product-002
Phase: phase-0-discovery
Phase: phase-1-foundation`;
  const errors = validateCommitMessage(message).join('\n');
  assert.match(errors, /at most one Work-Item footer/);
  assert.match(errors, /at most one Phase footer/);
});

test('allows generated merge commits', () => {
  assert.deepEqual(validateCommitMessage('Merge branch feature/map'), []);
});
