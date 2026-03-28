import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Campaigns', icon: '⚔️' },
    { path: '/sessions', label: 'Sessions', icon: '📅' },
    { path: '/characters', label: 'Characters', icon: '🧙' },
    { path: '/npcs', label: 'NPCs', icon: '👤' },
    { path: '/combat', label: 'Combat', icon: '⚡' },
    { path: '/loot', label: 'Loot & Inventory', icon: '💰' },
    { path: '/rules', label: 'Rules Reference', icon: '📖' },
    { path: '/notes', label: 'DM Notes', icon: '🔒' },
    { path: '/history', label: 'Timeline', icon: '📜' },
    { path: '/generators', label: 'Generators', icon: '🎲' },
  ];

  return (
    <nav 
      role="navigation" 
      aria-label="Main navigation"
      className="sidebar"
    >
      <div className="sidebar-header">
        <h1 className="sidebar-title">D&D DM Tool</h1>
      </div>
      <ul className="sidebar-nav" role="list">
        {navItems.map((item) => (
          <li key={item.path} role="listitem">
            <Link
              to={item.path}
              aria-current={location.pathname === item.path ? 'page' : undefined}
              className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
              aria-label={item.label}
            >
              <span className="sidebar-icon" aria-hidden="true">{item.icon}</span>
              <span className="sidebar-text">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;