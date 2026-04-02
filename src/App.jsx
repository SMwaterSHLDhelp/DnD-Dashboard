import React, { useState, useEffect } from 'react';
import QuickReferenceModal from './components/QuickReferenceModal';
import Sidebar from './components/Sidebar';
import Campaign from './components/Campaign';
import Session from './components/Session';
import NPC from './components/NPC';
import Player from './components/Player';
import Combat from './components/Combat';
import Loot from './components/Loot';
import RulesReference from './components/RulesReference';
import DMNotes from './components/DMNotes';
import HistoryLog from './components/HistoryLog';
import RandomGenerators from './components/RandomGenerators';
import { Navbar, NavbarContent, NavbarItem, Button } from '@heroui/react';
import './App.css';

function App() {
  const [activeView, setActiveView] = useState('campaign');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle global Ctrl+K shortcut for quick reference modal
  useEffect(() => {
    const handleOpenModal = () => {
      setIsModalOpen(true);
    };

    document.addEventListener('open-quick-reference', handleOpenModal);
    
    return () => {
      document.removeEventListener('open-quick-reference', handleOpenModal);
    };
  }, []);

  const renderView = () => {
    switch (activeView) {
      case 'campaign':
        return <Campaign />;
      case 'session':
        return <Session />;
      case 'npc':
        return <NPC />;
      case 'player':
        return <Player />;
      case 'combat':
        return <Combat />;
      case 'loot':
        return <Loot />;
      case 'rules':
        return <RulesReference />;
      case 'dmnotes':
        return <DMNotes />;
      case 'history':
        return <HistoryLog />;
      case 'generators':
        return <RandomGenerators />;
      default:
        return <Campaign />;
    }
  };

  return (
    <div className="app-container">
      {/* Quick Reference Modal */}
      <QuickReferenceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Floating Action Button for Quick Reference */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="floating-action-btn"
        title="Quick Reference (Ctrl+K)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>

      <div className="app-layout">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
        <div className="main-content">
          <Navbar className="app-header">
            <NavbarContent className="flex-1">
              <NavbarItem>
                <h1 className="text-xl font-bold">D&D Campaign Manager</h1>
              </NavbarItem>
            </NavbarContent>
            <NavbarContent>
              <NavbarItem>
                <Button
                  isIconOnly
                  size="sm"
                  onClick={() => setIsModalOpen(true)}
                  title="Quick Reference (Ctrl+K)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </Button>
              </NavbarItem>
            </NavbarContent>
          </Navbar>
          <main className="content-area p-4">
            {renderView()}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;