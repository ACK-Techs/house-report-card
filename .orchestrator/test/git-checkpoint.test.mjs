import test from 'node:test';
import assert from 'node:assert/strict';
import { validateCommitMessage } from '../bin/git-checkpoint.mjs';

test('accepts the shared commit format', () => {
  const message = `feat(geo): resolve coordinates to a building identity

Work-Item: property-identity-014
Phase: phase-2-property-identity`;
  assert.deepEqual(validateCommitMessage(message), []);
});

test('rejects vague subjects and missing footers', () => {
  const errors = validateCommitMessage('updates');
  assert.equal(errors.length, 3);
});

test('rejects unsupported phases', () => {
  const message = `docs(discovery): define the product boundary

Work-Item: product-001
Phase: someday`;
  assert.match(validateCommitMessage(message).join('\n'), /unsupported Phase/);
});

test('allows generated merge commits', () => {
  assert.deepEqual(validateCommitMessage('Merge branch feature/map'), []);
});
