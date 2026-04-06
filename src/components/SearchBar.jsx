import React, { useState, useEffect, useMemo } from 'react';
import { Input, Modal, Button, Chip } from '@heroui/react';

const SearchBar = ({ 
  data = {}, 
  onSearch = () => {}, 
  onResultClick = () => {}
}) => {
  const [query, setQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (query.trim().length < 2) {
      setFilteredResults([]);
      return;
    }

    const searchTerm = query.toLowerCase();
    const results = [];

    // Search NPCs
    if (data.npcs?.length > 0) {
      data.npcs.forEach(npc => {
        const matchName = npc.name?.toLowerCase().includes(searchTerm);
        const matchDesc = npc.description?.toLowerCase().includes(searchTerm);
        const matchNotes = npc.notes?.toLowerCase().includes(searchTerm);
        
        if (matchName || matchDesc || matchNotes) {
          results.push({
            type: 'NPC',
            id: npc.id,
            name: npc.name || 'Unknown NPC',
            match: matchName ? 'Name' : matchDesc ? 'Description' : 'Notes',
            details: npc
          });
        }
      });
    }

    // Search Characters
    if (data.characters?.length > 0) {
      data.characters.forEach(character => {
        const matchName = character.name?.toLowerCase().includes(searchTerm);
        const matchClass = character.class?.toLowerCase().includes(searchTerm);
        const matchRace = character.race?.toLowerCase().includes(searchTerm);
        const matchNotes = character.notes?.toLowerCase().includes(searchTerm);
        const matchBackstory = character.backstory?.toLowerCase().includes(searchTerm);
        
        if (matchName || matchClass || matchRace || matchNotes || matchBackstory) {
          results.push({
            type: 'Character',
            id: character.id,
            name: character.name || 'Unknown Character',
            match: matchName ? 'Name' : matchClass ? 'Class' : matchRace ? 'Race' : matchNotes ? 'Notes' : 'Backstory',
            details: character
          });
        }
      });
    }

    // Search Campaign/Lore
    if (data.campaign?.lore?.length > 0) {
      data.campaign.lore.forEach(lore => {
        const matchTitle = lore.title?.toLowerCase().includes(searchTerm);
        const matchContent = lore.content?.toLowerCase().includes(searchTerm);
        const matchType = lore.type?.toLowerCase().includes(searchTerm);
        
        if (matchTitle || matchContent || matchType) {
          results.push({
            type: 'Lore',
            id: lore.id,
            name: lore.title || 'Unknown Lore',
            match: matchTitle ? 'Title' : matchContent ? 'Content' : 'Type',
            details: lore
          });
        }
      });
    }

    // Search Sessions
    if (data.sessions?.length > 0) {
      data.sessions.forEach(session => {
        const matchTitle = session.title?.toLowerCase().includes(searchTerm);
        const matchNotes = session.sessionNotes?.toLowerCase().includes(searchTerm);
        const matchPlot = session.plotHooks?.toLowerCase().includes(searchTerm);
        
        if (matchTitle || matchNotes || matchPlot) {
          results.push({
            type: 'Session',
            id: session.id,
            name: session.title || 'Unknown Session',
            match: matchTitle ? 'Title' : matchNotes ? 'Notes' : 'Plot Hooks',
            details: session
          });
        }
      });
    }

    // Search Inventory
    if (data.inventory?.items?.length > 0) {
      data.inventory.items.forEach((item, index) => {
        const matchName = item.name?.toLowerCase().includes(searchTerm);
        const matchType = item.type?.toLowerCase().includes(searchTerm);
        
        if (matchName || matchType) {
          results.push({
            type: 'Item',
            id: `item-${index}`,
            name: item.name || 'Unknown Item',
            match: matchName ? 'Name' : 'Type',
            details: item,
            owner: data.inventory.characterName
          });
        }
      });
    }

    // Search Sessions notes and encounters
    if (data.sessions?.length > 0) {
      data.sessions.forEach(session => {
        if (session.encounterNotes) {
          const matchEncounter = session.encounterNotes.toLowerCase().includes(searchTerm);
          if (matchEncounter) {
            results.push({
              type: 'Encounter',
              id: `encounter-${session.id}`,
              name: `Encounter from ${session.title || 'Unknown Session'}`,
              match: 'Encounter Notes',
              details: session
            });
          }
        }
      });
    }

    // Deduplicate results
    const uniqueResults = Array.from(new Map(results.map(item => [item.id + '-' + item.type, item])).values());
    setFilteredResults(uniqueResults);
    onSearch(uniqueResults);
  }, [query, data, onSearch]);

  const handleResultClick = (result) => {
    onResultClick(result);
    setQuery('');
    setFilteredResults([]);
    setShowModal(false);
    setIsModalOpen(false);
  };

  return (
    <div className="relative w-full max-w-md">
      <Input
        placeholder="Search across all modules..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full"
        size="md"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && query.length >= 2) {
            setShowModal(true);
            setIsModalOpen(true);
          }
        }}
      />
      
      <Modal isOpen={showModal} onClose={() => { setShowModal(false); setIsModalOpen(false); }}>
        <div className="p-4">
          <h3 className="text-lg font-bold mb-4">Search Results for "{query}"</h3>
          
          {filteredResults.length === 0 ? (
            <p className="text-gray-500">No results found</p>
          ) : (
            <div className="max-h-96 overflow-y-auto">
              {filteredResults.map((result, index) => (
                <div 
                  key={`${result.id}-${index}`} 
                  onClick={() => handleResultClick(result)}
                  className="mb-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-lg">{result.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <Chip size="sm" variant="flat" className="mr-2">
                          {result.type}
                        </Chip>
                        {result.match && (
                          <span className="text-xs text-gray-500">
                            Matched in {result.match}
                          </span>
                        )}
                      </div>
                    </div>
                    {result.details && result.details.status && (
                      <Chip size="sm" variant="flat" className="text-xs">
                        {result.details.status}
                      </Chip>
                    )}
                  </div>
                  {result.details?.notes && (
                    <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                      {result.details.notes.substring(0, 200)}
                      {result.details.notes.length > 200 ? '...' : ''}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-4 flex justify-end">
            <Button onClick={() => { setShowModal(false); setIsModalOpen(false); }}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SearchBar;