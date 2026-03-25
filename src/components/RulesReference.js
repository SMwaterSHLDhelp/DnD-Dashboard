import React, { useState, useEffect } from 'react';
import { Button } from '@heroui/react';

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
  { name: 'Grease', level: 1, school: 'Conjuration', effect: 'Area effect fall hazard', range: '30ft', components: 'V,S,M', ritual: false }
];

const RulesReference = ({ onToggle, isOpen }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpell, setSelectedSpell] = useState(null);
  const [activeTab, setActiveTab] = useState('spells');

  // Reset selection when tab changes
  useEffect(() => {
    setSelectedSpell(null);
  }, [activeTab]);

  const filteredSpells = spellDatabase.filter(spell =>
    spell.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    spell.school.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSpellSelect = (spell) => {
    setSelectedSpell(spell);
  };

  const renderSpellDetails = () => {
    if (!selectedSpell) {
      return (
        <div className="no-selection">
          <p>Select a spell to view full details</p>
        </div>
      );
    }

    const details = Object.entries(selectedSpell)
      .filter(([key]) => key !== 'name' && key !== 'level')
      .map(([key, value]) => (
        <div key={key} className="detail-item">
          <span className="detail-label">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
          <span className="detail-value">{value}</span>
        </div>
      ));

    return (
      <div className="spell-details">
        <h4>{selectedSpell.name} <span className="spell-level">(Level {selectedSpell.level})</span></h4>
        <div className="spell-meta">
          {selectedSpell.school && <span className="school-badge">{selectedSpell.school}</span>}
          {selectedSpell.ritual && <span className="ritual-badge">Ritual</span>}
        </div>
        {details}
      </div>
    );
  };

  return (
    <div className={`rules-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h3>Rules Reference</h3>
        <Button 
          size="sm" 
          color="danger" 
          variant="flat"
          onPress={onToggle}
        >
          Close
        </Button>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search spells or rules..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="tab-controls">
          <button
            className={`tab ${activeTab === 'spells' ? 'active' : ''}`}
            onClick={() => setActiveTab('spells')}
          >
            Spells
          </button>
          <button
            className={`tab ${activeTab === 'rules' ? 'active' : ''}`}
            onClick={() => setActiveTab('rules')}
          >
            Rules
          </button>
        </div>
      </div>

      <div className="rules-content">
        {activeTab === 'spells' ? (
          <>
            <h4>Spells ({filteredSpells.length})</h4>
            <ul className="spell-list">
              {filteredSpells.map((spell) => (
                <li 
                  key={spell.name} 
                  className={`spell-item ${selectedSpell?.name === spell.name ? 'selected' : ''} ${spell.ritual ? 'ritual' : ''}`}
                  onClick={() => handleSpellSelect(spell)}
                >
                  <div className="spell-title">
                    <strong>{spell.name}</strong>
                    <span className="spell-level-badge">Lv. {spell.level}</span>
                  </div>
                  <div className="spell-meta-info">
                    {spell.school && <span className="school">{spell.school}</span>}
                    {spell.ritual && <span className="ritual-tag">Ritual</span>}
                  </div>
                </li>
              ))}
            </ul>
            {filteredSpells.length === 0 && (
              <p className="no-results">No results found for "{searchTerm}"</p>
            )}
          </>
        ) : (
          <div className="rules-placeholder">
            <p>Basic rules reference coming soon...</p>
          </div>
        )}
      </div>

      {selectedSpell && (
        <div className="sidebar-details-panel">
          <h4>Details</h4>
          {renderSpellDetails()}
        </div>
      )}
    </div>
  );
};

export default RulesReference;