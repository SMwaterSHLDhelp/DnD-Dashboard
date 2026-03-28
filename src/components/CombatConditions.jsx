import React, { useState } from 'react';

const CombatConditions = () => {
  const [condition, setCondition] = useState('');
  const [duration, setDuration] = useState('');
  const [saveDC, setSaveDC] = useState('');

  const conditionsList = [
    { name: 'Blinded', description: 'The creature can\'t see and automatically fails any ability check that requires sight.' },
    { name: 'Charmed', description: 'The creature can\'t attack the charmer or target the charmer with harmful abilities or magical effects.' },
    { name: 'Frightened', description: 'The creature has disadvantage on ability checks and attack rolls while the source of its fear is within line of sight.' },
    { name: 'Grappled', description: 'The creature\'s speed becomes 0, and it can\'t benefit from any bonus to its speed.' },
    { name: 'Invisible', description: 'The creature can\'t be seen without the aid of magic or a special sense. For stealth checks, the creature is hidden.' },
    { name: 'Paralyzed', description: 'The creature is incapacitated, can\'t move, and is deaf. Attack rolls against the creature have advantage.' },
    { name: 'Poisoned', description: 'The creature has disadvantage on attack rolls and ability checks.' },
    { name: 'Stunned', description: 'The creature is incapacitated, can\'t move, and is deaf. Attack rolls against the creature have advantage.' },
    { name: 'Unconscious', description: 'The creature is incapacitated, can\'t move or speak, and is unaware of its surroundings.' },
    { name: 'Pacified', description: 'The creature is immune to being charmed and cannot make attack rolls.' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-4">Combat Condition Reference</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {conditionsList.map(cond => (
            <div key={cond.name} className="p-3 border rounded-lg dark:border-gray-600">
              <h4 className="font-semibold text-lg">{cond.name}</h4>
              <p className="text-sm mt-1">{cond.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4">Add Custom Condition</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Condition Name</label>
            <input
              type="text"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              placeholder="e.g., Diseased, Exhausted"
              className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Duration (in turns)</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g., 6"
              className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Saving Throw DC</label>
            <input
              type="number"
              value={saveDC}
              onChange={(e) => setSaveDC(e.target.value)}
              placeholder="e.g., 15"
              className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          {condition && (
            <div className="p-4 bg-green-100 dark:bg-green-900 rounded-lg">
              <h4 className="font-semibold">Custom Condition Added:</h4>
              <p>{condition}</p>
              {duration && <p>Duration: {duration} turns</p>}
              {saveDC && <p>Save DC: {saveDC}</p>}
            </div>
          )}
        </div>
      </div>

      <div className="text-sm text-gray-500">
        <p>Conditions are tracked per combatant in the Combat Manager. Use the dropdown in the turn tracker to add conditions to the current combatant.</p>
      </div>
    </div>
  );
};

export default CombatConditions;