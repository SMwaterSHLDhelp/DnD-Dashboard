import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from '@heroui/react';
import { House, BookOpen, Users, Map, Calendar, Gamepad2, Gift, FileText, History, Dice5 } from 'lucide-react';
import CampaignManager from './components/CampaignManager';
import SessionManager from './components/SessionManager';
import NPCManager from './components/NPCManager';
import PlayerManager from './components/PlayerManager';
import CombatManager from './components/CombatManager';
import LootInventory from './components/LootInventory';
import RulesReference from './components/RulesReference';
import HistoryLog from './components/HistoryLog';
import RandomGenerators from './components/RandomGenerators';
import DMNotes from './components/DMNotes';

function App() {
  const [activeView, setActiveView] = useState('campaign');

  const views = [
    { id: 'campaign', label: 'Campaign', icon: House },
    { id: 'sessions', label: 'Sessions', icon: Calendar },
    { id: 'npcs', label: 'NPCs', icon: Users },
    { id: 'players', label: 'Players', icon: Gamepad2 },
    { id: 'combat', label: 'Combat', icon: Sword },
    { id: 'loot', label: 'Loot', icon: Gift },
    { id: 'rules', label: 'Rules', icon: BookOpen },
    { id: 'history', label: 'Timeline', icon: History },
    { id: 'generators', label: 'Generators', icon: Dice5 },
    { id: 'notes', label: 'DM Notes', icon: FileText }
  ];

  const renderView = () => {
    switch (activeView) {
      case 'campaign':
        return <CampaignManager />;
      case 'sessions':
        return <SessionManager />;
      case 'npcs':
        return <NPCManager />;
      case 'players':
        return <PlayerManager />;
      case 'combat':
        return <CombatManager />;
      case 'loot':
        return <LootInventory />;
      case 'rules':
        return <RulesReference />;
      case 'history':
        return <HistoryLog />;
      case 'generators':
        return <RandomGenerators />;
      case 'notes':
        return <DMNotes />;
      default:
        return <CampaignManager />;
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar isBordered>
          <NavbarBrand>
            <h1 className="text-xl font-bold">D&D Campaign Manager</h1>
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-4">
            {views.map((view) => (
              <NavbarItem key={view.id}>
                <Button
                  variant={activeView === view.id ? 'solid' : 'flat'}
                  color={activeView === view.id ? 'primary' : 'default'}
                  startContent={<view.icon size={18} />}
                  onPress={() => setActiveView(view.id)}
                >
                  {view.label}
                </Button>
              </NavbarItem>
            ))}
          </NavbarContent>
        </Navbar>
        <div className="p-4">
          <Routes>
            <Route path="/" element={<App />} />
          </Routes>
          {renderView()}
        </div>
      </div>
    </Router>
  );
}

export default App;