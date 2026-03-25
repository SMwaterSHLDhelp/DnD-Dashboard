import React, { useState } from 'react';

const CombatConditions = () => {
  const [conditionList, setConditionList] = useState([]);
  const [selectedCombatant, setSelectedCombatant] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');

  const conditions = [
    { id: 'poisoned', name: 'Poisoned', description: 'Advantage on attacks against you; disadvantage on your attack and ability checks.' },
    { id: 'blinded', name: 'Blinded', description: 'Can’t see; all checks requiring sight automatically fail; disadvantage on attack rolls; attacks against you have advantage.' },
    { id: 'paralyzed', name: 'Paralyzed', description: 'Incapacitated; can’t move; speech broken; attack rolls against you have advantage; any attack that hits you is a critical hit if the attacker is within 5 feet.' },
    { id: 'stunned', name: 'Stunned', description: 'Incapped; can’t move; speech broken; attack rolls against you have advantage; any attack that hits you is a critical hit.' },
    { id: 'unconscious', name: 'Unconscious', description: 'Incapacitated; can’t move or act; speech broken; attack rolls against you have advantage; any attack that hits you is a critical hit.' },
    { id: 'frightened', name: 'Frightened', description: 'Disadvantage on ability checks and attack rolls while the source of your fear is within line of sight; can’t willingly move closer to the source of your fear.' },
    { id: 'grappled', name: 'Grappled', description: 'Speed is 0; can’t benefit from bonus to speed; escape via Strength (Athletics) or Dexterity (Acrobatics) check.' },
    { id: 'incapacitated', name: 'Incapacitated', description: 'Can’t take actions or reactions.' },
    { id: 'invisible', name: 'Invisible', description: 'Can’t be seen; attack rolls against you have disadvantage; you have advantage on attack rolls.' },
    { id: 'prone', name: 'Prone', description: 'Speed is 0 unless you crawl; attack rolls against you have advantage; your attack rolls have disadvantage.' }
  ];

  const addCondition = () => {
    if (selectedCombatant && selectedCondition) {
      const conditionData = conditions.find(c => c.id === selectedCondition);
      setConditionList(prev => [
        ...prev,
        { combatant: selectedCombatant, ...conditionData, timestamp: Date.now() }
      ]);
      setSelectedCondition('');
    }
  };

  const removeCondition = (index) => {
    setConditionList(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="combat-conditions-manager">
      <h2>Combat Conditions</h2>
      <div className="condition-inputs">
        <select
          value={selectedCombatant}
          onChange={(e) => setSelectedCombatant(e.target.value)}
        >
          <option value="">Select Combatant</option>
          <option value="Player 1">Player 1</option>
          <option value="Player 2">Player 2</option>
          <option value="Goblin 1">Goblin 1</option>
          <option value="Orc 1">Orc 1</option>
        </select>
        <select
          value={selectedCondition}
          onChange={(e) => setSelectedCondition(e.target.value)}
        >
          <option value="">Select Condition</option>
          {conditions.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <button onClick={addCondition}>Add Condition</button>
      </div>

      <div className="active-conditions">
        <h3>Active Conditions</h3>
        {conditionList.length === 0 ? (
          <p>No active conditions</p>
        ) : (
          <ul>
            {conditionList.map((condition, i) => (
              <li key={i} className="condition-item">
                <div>
                  <strong>{condition.name}</strong> applied to {condition.combatant}
                  <p className="condition-description">{condition.description}</p>
                </div>
                <button onClick={() => removeCondition(i)} className="remove-condition">
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CombatConditions;
