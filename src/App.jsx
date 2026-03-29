import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Card, CardBody } from '@heroui/react';
import { House, BookOpen, Users, Calendar, Gamepad2, Gift, FileText, History, Dice5, Sword } from 'lucide-react';

// Placeholder components
const CampaignManager = () => <Card><CardBody><h1 className="text-2xl font-bold">Campaign Manager</h1><p>Manage your campaigns here</p></CardBody></Card>;
const SessionManager = () => <Card><CardBody><h1 className="text-2xl font-bold">Session Manager</h1><p>Manage your sessions here</p></CardBody></Card>;
const NPCManager = () => <Card><CardBody><h1 className="text-2xl font-bold">NPC Manager</h1><p>Manage your NPCs here</p></CardBody></Card>;
const PlayerManager = () => <Card><CardBody><h1 className="text-2xl font-bold">Player Manager</h1><p>Manage your players here</p></CardBody></Card>;
const CombatManager = () => <Card><CardBody><h1 className="text-2xl font-bold">Combat Manager</h1><p>Manage combat encounters here</p></CardBody></Card>;
const LootInventory = () => <Card><CardBody><h1 className="text-2xl font-bold">Loot Inventory</h1><p>Track your loot here</p></CardBody></Card>;
const RulesReference = () => <Card><CardBody><h1 className="text-2xl font-bold">Rules Reference</h1><p>Reference rules and mechanics</p></CardBody></Card>;
const HistoryLog = () => <Card><CardBody><h1 className="text-2xl font-bold">History Log</h1><p>Track timeline and history</p></CardBody></Card>;
const RandomGenerators = () => <Card><CardBody><h1 className="text-2xl font-bold">Random Generators</h1><p>Generate random content</p></CardBody></Card>;
const DMNotes = () => <Card><CardBody><h1 className="text-2xl font-bold">DM Notes</h1><p>Personal notes for the DM</p></CardBody></Card>;

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
          {renderView()}
        </div>
      </div>
    </Router>
  );
}

export default App;