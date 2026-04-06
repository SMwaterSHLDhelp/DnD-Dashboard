import React, { useState, useEffect, useMemo } from 'react';
import {
  Navbar,
  Button,
  Link,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Chip
} from '@heroui/react';
import SearchBar from './components/SearchBar';

// Import component modules
import CampaignList from './components/CampaignList';
import CampaignForm from './components/CampaignForm';
import SessionList from './components/SessionList';
import SessionForm from './components/SessionForm';
import SessionTimeline from './components/SessionTimeline';
import SessionPlanner from './components/SessionPlanner';
import NPCList from './components/NPCList';
import NPCForm from './components/NPCForm';
import CharacterList from './components/CharacterList';
import CharacterForm from './components/CharacterForm';
import CharacterInventory from './components/CharacterInventory';
import HistoryLog from './components/HistoryLog';
import LootInventory from './components/LootInventory';
import RulesReference from './components/RulesReference';
import NotesSecrets from './components/NotesSecrets';
import CampaignWorld from './components/CampaignWorld';
import RandomGenerator from './components/RandomGenerator';
import DiceRoller from './components/DiceRoller';

// Main App Component
export default function App() {
  // Global state for app data
  const [campaignData, setCampaignData] = useState({
    name: '',
    setting: '',
    theme: '',
    tone: '',
    lore: [],
    factions: [],
    history: [],
    maps: []
  });
  
  const [sessions, setSessions] = useState([]);
  const [npcs, setNpcs] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [historyLog, setHistoryLog] = useState([]);
  const [lootInventory, setLootInventory] = useState({
    items: [],
    gold: 0,
    characterName: 'Party Inventory'
  });
  const [dmNotes, setDmNotes] = useState([]);
  const [randomGenerators, setRandomGenerators] = useState([]);
  const [selectedModule, setSelectedModule] = useState('campaign');

  // Load data from localStorage on mount
  useEffect(() => {
    const loadData = () => {
      try {
        const savedCampaign = localStorage.getItem('campaignData');
        const savedSessions = localStorage.getItem('sessions');
        const savedNpcs = localStorage.getItem('npcs');
        const savedCharacters = localStorage.getItem('characters');
        const savedHistoryLog = localStorage.getItem('historyLog');
        const savedLootInventory = localStorage.getItem('lootInventory');
        const savedDmNotes = localStorage.getItem('dmNotes');

        if (savedCampaign) setCampaignData(JSON.parse(savedCampaign));
        if (savedSessions) setSessions(JSON.parse(savedSessions));
        if (savedNpcs) setNpcs(JSON.parse(savedNpcs));
        if (savedCharacters) setCharacters(JSON.parse(savedCharacters));
        if (savedHistoryLog) setHistoryLog(JSON.parse(savedHistoryLog));
        if (savedLootInventory) setLootInventory(JSON.parse(savedLootInventory));
        if (savedDmNotes) setDmNotes(JSON.parse(savedDmNotes));
      } catch (e) {
        console.error('Error loading saved data:', e);
      }

    };
    
    loadData();
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('campaignData', JSON.stringify(campaignData));
    localStorage.setItem('sessions', JSON.stringify(sessions));
    localStorage.setItem('npcs', JSON.stringify(npcs));
    localStorage.setItem('characters', JSON.stringify(characters));
    localStorage.setItem('historyLog', JSON.stringify(historyLog));
    localStorage.setItem('lootInventory', JSON.stringify(lootInventory));
    localStorage.setItem('dmNotes', JSON.stringify(dmNotes));
  }, [campaignData, sessions, npcs, characters, historyLog, lootInventory, dmNotes]);

  // Add session
  const addSession = (session) => {
    const newSession = {
      ...session,
      id: Date.now().toString(),
      sessionDate: session.sessionDate || new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    };
    setSessions([newSession, ...sessions]);
  };

  // Add NPC
  const addNpc = (npc) => {
    const newNpc = {
      ...npc,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setNpcs([newNpc, ...npcs]);
  };

  // Add character
  const addCharacter = (character) => {
    const newCharacter = {
      ...character,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setCharacters([newCharacter, ...characters]);
  };

  // Add lore entry
  const addLore = (lore) => {
    const newLore = {
      ...lore,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setCampaignData({
      ...campaignData,
      lore: [...campaignData.lore, newLore]
    });
  };

  // Add DM note
  const addDmNote = (note) => {
    const newNote = {
      ...note,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setDmNotes([newNote, ...dmNotes]);
  };

  // Add history log entry
  const addHistoryLog = (entry) => {
    const newEntry = {
      ...entry,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    setHistoryLog([newEntry, ...historyLog]);
  };

  // Update loot inventory
  const updateLoot = (newLoot) => {
    setLootInventory(newLoot);
  };

  // Global data object for search
  const globalData = useMemo(() => ({
    campaign: campaignData,
    sessions,
    npcs,
    characters,
    inventory: lootInventory
  }), [campaignData, sessions, npcs, characters, lootInventory]);

  // Handle search result click
  const handleSearchResultClick = (result) => {
    // Navigate to appropriate module based on result type
    switch (result.type) {
      case 'NPC':
        setSelectedModule('npcs');
        break;
      case 'Character':
        setSelectedModule('characters');
        break;
      case 'Session':
      case 'Encounter':
        setSelectedModule('sessions');
        break;
      case 'Lore':
        setSelectedModule('campaign');
        break;
      case 'Item':
        setSelectedModule('loot');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-90:
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header with Navigation */}
      <Navbar className="bg-blue-600 dark:bg-blue-900">
        <Navbar.Content className="hidden sm:flex gap-4">
          <Navbar.Brand>
            <h1 className="text-xl font-bold text-white">D&D Campaign Manager</h1>
          </Navbar.Brand>
          <Navbar.Content>
            <SearchBar 
              data={globalData} 
              onResultClick={handleSearchResultClick}
            />
          </Navbar.Content>
        </Navbar.Content>
        <Navbar.Content className="sm:hidden">
          <Navbar.Brand>
            <h1 className="text-sm font-bold text-white">D&D Manager</h1>
          </Navbar.Brand>
        </Navbar.Content>
        <Navbar.Content>
          <Button 
            variant="light" 
            color="white" 
            onClick={() => setSelectedModule('campaign')}
            className="text-white"
          >
            Campaign
          </Button>
          <Button 
            variant="light" 
            color="white" 
            onClick={() => setSelectedModule('sessions')}
            className="text-white"
          >
            Sessions
          </Button>
          <Button 
            variant="light" 
            color="white" 
            onClick={() => setSelectedModule('npcs')}
            className="text-white"
          >
            NPCs
          </Button>
          <Button 
            variant="light" 
            color="white" 
            onClick={() => setSelectedModule('characters')}
            className="text-white"
          >
            Characters
          </Button>
          <Button 
            variant="light" 
            color="white" 
            onClick={() => setSelectedModule('loot')}
            className="text-white"
          >
            Loot
          </Button>
          <Button 
            variant="light" 
            color="white" 
            onClick={() => setSelectedModule('rules')}
            className="text-white"
          >
            Rules
          </Button>
        </Navbar.Content>
      </Navbar>

      {/* Main Content Area */}
      <div className="container mx-auto p-4">
        {/* Campaign & World Building */}
        {selectedModule === 'campaign' && (
          <CampaignWorld 
            data={campaignData} 
            onUpdate={setCampaign/CampaignData}
            onAddLore={addLore}
          />
        )}

        {/* Session Management */}
        {selectedModule === 'sessions' && (
          <div className="flex flex-col gap-6">
            <SessionList 
              sessions={sessions} 
              onView={(id) => console.log('View session', id)}
            />
            <SessionForm onSubmit={addSession} />
            <SessionTimeline sessions={sessions} />
            <SessionPlanner 
              sessions={sessions} 
              onUpdateSessions={setSessions}
            />
          </div>
        )}

        {/* NPC Management */
        {selectedModule === 'npcs' && (
          <div className="flex flex-col gap-6">
            <NPCList 
              npcs={npcs} 
              onAdd={addNpc}
              onUpdate={(updatedNpc) => {
                setNpcs(npcs.map(npc => 
                  npc.id === updatedNpc.id ? updatedNpc : npc
                ));
              }}
              onDelete={(id) => {
                setNpcs(npcs.filter(npc => npc.id !== id));
              }}
            />
            <NPCForm onSubmit={addNpc} />
          </div>
        )}

        {/* Character & Player Tracking */
        {selectedModule === 'characters' && (
          <div className="flex flex-col gap-6">
            <CharacterList 
              characters={characters} 
              onUpdate={(updatedChar) => {
                setCharacters(characters.map(character => 
                  character.id === updatedChar.id ? updatedChar : character
                ));
              }}
              onDelete={(id) => {
                setCharacters(characters.filter(character => character.id !== id));
              }}
            />
            <CharacterForm 
              onSubmit={addCharacter} 
              existingCharacters={characters}
            />
          </div>
        )}

        {/* Loot & Inventory */}
        {selectedModule === 'loot' && (
          <LootInventory 
            items={lootInventory.items} 
            gold={lootInventory.gold}
            characterName={lootInventory.characterName}
            onAddItem={(item) => {
              setLootInventory({
                ...lootInventory,
                items: [...lootInventory.items, item]
              });
            }}
            onRemoveItem={(index) => {
              setLootInventory({
                ...lootInventory,
                items: lootInventory.items.filter((_, i) => i !== index)
              });
            }}
            onUpdateGold={(gold) => {
              setLootInventory({
                ...lootInventory,
                gold
              });
            }}
          />
        )}

        {/* Rules Reference */}
        {selectedModule === 'rules' && (
          <RulesReference />
        )}

        {/* DM Notes & Secrets */}
        {selectedModule === 'notes' && (
          <NotesSecrets 
            notes={dmNotes} 
            onAddNote={addDmNote}
            onDeleteNote={(id) => {
              setDmNotes(dmNotes.filter(note => note.id !== id));
            }}
          />
        )}

        {/* Random Generators */}
        {selectedModule === 'random' && (
          <RandomGenerator />
        )}

        {/* History Log */}
        {selectedModule === 'history' && (
          <HistoryLog entries={historyLog} />
        )}
      </div>

      <DiceRoller />

      {/* Footer */
      <footer className="bg-gray-100 dark:bg-gray-800 p-4 text-center text-sm">
        <p>D&D Campaign Manager - Built for Dungeon Masters</p>
      </footer>
    </div>
  );
}
