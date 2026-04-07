import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import CampaignSection from './components/CampaignSection';
import SessionSection from './components/SessionSection';
import NPCSection from './components/NPCSection';
import PlayerSection from './components/PlayerSection';
import CombatSection from './components/CombatSection';
import LootSection from './components/LootSection';
import RulesSection from './components/RulesSection';
import NotesSection from './components/NotesSection';
import HistorySection from './components/HistorySection';
import GeneratorsSection from './components/GeneratorsSection';
import OnboardingTutorial from './components/OnboardingTutorial';

function App() {
  const [activeModule, setActiveModule] = useState('campaign');
  const [campaigns, setCampaigns] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [npcs, setNPCs] = useState([]);
  const [players, setPlayers] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [combatState, setCombatState] = useState({
    initiativeOrder: [],
    currentTurn: null,
    conditions: {}
  });
  const [loot, setLoot] = useState({
    inventory: [],
    gold: 0,
    itemsDistributed: []
  });
  const [historyLog, setHistoryLog] = useState([]);
  const [notes, setNotes] = useState([]);

  const modules = [
    { id: 'campaign', name: 'Campaign & World', icon: '🌐' },
    { id: 'session', name: 'Session Management', icon: '📅' },
    { id: 'npc', name: 'NPC Tracker', icon: '🎭' },
    { id: 'player', name: 'Player & Characters', icon: '⚔️' },
    { id: 'combat', name: 'Combat Tools', icon: '⚔️' },
    { id: 'loot', name: 'Loot & Inventory', icon: '💰' },
    { id: 'rules', name: 'Rules Reference', icon: '📖' },
    { id: 'notes', name: 'DM Notes & Secrets', icon: '🔒' },
    { id: 'history', name: 'Timeline & History', icon: '📜' },
    { id: 'generators', name: 'Random Generators', icon: '🎲' }
  ];

  const renderModule = () => {
    switch (activeModule) {
      case 'campaign':
        return <CampaignSection campaigns={campaigns} setCampaigns={setCampaigns} />;
      case 'session':
        return <SessionSection sessions={sessions} setSessions={setSessions} />;
      case 'npc':
        return <NPCSection npcs={npcs} setNPCs={setNPCs} />;
      case 'player':
        return <PlayerSection players={players} characters={characters} setPlayers={setPlayers} setCharacters={setCharacters} />;
      case 'combat':
        return <CombatSection combatState={combatState} setCombatState={setCombatState} />;
      case 'loot':
        return <LootSection loot={loot} setLoot={setLoot} />;
      case 'rules':
        return <RulesSection />;
      case 'notes':
        return <NotesSection notes={notes} setNotes={setNotes} />;
      case 'history':
        return <HistorySection historyLog={historyLog} setHistoryLog={setHistoryLog} />;
      case 'generators':
        return <GeneratorsSection />;
      default:
        return <CampaignSection campaigns={campaigns} setCampaigns={setCampaigns} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Sidebar 
        modules={modules} 
        activeModule={activeModule} 
        setActiveModule={setActiveModule} 
      />
      <main className="flex-1 overflow-auto p-6">
        {renderModule()}
      </main>
      <OnboardingTutorial />
    </div>
  );
}

export default App;