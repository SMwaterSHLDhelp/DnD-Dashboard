import { usePersistence } from './usePersistence';

export function useNPCPersistence() {
  return usePersistence('npcs', []);
}
