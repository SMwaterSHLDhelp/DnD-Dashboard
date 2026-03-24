import React, { useState } from 'react';

const RulesReference = ({ onToggle }) => {
  // Lightweight bundled spell database
  const spellDatabase = [
    { name: 'Fireball', level: 3, school: 'Evocation', damage: '8d6 fire', range: '150ft cube', components: 'V,S,M', ritual: false },
    { name: 'Healing Word', level: 1, school: 'Abjuration', effect: '5d8 + Cha modifier healing', range: '60ft', components: 'V', ritual: false },
    { name: 'Mage Armor', level: 1, school: 'Abjuration', armorClass: '13 + Dex modifier', duration: '8 hours', components: 'V,S,M', ritual: false },
    { name: 'Magic Missile', level: 1, school: 'Evocation', damage: '3 force missiles', range: '120ft', components: 'V,S', ritual: false },
    { name: 'Fly', level: 3, school: 'Transmutation', duration: '8 hours', range: '60ft', components: 'V,S,M', ritual: true },
    { name: 'Invisibility', level: 3, school: 'Illusion', duration: '1 hour', components: 'V,S,M', ritual: false },
    { name: 'Lesser Restoration', level: 2, school: 'Abjuration', effect: 'Cure disease/poison', range: '60ft', components: 'V,S', ritual: false },
    { name: 'Shield', level: 1, school: 'Abjuration', AC: '+5', duration: '1 round', components: 'V,S', ritual: false },
    { name: 'Detect Magic', level: 1, school: 'Divination', duration: '10 min', components: 'V,S', ritual: false },
    { name: 'Jump', level: 1, school: 'Transmutation', effect: 'Leap 10ft + Strength mod', duration: '1 min', components: 'V', ritual: false },
    { name: 'Longstrider', level: 1, school: 'Transmutation', bonus: '+10ft movement', duration: '24 hours', components: 'V', ritual: false },
    { name: 'Spectral Force', level: 4, school: 'Evocation', damage: '2d10 force', range: '120ft', components: 'V,S,M', ritual: false },
    { name: 'Telekinesis', level: 5, school: 'Transmutation', manipulation: '15ft radius', duration: '1 minute', components: 'V,S,M', ritual: false },
    { name: 'Clairvoyance', level: 2, school: 'Divination', range: '1 mile', components: 'V,S,M', ritual: false },
    { name: 'Find Familiar', level: 3, school: 'Conjuration', duration: 'until dispelled', components: 'V,S,M', ritual: false },
    { name: 'Grease', level: 1, school: 'Conjuration', effect: 'Area effect fall hazard', range: '30ft', components: 'V,S,M', ritual: false },
  ];

  const [searchTerm, setSearchTerm] = useState('');

  const filteredSpells = spellDatabase.filter(spell =>
    spell.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    spell.school.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="rules-sidebar">
      <h3>Rules Reference</h3>
      <input
        type="text"
        placeholder="Search spells or rules..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="rules-content">
        <h4>Spells</h4>
        <ul>
          {filteredSpells.map((spell) => (
            <li key={spell.name} className={spell.ritual ? 'ritual' : ''}>
              <strong>{spell.name}</strong> (Lv. {spell.level})
              <div className="spell-details">
                {spell.school && <span>• {spell.school}</span>}
                {spell.range && <span>• {spell.range}</span>}
                {spell.duration && <span>• {spell.duration}</span>}
                {spell.components && <span>• {spell.components}</span>}
                {spell.ritual && <span>• Ritual</span>}
              </div>
            </li>
          ))}
        </ul>
        {filteredSpells.length === 0 && (
          <p className="no-results">No results found for "searchTerm"</p>
        )}
      </div>
    </div>
  );
};

export default RulesReference;


--- src/App.css ---
* {
  box-sizing: border-box;
}

.App {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  background: #1a1a2e;
  color: #eee;
}

.App h1 {
  color: #e94560;
  margin-bottom: 10px;
}

.rules-sidebar {
  position: fixed;
  right: -400px;
  top: 20px;
  width: 380px;
  height: 100%;
  background: #16213e;
  border-left: 2px solid #e94560;
  padding: 20px;
  transition: right 0.3s ease;
  box-shadow: -5px 0 15px rgba(0,0,0,0.3);
}

.rules-sidebar.open {
  right: 20px;
}

.rules-sidebar h3 {
  color: #e94560;
  margin-top: 0;
  margin-bottom: 15px;
  border-bottom: 1px solid #e94560;
  padding-bottom: 10px;
}

.rules-sidebar input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #e94560;
  border-radius: 4px;
  background: #0f3460;
  color: #eee;
  font-size: 14px;
}

.rules-sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.rules-sidebar li {
  padding: 10px;
  margin: 5px 0;
  background: #1a1a2e;
  border-radius: 4px;
  cursor: pointer;
  border-left: 3px solid transparent;
  transition: all 0.2s ease;
}

.rules-sidebar li:hover {
  border-left-color: #e94560;
  background: #16213e;
}

.rules-sidebar li.ritual {
  border-left-color: #f39c12;
}

.spell-details {
  font-size: 12px;
  color: #aaa;
  margin-top: 5px;
}

.spell-details span {
  margin-right: 15px;
}

.no-results {
  color: #aaa;
  font-style: italic;
  text-align: center;
  padding: 20px;
}

button {
  background: #e94560;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
}

button:hover {
  background: #c03955;
}
