import React, { useState, useEffect } from 'react';

const CombatConditions = ({ combatantId, conditions = [] }) => {
  const conditionList = [
    { name: 'Poisoned', description: 'Disadvantage on ability checks' },
    { name: 'Blinded', description: 'Can’t see, disadvantage on attack rolls' },
    { name: 'Stunned', description: 'Can’t take actions, fall prone' },
    { name: 'Paralyzed', description: 'Can’t take actions, immune to damage' },
    { name: 'Frightened', description: 'Disadvantage on ability checks/attacks while source is visible' },
    { name: 'Grappled', description: 'Speed 0, can’t benefit from speed bonuses' },
    { name: 'Incapacitated', description: 'Can’t take actions' },
    { name: 'Restrained', description: 'Speed 0, attack rolls have advantage' },
    { name: 'Unconscious', description: 'Can’t take actions, prone' }
  ];

  const [activeConditions, setActiveConditions] = useState(conditions);

  useEffect(() => {
    setActiveConditions(conditions);
  }, [conditions]);

  const toggleCondition = (conditionName) => {
    setActiveConditions(prev =>
      prev.includes(conditionName)
        ? prev.filter(c => c !== conditionName)
        : [...prev, conditionName]
    );
  };

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Combat Conditions</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {conditionList.map(condition => (
          <button
            key={condition.name}
            onClick={() => toggleCondition(condition.name)}
            className={`p-2 text-sm rounded transition-colors ${
              activeConditions.includes(condition.name)
                ? 'bg-red-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            <div className="font-semibold">{condition.name}</div>
            <div className="text-xs opacity-75">{condition.description}</div>
          </button>
        ))}
      </div>
      
      {activeConditions.length > 0 && (
        <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 rounded">
          <strong className="text-red-700 dark:text-red-300">Active Conditions:</strong>
          <ul className="list-disc list-inside ml-2 mt-2 text-sm">
            {activeConditions.map(c => <li key={c}>{c}</li>)}
          </ul>
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-500">
        <p>Conditions are tracked per combatant in the Combat Manager. Use the dropdown in the turn tracker to add conditions to the current combatant.</p>
      </div>
    </div>
  );
};

export default CombatConditions;
