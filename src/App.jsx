import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, createTheme, Button, Card, CardBody, CardHeader, Input, Textarea, Grid, Col, Row } from '@heroui/react';

// Import all components
import CampaignList from './components/CampaignList.js';
import CampaignForm from './components/CampaignForm.js';
import SessionList from './components/SessionList.js';
import SessionForm from './components/SessionForm.js';
import SessionPlanner from './components/SessionPlanner.js';
import SessionTimeline from './components/SessionTimeline.jsx';
import NPCList from './components/NPCList.js';
import NPCForm from './components/NPCForm.js';
import NPCDetail from './components/NPCDetail.js';
import NPCManager from './components/NPCManager.js';
import CharacterList from './components/CharacterList.js';
import CharacterForm from './components/CharacterForm.js';
import CharacterDetail from './components/CharacterDetail.js';
import CharacterInventory from './components/CharacterInventory.js';
import CombatManager from './components/CombatManager.js';
import CombatConditions from './components/CombatConditions.js';
import CombatEncounterBuilder from './components/CombatEncounterBuilder.js';
import MonsterStatBlock from './components/MonsterStatBlock.js';
import MonsterSearch from './components/MonsterSearch.js';
import LootForm from './components/LootForm.jsx';
import LootTracker from './components/LootTracker.jsx';
import LootInventory from './components/LootInventory.jsx';
import RulesReference from './components/RulesReference.js';
import HistoryLog from './components/HistoryLog.js';

// Import screen components
import TitleScreen from './screens/TitleScreen.jsx';
import CampaignHome from './screens/CampaignHome.jsx';
import CombatTools from './screens/CombatTools.jsx';

// Create theme
const theme = createTheme({
  type: 'light',
  theme: {
    colors: {
      background: '#ffffff',
      foreground: '#1a1a1a',
    }
  }
});

// Sidebar component
function Sidebar() {
  return (
    <div className="sidebar" style={{ padding: '16px', backgroundColor: '#1a1a1a', color: 'white', minHeight: '100vh', width: '200px' }}>
      <h2 style={{ marginBottom: '20px', fontSize: '18px' }}>D&D Dashboard</h2>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', padding: '8px' }}>🏠 Home</Link>
        <Link to="/campaign" style={{ color: 'white', textDecoration: 'none', padding: '8px' }}>🗺️ Campaign</Link>
        <Link to="/sessions" style={{ color: 'white', textDecoration: 'none', padding: '8px' }}>📅 Sessions</Link>
        <Link to="/npcs" style={{ color: 'white', textDecoration: 'none', padding: '8px' }}>👥 NPCs</Link>
        <Link to="/players" style={{ color: 'white', textDecoration: 'none', padding: '8px' }}>👤 Players</Link>
        <Link to="/combat" style={{ color: 'white', textDecoration: 'none', padding: '8px' }}>⚔️ Combat</Link>
        <Link to="/loot" style={{ color: 'white', textDecoration: 'none', padding: '8px' }}>🎒 Loot</Link>
        <Link to="/rules" style={{ color: 'white', textDecoration: 'none', padding: '8px' }}>📚 Rules</Link>
        <Link to="/timeline" style={{ color: 'white', textDecoration: 'none', padding: '8px' }}>🕒 Timeline</Link>
      </nav>
    </div>
  );
}

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

export default App;
