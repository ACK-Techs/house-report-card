import type { LocationDraft, ResearchMode } from './property-search.types';
export type PendingResearch = { mode: ResearchMode; draft: LocationDraft };
let pendingResearch: PendingResearch | null = null;
export function setPendingResearch(value: PendingResearch) { pendingResearch = value; }
export function getPendingResearch() { return pendingResearch; }
export function clearPendingResearch() { pendingResearch = null; }
