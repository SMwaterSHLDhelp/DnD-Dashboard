import { useState } from 'react';
import { ThemeProvider, Button } from '@heroui/react';
import CampaignForm from './components/CampaignForm.jsx';
import CampaignList from './components/CampaignList.jsx';
import SessionForm from './components/SessionForm.jsx';
import HistoryLog from './components/HistoryLog.jsx';
import Sidebar from './components/Sidebar.tsx';
import { Menu, X } from 'lucide-react';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <ThemeProvider>
      <div className="flex min-h-screen bg-background text-foreground">
        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
            onClick={toggleSidebar}
          />
        )}

        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
          <header className="sticky top-0 z-30 flex items-center justify-between p-4 bg-background/80 backdrop-blur-md border-b border-divider">
            <div className="flex items-center gap-4">
              <Button 
                isIconOnly 
                variant="light" 
                size="lg" 
                className="lg:hidden" 
                onClick={toggleSidebar}
              >
                <Menu size={24} />
              </Button>
              <h1 className="text-xl font-bold truncate">D&D Campaign Manager</h1>
            </div>
            
            <div className="flex gap-2">
              {/* Placeholder for other header actions like profile/settings */}
            </div>
          </nheader>

          <main className="p-4 md:p-6 max-w-7xl mx-auto w-full space-y-8 overflow-y-auto">
            <section className="space-y-4">
              <CampaignList />
            </section>
            <section className="grid grid-cols-1 gap-6">
              <CampaignForm />
              <SessionForm />
              <HistoryLog />
            </section>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;