import { useCallback, useEffect, useState } from 'react';
import { getHomeDataSource } from '../home-data-source';
import type { HomeViewModel } from '../home.types';

const safeInitialState: HomeViewModel = {
  userName: null,
  needsPreferences: true,
  recentResearch: { status: 'empty' },
};

export function useHomeState() {
  const [viewModel, setViewModel] = useState<HomeViewModel>(safeInitialState);

  const load = useCallback(async () => {
    const dataSource = getHomeDataSource();
    if (!dataSource) {
      setViewModel(safeInitialState);
      return;
    }
    setViewModel((current) => ({ ...current, recentResearch: { status: 'loading' } }));
    try {
      setViewModel(await dataSource.load());
    } catch {
      setViewModel((current) => ({ ...current, recentResearch: { status: 'error' } }));
    }
  }, []);

  useEffect(() => { void load(); }, [load]);
  return { viewModel, retryRecentResearch: load };
}
