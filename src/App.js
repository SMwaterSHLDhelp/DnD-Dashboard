import React, { useState } from 'react';
import CampaignManager from './components/CampaignManager';
import SessionPlanner from './components/SessionPlanner';
import NPCManager from './components/NPCManager';
import CharacterForm from './components/CharacterForm';
import HistoryLog from './components/HistoryLog';
import LootInventory from './components/LootInventory';
import CombatEncounterBuilder from './components/CombatEncounterBuilder';
import { HeroUI } from '@heroui/react';
import { Button } from '@heroui/react';

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
          <h1 className="sidebar-title">D&D Manager</h1>
          <nav className="sidebar-nav">
            <Button
              fullWidth
              size="md"
              color={activeTab === 'campaign' ? 'primary' : 'default'}
              onClick={() => setActiveTab('campaign')}
            >
              Campaign
            </Button>
            <Button
              fullWidth
              size="md"
              color={activeTab === 'sessions' ? 'primary' : 'default'}
              onClick={() => setActiveTab('sessions')}
            >
              Sessions
            </Button>
            <Button
              fullWidth
              size="md"
              color={activeTab === 'npcs' ? 'primary' : 'default'}
              onClick={() => setActiveTab('npcs')}
            >
              NPCs
            </Button>
            <Button
              fullWidth
              size="md"
              color={activeTab === 'characters' ? 'primary' : 'default'}
              onClick={() => setActiveTab('characters')}
            >
              Characters
            </Button>
            <Button
              fullWidth
              size="md"
              color={activeTab === 'combat' ? 'primary' : 'default'}
              onClick={() => setActiveTab('combat')}
            >
              Combat & Encounters
            </Button>
            <Button
              fullWidth
              size="md"
              color={activeTab === 'loot' ? 'primary' : 'default'}
              onClick={() => setActiveTab('loot')}
            >
              Loot & Inventory
            </Button>
            <Button
              fullWidth
              size="md"
              color={activeTab === 'history' ? 'primary' : 'default'}
              onClick={() => setActiveTab('history')}
            >
              History Log
            </Button>
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
              <NPCManager
                npcs={npcs}
                addNPC={addNPC}
                updateNPC={updateNPC}
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
                onDeleteEvent={(id) => setHistoryLog(prev => prev.filter(e => e.id !== id))}
              />
            )}
          </div>
        </div>
      </div>
    </HeroUI>
  );
};

export default App;