import React, { useState, useEffect } from 'react';
import CampaignForm from './components/CampaignForm';
import CampaignList from './components/CampaignList';
import SessionForm from './components/SessionForm';
import SessionList from './components/SessionList';
import HistoryLog from './components/HistoryLog';

// Initialize with some sample data
const initialCampaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');
const initialSessions = JSON.parse(localStorage.getItem('sessions') || '[]');
const initialHistoryEvents = JSON.parse(localStorage.getItem('historyEvents') || '[]');

function App() {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [sessions, setSessions] = useState(initialSessions);
  const [historyEvents, setHistoryEvents] = useState(initialHistoryEvents);
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);
  const [view, setView] = useState('campaigns'); // campaigns, sessions, history
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [editingSession, setEditingSession] = useState(null);

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
  };

  // Get sessions for the selected campaign
  const campaignSessions = sessions.filter(s => s.campaignId === selectedCampaignId);

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
        .campaign-section, .session-section {
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
      `}</style>
    </div>
  );
}

export default App;