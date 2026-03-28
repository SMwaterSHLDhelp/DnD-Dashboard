import { HeroUIProvider } from '@heroui/react';
import CampaignForm from './components/CampaignForm.jsx';
import CampaignList from './components/CampaignList.jsx';
import SessionForm from './components/SessionForm.jsx';
import HistoryLog from './components/HistoryLog.jsx';
import Sidebar from './components/Sidebar.tsx';

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
