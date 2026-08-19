import { useCallback, useState } from 'react';
import type { HomeViewModel } from '../home.types';

const initialState: HomeViewModel = {
  userName: null,
  needsPreferences: true,
  recentResearch: { status: 'empty' },
};

export function useHomeState() {
  const [viewModel, setViewModel] = useState<HomeViewModel>(initialState);
  const retryRecentResearch = useCallback(() => {
    setViewModel((current) => ({ ...current, recentResearch: { status: 'loading' } }));
    setTimeout(() => setViewModel((current) => ({ ...current, recentResearch: { status: 'empty' } })), 400);
  }, []);
  return { viewModel, retryRecentResearch };
}
