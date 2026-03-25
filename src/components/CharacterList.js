import React from 'react';
import CharacterDetail from './CharacterDetail';

const CharacterList = ({ characters, onEdit, onDelete, onSelect }) => {
  const [selectedCharacter, setSelectedCharacter] = React.useState(null);

  if (characters.length === 0) {
    return (
      <div className="empty-state">
        <p>No characters found. <a href="#" onClick={(e) => e.preventDefault()}>Add your first character</a>.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {characters.map(character => (
        <div
          key={character.id}
          className="border rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div className="cursor-pointer" onClick={() => setSelectedCharacter(character)}>
              <h3 className="font-semibold">
                {character.playerName} - {character.characterName}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Level {character.level || 1} {character.class || 'Classless'} ({character.race || 'Unknown Race'})
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(character)}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(character.id)}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
          {character.backstory && (
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
              {character.backstory}
            </p>
          )}
          {character.questThreads && (
            <div className="mt-2">
              <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 py-1 rounded">
                Quest: {character.questThreads}
              </span>
            </div>
          )}
        </div>
      ))}

      {selectedCharacter && (
        <CharacterDetail
          character={selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
          onSave={(updatedCharacter) => {
            onEdit(updatedCharacter);
            setSelectedCharacter(null);
          }}
        />
      )}
    </div>
  );
};

export default CharacterList;