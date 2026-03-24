import React, { useState, useEffect } from 'react';
import { HeroUIProvider, ThemeProvider, createTheme, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Divider, Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, Sidebar, SidebarItem, SidebarSection } from '@heroui/react';
import { CampaignForm } from './components/CampaignForm';
import { SessionForm } from './components/SessionForm';
import { NPCForm } from './components/NPCForm';
import { CharacterForm } from './components/CharacterForm';
import { SessionTimeline } from './components/SessionTimeline';
import { LootInventory } from './components/LootInventory';

// Custom theme for D&D aesthetic
const theme = createTheme({
  type: 'light',
  theme: {
    colors: {
      background: '#1a1a2e',
      foreground: '#e94560',
      primary: {
        50: '#f0f9ff',
        100: '#e0f2fe',
        200: '#bae6fd',
        300: '#7dd3fc',
        400: '#38bdf8',
        500: '#0ea5e9',
        600: '#0284c7',
        700: '#0369a1',
        800: '#075985',
        900: '#0c4a6e',
      },
      secondary: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
      },
      accent: {
        50: '#fff7ed',
        100: '#ffedd5',
        200: '#fed7aa',
        300: '#fdba74',
        400: '#fb923c',
        500: '#f97316',
        600: '#ea580c',
        700: '#c2410c',
        800: '#9a3412',
        900: '#7c2d12',
      }
    }
  }
});

function App() {
  const [view, setView] = useState('campaigns');
  const [campaigns, setCampaigns] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [npcs, setNpcs] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [loot, setLoot] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [timeline, setTimeline] = useState([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedCampaigns = localStorage.getItem('dndCampaigns');
    const savedSessions = localStorage.getItem('dndSessions');
    const savedNpcs = localStorage.getItem('dndNpcs');
    const savedCharacters = localStorage.getItem('dndCharacters');
    const savedLoot = localStorage.getItem('dndLoot');
    const savedTimeline = localStorage.getItem('dndTimeline');

    if (savedCampaigns) setCampaigns(JSON.parse(savedCampaigns));
    if (savedSessions) setSessions(JSON.parse(savedSessions));
    if (savedNpcs) setNpcs(JSON.parse(savedNpcs));
    if (savedCharacters) setCharacters(JSON.parse(savedCharacters));
    if (savedLoot) setLoot(JSON.parse(savedLoot));
    if (savedTimeline) setTimeline(JSON.parse(savedTimeline));
  }, []);

  // Save data to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('dndCampaigns', JSON.stringify(campaigns));
    localStorage.setItem('dndSessions', JSON.stringify(sessions));
    localStorage.setItem('dndNpcs', JSON.stringify(npcs));
    localStorage.setItem('dndCharacters', JSON.stringify(characters));
    localStorage.setItem('dndLoot', JSON.stringify(loot));
    localStorage.setItem('dndTimeline', JSON.stringify(timeline));
  }, [campaigns, sessions, npcs, characters, loot, timeline]);

  // Navigation handler
  const switchView = (newView) => {
    setView(newView);
    setSelectedCampaign(null);
  };

  return (
    <HeroUIProvider>
      <ThemeProvider theme={theme}>
        <div className="App">
          {/* Header */}
          <header className="App-header">
            <Navbar isBordered className="bg-gray-900">
              <NavbarBrand>
                <h1 className="text-2xl font-bold text-red-500">D&D Campaign Manager</h1>
              </NavbarBrand>
              <NavbarContent className="hidden sm:flex gap-4">
                <NavbarItem>
                  <Link color="foreground" className="text-white" isActive={view === 'campaigns'} onClick={() => switchView('campaigns')}>
                    Campaigns
                  </Link>
                </NavbarItem>
                <NavbarItem>
                  <Link color="foreground" className="text-white" isActive={view === 'sessions'} onClick={() => switchView('sessions')}>
                    Sessions
                  </Link>
                </NavbarItem>
                <NavbarItem>
                  <Link color="foreground" className="text-white" isActive={view === 'npcs'} onClick={() => switchView('npcs')}>
                    NPCs
                  </Link>
                </NavbarItem>
                <NavbarItem>
                  <Link color="foreground" className="text-white" isActive={view === 'characters'} onClick={() => switchView('characters')}>
                    Characters
                  </Link>
                </NavbarItem>
                <NavbarItem>
                  <Link color="foreground" className="text-white" isActive={view === 'history'} onClick={() => switchView('history')}>
                    Timeline
                  </Link>
                </NavbarItem>
                <NavbarItem>
                  <Link color="foreground" className="text-white" isActive={view === 'loot'} onClick={() => switchView('loot')}>
                    Loot & Inventory
                  </Link>
                </NavbarItem>
              </NavbarContent>
            </Navbar>
          </header>

          {/* Sidebar Layout */}
          <div className="App-container">
            <aside className="sidebar">
              <Sidebar aria-label="Campaign Navigation" className="bg-gray-800">
                <SidebarSection className="bg-gray-900">
                  <h3 className="text-lg font-bold text-white px-4 py-2">Campaigns</h3>
                  {campaigns.map((campaign) => (
                    <SidebarItem
                      key={campaign.id}
                      className={`text-gray-300 hover:bg-gray-700 cursor-pointer ${selectedCampaign?.id === campaign.id ? 'bg-gray-700 text-white' : ''}`}
                      onClick={() => setSelectedCampaign(campaign)}
                    >
                      {campaign.name}
                    </SidebarItem>
                  ))}
                  {campaigns.length === 0 && (
                    <SidebarItem className="text-gray-500 px-4 py-2 italic">
                      No campaigns yet. Create one!
                    </SidebarItem>
                  )}
                </SidebarSection>

                <SidebarSection className="bg-gray-900 mt-4">
                  <h3 className="text-lg font-bold text-white px-4 py-2">Quick Actions</h3>
                  <SidebarItem className="text-blue-400 hover:bg-gray-700 cursor-pointer px-4 py-2">
                    <button onClick={() => switchView('campaigns')} className="w-full text-left">+ New Campaign</button>
                  </SidebarItem>
                  <SidebarItem className="text-blue-400 hover:bg-gray-700 cursor-pointer px-4 py-2">
                    <button onClick={() => switchView('sessions')} className="w-full text-left">+ New Session</button>
                  </SidebarItem>
                  <SidebarItem className="text-purple-400 hover:bg-gray-700 cursor-pointer px-4 py-2">
                    <button onClick={() => switchView('npcs')} className="w-full text-left">+ New NPC</button>
                  </SidebarItem>
                  <SidebarItem className="text-green-400 hover:bg-gray-700 cursor-pointer px-4 py-2">
                    <button onClick={() => switchView('characters')} className="w-full text-left">+ New Character</button>
                  </SidebarItem>
                </SidebarSection>
              </Sidebar>
            </aside>

            {/* Main Content */}
            <main className="App-main">
              {view === 'campaigns' && (
                <CampaignForm
                  campaigns={campaigns}
                  setCampaigns={setCampaigns}
                  switchView={switchView}
                  selectedCampaign={selectedCampaign}
                  setSelectedCampaign={setSelectedCampaign}
                />
              )}

              {view === 'sessions' && (
                <SessionForm
                  sessions={sessions}
                  setSessions={setSessions}
                  selectedCampaign={selectedCampaign}
                  campaigns={campaigns}
                />
              )}

              {view === 'npcs' && (
                <NPCForm
                  npcs={npcs}
                  setNpcs={setNpcs}
                  selectedCampaign={selectedCampaign}
                  campaigns={campaigns}
                />
              )}

              {view === 'characters' && (
                <CharacterForm
                  characters={characters}
                  setCharacters={setCharacters}
                  selectedCampaign={selectedCampaign}
                  campaigns={campaigns}
                />
              )}

              {view === 'history' && (
                <SessionTimeline
                  timeline={timeline}
                  setTimeline={setTimeline}
                  sessions={sessions}
                />
              )}

              {view === 'loot' && (
                <LootInventory
                  loot={loot}
                  setLoot={setLoot}
                  selectedCampaign={selectedCampaign}
                  campaigns={campaigns}
                />
              )}
            </main>
          </div>

          <style>{`
            .App {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              min-height: 100vh;
              background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            }
            .App-header {
              background: rgba(26, 26, 46, 0.95);
              backdrop-filter: blur(10px);
              border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            .App-container {
              display: flex;
              max-width: 1600px;
              margin: 0 auto;
              min-height: calc(100vh - 80px);
            }
            .sidebar {
              width: 280px;
              flex-shrink: 0;
            }
            .App-main {
              flex-grow: 1;
              padding: 20px;
              overflow-y: auto;
            }
            .form-section {
              background: rgba(255, 255, 255, 0.05);
              padding: 20px;
              border-radius: 12px;
              margin-bottom: 20px;
              backdrop-filter: blur(10px);
              border: 1px solid rgba(255, 255, 255, 0.1);
            }
            .form-section h3 {
              color: #e94560;
              margin-top: 0;
              border-bottom: 2px solid #e94560;
              padding-bottom: 8px;
            }
            .campaign-section, .session-section, .npc-section, .character-section {
              min-height: 400px;
            }
            .selected-campaign-info {
              background: linear-gradient(135deg, rgba(233, 69, 96, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%);
              padding: 15px;
              border-radius: 8px;
              margin-top: 20px;
              border-left: 4px solid #e94560;
            }
            button {
              margin: 5px;
              padding: 10px 20px;
              cursor: pointer;
              border: none;
              border-radius: 6px;
              font-weight: 500;
              transition: all 0.3s;
            }
            button[type="submit"] {
              background: linear-gradient(135deg, #e94560 0%, #c0392b 100%);
              color: white;
            }
            button[type="submit"]:hover {
              transform: translateY(-2px);
              box-shadow: 0 4px 12px rgba(233, 69, 96, 0.3);
            }
            button.cancel {
              background: linear-gradient(135deg, #7f8c8d 0%, #95a5a6 100%);
              color: white;
            }
            button.cancel:hover {
              background: linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%);
            }
            ul {
              list-style: none;
              padding: 0;
            }
            li {
              background: rgba(255, 255, 255, 0.05);
              margin: 8px 0;
              padding: 12px;
              border-radius: 8px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              border: 1px solid rgba(255, 255, 255, 0.1);
            }
            .character-list {
              margin-top: 20px;
            }
            .character-item {
              padding: 15px;
              background: rgba(255, 255, 255, 0.05);
              border-radius: 8px;
              margin-bottom: 10px;
              border: 1px solid rgba(255, 255, 255, 0.1);
            }
            .character-header {
              margin-bottom: 10px;
              font-weight: 600;
            }
            .character-actions button {
              margin: 0 5px 0 0;
              padding: 6px 12px;
              font-size: 14px;
            }
            .npc-list {
              margin-top: 20px;
            }
            .npc-grid {
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
              gap: 20px;
              margin-top: 20px;
            }
            .npc-card {
              background: rgba(255, 255, 255, 0.05);
              padding: 15px;
              border-radius: 8px;
              border: 1px solid rgba(255, 255, 255, 0.1);
              transition: all 0.3s;
            }
            .npc-card:hover {
              transform: translateY(-5px);
              box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
            }
            .npc-status {
              font-weight: bold;
              color: #27ae60;
            }
            .npc-stats, .npc-combat, .npc-sessions {
              margin: 10px 0;
              font-size: 0.9em;
            }
            .npc-actions button {
              margin: 0 5px 0 0;
            }
            .timeline-event {
              border-left: 3px solid #e94560;
              padding-left: 20px;
              margin: 20px 0;
              padding-bottom: 20px;
            }
            .timeline-date {
              font-weight: bold;
              color: #f39c12;
              margin-bottom: 5px;
            }
            .timeline-content {
              color: #ecf0f1;
            }
            .loot-item {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 12px;
              background: rgba(255, 255, 255, 0.05);
              border-radius: 8px;
              margin-bottom: 10px;
              border: 1px solid rgba(255, 255, 255, 0.1);
            }
            .gold-summary {
              background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
              color: white;
              padding: 15px;
              border-radius: 8px;
              margin: 20px 0;
              text-align: center;
            }
          `}</style>
        </div>
      </ThemeProvider>
    </HeroUIProvider>
  );
}

export default App;