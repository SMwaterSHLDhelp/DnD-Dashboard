import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, Button, Navbar, NavbarBrand } from '@heroui/react';
import TitleScreen from './screens/TitleScreen';
import CampaignHome from './screens/CampaignHome';
import CampaignBuilder from './screens/CampaignBuilder';
import SessionManager from './screens/SessionManager';
import NPCTracker from './screens/NPCTracker';
import PlayerTracker from './screens/PlayerTracker';
import CombatTools from './screens/CombatTools';
import LootTracker from './screens/LootTracker';
import RulesReference from './screens/RulesReference';
import NotesAndSecrets from './screens/NotesAndSecrets';
import Timeline from './screens/Timeline';
import RandomGenerators from './screens/RandomGenerators';

function App() {
  return (
    <ThemeProvider
      className="min-h-screen bg-gray-50 text-default-700"
      theme={{
        colors: {
          primary: '#6366f1',
          primaryLight: '#818cf8',
          primaryDark: '#4f46e5',
        },
      }}
    >
      <Navbar>
        <NavbarBrand>
          <span className="text-xl font-bold text-primary">D&D Campaign Manager</span>
        </NavbarBrand>
      </Navbar>

      <Routes>
        {/* Title screen */}
        <Route path="/" element={<TitleScreen />} />
        {/* Main app routes */}
        <Route path="/app" element={<CampaignHome />} />
        <Route path="/app/campaign" element={<CampaignBuilder />} />
        <Route path="/app/sessions" element={<SessionManager />} />
        <Route path="/app/npcs" element={<NPCTracker />} />
        <Route path="/app/players" element={<PlayerTracker />} />
        <Route path="/app/combat" element={<CombatTools />} />
        <Route path="/app/loot" element={<LootTracker />} />
        <Route path="/app/rules" element={<RulesReference />} />
        <Route path="/app/notes" element={<NotesAndSecrets />} />
        <Route path="/app/timeline" element={<Timeline />} />
        <Route path="/app/generators" element={<RandomGenerators />} />
        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
