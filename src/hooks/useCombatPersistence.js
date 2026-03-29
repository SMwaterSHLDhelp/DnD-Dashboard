import { usePersistence } from './usePersistence';

export function useCombatPersistence() {
  return usePersistence('combatState', {
    initiativeOrder: [],
    activeCombatants: [],
    currentTurn: null
  });
}
