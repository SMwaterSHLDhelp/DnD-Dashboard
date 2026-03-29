import { usePersistence } from './usePersistence';

export function useLootPersistence() {
  return usePersistence('loot', {
    items: [],
    goldTotal: 0,
    lastUpdated: null
  });
}
