import React, { useState, useEffect } from 'react';
import { HeroUIProvider, ThemeProvider, createTheme, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, Sidebar, SidebarItem, SidebarSection } from '@heroui/react';
import { CampaignForm } from './components/CampaignForm';
import { CampaignList } from './components/CampaignList';
import { SessionForm } from './components/SessionForm';
import { SessionList } from './components/SessionList';
import { NPCForm } from './components/NPCForm';
import { NPCList } from './components/NPCList';
import { CharacterForm } from './components/CharacterForm';
import { CharacterList } from './components/CharacterList';
import { SessionTimeline } from './components/SessionTimeline';
import { LootInventory } from './components/LootInventory';

function App() {
  const [campaigns, setCampaigns] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [npcs, setNpcs] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [view, setView] = useState('dashboard');

  const loadFromLocalStorage = () => {
    setCampaigns(JSON.parse(localStorage.getItem('dndCampaigns') || '[]'));
    setSessions(JSON.parse(localStorage.getItem('dndSessions') || '[]'));
    setNpcs(JSON.parse(localStorage.getItem('dndNPCs') || '[]'));
    setCharacters(JSON.parse(localStorage.getItem('dndCharacters') || '[]'));
  };

  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'campaigns', label: 'Campaigns' },
    { id: 'sessions', label: 'Sessions' },
    { id: 'npcs', label: 'NPCs' },
    { id: 'characters', label: 'Characters' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'loot', label: 'Loot & Inventory' }
  ];

  const renderView = () => {
    switch (view) {
      case 'dashboard':
        return (
          <div className="dashboard-view">
            <h2>Campaign Dashboard</h2>
            <p>Welcome to your D&D Campaign Manager</p>
            <div className="stats-container">
              <div className="stat-card">
                <h3>Campaigns</h3>
                <span className="stat-value">{campaigns.length}</span>
              </div>
              <div className="stat-card">
                <h3>Sessions</h3>
                <span className="stat-value">{sessions.length}</span>
              </div>
              <div className="stat-card">
                <h3>NPCs</h3>
                <span className="stat-value">{npcs.length}</span>
              </div>
              <div className="stat-card">
                <h3>Characters</h3>
                <span className="stat-value">{characters.length}</span>
              </div>
            </div>
          </div>
        );
      case 'campaigns':
        return (
          <div className="campaigns-view">
            <CampaignForm onCampaignAdd={(newCampaign) => {
              setCampaigns([...campaigns, newCampaign]);
              localStorage.setItem('dndCampaigns', JSON.stringify([...campaigns, newCampaign]));
            }} />
            <CampaignList campaigns={campaigns} />
          </div>
        );
      case 'sessions':
        return (
          <div className="sessions-view">
            <SessionForm onSessionAdd={(newSession) => {
              setSessions([...sessions, newSession]);
              localStorage.setItem('dndSessions', JSON.stringify([...sessions, newSession]));
            }} />
            <SessionList sessions={sessions} />
          </div>
        );
      case 'npcs':
        return (
          <div className="npcs-view">
            <NPCForm onNPCAdd={(newNPC) => {
              setNpcs([...npcs, newNPC]);
              localStorage.setItem('dndNPCs', JSON.stringify([...npcs, newNPC]));
            }} />
            <NPCList npcs={npcs} />
          </div>
        );
      case 'characters':
        return (
          <div className="characters-view">
            <CharacterForm onCharacterAdd={(newCharacter) => {
              setCharacters([...characters, newCharacter]);
              localStorage.setItem('dndCharacters', JSON.stringify([...characters, newCharacter]));
            }} />
            <CharacterList characters={characters} />
          </div>
        );
      case 'timeline':
        return (
          <div className="timeline-view">
            <SessionTimeline sessions={sessions} />
          </div>
        );
      case 'loot':
        return (
          <div className="loot-view">
            <LootInventory />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <HeroUIProvider>
      <ThemeProvider>
        <div className="app">
          <Sidebar
            position="left"
            width="250px"
            defaultSelectedKey="dashboard"
            className="sidebar"
          >
            <SidebarSection>
              {sidebarItems.map((item) => (
                <SidebarItem
                  key={item.id}
                  text={item.label}
                  isSelected={view === item.id}
                  onClick={() => setView(item.id)}
                />
              ))}
            </SidebarSection>
          </Sidebar>
          <div className="main-content">
            <Navbar>
              <NavbarBrand>
                <h1>D&D Campaign Manager</h1>
              </NavbarBrand>
              <NavbarContent>
                <NavbarItem>
                  <Link color="foreground">Login</Link>
                </NavbarItem>
              </NavbarContent>
            </Navbar>
            <div className="view-container">
              {renderView()}
            </div>
          </div>
        </div>
      </ThemeProvider>
    </HeroUIProvider>
  );
}

export default App;
