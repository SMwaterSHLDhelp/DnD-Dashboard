import React, { useState } from 'react';
import CombatManager from './CombatManager';
import MonsterStatBlock from './MonsterStatBlock';
import CombatConditions from './CombatConditions';
import MonsterSearch from './MonsterSearch';

const CombatEncounterBuilder = ({ characters, npcs }) => {
  const [activeTab, setActiveTab] = useState('combat');
  const [monsters, setMonsters] = useState([]);

  const addMonster = (monster) => {
    setMonsters(prev => [
      ...prev,
      { ...monster, id: monster.id + Date.now(), initiative: Math.floor(Math.random() * 20) + 1 }
    ]);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'combat':
        return <CombatManager characters={characters} npcs={npcs} monsters={monsters} />;
      case 'conditions':
        return <CombatConditions />;
      case 'search':
        return <MonsterSearch onAddMonster={addMonster} />;
      default:
        return null;
    }
  };

  return (
    <div className="combat-encounter-builder">
      <div className="tabs">
        <button
          className={activeTab === 'combat' ? 'active' : ''}
          onClick={() => setActiveTab('combat')}
        >
          Combat Manager
        </button>
        <button
          className={activeTab === 'conditions' ? 'active' : ''}
          onClick={() => setActiveTab('conditions')}
        >
          Conditions
        </button>
        <button
          className={activeTab === 'search' ? 'active' : ''}
          onClick={() => setActiveTab('search')}
        >
          Find Monsters
        </button>
      </div>

      <div className="tab-content">
        {renderContent()}
      </div>

      {monsters.length > 0 && (
        <div className="monsters-added">
          <h4>Monsters Added to Combat</h4>
          <ul>
            {monsters.map(monster => (
              <li key={monster.id}>
                {monster.name}
                <button
                  onClick={() => setMonsters(prev => prev.filter(m => m.id !== monster.id))}
                  className="remove-monster-btn"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CombatEncounterBuilder;
