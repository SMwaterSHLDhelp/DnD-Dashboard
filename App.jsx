import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Button } from '@heroui/react';
import './index.css';

// Placeholder components for modules
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
  return <div>Rules Reference Module (placeholder) — connected to spell data source</div>;
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

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <nav className="bg-gray-800 p-4">
          <ul className="flex flex-wrap gap-4 justify-center">
            <li><Link to="/campaign"><Button color="primary">Campaign</Button></Link></li>
            <li><Link to="/sessions"><Button color="primary">Sessions</Button></Link></li>
            <li><Link to="/npcs"><Button color="primary">NPCs</Button></Link></li>
            <li><Link to="/players"><Button color="primary">Players</Button></Link></li>
            <li><Link to="/combat"><Button color="primary">Combat</Button></Link></li>
            <li><Link to="/loot"><Button color="primary">Loot</Button></Link></li>
            <li><Link to="/rules"><Button color="success">Rules</Button></Link></li>
            <li><Link to="/notes"><Button color="warning">Notes & Secrets</Button></Link></li>
            <li><Link to="/timeline"><Button color="secondary">Timeline</Button></Link></li>
            <li><Link to="/generators"><Button color="danger">Generators</Button></Link></li>
          </ul>
        </nav>

        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/campaign" element={<CampaignHome />} />
            <Route path="/sessions" element={<SessionHome />} />
            <Route path="/npcs" element={<NPCHome />} />
            <Route path="/players" element={<PlayerHome />} />
            <Route path="/combat" element={<CombatHome />} />
            <Route path="/loot" element={<LootHome />} />
            <Route path="/rules" element={<RulesReferenceHome />} />
            <Route path="/notes" element={<NotesHome />} />
            <Route path="/timeline" element={<TimelineHome />} />
            <Route path="/generators" element={<GeneratorHome />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;