import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@heroui/react';

function Sidebar({ activeModule, setActiveModule }) {
  const modules = [
    { name: 'Campaign', path: '/campaign' },
    { name: 'Sessions', path: '/sessions' },
    { name: 'NPCs', path: '/npcs' },
    { name: 'Players', path: '/players' },
    { name: 'Combat', path: '/combat' },
    { name: 'Loot', path: '/loot' },
    { name: 'Rules', path: '/rules' },
    { name: 'Notes', path: '/notes' },
    { name: 'Timeline', path: '/timeline' },
    { name: 'Random', path: '/random' }
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <span className="font-bold text-primary">Modules</span>
      </div>
      <div className="flex-1 overflow-y-auto py-2">
        {modules.map(module => (
          <Link key={module.path} to={module.path}>
            <Button
              variant={activeModule === module.name ? 'flat' : 'ghost'}
              color={activeModule === module.name ? 'primary' : 'default'}
              fullWidth
              className="justify-start"
            >
              {module.name}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;