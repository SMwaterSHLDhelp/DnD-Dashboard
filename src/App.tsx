import { useState } from 'react';
import { ThemeProvider, Button } from '@heroui/react';
import CampaignForm from './components/CampaignForm.jsx';
import CampaignList from './components/CampaignList.jsx';
import SessionForm from './components/SessionForm.jsx';
import HistoryLog from './components/HistoryLog.jsx';
import Sidebar from './components/Sidebar.tsx';
import { Menu } from 'lucide-react';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <ThemeProvider>
      <div className="flex min-h-screen bg-background text-foreground overflow-hidden">
        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
          {/* Header */}
          <header className="sticky top-0 z-30 flex items-center justify-between p-3 md:p-4 bg-background/80 backdrop-blur-md border-b border-divider">
            <div className="flex items-center gap-3 md:gap-4">
              <Button 
                isIconOnly 
                variant="light" 
                size="lg" 
                className="lg:hidden active:scale-95 transition-transform" 
                onClick={toggleSidebar}
              >
                <Menu size={24} />
              </Button>
              <h1 className="text-lg md:text-xl font-bold truncate max-w-[200px] sm:max-w-none">
                D&D Manager
              </h1>
            </div>
            
            <div className="flex gap-2">
              {/* Header actions could go here */}
            </div>
          </nav>

          {/* Main Scrollable Area */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6 scrollbar-thin">
            <div className="max-w-7xl mx-auto w-full space-y-8">
              <section className="space-y-4">
                <CampaignList />
              </section>
              <section className="grid grid-cols-1 gap-6">
                <CampaignForm />
                <SessionForm />
                <HistoryLog />
              </section>
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;