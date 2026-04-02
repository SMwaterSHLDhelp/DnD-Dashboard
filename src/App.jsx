import React, { useState } from 'react';
import { Navbar, Sidebar, Layout, Text } from '@heroui/react';
import CampaignForm from './components/CampaignForm.jsx';
import CampaignList from './components/CampaignList.jsx';
import CharacterForm from './components/CharacterForm.jsx';
import CharacterList from './components/CharacterList.jsx';
import CharacterInventory from './components/CharacterInventory.jsx';
import NPCForm from './components/NPCForm.jsx';
import NPCList from './components/NPCList.jsx';
import HistoryLog from './components/HistoryLog.jsx';
import SessionTimeline from './components/SessionTimeline.jsx';
import LootInventory from './components/LootInventory.jsx';
import RulesReference from './components/RulesReference.jsx';
import CombatEncounter from './components/CombatEncounter.jsx';
import CampaignWorld from './components/CampaignWorld.jsx';
import DmNotes from './components/DmNotes.jsx';
import RandomGenerators from './components/RandomGenerators.jsx';

const App = () => {
  const [activeTab, setActiveTab] = useState('campaign');
  const [campaigns, setCampaigns] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [npcs, setNpcs] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loot, setLoot] = useState([]);
  const [campaignData, setCampaignData] = useState({
    title: '',
    description: '',
    world Lore: '',
    factions: [],
    history: ''
  });

  const handleSaveCampaign = (campaign) => {
    setCampaigns([...campaigns, campaign]);
  };

  const handleSaveCharacter = (character) => {
    setCharacters([...characters, character]);
  };

  const handleSaveNPC = (npc) => {
    setNpcs([...npcs, npc]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <Layout>
        <Sidebar />
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6">D&D Campaign Manager</h1>
          
          <div className="mb-6">
            <button 
              onClick={() => setActiveTab('campaign')}
              className="px-4 py-2 mr-2 bg-blue-600 rounded"
            >
              Campaign
            </button>
            <button 
              onClick={() => setActiveTab('characters')}
              className="px-4 py-2 mr-2 bg-green-600 rounded"
            >
              Characters
            </button>
            <button 
              onClick={() => setActiveTab('npcs')}
              className="px-4 py-2 mr-2 bg-purple-600 rounded"
            >
              NPCs
            </button>
            <button 
              onClick={() => setActiveTab('sessions')}
              className="px-4 py-2 mr-2 bg-yellow-600 rounded"
            >
              Sessions
            </button>
            <button 
              onClick={() => setActiveTab('loot')}
              className="px-4 py-2 mr-2 bg-orange-600 rounded"
            >
              Loot
            </button>
            <button 
              onClick={() => setActiveTab('rules')}
              className="px-4 py-2 mr-2 bg-indigo-600 rounded"
            >
              Rules
            </button>
            <button 
              onClick={() => setActiveTab('combat')}
              className="px-4 py-2 mr-2 bg-red-600 rounded"
            >
              Combat
            </button>
            <button 
              onClick={() => setActiveTab('world')}
              className="px-4 py-2 mr-2 bg-teal-600 rounded"
            >
              World
            </button>
            <button 
              onClick={() => setActiveTab('notes')}
              className="px-4 py-2 mr-2 bg-gray-600 rounded"
            >
              DM Notes
            </button>
            <button 
              onClick={() => setActiveTab('generators')}
              className="px-4 py-2 bg-pink-600 rounded"
            >
              Generators
            </button>
          </div>

          {activeTab === 'campaign' && (
            <div>
              <CampaignForm onSave={handleSaveCampaign} />
              <CampaignList campaigns={campaigns} />
            </div>
          )}

          {activeTab === 'characters' && (
            <div>
              <CharacterForm onSave={handleSaveCharacter} />
              <CharacterList characters={characters} />
            </div>
          )}

          {activeTab === 'npcs' && (
            <div>
              <NPCForm onSave={handleSaveNPC} />
              <NPCList npcs={npcs} />
            </div>
          )}

          {activeTab === 'sessions' && (
            <div>
              <SessionTimeline />
            </div>
          )}

          {activeTab === 'loot' && (
            <div>
              <LootInventory />
            </div>
          )}

          {activeTab === 'rules' && (
            <div>
              <RulesReference />
            </div>
          )}

          {activeTab === 'combat' && (
            <div>
              <CombatEncounter />
            </div>
          )}

          {activeTab === 'world' && (
            <div>
              <CampaignWorld />
            </div>
          )}

          {activeTab === 'notes' && (
            <div>
              <DmNotes />
            </div>
          )}

          {activeTab === 'generators' && (
            <div>
              <RandomGenerators />
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default App;