import React, { useState } from 'react';
import CampaignManager from './components/CampaignManager';
import SessionPlanner from './components/SessionPlanner';
import NPCForm from './components/NPCForm';
import CharacterForm from './components/CharacterForm';
import HistoryLog from './components/HistoryLog';
import LootInventory from './components/LootInventory';
import CombatEncounterBuilder from './components/CombatEncounterBuilder';
import { HeroUI } from '@heroui/react';
import { Routes, Route, Link } from 'react-router-dom';

const App = () => {
  // State for all modules
  const [campaigns, setCampaigns] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [npcs, setNpcs] = useState([]);
  const [historyLog, setHistoryLog] = useState([]);
  const [lootItems, setLootItems] = useState([]);

  const [activeTab, setActiveTab] = useState('campaign');

  // Campaign handlers
  const addCampaign = (campaign) => setCampaigns(prev => [...prev, campaign]);
  const updateCampaign = (id, updates) => setCampaigns(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));

  // Session handlers
  const addSession = (session) => setSessions(prev => [...prev, session]);
  const updateSession = (id, updates) => setSessions(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));

  // Character handlers
  const addCharacter = (character) => setCharacters(prev => [...prev, character]);
  const updateCharacter = (id, updates) => setCharacters(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));

  // NPC handlers
  const addNPC = (npc) => setNpcs(prev => [...prev, npc]);
  const updateNPC = (id, updates) => setNpcs(prev => prev.map(n => n.id === id ? { ...n, ...updates } : n));

  // History log handlers
  const addHistoryEntry = (entry) => setHistoryLog(prev => [...prev, { ...entry, id: Date.now() }]);

  // Loot handlers
  const addLootItem = (item) => setLootItems(prev => [...prev, item]);
  const removeLootItem = (itemId) => setLootItems(prev => prev.filter(item => item.id !== itemId));

  return (
    <HeroUI>
      <div className="app">
        <div className="sidebar">
          <h1>D&D Manager</h1>
          <nav>
            <button onClick={() => setActiveTab('campaign')} className={activeTab === 'campaign' ? 'active' : ''}>
              Campaign
            </button>
            <button onClick={() => setActiveTab('sessions')} className={activeTab === 'sessions' ? 'active' : ''}>
              Sessions
            </button>
            <button onClick={() => setActiveTab('npcs')} className={activeTab === 'npcs' ? 'active' : ''}>
              NPCs
            </button>
            <button onClick={() => setActiveTab('characters')} className={activeTab === 'characters' ? 'active' : ''}>
              Characters
            </button>
            <button onClick={() => setActiveTab('combat')} className={activeTab === 'combat' ? 'active' : ''}>
              Combat & Encounters
            </button>
            <button onClick={() => setActiveTab('loot')} className={activeTab === 'loot' ? 'active' : ''}>
              Loot & Inventory
            </button>
            <button onClick={() => setActiveTab('history')} className={activeTab === 'history' ? 'active' : ''}>
              History Log
            </button>
          </nav>
        </div>

        <div className="main-content">
          <div className="tab-content">
            {activeTab === 'campaign' && (
              <CampaignManager
                campaigns={campaigns}
                addCampaign={addCampaign}
                updateCampaign={updateCampaign}
              />
            )}
            {activeTab === 'sessions' && (
              <SessionPlanner
                sessions={sessions}
                addSession={addSession}
                updateSession={updateSession}
              />
            )}
            {activeTab === 'npcs' && (
              <NPCForm
                onSave={addNPC}
                onCancel={() => {}}
                onDelete={() => {}}
              />
            )}
            {activeTab === 'characters' && (
              <CharacterForm
                onSave={addCharacter}
                onCancel={() => {}}
                onDelete={() => {}}
              />
            )}
            {activeTab === 'combat' && (
              <CombatEncounterBuilder characters={characters} npcs={npcs} />
            )}
            {activeTab === 'loot' && (
              <LootInventory
                lootItems={lootItems}
                addLootItem={addLootItem}
                removeLootItem={removeLootItem}
              />
            )}
            {activeTab === 'history' && (
              <HistoryLog
                historyLog={historyLog}
                addHistoryEntry={addHistoryEntry}
              />
            )}
          </div>
        </div>
      </div>
    </HeroUI>
  );
};

export default App;
