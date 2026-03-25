import React, { useState, useEffect } from 'react';

const CombatManager = ({ characters, npcs, encounters }) => {
  const [initiativeOrder, setInitiativeOrder] = useState([]);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [conditions, setConditions] = useState({});
  const [combatants, setCombatants] = useState([]);

  // Combine characters and NPCs for combat
  useEffect(() => {
    const combined = [
      ...characters.map(c => ({ ...c, type: 'character' })),
      ...npcs.map(n => ({ ...n, type: 'npc' }))
    ];
    setCombatants(combined);
    if (combined.length > 0 && initiativeOrder.length === 0) {
      initializeCombat(combined);
    }
  }, [characters, npcs]);

  const initializeCombat = (combatants) => {
    const withInitiative = combatants.map(c => ({
      ...c,
      initiative: c.initiative || Math.floor(Math.random() * 20) + 1
    }));
    const sorted = withInitiative.sort((a, b) => b.initiative - a.initiative);
    setInitiativeOrder(sorted);
  };

  const nextTurn = () => {
    setCurrentTurn((prev) => (prev + 1) % initiativeOrder.length);
  };

  const previousTurn = () => {
    setCurrentTurn((prev) => (prev - 1 + initiativeOrder.length) % initiativeOrder.length);
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

  const currentCombatant = initiativeOrder[currentTurn];

  const combatantElements = initiativeOrder.map((combatant, index) => {
    const isCurrent = index === currentTurn;
    const entityConditions = conditions[combatant.id] || [];

    return (
      <div
        key={combatant.id}
        className={`combatant-card ${isCurrent ? 'current-turn' : ''}`}
      >
        <div className="combatant-header">
          <span className={`initiative-badge`}>{combatant.initiative}</span>
          <h3>{combatant.name}</h3>
        </div>
        
        <div className="combatant-stats">
          <span>HP: {combatant.hitPoints || combatant.combat?.hitPoints || '?'}</span>
          <span>AC: {combatant.armorClass || combatant.combat?.armorClass || '?'}</span>
        </div>

        <div className="combatant-conditions">
          {entityConditions.map((condition, idx) => (
            <div key={idx} className="condition-tag">
              {condition}
              <button
                onClick={() => removeCondition(combatant.id, idx)}
                className="remove-condition"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div className="combatant-actions">
          <select
            onChange={(e) => updateCondition(combatant.id, e.target.value)}
            value=""
            className="add-condition-select"
          >
            <option value="">Add Condition</option>
            <option value="Poisoned">Poisoned</option>
            <option value="Blinded">Blinded</option>
            <option value="Paralyzed">Paralyzed</option>
            <option value="Stunned">Stunned</option>
            <option value="Unconscious">Unconscious</option>
            <option value="Frightened">Frightened</option>
            <option value="Grappled">Grappled</option>
          </select>
        </div>
      </div>
    );
  });

  return (
    <div className="combat-manager">
      <h2>Combat Manager</h2>
      <div className="combat-controls">
        <button onClick={previousTurn} disabled={currentTurn === 0}>Previous</button>
        <div className="current-turn-display">
          {currentCombatant && (
            <>
              <span className="turn-indicator">Turn: {currentTurn + 1}/{initiativeOrder.length}</span>
              <strong>{currentCombatant.name}</strong>
            </>
          )}
        </div>
        <button onClick={nextTurn}>Next</button>
      </div>
      <div className="combatant-grid">
        {combatantElements}
      </div>
      <div className="initiative-info">
        <p>
          Initiative order: {initiativeOrder.map(c => c.name).join(', ')}
        </p>
      </div>
    </div>
  );
};

export default CombatManager;
