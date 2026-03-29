import { usePersistence } from './usePersistence';

export function useTimelinePersistence() {
  return usePersistence('timelineEvents', []);
}
