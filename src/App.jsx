import React, { useState } from 'react';
import { Navbar, NavbarContent, NavbarMenu, NavbarMenuItem, NavbarBrand, NavbarItem, Button, Link } from '@heroui/react';
import { Menu, Book, Calendar, User, Sword, Gift, BookOpen, FileText, Shuffle, Info } from 'lucide-react';
import Campaign from './pages/Campaign';
import Session from './pages/Session';
import NPC from './pages/NPC';
import Character from './pages/Character';
import Combat from './pages/Combat';
import Loot from './pages/Loot';
import RulesReference from './pages/RulesReference';
import DMNotes from './pages/DMNotes';
import Timeline from './pages/Timeline';
import RandomGenerators from './pages/RandomGenerators';

function App() {
  const [activeTab, setActiveTab] = useState('campaign');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const menuItems = [
    { id: 'campaign', label: 'Campaign', icon: Book },
    { id: 'session', label: 'Sessions', icon: Calendar },
    { id: 'npc', label: 'NPCs', icon: User },
    { id: 'character', label: 'Characters', icon: User },
    { id: 'combat', label: 'Combat', icon: Sword },
    { id: 'loot', label: 'Loot', icon: Gift },
    { id: 'rules', label: 'Rules', icon: BookOpen },
    { id: 'notes', label: 'Notes', icon: FileText },
    { id: 'timeline', label: 'Timeline', icon: Shuffle },
    { id: 'generators', label: 'Generators', icon: Info }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'campaign':
        return <Campaign />;
      case 'session':
        return <Session />;
      case 'npc':
        return <NPC />;
      case 'character':
        return <Character />;
      case 'combat':
        return <Combat />;
      case 'loot':
        return <Loot />;
      case 'rules':
        return <RulesReference />;
      case 'notes':
        return <DMNotes />;
      case 'timeline':
        return <Timeline />;
      case 'generators':
        return <RandomGenerators />;
      default:
        return <Campaign />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onMenuOpenChange={setIsMenuOpen} isBordered>
        <NavbarContent>
          <NavbarBrand>
            <div className="flex items-center gap-2">
              <Menu size={24} />
              <span className="font-bold text-inherit">D&D DM Tool</span>
            </div>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            <Link isExternal href="https://github.com/yourusername/dnd-dm-tool" color="primary">
              GitHub
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item) => (
            <NavbarMenuItem key={item.id}>
              <Button 
                variant={activeTab === item.id ? "solid" : "ghost"}
                color={activeTab === item.id ? "primary" : "default"}
                startContent={<item.icon size={16} />} 
                fullWidth
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMenuOpen(false);
                }}
              >
                {item.label}
              </Button>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>

      <main className="flex-1">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;