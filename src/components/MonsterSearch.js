import React, { useState } from 'react';

const MonsterSearch = ({ onAddMonster }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Mock monster database
  const mockMonsters = [
    { id: 'goblin', name: 'Goblin', CR: 0.25, type: 'humanoid', HP: 7, AC: 15 },
    { id: 'orc', name: 'Orc', CR: 0.5, type: 'humanoid', HP: 15, AC: 13 },
    { id: 'troll', name: 'Troll', CR: 5, type: 'giant', HP: 84, AC: 15 },
    { id: 'dragon', name: 'Red Dragon', CR: 17, type: 'dragon', HP: 256, AC: 19 },
    { id: 'lich', name: 'Lich', CR: 21, type: 'undead', HP: 135, AC: 17 },
    { id: 'beholder', name: 'Beholder', CR: 17, type: 'monstrosity', HP: 180, AC: 18 }
  ];

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.length >= 2) {
      const results = mockMonsters.filter(m =>
        m.name.toLowerCase().includes(term.toLowerCase()) ||
        m.type.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="monster-search">
      <h2>Find Monster</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search monsters..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {searchResults.length > 0 && (
        <div className="search-results">
          <h3>Results ({searchResults.length})</h3>
          <ul>
            {searchResults.map(monster => (
              <li key={monster.id} className="search-result-item">
                <span className="monster-name">{monster.name}</span>
                <span className="monster-details">
                  CR {monster.CR} | {monster.type} | HP {monster.HP} | AC {monster.AC}
                </span>
                <button
                  onClick={() => onAddMonster(monster)}
                  className="add-monster-btn"
                >
                  Add to Combat
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {searchTerm && searchResults.length === 0 && (
        <div className="no-results">
          <p>No monsters found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default MonsterSearch;
