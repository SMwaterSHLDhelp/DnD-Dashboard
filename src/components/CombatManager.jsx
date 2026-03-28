import React, { useState, useEffect } from 'react';

const CombatManager = ({ characters, npcs, monsters = [] }) => {
  const [initiativeOrder, setInitiativeOrder] = useState([]);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [conditions, setConditions] = useState({});
  const [combatants, setCombatants] = useState([]);

  useEffect(() => {
    const combined = [
      ...characters.map(c => ({ ...c, type: 'character' })),
      ...npcs.map(n => ({ ...n, type: 'npc' })),
      ...monsters.map(m => ({ ...m, type: 'monster' }))
    ];
    setCombatants(combined);
    if (combined.length > 0 && initiativeOrder.length === 0) {
      initializeCombat(combined);
    }
  }, [characters, npcs, monsters]);

  const initializeCombat = (combatants) => {
    const withInitiative = combatants.map(c => ({
      ...c,
      initiative: c.initiative || Math.floor(Math.random() * 20) + 1
    }));
    const sorted = withInitiative.sort((a, b) => b.initiative - a.initiative);
    setInitiativeOrder(sorted);
  };

  const nextTurn = () => {
    setCurrentTurn(prev => (prev + 1) % initiativeOrder.length);
  };

  const previousTurn = () => {
    setCurrentTurn(prev => (prev - 1 + initiativeOrder.length) % initiativeOrder.length);
  };

  const updateCondition = (entityId, condition) => {
    setConditions(prev => ({
      ...prev,
      [entityId]: [...(prev[entityId] || []), condition]
    }));
  };

  const removeCondition = (entityId, conditionIndex) => {
    setConditions(prev => ({
      ...prev,
      [entityId]: prev[entityId].filter((_, i) => i !== conditionIndex)
    }));
  };

  const getCurrentEntity = () => {
    return initiativeOrder[currentTurn];
  };

  if (initiativeOrder.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-xl">Combat requires at least one combatant.</p>
        <p className="text-gray-500">Add characters, NPCs, or monsters to begin.</p>
      </div>
    );
  }

  const entity = getCurrentEntity();
  const entityConditions = conditions[entity.id] || [];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <button
          onClick={previousTurn}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded"
        >
          ← Previous
        </button>
        <h3 className="text-xl font-bold">
          Turn: {currentTurn + 1} / {initiativeOrder.length}
        </h3>
        <button
          onClick={nextTurn}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded"
        >
          Next →
        </button>
      </div>

      <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
        <h4 className="font-semibold text-lg">
          {entity.type === 'character' ? 'Character' : entity.type === 'npc' ? 'NPC' : 'Monster'}: {entity.characterName || entity.name || 'Unknown'}
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Initiative: {entity.initiative}
        </p>
        
        {entityConditions.length > 0 && (
          <div className="mt-2">
            <h5 className="font-medium">Conditions:</h5>
            <ul className="list-disc list-inside">
              {entityConditions.map((condition, index) => (
                <li key={index} className="flex justify-between">
                  <span>{condition}</span>
                  <button
                    onClick={() => removeCondition(entity.id, index)}
                    className="text-red-500"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-2">
          <select
            className="px-2 py-1 border rounded dark:bg-gray-700 dark:border-gray-600"
            onChange={(e) => updateCondition(entity.id, e.target.value)}
            defaultValue=""
          >
            <option value="">Add Condition...</option>
            <option value="Poisoned">Poisoned</option>
            <option value="Stunned">Stunned</option>
            <option value="Paralyzed">Paralyzed</option>
            <option value="Frightened">Frightened</option>
            <option value="Invisible">Invisible</option>
            <option value="Blinded">Blinded</option>
            <option value="Confused">Confused</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {initiativeOrder.map((combatant, index) => (
          <div
            key={combatant.id}
            className={`p-3 rounded-lg ${
              index === currentTurn
                ? 'bg-blue-200 dark:bg-blue-800 border-2 border-blue-500'
                : 'bg-gray-100 dark:bg-gray-800'
            }`}
          >
            <div className="font-medium">
              {combatant.type === 'character' ? 'Character' : combatant.type === 'npc' ? 'NPC' : 'Monster'}: {combatant.characterName || combatant.name || 'Unknown'}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Initiative: {combatant.initiative}
            </div>
            {conditions[combatant.id]?.length > 0 && (
              <div className="text-sm text-red-500 mt-1">
                {conditions[combatant.id].length} conditions
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CombatManager;