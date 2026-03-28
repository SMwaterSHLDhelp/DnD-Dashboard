import { useState } from 'react';
import { Card, CardBody, CardHeader, Input, Button, Tabs, Tab } from '@heroui/react';

export default function CombatView() {
  const [initiativeOrder, setInitiativeOrder] = useState([]);
  const [currentCombatant, setCurrentCombatant] = useState({
    name: '',
    initiative: 0,
    hp: 0,
    maxHp: 0,
    conditions: []
  });

  const handleAddCombatant = () => {
    if (currentCombatant.name) {
      setInitiativeOrder([...initiativeOrder, { ...currentCombatant, id: Date.now() }].sort((a, b) => b.initiative - a.initiative));
      setCurrentCombatant({ name: '', initiative: 0, hp: 0, maxHp: 0, conditions: [] });
    }
  };

  const handleRemoveCombatant = (id) => {
    setInitiativeOrder(initiativeOrder.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Combat Tracker</h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Name"
                value={currentCombatant.name}
                onChange={(e) => setCurrentCombatant({ ...currentCombatant, name: e.target.value })}
              />
              <Input
                type="number"
                label="Initiative"
                value={currentCombatant.initiative}
                onChange={(e) => setCurrentCombatant({ ...currentCombatant, initiative: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="number"
                label="Current HP"
                value={currentCombatant.hp}
                onChange={(e) => setCurrentCombatant({ ...currentCombatant, hp: parseInt(e.target.value) || 0 })}
              />
              <Input
                type="number"
                label="Max HP"
                value={currentCombatant.maxHp}
                onChange={(e) => setCurrentCombatant({ ...currentCombatant, maxHp: parseInt(e.target.value) || 0 })}
              />
            </div>
            <Button onPress={handleAddCombatant} color="primary">Add Combatant</Button>
          </div>

          {initiativeOrder.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Initiative Order</h3>
              <div className="space-y-2">
                {initiativeOrder.map((combatant) => (
                  <Card key={combatant.id}>
                    <CardBody>
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold">{combatant.name}</h4>
                          <p className="text-sm text-gray-500">Init: {combatant.initiative} | HP: {combatant.hp}/{combatant.maxHp}</p>
                        </div>
                        <Button color="danger" size="sm" onPress={() => handleRemoveCombatant(combatant.id)}>Remove</Button>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}