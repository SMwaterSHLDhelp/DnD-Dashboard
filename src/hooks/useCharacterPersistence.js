import { usePersistence } from './usePersistence';

export function useCharacterPersistence() {
  return usePersistence('characters', []);
}
