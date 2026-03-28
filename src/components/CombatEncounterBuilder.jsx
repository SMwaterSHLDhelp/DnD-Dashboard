import React, { useState, useEffect } from 'react';
import CombatManager from './CombatManager';
import MonsterSearch from './MonsterSearch';
import CombatConditions from './CombatConditions';

const CombatEncounterBuilder = () => {
  const [characters, setCharacters] = useState([
    { id: 'char1', name: 'Aldric', race: 'Human', class: 'Fighter', level: 3, initiative: 12, hp: 28 },
    { id: 'char2', name: 'Lyra', race: 'Elf', class: 'Rogue', level: 2, initiative: 14, hp: 18 }
  ]);
  const [npcs, setNpcs] = useState([
    { id: 'npc1', name: 'Merchant Gregor', initiative: 8, hp: 10 }
  ]);
  const [monsters, setMonsters] = useState([]);
  const [activeTab, setActiveTab] = useState('combat');

  const addMonsterToCombat = (monster) => {
    const existingMonster = monsters.find(m => m.id === monster.id);
    if (existingMonster) {
      // Increase monster count
      const updatedMonsters = monsters.map(m => 
        m.id === monster.id 
          ? { ...m, count: (m.count || 1) + 1, hp: (m.count + 1) * m.hp } 
          : m
      );
      setMonsters(updatedMonsters);
    } else {
      setMonsters([...monsters, { ...monster, count: 1 }]);
    }
  };

  const removeMonsterFromCombat = (monsterId) => {
    setMonsters(monsters.filter(m => m.id !== monsterId));
  };

  const updateMonsterHP = (monsterId, newHP) => {
    setMonsters(monsters.map(m => 
      m.id === monsterId ? { ...m, hp: newHP } : m
    ));
  };

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Encounter Builder</h2>
      
      <div className="mb-4">
        <div className="flex space-x-2 mb-4">
          <button
            onClick={() => setActiveTab('combat')}
            className={`px-4 py-2 rounded ${
              activeTab === 'combat' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            Combat Manager
          </button>
          <button
            onClick={() => setActiveTab('search')}
            className={`px-4 py-2 rounded ${
              activeTab === 'search' 
                ? 'bg-purple-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            Monster Search
          </button>
        </div>

        {activeTab === 'combat' && (
          <CombatManager 
            characters={characters} 
            npcs={npcs} 
            monsters={monsters} 
          />
        )}

        {activeTab === 'search' && (
          <div>
            <MonsterSearch />
            {monsters.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-bold mb-2">Monsters in Encounter:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {monsters.map(monster => (
                    <div key={monster.id} className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span>{monster.name}</span>
                        <span className="text-sm">{monster.count || 1} copy/copies</span>
                      </div>
                      <div className="mt-2 text-sm">
                        <span>HP: {monster.hp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {characters.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-2">Characters in Combat:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {characters.map(character => (
              <div key={character.id} className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                <div className="font-semibold">{character.name}</div>
                <div className="text-sm">{character.race} {character.class} Lvl {character.level}</div>
                <div className="text-sm">Initiative: {character.initiative}</div>
                <div className="text-sm">HP: {character.hp}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {npcs.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">NPCs in Combat:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {npcs.map(npc => (
              <div key={npc.id} className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                <div className="font-semibold">{npc.name}</div>
                <div className="text-sm">Initiative: {npc.initiative}</div>
                <div className="text-sm">HP: {npc.hp}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CombatEncounterBuilder;