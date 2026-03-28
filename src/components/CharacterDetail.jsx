import React from 'react';

const CharacterDetail = ({ character }) => {
  if (!character) return null;

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-bold mb-2">{character.name}</h2>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <p><strong>Race:</strong> {character.race || 'Unknown'}</p>
        <p><strong>Class:</strong> {character.class || 'Unknown'}</p>
        <p><strong>Level:</strong> {character.level || 1}</p>
        <p><strong>HP:</strong> {character.hp || 10}</p>
        <p><strong>AC:</strong> {character.ac || 10}</p>
      </div>
      {character.backstory && (
        <div className="mt-4">
          <h3 className="font-semibold">Backstory</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{character.backstory}</p>
        </div>
      )}
      {character.quest && (
        <div className="mt-4">
          <h3 className="font-semibold text-green-600 dark:text-green-400">Personal Quest</h3>
          <p className="text-sm">{character.quest}</p>
        </div>
      )}
    </div>
  );
};

export default CharacterDetail;
