import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link as HeroLink } from '@heroui/react';
import { Sidebar } from './Sidebar';
import { CampaignView } from './views/CampaignView';
import { SessionView } from './views/SessionView';
import { NPCView } from './views/NPCView';
import { PlayerView } from './views/PlayerView';
import { CombatView } from './views/CombatView';
import { LootView } from './views/LootView';
import { RulesView } from './views/RulesView';
import { NotesView } from './views/NotesView';
import { TimelineView } from './views/TimelineView';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentView, setCurrentView] = useState('campaign');

  const viewComponents = {
    campaign: CampaignView,
    session: SessionView,
    npc: NPCView,
    player: PlayerView,
    combat: CombatView,
    loot: LootView,
    rules: RulesView,
    notes: NotesView,
    timeline: TimelineView
  };

  const currentComponent = viewComponents[currentView] || CampaignView;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm h-16 flex items-center px-6 border-b border-gray-200">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 mr-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <h1 className="text-2xl font-bold text-gray-800">
            {currentView.charAt(0).toUpperCase() + currentView.slice(1)} Manager
          </h1>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <currentComponent />
        </main>
      </div>
    </div>
  );
}

export default App;