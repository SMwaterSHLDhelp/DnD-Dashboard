import React, { useState, useEffect } from 'react';
import { Input, Card, CardBody, Chip } from '@heroui/react';
import SpellService from '../services/spellService';

const SpellSearch = ({ onSelectSpell }) => {
  const [spells, setSpells] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('');
  const [filterSchool, setFilterSchool] = useState('');
  const [filterRitual, setFilterRitual] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSpells = async () => {
      try {
        const data = await SpellService.getAllSpells();
        setSpells(data);
      } catch (error) {
        console.error('Failed to load spells:', error);
        setSpells([]);
      } finally {
        setLoading(false);
      }
    };
    loadSpells();
  }, []);

  const filteredSpells = spells.filter(spell => {
    const matchesSearch = spell.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        spell.school.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = !filterLevel || spell.level === parseInt(filterLevel, 10);
    const matchesSchool = !filterSchool || spell.school === filterSchool;
    const matchesRitual = filterRitual === '' || spell.ritual === (filterRitual === 'true');
    return matchesSearch && matchesLevel && matchesSchool && matchesRitual;
  });

  const uniqueSchools = [...new Set(spells.map(s => s.school))];
  const levels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  if (loading) return <div>Loading spells...</div>;

  return (
    <div className="spell-search-container">
      <div className="search-filters">
        <Input
          type="text"
          placeholder="Search spells..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="sm"
          width="100%"
        />
        <div className="filter-row">
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="filter-select"
            aria-label="Filter by level"
          >
            <option value="">All Levels</option>
            {levels.map(l => (
              <option key={l} value={l}>Level {l}</option>
            ))}
          </select>
          <select
            value={filterSchool}
            onChange={(e) => setFilterSchool(e.target.value)}
            className="filter-select"
            aria-label="Filter by school"
          >
            <option value="">All Schools</option>
            {uniqueSchools.map(school => (
              <option key={school} value={school}>{school}</option>
            ))}
          </select>
          <select
            value={filterRitual}
            onChange={(e) => setFilterRitual(e.target.value)}
            className="filter-select"
            aria-label="Filter by ritual"
          >
            <option value="">All</option>
            <option value="true">Ritual Only</option>
            <option value="false">No Rituals</option>
          </select>
        </div>
      </div>

      <div className="spell-list">
        {filteredSpells.map(spell => (
          <Card
            key={spell.name}
            isPressable
            onPress={() => onSelectSpell && onSelectSpell(spell)}
            className="spell-card"
          >
            <CardBody>
              <div className="spell-header">
                <h4 className="spell-name">{spell.name}</h4>
                <Chip size="sm" variant="flat">Lv. {spell.level}</Chip>
                {spell.ritual && <Chip size="sm" color="primary" variant="flat">Ritual</Chip>}
              </div>
              <div className="spell-meta">
                <span>{spell.school}</span>
                <span>{spell.castingTime}</span>
                <span>Range: {spell.range}</span>
              </div>
              <p className="spell-snippet">{spell.description.substring(0, 100)}...</p>
            </CardBody>
          </Card>
        ))}
      </div>

      {filteredSpells.length === 0 && (
        <div className="no-results">
          <p>No spells found matching your filters.</p>
        </div>
      )}
    </div>
  );
};

export default SpellSearch;