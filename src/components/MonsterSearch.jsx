import React, { useState } from 'react';
import MonsterStatBlock from './MonsterStatBlock';

const MonsterSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonster, setSelectedMonster] = useState(null);
  const [monsters, setMonsters] = useState([]);

  const monsterDatabase = [
    {
      id: 1,
      name: 'Goblin',
      size: 'Small',
      type: 'Humanoid',
      alignment: 'Chaotic Neutral',
      armorClass: 15,
      hitPoints: 7,
      speed: '30 ft',
      strength: 8,
      dexterity: 14,
      constitution: 10,
      intelligence: 10,
      wisdom: 8,
      charisma: 10,
      abilities: [
        { name: 'Nimble Escape', description: 'Can take the Disengage or Hide action as a bonus action.' }
      ],
      actions: [
        { name: 'Scimitar', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage.' },
        { name: 'Shortbow', description: 'Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 5 (1d6 + 2) piercing damage.' }
      ]
    },
    {
      id: 2,
      name: 'Orc',
      size: 'Medium',
      type: 'Humanoid',
      alignment: 'Chaotic Evil',
      armorClass: 13,
      hitPoints: 15,
      speed: '30 ft',
      strength: 16,
      dexterity: 12,
      constitution: 16,
      intelligence: 7,
      wisdom: 10,
      charisma: 10,
      abilities: [
        { name: 'Brute', description: 'When the orc hits with a melee weapon attack with a weapon he is holding, the attack deals an extra 2 damage.' },
        { name: 'Aggressive', description: 'As a bonus action, the orc can move up to its speed toward a hostile creature it can see.' }
      ],
      actions: [
        { name: 'Greataxe', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 9 (1d12 + 3) slashing damage.' },
        { name: 'Javelin', description: 'Melee or Ranged Weapon Attack: +5 to hit, reach 5 ft. or range 30/120 ft., one target. Hit: 5 (1d6 + 3) piercing damage.' }
      ]
    },
    {
      id: 3,
      name: 'Skeleton',
      size: 'Medium',
      type: 'Undead',
      alignment: 'Lawful Evil',
      armorClass: 13,
      hitPoints: 13,
      speed: '30 ft',
      strength: 10,
      dexterity: 14,
      constitution: 15,
      intelligence: 6,
      wisdom: 8,
      charisma: 5,
      actions: [
        { name: 'Shortsword', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage.' },
        { name: 'Shortbow', description: 'Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 5 (1d6 + 2) piercing damage.' }
      ]
    }
  ];

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setMonsters([]);
      return;
    }
    
    const results = monsterDatabase.filter(m => 
      m.name.toLowerCase().includes(term) ||
      m.type.toLowerCase().includes(term)
    );
    setMonsters(results);
  };

  const selectMonster = (monster) => {
    setSelectedMonster(monster);
    setSearchTerm(monster.name);
  };

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Monster Search</h2>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search monsters..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      {monsters.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Search Results:</h3>
          <ul className="space-y-2">
            {monsters.map(monster => (
              <li
                key={monster.id}
                onClick={() => selectMonster(monster)}
                className="p-2 bg-white dark:bg-gray-700 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                {monster.name} ({monster.type})
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedMonster && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Selected Monster:</h3>
          <MonsterStatBlock monster={selectedMonster} />
        </div>
      )}
    </div>
  );
};

export default MonsterSearch;