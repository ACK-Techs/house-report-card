import type { HomeDataSource } from './home.types';

let activeHomeDataSource: HomeDataSource | null = null;

export function registerHomeDataSource(dataSource: HomeDataSource) {
  activeHomeDataSource = dataSource;
}

export function getHomeDataSource() {
  return activeHomeDataSource;
}
