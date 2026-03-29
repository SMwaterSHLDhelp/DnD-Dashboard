import { usePersistence } from './usePersistence';

export function useDMNotesPersistence() {
  return usePersistence('dmNotes', []);
}
