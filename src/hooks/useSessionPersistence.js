import { usePersistence } from './usePersistence';

export function useSessionPersistence() {
  return usePersistence('sessions', []);
}
