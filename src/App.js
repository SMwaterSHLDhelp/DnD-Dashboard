import React, { useState, useEffect } from 'react';
import { HeroUIProvider, ThemeProvider, createTheme, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, Sidebar, SidebarItem, SidebarSection } from '@heroui/react';
import CampaignList from './components/CampaignList';
import CampaignForm from './components/CampaignForm';
import SessionList from './components/SessionList';
import SessionForm from './components/SessionForm';
import SessionPlanner from './components/SessionPlanner';
import NPCList from './components/NPCList';
import NPCForm from './components/NPCForm';
import CharacterList from './components/CharacterList';
import CharacterForm from './components/CharacterForm';
import SessionTimeline from './components/SessionTimeline';
import LootInventory from './components/LootInventory';

function App() {
  const [campaigns, setCampaigns] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [npcs, setNpcs] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [view, setView] = useState('dashboard');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

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
    const updatedCampaigns = [...campaigns, { ...campaign, id: Date.now().toString() }];
    setCampaigns(updatedCampaigns);
    saveToLocalStorage('dndCampaigns', updatedCampaigns);
    setShowForm(false);
  };

  const handleCampaignDelete = (campaign) => {
    const updatedCampaigns = campaigns.filter(c => c.id !== campaign.id);
    setCampaigns(updatedCampaigns);
    saveToLocalStorage('dndCampaigns', updatedCampaigns);
  };

  const handleCampaignEdit = (campaign) => {
    setEditingItem(campaign);
    setShowForm(true);
  };

  const handleSessionSave = (session) => {
    const updatedSessions = [...sessions, { ...session, id: Date.now().toString() }];
    setSessions(updatedSessions);
    saveToLocalStorage('dndSessions', updatedSessions);
    setShowForm(false);
  };

  const handleSessionDelete = (session) => {
    const updatedSessions = sessions.filter(s => s.id !== session.id);
    setSessions(updatedSessions);
    saveToLocalStorage('dndSessions', updatedSessions);
  };

  const handleSessionEdit = (session) => {
    setEditingItem(session);
    setShowForm(true);
  };

  const handleNPCSave = (npc) => {
    const updatedNpcs = [...npcs, { ...npc, id: Date.now().toString() }];
    setNpcs(updatedNpcs);
    saveToLocalStorage('dndNPCs', updatedNpcs);
    setShowForm(false);
  };

  const handleNPCDelete = (npc) => {
    const updatedNpcs = npcs.filter(n => n.id !== npc.id);
    setNpcs(updatedNpcs);
    saveToLocalStorage('dndNPCs', updatedNpcs);
  };

  const handleNPCEdit = (npc) => {
    setEditingItem(npc);
    setShowForm(true);
  };

  const handleCharacterSave = (character) => {
    const updatedCharacters = [...characters, { ...character, id: Date.now().toString() }];
    setCharacters(updatedCharacters);
    saveToLocalStorage('dndCharacters', updatedCharacters);
    setShowForm(false);
  };

  const handleCharacterDelete = (character) => {
    const updatedCharacters = characters.filter(c => c.id !== character.id);
    setCharacters(updatedCharacters);
    saveToLocalStorage('dndCharacters', updatedCharacters);
  };

  const handleCharacterEdit = (character) => {
    setEditingItem(character);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingItem(null);
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

  const renderForm = () => {
    if (!showForm) return null;
    
    switch (view) {
      case 'campaigns':
        return (
          <div className="form-modal">
            <div className="form-content">
              <h2>{editingItem ? 'Edit Campaign' : 'New Campaign'}</h2>
              <CampaignForm 
                onSubmit={handleCampaignSave} 
                initialData={editingItem}
                onCancel={closeForm}
              />
              <button onClick={closeForm} className="close-btn">Cancel</button>
            </div>
          </div>
        );
      case 'sessions':
        return (
          <div className="form-modal">
            <div className="form-content">
              <h2>{editingItem ? 'Edit Session' : 'New Session'}</h2>
              <SessionForm 
                onSubmit={handleSessionSave} 
                initialData={editingItem}
                onCancel={closeForm}
              />
              <button onClick={closeForm} className="close-btn">Cancel</button>
            </div>
          </div>
        );
      case 'npcs':
        return (
          <div className="form-modal">
            <div className="form-content">
              <NPCForm 
                npc={editingItem} 
                onSave={handleNPCSave} 
                onCancel={handleCancel}
                onDelete={handleNPCDelete}
              />
            </div>
          </div>
        );
      case 'characters':
        return (
          <div className="form-modal">
            <div className="form-content">
              <h2>{editingItem ? 'Edit Character' : 'New Character'}</h2>
              <CharacterForm 
                onSubmit={handleCharacterSave} 
                initialData={editingItem}
                onCancel={closeForm}
              />
              <button onClick={closeForm} className="close-btn">Cancel</button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderView = () => {
    switch (view) {
      case 'dashboard':
        return (
          <div className="dashboard">
            <h2>Dashboard</h2>
            <p>Welcome to your D&D Campaign Manager</p>
            <div className="stats">
              <div className="stat-card">
                <h3>Campaigns</h3>
                <p>{campaigns.length}</p>
              </div>
              <div className="stat-card">
                <h3>Sessions</h3>
                <p>{sessions.length}</p>
              </div>
              <div className="stat-card">
                <h3>NPCs</h3>
                <p>{npcs.length}</p>
              </div>
              <div className="stat-card">
                <h3>Characters</h3>
                <p>{characters.length}</p>
              </div>
            </div>
            <div className="quick-actions">
              <button onClick={() => { setView('campaigns'); setShowForm(true); }}>New Campaign</button>
              <button onClick={() => { setView('sessions'); setShowForm(true); }}>Plan Session</button>
              <button onClick={() => { setView('npcs'); setShowForm(true); }}>Add NPC</button>
              <button onClick={() => { setView('characters'); setShowForm(true); }}>Add Character</button>
            </div>
          </div>
        );
      case 'campaigns':
        return (
          <div className="campaigns-container">
            <h2>Campaigns</h2>
            <button onClick={() => { setShowForm(true); setEditingItem(null); }} className="add-btn">+ Add Campaign</button>
            <CampaignList 
              campaigns={campaigns} 
              onEdit={handleCampaignEdit} 
              onDelete={handleCampaignDelete} 
              onSelect={(id) => console.log('Select campaign', id)}
            />
          </div>
        );
      case 'sessions':
        return (
          <div className="sessions-container">
            <h2>Sessions</h2>
            <button onClick={() => { setShowForm(true); setEditingItem(null); }} className="add-btn">+ Plan Session</button>
            <SessionPlanner />
            <SessionList 
              sessions={sessions} 
              onEdit={handleSessionEdit} 
              onDelete={handleSessionDelete} 
              onSelect={(id) => console.log('Select session', id)}
            />
          </div>
        );
      case 'npcs':
        return (
          <div className="npcs-container">
            <h2>NPCs</h2>
            <button onClick={() => { setShowForm(true); setEditingItem(null); }} className="add-btn">+ Add NPC</button>
            <NPCList 
              npcs={npcs} 
              onEdit={handleNPCEdit} 
              onDelete={handleNPCDelete} 
              onSelect={(id) => console.log('Select NPC', id)}
            />
          </div>
        );
      case 'characters':
        return (
          <div className="characters-container">
            <h2>Characters</h2>
            <button onClick={() => { setShowForm(true); setEditingItem(null); }} className="add-btn">+ Add Character</button>
            <CharacterList 
              characters={characters} 
              onEdit={handleCharacterEdit} 
              onDelete={handleCharacterDelete} 
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
                <h1>D&amp;D Campaign Manager</h1>
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
          {renderForm()}
        </div>
      </ThemeProvider>
    </HeroUIProvider>
  );
}

export default App;
