import React, { useState, useEffect } from 'react';
import CampaignForm from './components/CampaignForm';
import CampaignList from './components/CampaignList';
import SessionForm from './components/SessionForm';
import SessionList from './components/SessionList';
import NPCForm from './components/NPCForm';
import NPCList from './components/NPCList';
import CharacterForm from './components/CharacterForm';
import CharacterList from './components/CharacterList';
import HistoryLog from './components/HistoryLog';

// Initialize with some sample data
const initialCampaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');
const initialSessions = JSON.parse(localStorage.getItem('sessions') || '[]');
const initialHistoryEvents = JSON.parse(localStorage.getItem('historyEvents') || '[]');
const initialNPCs = JSON.parse(localStorage.getItem('npcs') || '[]');
const initialCharacters = JSON.parse(localStorage.getItem('characters') || '[]');

function App() {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [sessions, setSessions] = useState(initialSessions);
  const [historyEvents, setHistoryEvents] = useState(initialHistoryEvents);
  const [npcs, setNPCs] = useState(initialNPCs);
  const [characters, setCharacters] = useState(initialCharacters);
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);
  const [view, setView] = useState('campaigns'); // campaigns, sessions, history, npcs, characters
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [editingSession, setEditingSession] = useState(null);
  const [editingNPC, setEditingNPC] = useState(null);
  const [editingCharacter, setEditingCharacter] = useState(null);

  // Persist campaigns to localStorage
  useEffect(() => {
    localStorage.setItem('campaigns', JSON.stringify(campaigns));
  }, [campaigns]);

  // Persist sessions to localStorage
  useEffect(() => {
    localStorage.setItem('sessions', JSON.stringify(sessions));
  }, [sessions]);

  // Persist history events to localStorage
  useEffect(() => {
    localStorage.setItem('historyEvents', JSON.stringify(historyEvents));
  }, [historyEvents]);

  // Persist NPCs to localStorage
  useEffect(() => {
    localStorage.setItem('npcs', JSON.stringify(npcs));
  }, [npcs]);

  // Persist characters to localStorage
  useEffect(() => {
    localStorage.setItem('characters', JSON.stringify(characters));
  }, [characters]);

  // Campaign handlers
  const handleSaveCampaign = (campaignData) => {
    if (editingCampaign) {
      setCampaigns(campaigns.map(c => 
        c.id === editingCampaign.id 
          ? { ...c, ...campaignData, updatedAt: new Date().toISOString() }
          : c
      ));
      setEditingCampaign(null);
    } else {
      const newCampaign = {
        id: Date.now().toString(),
        name: campaignData.name,
        description: campaignData.description,
        theme: campaignData.theme,
        factions: campaignData.factions || [],
        tone: campaignData.tone,
        worldLore: campaignData.worldLore || [],
        locations: campaignData.locations || [],
        maps: campaignData.maps || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setCampaigns([...campaigns, newCampaign]);
    }
  };

  const handleSelectCampaign = (campaign) => {
    setEditingCampaign(campaign);
    setView('campaigns');
  };

  const handleDeleteCampaign = (campaignId) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      setCampaigns(campaigns.filter(c => c.id !== campaignId));
      setSessions(sessions.filter(s => s.campaignId !== campaignId));
      setNPCs(npcs.filter(n => !campaigns.find(c => c.id === campaignId) || n.campaignId !== campaignId));
      setCharacters(characters.filter(c => !campaigns.find(c2 => c2.id === campaignId) || c.campaignId !== campaignId));
      if (selectedCampaignId === campaignId) {
        setSelectedCampaignId(null);
      }
      setEditingCampaign(null);
    }
  };

  // Session handlers
  const handleSaveSession = (sessionData) => {
    if (!selectedCampaignId) {
      alert('Please select a campaign first');
      return;
    }

    if (editingSession) {
      setSessions(sessions.map(s => 
        s.id === editingSession.id 
          ? { ...s, ...sessionData }
          : s
      ));
      setEditingSession(null);
    } else {
      const newSession = {
        id: Date.now().toString(),
        campaignId: selectedCampaignId,
        name: sessionData.name,
        date: sessionData.date,
        notes: sessionData.notes,
        events: []
      };
      setSessions([...sessions, newSession]);
    }
  };

  const handleSelectSession = (session) => {
    setEditingSession(session);
    setSelectedCampaignId(session.campaignId);
    setView('sessions');
  };

  const handleDeleteSession = (sessionId) => {
    if (window.confirm('Are you sure you want to delete this session?')) {
      setSessions(sessions.filter(s => s.id !== sessionId));
      setEditingSession(null);
    }
  };

  // NPC handlers
  const handleSaveNPC = (npcData) => {
    if (editingNPC) {
      setNPCs(npcs.map(n => 
        n._id === editingNPC._id 
          ? { ...n, ...npcData }
          : n
      ));
      setEditingNPC(null);
    } else {
      const newNPC = {
        _id: Date.now().toString(),
        campaignId: selectedCampaignId,
        ...npcData
      };
      setNPCs([...npcs, newNPC]);
    }
  };

  const handleSelectNPC = (npc) => {
    setEditingNPC(npc);
    setView('npcs');
  };

  const handleDeleteNPC = (npcId) => {
    if (window.confirm('Are you sure you want to delete this NPC?')) {
      setNPCs(npcs.filter(n => n._id !== npcId));
      setEditingNPC(null);
    }
  };

  // Character handlers
  const handleSaveCharacter = (characterData) => {
    if (editingCharacter) {
      setCharacters(characters.map(c => 
        c.id === editingCharacter.id 
          ? { ...c, ...characterData }
          : c
      ));
      setEditingCharacter(null);
    } else {
      const newCharacter = {
        id: Date.now().toString(),
        campaignId: selectedCampaignId,
        ...characterData
      };
      setCharacters([...characters, newCharacter]);
    }
  };

  const handleSelectCharacter = (character) => {
    setEditingCharacter(character);
    setView('characters');
  };

  const handleDeleteCharacter = (characterId) => {
    if (window.confirm('Are you sure you want to delete this character?')) {
      setCharacters(characters.filter(c => c.id !== characterId));
      setEditingCharacter(null);
    }
  };

  // History event handlers
  const handleAddEvent = (event) => {
    setHistoryEvents([...historyEvents, event]);
  };

  const handleDeleteEvent = (eventId) => {
    setHistoryEvents(historyEvents.filter(e => e.id !== eventId));
  };

  // View switching
  const switchView = (viewName) => {
    setView(viewName);
    setEditingCampaign(null);
    setEditingSession(null);
    setEditingNPC(null);
    setEditingCharacter(null);
  };

  // Get sessions for the selected campaign
  const campaignSessions = sessions.filter(s => s.campaignId === selectedCampaignId);

  // Get NPCs and Characters for the selected campaign
  const campaignNPCs = npcs.filter(n => n.campaignId === selectedCampaignId);
  const campaignCharacters = characters.filter(c => c.campaignId === selectedCampaignId);

  return (
    <div className="App">
      <header className="App-header">
        <h1>D&D Campaign Manager</h1>
        <nav className="nav-menu">
          <button 
            className={view === 'campaigns' ? 'active' : ''} 
            onClick={() => switchView('campaigns')}
          >
            Campaigns
          </button>
          <button 
            className={view === 'sessions' ? 'active' : ''} 
            onClick={() => switchView('sessions')}
          >
            Sessions
          </button>
          <button 
            className={view === 'npcs' ? 'active' : ''} 
            onClick={() => switchView('npcs')}
          >
            NPCs
          </button>
          <button 
            className={view === 'characters' ? 'active' : ''} 
            onClick={() => switchView('characters')}
          >
            Characters
          </button>
          <button 
            className={view === 'history' ? 'active' : ''} 
            onClick={() => switchView('history')}
          >
            Timeline & History
          </button>
        </nav>
      </header>

      <main className="App-main">
        {view === 'campaigns' && (
          <div className="campaign-section">
            <h2>Campaign Management</h2>
            
            <div className="form-section">
              <h3>{editingCampaign ? 'Edit Campaign' : 'Create New Campaign'}</h3>
              <CampaignForm 
                onSubmit={handleSaveCampaign} 
                initialData={editingCampaign}
              />
              {editingCampaign && (
                <button onClick={() => setEditingCampaign(null)}>Cancel Edit</button>
              )}
            </div>

            <div className="campaign-list-section">
              <h3>Select Campaign</h3>
              <CampaignList 
                campaigns={campaigns} 
                onSelect={(campaign) => {
                  setSelectedCampaignId(campaign.id);
                  handleSelectCampaign(null);
                }}
                onDelete={handleDeleteCampaign}
              />
            </div>

            {selectedCampaignId && (
              <div className="selected-campaign-info">
                <h3>Current Campaign: {campaigns.find(c => c.id === selectedCampaignId)?.name}</h3>
                <p>{campaigns.find(c => c.id === selectedCampaignId)?.description}</p>
              </div>
            )}
          </div>
        )}

        {view === 'sessions' && (
          <div className="session-section">
            <h2>Session Management</h2>
            {!selectedCampaignId ? (
              <p>Please select a campaign first to manage sessions.</p>
            ) : (
              <>
                <div className="form-section">
                  <h3>{editingSession ? 'Edit Session' : 'Create New Session'}</h3>
                  <SessionForm 
                    onSubmit={handleSaveSession} 
                    initialData={editingSession}
                  />
                  {editingSession && (
                    <button onClick={() => setEditingSession(null)}>Cancel Edit</button>
                  )}
                </div>

                <div className="session-list-section">
                  <h3>Sessions for {campaigns.find(c => c.id === selectedCampaignId)?.name}</h3>
                  <SessionList 
                    sessions={campaignSessions} 
                    onSelect={handleSelectSession}
                    onDelete={handleDeleteSession}
                  />
                </div>
              </>
            )}
          </div>
        )}

        {view === 'npcs' && (
          <div className="npc-section">
            <h2>NPC Management</h2>
            {!selectedCampaignId ? (
              <p>Please select a campaign first to manage NPCs.</p>
            ) : (
              <>
                <div className="form-section">
                  <h3>{editingNPC ? 'Edit NPC' : 'Create New NPC'}</h3>
                  <NPCForm 
                    npc={editingNPC} 
                    onSave={handleSaveNPC}
                    onCancel={() => setEditingNPC(null)}
                    onDelete={handleDeleteNPC}
                  />
                </div>

                <div className="npc-list-section">
                  <h3>NPCs for {campaigns.find(c => c.id === selectedCampaignId)?.name}</h3>
                  <NPCList 
                    npcs={campaignNPCs} 
                    onEdit={handleSelectNPC}
                    onDelete={handleDeleteNPC}
                  />
                </div>
              </>
            )}
          </div>
        )}

        {view === 'characters' && (
          <div className="character-section">
            <h2>Character Management</h2>
            {!selectedCampaignId ? (
              <p>Please select a campaign first to manage characters.</p>
            ) : (
              <>
                <div className="form-section">
                  <h3>{editingCharacter ? 'Edit Character' : 'Create New Character'}</h3>
                  <CharacterForm 
                    onSubmit={handleSaveCharacter} 
                    initialData={editingCharacter}
                  />
                  {editingCharacter && (
                    <button onClick={() => setEditingCharacter(null)}>Cancel Edit</button>
                  )}
                </div>

                <div className="character-list-section">
                  <h3>Characters for {campaigns.find(c => c.id === selectedCampaignId)?.name}</h3>
                  <CharacterList 
                    characters={campaignCharacters} 
                    onEdit={handleSelectCharacter}
                    onDelete={handleDeleteCharacter}
                  />
                </div>
              </>
            )}
          </div>
        )}

        {view === 'history' && (
          <div className="history-section">
            <HistoryLog 
              events={historyEvents} 
              onAddEvent={handleAddEvent} 
              onDeleteEvent={handleDeleteEvent}
            />
          </div>
        )}
      </main>

      <style>{`
        .App {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        .App-header {
          text-align: center;
          margin-bottom: 30px;
        }
        .App-header h1 {
          color: #2c3e50;
          margin-bottom: 20px;
        }
        .nav-menu {
          display: flex;
          justify-content: center;
          gap: 15px;
        }
        .nav-menu button {
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          background: #3498db;
          color: white;
          border: none;
          border-radius: 5px;
          transition: background 0.2s;
        }
        .nav-menu button:hover {
          background: #2980b9;
        }
        .nav-menu button.active {
          background: #1abc9c;
          font-weight: bold;
        }
        .App-main {
          background: white;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .form-section {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 30px;
        }
        .form-section h3 {
          color: #2c3e50;
          margin-top: 0;
        }
        .campaign-section, .session-section, .npc-section, .character-section {
          min-height: 400px;
        }
        .selected-campaign-info {
          background: #e8f4fd;
          padding: 15px;
          border-radius: 8px;
          margin-top: 20px;
        }
        button {
          margin: 5px;
          padding: 8px 16px;
          cursor: pointer;
          background: #e74c3c;
          color: white;
          border: none;
          border-radius: 4px;
        }
        button[type="submit"] {
          background: #27ae60;
        }
        button.cancel {
          background: #95a5a6;
        }
        ul {
          list-style: none;
          padding: 0;
        }
        li {
          background: #f1f1f1;
          margin: 5px 0;
          padding: 10px;
          border-radius: 4px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .character-list {
          margin-top: 20px;
        }
        .character-item {
          padding: 15px;
          background: #f9f9f9;
          border-radius: 8px;
          margin-bottom: 10px;
        }
        .character-header {
          margin-bottom: 10px;
        }
        .character-actions button {
          margin: 0;
        }
        .npc-list {
          margin-top: 20px;
        }
        .npc-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
        .npc-card {
          background: #f9f9f9;
          padding: 15px;
          border-radius: 8px;
          border: 1px solid #ddd;
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
      `}</style>
    </div>
  );
}

export default App;