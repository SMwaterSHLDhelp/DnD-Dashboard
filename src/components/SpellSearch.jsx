import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader } from '@heroui/react';

// Mock spell data (would be replaced with real API data)
const MOCK_SPELLS = [
  {
    id: 1,
    name: "Magic Missile",
    level: 1,
    school: "Evocation",
    castTime: "1 action",
    range: "120 feet",
    components: "V, S, M",
    duration: "Instantaneous",
    description: "You create three glowing darts of magical force. Each dart hits a creature of your choice that you can see within range. A dart deals 1d4+1 force damage to its target.",
    higherLevel: "When you cast this spell using a spell slot of 2nd level or higher, you create one additional dart for each slot level above 1st."
  },
  {
    id: 2,
    name: "Fireball",
    level: 3,
    school: "Evocation",
    castTime: "1 action",
    range: "150 feet",
    components: "V, S, M",
    duration: "Instantaneous",
    description: "A streak of flame crackles across the space, igniting flammable objects and dealing damage to creatures in the area.",
    higherLevel: "When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for each slot level above 3rd."
  },
  {
    id: 3,
    name: "Heal",
    level: 6,
    school: "Necromancy",
    castTime: "1 action",
    range: "60 feet",
    components: "V, S",
    duration: "Instantaneous",
    description: "Fresh healing energy flows into the creature you touch. The creature regains all hit points.",
    higherLevel: "None."
  },
  {
    id: 4,
    name: "Sleep",
    level: 1,
    school: "Enchantment",
    castTime: "1 action",
    range: "90 feet",
    components: "V, S, M",
    duration: "1 minute",
    description: "This spell sends creatures into a magical slumber. Roll 5d8 — the total is how many hit points of creatures this spell can affect. Creatures within 20 feet of an effect point, arranged in any way you choose, try to affect in order of their current hit points, weakest creatures first.",
    higherLevel: "When you cast this spell using a spell slot of 2nd level or higher, increase the total hit points by 2d8 for each slot level above 1st."
  }
];

const SpellSearch = ({ searchTerm }) => {
  const [spells, setSpells] = useState([]);
  const [selectedSpell, setSelectedSpell] = useState(null);

  useEffect(() => {
    // Filter spells based on search term
    if (!searchTerm || searchTerm.trim() === '') {
      setSpells(MOCK_SPELLS);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = MOCK_SPELLS.filter(spell =>
        spell.name.toLowerCase().includes(term) ||
        spell.description.toLowerCase().includes(term) ||
        spell.school.toLowerCase().includes(term)
      );
      setSpells(filtered);
    }
  }, [searchTerm]);

  return (
    <div className="spell-search-container">
      <div className="spell-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {spells.map(spell => (
          <Card
            key={spell.id}
            className={`spell-card cursor-pointer transition-all ${selectedSpell?.id === spell.id ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => setSelectedSpell(spell)}
          >
            <CardHeader className="spell-header">
              <h4 className="font-bold text-lg">{spell.name}</h4>
              <div className="spell-meta flex gap-2 text-sm text-gray-600">
                <span>{spell.school}</span>
                <span>Level {spell.level}</span>
              </div>
            </CardHeader>
            <CardBody className="spell-preview">
              <p className="text-sm">{spell.description.substring(0, 100)}...</p>
            </CardBody>
          </Card>
        ))}
      </div>

      {selectedSpell && (
        <div className="spell-detail-panel mt-6">
          <Card>
            <CardHeader className="spell-detail-header">
              <h3 className="text-2xl font-bold">{selectedSpell.name}</h3>
              <div className="spell-detail-meta flex flex-wrap gap-4 text-sm">
                <span>Level {selectedSpell.level} {selectedSpell.school}</span>
                <span>Casting Time: {selectedSpell.castTime}</span>
                <span>Range: {selectedSpell.range}</span>
                <span>Components: {selectedSpell.components}</span>
                <span>Duration: {selectedSpell.duration}</span>
              </div>
            </CardHeader>
            <CardBody className="spell-detail-body">
              <div className="spell-description">
                <h4 className="font-semibold mb-1">Description</h4>
                <p>{selectedSpell.description}</p>
              </div>

              {selectedSpell.higherLevel && (
                <div className="higher-level mt-4">
                  <h4 className="font-semibold mb-1">At Higher Levels</h4>
                  <p>{selectedSpell.higherLevel}</p>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      )}

      {spells.length === 0 && (
        <div className="no-results text-center py-8">
          <p>No spells found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default SpellSearch;