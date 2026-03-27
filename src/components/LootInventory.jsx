import React from 'react';
import LootTracker from './LootTracker';
import { Card } from '@heroui/react';

const LootInventory = () => {
  return (
    <div className="loot-inventory">
      <Card className="loot-card">
        <LootTracker />
      </Card>
    </div>
  );
};

export default LootInventory;