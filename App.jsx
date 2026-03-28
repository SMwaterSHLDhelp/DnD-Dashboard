import { useState } from 'react';
import { Navbar, NavbarContent, NavbarItem, Button, Link, Dropdown, DropdownTrigger, DropdownMenu, DropdownSection } from "@heroui/react";
import CampaignList from './components/CampaignList.jsx';
import SessionTimeline from './components/SessionTimeline.jsx';
import NPCList from './components/NPCList.jsx';
import CharacterList from './components/CharacterList.jsx';
import LootInventory from './components/LootInventory.jsx';
import RulesReference from './components/RulesReference.jsx';
import CampaignForm from './components/CampaignForm.jsx';
import SessionForm from './components/SessionForm.jsx';
import NPCForm from './components/NPCForm.jsx';
import CharacterForm from './components/CharacterForm.jsx';
import CombatTracker from './components/CombatTracker.jsx';
import HistoryLog from './components/HistoryLog.jsx';

function App() {
  const [activeTab, setActiveTab] = useState('campaign');
  const [campaigns, setCampaigns] = useState([
    { id: 1, title: "The Shadow Over Innsmouth", description: "A horror campaign set in 1920s New England", status: "active" }
  ]);
  const [sessions, setSessions] = useState([]);
  const [npcs, setNPCs] = useState([
    { id: 1, name: "Wizard of Yendor", role: "antagonist", status: "alive", notes: "Seeks the Eye of Agamotto" }
  ]);
  const [characters, setCharacters] = useState([
    { id: 1, name: "Aelric Shadowwalker", class: "Rogue", level: 5, race: "Half-Elf", player: "Marcus" }
  ]);
  const [items, setItems] = useState([
    { id: 1, name: "Dagger of Slicing", type: "weapon", rarity: "uncommon", notes: "+1 damage vs. giants" }
  ]);
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState(null);
  
  // Handle adding a new campaign
  const addCampaign = (campaign) => {
    setCampaigns([...campaigns, { ...campaign, id: Date.now() }]);
    setShowForm(false);
  };
  
  // Handle adding a new NPC
  const addNPC = (npc) => {
    setNPCs([...npcs, { ...npc, id: Date.now() }]);
    setShowForm(false);
  };
  
  // Handle adding a new character
  const addCharacter = (character) => {
    setCharacters([...characters, { ...character, id: Date.now() }]);
    setShowForm(false);
  };
  
  const openForm = (type) => {
    setFormType(type);
    setShowForm(true);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar>
        <NavbarContent>
          <NavbarItem>
            <Link color="primary" href="#">
              D&D Campaign Manager
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button as={Link} color="primary" variant="flat" onClick={() => openForm('campaign')}>
              + Campaign
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      
      {/* Sidebar Navigation */}
      <div className="flex">
        <div className="w-64 bg-gray-100 p-4">
          <h3 className="font-semibold mb-2">Modules</h3>
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('campaign')}
              className={`w-full text-left px-4 py-2 rounded ${activeTab === 'campaign' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'}`}
            >
              Campaign
            </button>
            <button
              onClick={() => setActiveTab('sessions')}
              className={`w-full text-left px-4 py-2 rounded ${activeTab === 'sessions' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'}`}
            >
              Sessions
            </button>
            <button
              onClick={() => setActiveTab('npcs')}
              className={`w-full text-left px-4 py-2 rounded ${activeTab === 'npcs' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'}`}
            >
              NPCs
            </button>
            <button
              onClick={() => setActiveTab('characters')}
              className={`w-full text-left px-4 py-2 rounded ${activeTab === 'characters' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'}`}
            >
              Characters
            </button>
            <button
              onClick={() => setActiveTab('combat')}
              className={`w-full text-left px-4 py-2 rounded ${activeTab === 'combat' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'}`}
            >
              Combat
            </button>
            <button
              onClick={() => setActiveTab('loot')}
              className={`w-full text-left px-4 py-2 rounded ${activeTab === 'loot' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'}`}
            >
              Loot & Inventory
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`w-full text-left px-4 py-2 rounded ${activeTab === 'rules' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'}`}
            >
              Rules Reference
            </button>
          </nav>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 p-6">
          {showForm && formType === 'campaign' && (
            <CampaignForm onAddCampaign={addCampaign} onClose={() => setShowForm(false)} />
          )}
          {showForm && formType === 'npc' && (
            <NPCForm onAddNPC={addNPC} onClose={() => setShowForm(false)} />
          )}
          {showForm && formType === 'character' && (
            <CharacterForm onAddCharacter={addCharacter} onClose={() => setShowForm(false)} />
          )}
          
          {activeTab === 'campaign' && <CampaignList campaigns={campaigns} />}
          {activeTab === 'sessions' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Session Timeline</h2>
              <SessionTimeline sessions={sessions} />
              <Button className="mt-4" onClick={() => openForm('session')}>+ New Session</Button>
            </div>
          )}
          {activeTab === 'npcs' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">NPCs</h2>
              <NPCList npcs={npcs} />
              <Button className="mt-4" onClick={() => openForm('npc')}>+ Add NPC</Button>
            </div>
          )}
          {activeTab === 'characters' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Characters</h2>
              <CharacterList characters={characters} />
              <Button className="mt-4" onClick={() => openForm('character')}>+ Add Character</Button>
            </div>
          )}
          {activeTab === 'combat' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Combat Tracker</h2>
              <CombatTracker />
            </div>
          )}
          {activeTab === 'loot' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Loot & Inventory</h2>
              <LootInventory items={items} />
            </div>
          )}
          {activeTab === 'rules' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Rules Reference</h2>
              <RulesReference />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;