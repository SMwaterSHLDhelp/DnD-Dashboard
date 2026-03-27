import React from 'react';
import { HeroUIProvider } from '@heroui/react';
import CampaignForm from './components/CampaignForm';
import CampaignList from './components/CampaignList';
import SessionForm from './components/SessionForm';
import HistoryLog from './components/HistoryLog';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <HeroUIProvider>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <header className="app-header">
            <h1>D&D Campaign Manager</h1>
          </header>
          <main className="app-main">
            <CampaignList />
            <CampaignForm />
            <SessionForm />
            <HistoryLog />
          </main>
        </div>
      </div>
    </HeroUIProvider>
  );
}

export default App;
