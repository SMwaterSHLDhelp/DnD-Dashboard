import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { Navbar, Content } from '@heroui/react';

function Home() {
  return <div>Welcome to D&D Dashboard</div>;
}

function Campaign() {
  return <div>Campaign Management</div>;
}

function Sessions() {
  return <div>Session Management</div>;
}

function NPCs() {
  return <div>NPC Tracker</div>;
}

function Players() {
  return <div>Player Characters</div>;
}

function Combat() {
  return <div>Combat & Encounter Tools</div>;
}

function Loot() {
  return <div>Loot & Inventory</div>;
}

function Rules() {
  return <div>Rules Reference</div>;
}

function Notes() {
  return <div>Notes & Secrets</div>;
}

function Timeline() {
  return <div>Timeline & History</div>;
}

function Generators() {
  return <div>Random Generators</div>;
}

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar>
        <Navbar.Brand>
          <span className="text-xl font-bold">D&D Dashboard</span>
        </Navbar.Brand>
        <Navbar.Content>
          <Navbar.Link as={Link} to="/">
            Home
          </Navbar.Link>
          <Navbar.Link as={Link} to="/campaign">
            Campaign
          </Navbar.Link>
          <Navbar.Link as={Link} to="/sessions">
            Sessions
          </Navbar.Link>
          <Navbar.Link as={Link} to="/npcs">
            NPCs
          </Navbar.Link>
          <Navbar.Link as={Link} to="/players">
            Players
          </Navbar.Link>
          <Navbar.Link as={Link} to="/combat">
            Combat
          </Navbar.Link>
          <Navbar.Link as={Link} to="/loot">
            Loot
          </Navbar.Link>
          <Navbar.Link as={Link} to="/rules">
            Rules
          </Navbar.Link>
          <Navbar.Link as={Link} to="/notes">
            Notes
          </Navbar.Link>
          <Navbar.Link as={Link} to="/timeline">
            Timeline
          </Navbar.Link>
          <Navbar.Link as={Link} to="/generators">
            Generators
          </Navbar.Link>
        </Navbar.Content>
      </Navbar>
      <Content>
        <Routes>
          <Route path="/" element={<Home />} />
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
