import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar" style={{
      width: '240px',
      backgroundColor: '#1e1e1e',
      color: '#ffffff',
      padding: '20px',
      minHeight: '100vh'
    }}>
      <nav>
        <h2 style={{ marginBottom: '20px' }}>DM Tools</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '10px' }}>
            <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Generators</Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link to="/generators" style={{ color: '#fff', textDecoration: 'none' }}>Random Generators</Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link to="/campaign" style={{ color: '#fff', textDecoration: 'none' }}>Campaign</Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link to="/sessions" style={{ color: '#fff', textDecoration: 'none' }}>Sessions</Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link to="/npcs" style={{ color: '#fff', textDecoration: 'none' }}>NPCs</Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link to="/players" style={{ color: '#fff', textDecoration: 'none' }}>Players</Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link to="/combat" style={{ color: '#fff', textDecoration: 'none' }}>Combat</Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link to="/loot" style={{ color: '#fff', textDecoration: 'none' }}>Loot</Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link to="/rules" style={{ color: '#fff', textDecoration: 'none' }}>Rules</Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link to="/timeline" style={{ color: '#fff', textDecoration: 'none' }}>Timeline</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
