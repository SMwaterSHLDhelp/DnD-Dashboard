import React from 'react';

const CharacterList = ({ characters, onEdit, onDelete }) => {
  if (characters.length === 0) {
    return <p>No characters found.</p>;
  }

  return (
    <div className="character-list">
      <h2>Characters</h2>
      <ul>
        {characters.map((character) => (
          <li key={character.id} className="character-item">
            <div className="character-header">
              <h3>{character.characterName}</h3>
              <p>Player: {character.playerName}</p>
            </div>
            <p className="character-class-race">{character.class} of {character.race} (Level {character.level})</p>
            <div className="character-actions">
              <button onClick={() => onEdit(character)}>Edit</button>
              <button onClick={() => onDelete(character.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterList;