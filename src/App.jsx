import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { Navbar, Content, Button, Text } from '@heroui/react';
import { useDarkMode } from './hooks/useDarkMode';
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

function App() {
  const { isDarkMode, toggleTheme } = useDarkMode();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <Navbar isBordered isCompact>
        <Navbar.Brand>
          <Text b size={20} className="text-inherit">D&D Dashboard</Text>
        </Navbar.Brand>
        <Navbar.Content>
          <Navbar.Item>
            <Button 
              auto 
              flat 
              onClick={toggleTheme}
              css={{
                "&::after": {
                  backgroundColor: "$backgrounds$background"
                }
              }}
            >
              {isDarkMode ? '☀️ Light' : '🌙 Dark'}
            </Button>
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>

      <Content css={{ 
        p: "$20", 
        "$lg": { p: "$32" } 
      }}>
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
          <Route path="/generators" element={<Generators />} />
        </Routes>
      </Content>
    </div>
  );
}

export default App;