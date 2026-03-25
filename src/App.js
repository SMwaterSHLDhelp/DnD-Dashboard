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

  const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const handleCampaignSave = (campaign) => {
    const updatedCampaigns = [...campaigns, campaign];
    setCampaigns(updatedCampaigns);
    saveToLocalStorage('dndCampaigns', updatedCampaigns);
  };

  const handleSessionSave = (session) => {
    const updatedSessions = [...sessions, session];
    setSessions(updatedSessions);
    saveToLocalStorage('dndSessions', updatedSessions);
  };

  const handleNPCSave = (npc) => {
    const updatedNpcs = [...npcs, npc];
    setNpcs(updatedNpcs);
    saveToLocalStorage('dndNPCs', updatedNpcs);
  };

  const handleCharacterSave = (character) => {
    const updatedCharacters = [...characters, character];
    setCharacters(updatedCharacters);
    saveToLocalStorage('dndCharacters', updatedCharacters);
  };

  // Sidebar navigation
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'campaigns', label: 'Campaigns' },
    { id: 'sessions', label: 'Sessions' },
    { id: 'npcs', label: 'NPCs' },
    { id: 'characters', label: 'Characters' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'loot', label: 'Loot & Inventory' },
  ];

  const renderView = () => {
    switch (view) {
      case 'dashboard':
        return (
          <div className="dashboard">
            <h2>Dashboard</h2>
            <p>Welcome to your D&D Campaign Manager</p>
            <div className="stats">
              <p>Campaigns: {campaigns.length}</p>
              <p>Sessions: {sessions.length}</p>
              <p>NPCs: {npcs.length}</p>
              <p>Characters: {characters.length}</p>
            </div>
          </div>
        );
      case 'campaigns':
        return (
          <div className="campaigns-container">
            <h2>Campaigns</h2>
            <CampaignList 
              campaigns={campaigns} 
              onEdit={() => console.log('Edit campaign')} 
              onDelete={() => console.log('Delete campaign')} 
              onSelect={(id) => console.log('Select campaign', id)}
            />
          </div>
        );
      case 'sessions':
        return (
          <div className="sessions-container">
            <h2>Sessions</h2>
            <SessionList 
              sessions={sessions} 
              onEdit={() => console.log('Edit session')} 
              onDelete={() => console.log('Delete session')} 
              onSelect={(id) => console.log('Select session', id)}
            />
          </div>
        );
      case 'npcs':
        return (
          <div className="npcs-container">
            <h2>NPCs</h2>
            <NPCList 
              npcs={npcs} 
              onEdit={() => console.log('Edit NPC')} 
              onDelete={() => console.log('Delete NPC')} 
              onSelect={(id) => console.log('Select NPC', id)}
            />
          </div>
        );
      case 'characters':
        return (
          <div className="characters-container">
            <h2>Characters</h2>
            <CharacterList 
              characters={characters} 
              onEdit={() => console.log('Edit character')} 
              onDelete={() => console.log('Delete character')} 
              onSelect={(id) => console.log('Select character', id)}
            />
          </div>
        );
      case 'timeline':
        return (
          <div className="timeline-container">
            <h2>Session Timeline</h2>
            <SessionTimeline />
          </div>
        );
      case 'loot':
        return (
          <div className="loot-container">
            <h2>Loot & Inventory</h2>
            <LootInventory />
          </div>
        );
      default:
        return <div>Unknown view</div>;
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