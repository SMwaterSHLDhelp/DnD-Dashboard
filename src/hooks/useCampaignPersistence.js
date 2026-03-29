import { usePersistence } from './usePersistence';

export function useCampaignPersistence() {
  return usePersistence('campaigns', []);
}
