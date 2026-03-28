import { Link } from 'react-router-dom';
import { Button } from '@heroui/react';

const navigation = [
  { name: 'Campaign', href: '/campaign', icon: 'book' },
  { name: 'Sessions', href: '/sessions', icon: 'calendar' },
  { name: 'NPCs', href: '/npcs', icon: 'users' },
  { name: 'Players', href: '/players', icon: 'user' },
  { name: 'Combat', href: '/combat', icon: 'sword' },
  { name: 'Loot', href: '/loot', icon: 'chest' },
  { name: 'Rules', href: '/rules', icon: 'book-open' },
  { name: 'Notes', href: '/notes', icon: 'note' },
  { name: 'Timeline', href: '/timeline', icon: 'clock' },
  { name: 'Generators', href: '/generators', icon: 'sparkles' },
];

export default function Sidebar({ activeTab, onTabChange }) {
  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-xl font-bold">D&D Manager</div>
      <nav className="flex-1 px-2 py-2 space-y-1 overflow-y-auto">
        {navigation.map((item) => (
          <Button
            key={item.name}
            as={Link}
            to={item.href}
            color={activeTab === item.name.toLowerCase() ? 'primary' : 'default'}
            variant={activeTab === item.name.toLowerCase() ? 'solid' : 'ghost'}
            className="w-full justify-start"
            onClick={() => onTabChange(item.name.toLowerCase())}
          >
            {item.name}
          </Button>
        ))}
      </nav>
      <div className="p-4 text-xs text-gray-400 text-center">
        D&D Campaign Manager
      </div>
    </div>
  );
}