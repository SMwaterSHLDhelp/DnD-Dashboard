import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Button } from '@heroui/react';
import Sidebar from './components/Sidebar';
import CampaignView from './views/CampaignView';
import SessionView from './views/SessionView';
import NPCView from './views/NPCView';
import PlayerView from './views/PlayerView';
import CombatView from './views/CombatView';
import LootView from './views/LootView';
import RulesView from './views/RulesView';
import NotesView from './views/NotesView';
import TimelineView from './views/TimelineView';
import GeneratorView from './views/GeneratorView';

function App() {
  const [activeTab, setActiveTab] = useState('campaign');

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 overflow-auto p-6">
        <Routes>
          <Route path="/" element={<CampaignView />} />
          <Route path="/campaign" element={<CampaignView />} />
          <Route path="/sessions" element={<SessionView />} />
          <Route path="/npcs" element={<NPCView />} />
          <Route path="/players" element={<PlayerView />} />
          <Route path="/combat" element={<CombatView />} />
          <Route path="/loot" element={<LootView />} />
          <Route path="/rules" element={<RulesView />} />
          <Route path="/notes" element={<NotesView />} />
          <Route path="/timeline" element={<TimelineView />} />
          <Route path="/generators" element={<GeneratorView />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;