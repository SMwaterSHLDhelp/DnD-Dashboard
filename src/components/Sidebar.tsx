import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@heroui/react';
import { X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const navItems = [
    { to: '/', label: 'Generators' },
    { to: '/generators', label: 'Random Generators' },
    { to: '/campaign', label: 'Campaign' },
    { to: '/sessions', label: 'Sessions' },
    { to: '/npcs', label: 'NPCs' },
    { to: '/players', label: 'Players' },
    { to: '/combat', label: 'Combat' },
    { to: '/loot', label: 'Loot' },
    { to: '/rules', label: 'Rules' },
    { to: '/timeline', label: 'Timeline' },
  ];

  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-content1 border-r border-divider transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${ 
        isOpen ? 'translate-x-0' : '-translate-x-full' 
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-primary">DM Tools</h2>
          <Button 
            isIconOnly 
            variant="light" 
            size="sm" 
            className="lg:hidden" 
            onClick={onClose}
          >
            <X size={20} />
          </Button>
        </div>

        <nav className="flex-1 px-4 py-2 overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link 
                  to={item.to} 
                  onClick={onClose}
                  className="flex items-center px-4 py-3 rounded-lg hover:bg-default-100 transition-colors text-default-600 hover:text-primary font-medium"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-divider">
          <p className="text-xs text-default-400 text-center">D&D Manager v1.0</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;