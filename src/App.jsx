import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Navbar, Content, Button } from '@heroui/react';
import { useDarkMode } from './hooks/useDarkMode';
import { ThemeProvider } from '@heroui/react';
import { theme } from '@heroui/react';

// Import all components
import Campaign from './screens/CampaignScreen';
import Sessions from './screens/SessionsScreen';
import NPCs from './screens/NPCsScreen';
import Players from './screens/PlayersScreen';
import Combat from './screens/CombatScreen';
import Loot from './screens/LootScreen';
import Rules from './screens/RulesScreen';
import Notes from './screens/NotesScreen';
import Timeline from './screens/TimelineScreen';
import Generators from './screens/GeneratorsScreen';
import TitleScreen from './screens/TitleScreen';

// Sidebar component
function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/campaign" className="sidebar-item">
        🗺️ Campaign
      </Link>
      <Link to="/sessions" className="sidebar-item">
        📅 Sessions
      </Link>
      <Link to="/npcs" className="sidebar-item">
        👥 NPCs
      </Link>
      <Link to="/players" className="sidebar-item">
        👤 Players
      </Link>
      <Link to="/combat" className="sidebar-item">
        ⚔️ Combat
      </Link>
      <Link to="/loot" className="sidebar-item">
        🎒 Loot
      </Link>
      <Link to="/rules" className="sidebar-item">
        📚 Rules
      </Link>
      <Link to="/notes" className="sidebar-item">
        📝 Notes
      </Link>
      <Link to="/timeline" className="sidebar-item">
        🕒 Timeline
      </Link>
      <Link to="/random" className="sidebar-item">
        🎲 Generators
      </Link>
    </div>
  );
}

function App() {
  const { isDarkMode, toggleTheme } = useDarkMode();

  return (
    <ThemeProvider theme={theme} colorMode={isDarkMode ? 'dark' : 'light'}>
      <div className="app-container">
        <header className="app-header">
          <h1>D&D Dashboard</h1>
          <Button auto flat onClick={toggleTheme}>
            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
          </Button>
        </header>

        <div className="app-content">
          <Sidebar />
          <Content>
            <Routes>
              <Route path="/" element={<TitleScreen />} />
              <Route path="/campaign" element={<Campaign />} />
              <Route path="/sessions" element={<Sessions />} />
              <Route path="/npcs" element={<NPCs />} />
              <Route path="/players" element={<Players />} />
              <Route path="/combat" element={<Combat />} />
              <Route path="/loot" element={<Loot />} />
              <Route path="/rules" element={<Rules />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/random" element={<Generators />} />
            </Routes>
          </Content>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;