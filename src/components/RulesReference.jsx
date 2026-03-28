import React, { useState, useEffect } from 'react';
import { Button, Input } from '@heroui/react';

const spellDatabase = [
  {
    name: 'Magic Missile',
    level: 1,
    school: 'Evocation',
    ritual: false,
    castingTime: '1 action',
    range: '120 feet',
    components: 'V, S, M',
    duration: 'Instantaneous',
    description: 'You create three glowing darts of magical force. Each dart hits a creature of your choice that you can see within range. A dart deals 1d4+1 force damage to its target. The darts all strike simultaneously and you can direct them to hit one creature or several.',
    higherLevel: 'When you cast this spell using a spell slot of 2nd level or higher, the spell creates one more dart for each slot level above 1st.'
  },
  {
    name: 'Fireball',
    level: 3,
    school: 'Evocation',
    ritual: false,
    castingTime: '1 action',
    range: '150 feet',
    components: 'V, S, M',
    duration: 'Instantaneous',
    description: 'A streak of flame flashes forward from your outstretched fingertip in the shape of a 60-foot cone, expending a burst of explosive fire. Each creature in that area must make a Dexterity saving throw. A creature takes 8d6 fire damage on a failed save, or half as much damage on a successful one.',
    higherLevel: 'When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for each slot level above 3rd.'
  },
  {
    name: 'Cure Wounds',
    level: 1,
    school: 'Evocation',
    ritual: false,
    castingTime: '1 action',
    range: 'Touch',
    components: 'V, S',
    duration: 'Instantaneous',
    description: 'A creature you touch regains a number of hit points equal to 1d8 + your spellcasting ability modifier. This spell has no effect on undead or constructs.',
    higherLevel: 'When you cast this spell using a spell slot of 2nd level or higher, the healing increases by 1d8 for each slot level above 1st.'
  },
  {
    name: 'Detect Magic',
    level: 1,
    school: 'Divination',
    ritual: true,
    castingTime: '1 action',
    range: 'Self',
    components: 'V, S',
    duration: 'Concentration, up to 10 minutes',
    description: 'At first focus, you sense the presence of magic within 30 feet of you. If you sense magic in this way, you can use your action to see a faint aura around any visible creature or object that bears magic, and you learn its school of magic, if any.',
    higherLevel: 'When you cast this spell using a spell slot of 2nd level or higher, the duration increases by 10 minutes for each slot level above 1st.'
  },
  {
    name: 'Light',
    level: 0,
    school: 'Evocation',
    ritual: false,
    castingTime: '1 action',
    range: 'Touch',
    components: 'V, M',
    duration: '1 hour',
    description: 'You touch one object that is not being worn or carried. Until the spell ends, the object sheds bright light in a 20-foot radius and dim light for an additional 20 feet. The light can be dismissed as an action.',
    higherLevel: 'This spell has no effect at higher levels.'
  },
  {
    name: 'Teleport',
    level: 7,
    school: 'Conjuration',
    ritual: false,
    castingTime: '1 action',
    range: '10 feet',
    components: 'V',
    duration: 'Instantaneous',
    description: 'You and up to eight willing creatures of your choice that you can see within range each teleport to a place you are familiar with and have visualized in your mind.',
    higherLevel: 'When you cast this spell using a spell slot of 8th or 9th level, you can teleport up to 17 creatures instead of 8.'
  }
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

    return (
      <div className="spell-details">
        <h4>{selectedSpell.name} <span className="spell-level">(Level {selectedSpell.level})</span></h4>
        <div className="spell-meta">
          {selectedSpell.school && <span className="school-badge">{selectedSpell.school}</span>}
          {selectedSpell.ritual && <span className="ritual-badge">Ritual</span>}
        </div>
        <div className="spell-casting-info">
          <p><strong>Casting Time:</strong> {selectedSpell.castingTime}</p>
          <p><strong>Range:</strong> {selectedSpell.range}</p>
          <p><strong>Components:</strong> {selectedSpell.components}</p>
          <p><strong>Duration:</strong> {selectedSpell.duration}</p>
        </div>
        <div className="spell-description">
          <h5>Description</h5>
          <p>{selectedSpell.description}</p>
        </div>
        {selectedSpell.higherLevel && (
          <div className="spell-higher-level">
            <h5>At Higher Levels</h5>
            <p>{selectedSpell.higherLevel}</p>
          </div>
        )}
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
        <Input
          type="text"
          placeholder="Search spells..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="sm"
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