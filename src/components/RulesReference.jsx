import React, { useState, useEffect } from 'react';
import { Button, Input } from '@heroui/react';
import SpellSearch from './SpellSearch';
import SpellService from '../services/spellService';

const RulesReference = ({ onToggle, isOpen }) => {
  const [activeTab, setActiveTab] = useState('spells');
  const [selectedSpell, setSelectedSpell] = useState(null);

  // Reset selection when tab changes
  useEffect(() => {
    setSelectedSpell(null);
  }, [activeTab]);

  // Load spell data when opening Spells tab
  useEffect(() => {
    if (activeTab === 'spells' && !selectedSpell) {
      SpellService.getAllSpells().catch(err => {
        console.error('Failed to load spells in RulesReference:', err);
      });
    }
  }, [activeTab]);

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
          <span className="school-badge">{selectedSpell.school}</span>
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
          <SpellSearch onSelectSpell={handleSpellSelect} />
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