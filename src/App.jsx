import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@heroui/react';
import Sidebar from './components/Sidebar';
import TitleScreen from './components/TitleScreen';
import CampaignHome from './components/CampaignHome';

// Import all components
import CampaignList from './components/CampaignList';
import CampaignForm from './components/CampaignForm';
import SessionList from './components/SessionList';
import SessionForm from './components/SessionForm';
import SessionPlanner from './components/SessionPlanner';
import SessionTimeline from './components/SessionTimeline';
import NPCList from './components/NPCList';
import NPCForm from './components/NPCForm';
import NPCDetail from './components/NPCDetail';
import NPCManager from './components/NPCManager';
import CharacterList from './components/CharacterList';
import CharacterForm from './components/CharacterForm';
import CharacterDetail from './components/CharacterDetail';
import CharacterInventory from './components/CharacterInventory';
import CombatManager from './components/CombatManager';
import CombatConditions from './components/CombatConditions';
import CombatEncounterBuilder from './components/CombatEncounterBuilder';
import MonsterStatBlock from './components/MonsterStatBlock';
import MonsterSearch from './components/MonsterSearch';
import LootForm from './components/LootForm';
import LootTracker from './components/LootTracker';
import LootInventory from './components/LootInventory';
import RulesReference from './components/RulesReference';
import HistoryLog from './components/HistoryLog';

// Create HeroUI theme
const theme = createTheme({
  type: 'dark',
  theme: {
    colors: {
      primary: '#2563eb',
      secondary: '#7c3aed',
      success: '#059669',
      warning: '#d97706',
      danger: '#dc2626'
    }
  }
});

// Main App Component
function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          <Sidebar />
          <main style={{ flex: 1, padding: '20px' }}>
            <Routes>
              <Route path="/" element={<TitleScreen />} />
              <Route path="/campaign" element={<CampaignHome />} />
              <Route path="/campaign/list" element={<CampaignList />} />
              <Route path="/campaign/new" element={<CampaignForm />} />
              <Route path="/sessions" element={<SessionList />} />
              <Route path="/sessions/new" element={<SessionForm />} />
              <Route path="/sessions/plan" element={<SessionPlanner />} />
              <Route path="/npcs" element={<NPCList />} />
              <Route path="/npcs/new" element={<NPCForm />} />
              <Route path="/npcs/:id" element={<NPCDetail />} />
              <Route path="/players" element={<CharacterList />} />
              <Route path="/players/new" element={<CharacterForm />} />
              <Route path="/players/:id" element={<CharacterDetail />} />
              <Route path="/combat" element={<CombatTools />} />
              <Route path="/loot" element={<LootTracker />} />
              <Route path="/loot/inventory" element={<LootInventory />} />
              <Route path="/rules" element={<RulesReference />} />
              <Route path="/timeline" element={<SessionTimeline />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

function CombatTools() {
  return <CombatEncounterBuilder />;
}

export default App;