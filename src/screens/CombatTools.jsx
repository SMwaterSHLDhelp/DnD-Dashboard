import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Button, Input } from '@heroui/react';
import CombatManager from '../components/CombatManager';
import CombatConditions from '../components/CombatConditions';

const CombatTools = () => {
  const [characters, setCharacters] = useState([]);
  const [npcs, setNpcs] = useState([]);
  const [monsters, setMonsters] = useState([]);
  const [initiativeList, setInitiativeList] = useState([]);
  const [activeTurn, setActiveTurn] = useState(0);
  const [tempCombatant, setTempCombatant] = useState({
    name: '', initiative: 0, hp: 0, maxHp: 0
  });

  // Load/save data from localStorage
  useEffect(() => {
    const savedCharacters = localStorage.getItem('dnd_characters');
    const savedNpcs = localStorage.getItem('dnd_npcs');
    const savedMonsters = localStorage.getItem('dnd_monsters');
    if (savedCharacters) setCharacters(JSON.parse(savedCharacters));
    if (savedNpcs) setNpcs(JSON.parse(savedNpcs));
    if (savedMonsters) setMonsters(JSON.parse(savedMonsters));
  }, []);

  const addInitiative = () => {
    const newEntry = {
      id: Date.now(),
      name: tempCombatant.name || 'Unknown',
      initiative: tempCombatant.initiative || Math.floor(Math.random() * 20) + 1,
      hp: tempCombatant.hp,
      maxHp: tempCombatant.maxHp || tempCombatant.hp,
      type: tempCombatant.type || 'character'
    };
    setInitiativeList([...initiativeList, newEntry].sort((a, b) => b.initiative - a.initiative));
    setTempCombatant({ name: '', initiative: 0, hp: 0, maxHp: 0 });
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

  const previousTurn = () => {
    setActiveTurn((prev) => (prev - 1 + initiativeList.length) % initiativeList.length);
  };

  return (
    <div className="space-y-6">
      {/* Initiative Tracker */}
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Initiative Tracker</h3>
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Name"
              size="sm"
              value={tempCombatant.name}
              onChange={(e) => setTempCombatant({ ...tempCombatant, name: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Initiative"
              size="sm"
              value={tempCombatant.initiative || ''}
              onChange={(e) => setTempCombatant({ ...tempCombatant, initiative: parseInt(e.target.value) || 0 })}
            />
            <Input
              type="number"
              placeholder="HP"
              size="sm"
              value={tempCombatant.hp || ''}
              onChange={(e) => setTempCombatant({ ...tempCombatant, hp: parseInt(e.target.value) || 0 })}
            />
            <Button size="sm" onClick={addInitiative} color="primary">+ Add</Button>
          </div>
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
                  <span className="font-mono text-sm text-gray-500 w-8">{index + 1}</span>
                  <span className={`font-medium ${index === activeTurn ? 'text-indigo-700 font-bold' : 'text-gray-700'}`}>
                    {entry.name}
                    {entry.initiative > 0 && <span className="ml-2 text-sm text-gray-500">(Init: {entry.initiative})</span>}
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
              <p className="text-gray-500 text-center py-4">No combatants added yet. Use the form above to add entries.</p>
            )}
          </div>
          <div className="mt-4 flex justify-center space-x-2">
            <Button onClick={previousTurn} disabled={activeTurn === 0} variant="flat">
              ◀ Previous
            </Button>
            <Button onClick={nextTurn} color="primary">
              Next ▶
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Combat Manager with Turn Timer */}
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Advanced Combat Manager</h3>
          <Button size="sm" onClick={() => setInitiativeList([])} variant="flat">Reset All</Button>
        </CardHeader>
        <CardBody>
          <CombatManager characters={characters} npcs={npcs} monsters={monsters} />
        </CardBody>
      </Card>

      {/* Combat Conditions */}
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Combat Conditions</h3>
        </CardHeader>
        <CardBody>
          <CombatConditions />
        </CardBody>
      </Card>
    </div>
  );
};

export default CombatTools;
