import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Button } from '@heroui/react';
import './index.css';
import RulesReference from './components/RulesReference';

// Module components
function CampaignHome() {
  return <div>Campaign & World Building Module (placeholder)</div>;
}

function SessionHome() {
  return <div>Session Management Module (placeholder)</div>;
}

function NPCHome() {
  return <div>NPC Tracker Module (placeholder)</div>;
}

function PlayerHome() {
  return <div>Player & Character Tracking Module (placeholder)</div>;
}

function CombatHome() {
  return <div>Combat & Encounter Tools Module (placeholder)</div>;
}

function LootHome() {
  return <div>Loot & Inventory Module (placeholder)</div>;
}

function RulesReferenceHome() {
  const [rulesOpen, setRulesOpen] = React.useState(false);

  return (
    <div>
      <div>Rules Reference Module — connected to spell data source</div>
      <Button 
        color="primary" 
        onClick={() => setRulesOpen(!rulesOpen)}
        style={{ marginTop: '10px' }}
      >
        {rulesOpen ? 'Close Rules Reference' : 'Open Rules Reference'}
      </Button>
      {rulesOpen && (
        <RulesReference 
          isOpen={rulesOpen} 
          onToggle={() => setRulesOpen(false)}
        />
      )}
    </div>
  );
}

function NotesHome() {
  return <div>Notes & Secrets Module (placeholder)</div>;
}

function TimelineHome() {
  return <div>Timeline / History Log Module (placeholder)</div>;
}

function GeneratorHome() {
  return <div>Random Generators Module (placeholder)</div>;
}

function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/campaign">Campaign</Link>
      <Link to="/session">Session</Link>
      <Link to="/npcs">NPCs</Link>
      <Link to="/players">Players</Link>
      <Link to="/combat">Combat</Link>
      <Link to="/loot">Loot</Link>
      <Link to="/rules">Rules</Link>
      <Link to="/notes">Notes</Link>
      <Link to="/timeline">Timeline</Link>
      <Link to="/generators">Generators</Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/campaign" element={<CampaignHome />} />
            <Route path="/session" element={<SessionHome />} />
            <Route path="/npcs" element={<NPCHome />} />
            <Route path="/players" element={<PlayerHome />} />
            <Route path="/combat" element={<CombatHome />} />
            <Route path="/loot" element={<LootHome />} />
            <Route path="/rules" element={<RulesReferenceHome />} />
            <Route path="/notes" element={<NotesHome />} />
            <Route path="/timeline" element={<TimelineHome />} />
            <Route path="/generators" element={<GeneratorHome />} />
            <Route path="/" element={<CampaignHome />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;