import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

function CombatTools() {
  const [initiativeList, setInitiativeList] = useState([
    { id: 1, name: 'Goblin A', initiative: 12, hp: 7, maxHp: 7 },
    { id: 2, name: 'Player 1', initiative: 15, hp: 28, maxHp: 28 },
    { id: 3, name: 'Goblin B', initiative: 10, hp: 7, maxHp: 7 }
  ]);
  const [activeTurn, setActiveTurn] = useState(1);
  const [conditionInput, setConditionInput] = useState('');
  const [conditions, setConditions] = useState([]);

  const addInitiative = () => {
    const newEntry = {
      id: Date.now(),
      name: `Creature ${initiativeList.length + 1}`,
      initiative: Math.floor(Math.random() * 20) + 1,
      hp: 10,
      maxHp: 10
    };
    setInitiativeList([...initiativeList, newEntry].sort((a, b) => b.initiative - a.initiative));
  };

  const removeInitiative = (id) => {
    setInitiativeList(initiativeList.filter(entry => entry.id !== id));
  };

  const updateHp = (id, hp) => {
    setInitiativeList(initiativeList.map(entry =>
      entry.id === id ? { ...entry, hp } : entry
    ));
  };

  const nextTurn = () => {
    setActiveTurn((prev) => (prev + 1) % initiativeList.length);
  };

  const addCondition = (characterId) => {
    if (conditionInput.trim()) {
      setConditions([...conditions, { id: Date.now(), characterId, condition: conditionInput }]);
      setConditionInput('');
    }
  };

  const removeCondition = (id) => {
    setConditions(conditions.filter(c => c.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Combat & Encounter Tools</h2>
      
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Initiative Tracker</h3>
          <Button size="sm" onClick={addInitiative} color="primary">+ Add Entry</Button>
        </CardHeader>
        <CardBody>
          <div className="space-y-2">
            {initiativeList.map((entry, index) => (
              <div
                key={entry.id}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  index === activeTurn ? 'bg-indigo-100 border-l-4 border-indigo-500' : 'bg-white shadow-sm'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <span className="font-mono text-sm text-gray-500 w-8">{entry.initiative}</span>
                  <span className={`font-medium ${index === activeTurn ? 'text-indigo-700 font-bold' : 'text-gray-700'}`}>
                    {entry.name}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={entry.hp}
                      onChange={(e) => updateHp(entry.id, parseInt(e.target.value) || 0)}
                      className="w-16 px-2 py-1 border rounded"
                      placeholder="HP"
                    />
                    <span className="text-gray-500">/</span>
                    <span className="text-gray-500">{entry.maxHp}</span>
                  </div>
                  <Button size="sm" onClick={() => removeInitiative(entry.id)} variant="flat" color="danger">
                    ✕
                  </Button>
                </div>
              </div>
            ))}
            {initiativeList.length === 0 && (
              <p className="text-gray-500 text-center py-4">No combatants added yet. Click "+ Add Entry" to start.</p>
            )}
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <Button onClick={() => setInitiativeList([]).sort(() => 0)} variant="flat">
              Reset
            </Button>
            <Button onClick={nextTurn} color="primary">
              Next Turn
            </Button>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Conditions & Effects</h3>
        </CardHeader>
        <CardBody>
          <div className="flex space-x-2 mb-4">
            <Input
              placeholder="Add condition (e.g., Poisoned, Blinded)"
              value={conditionInput}
              onChange={(e) => setConditionInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') addCondition(activeTurn);
              }}
            />
            <Button onClick={() => addCondition(activeTurn)} color="primary">
              Add
            </Button>
          </div>
          <div className="space-y-2">
            {conditions.map(condition => (
              <div key={condition.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm font-medium">{condition.condition}</span>
                <Button size="sm" onClick={() => removeCondition(condition.id)} variant="flat" color="danger">
                  ✕
                </Button>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default CombatTools;