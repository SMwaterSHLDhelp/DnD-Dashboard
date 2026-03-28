import React, { useState, useEffect } from 'react';

const CombatManager = ({ characters = [], npcs = [], monsters = [] }) => {
  const [combatants, setCombatants] = useState([]);
  const [initiativeOrder, setInitiativeOrder] = useState([]);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [conditions, setConditions] = useState({});
  const [activeTab, setActiveTab] = useState('combatants');

  // Combine all combatants with initiative
  useEffect(() => {
    const allCombatants = [
      ...characters.map(c => ({ ...c, type: 'character' })),
      ...npcs.map(n => ({ ...n, type: 'npc' })),
      ...monsters.map(m => ({ ...m, type: 'monster' }))
    ];

    const initiativeList = allCombatants
      .map(c => ({ ...c, initiative: c.initiative || Math.floor(Math.random() * 20) + 1 }))
      .sort((a, b) => b.initiative - a.initiative);

    setInitiativeOrder(initiativeList);
  }, [characters, npcs, monsters]);

  const toggleCondition = (combatantId, condition) => {
    setConditions(prev => ({
      ...prev,
      [combatantId]: prev[combatantId]?.includes(condition)
        ? prev[combatantId].filter(c => c !== condition)
        : [...(prev[combatantId] || []), condition]
    }));
  };

  const advanceTurn = () => {
    setCurrentTurn((prev) => (prev + 1) % initiativeOrder.length);
  };

  const resetCombat = () => {
    setInitiativeOrder([]);
    setCurrentTurn(0);
    setConditions({});
  };

  const combatant = initiativeOrder[currentTurn];

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Combat Manager</h2>
        <button
          onClick={resetCombat}
          className="px-3 py-1 bg-red-500 text-white rounded text-sm"
        >
          Reset Combat
        </button>
      </div>

      <div className="mb-4">
        <button
          onClick={advanceTurn}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
        >
          Next Turn
        </button>
        {combatant && (
          <span className="text-lg">
            Current Turn: {combatant.name || combatant.characterName || 'Unknown'}
          </span>
        )}
      </div>

      {conditions[combatant?.id]?.length > 0 && (
        <div className="mb-4 p-2 bg-red-100 dark:bg-red-900 rounded">
          <strong>Conditions:</strong> {conditions[combatant.id].join(', ')}
        </div>
      )}

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
              {combatant.type === 'character' ? 'Character' : combatant.type === 'npc' ? 'NPC' : 'Monster'}: {combatant.name || 'Unknown'}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Initiative: {combatant.initiative}
            </div>
            {combatant.race && <div className="text-xs">Race: {combatant.race}</div>}
            {combatant.class && <div className="text-xs">Class: {combatant.class}</div>}
            {combatant.hp && <div className="text-xs">HP: {combatant.hp}</div>}
            {conditions[combatant.id]?.length > 0 && (
              <div className="text-sm text-red-500 mt-1">
                {conditions[combatant.id].join(', ')}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CombatManager;
