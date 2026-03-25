import React, { useState } from 'react';
import { Card, CardBody, CardHeader, CardFooter, Button } from '@heroui/react';

const CharacterList = ({ characters, onEdit, onDelete, onSelect }) => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  if (characters.length === 0) {
    return (
      <div className="empty-state">
        <p>No characters found. <a href="#" onClick={(e) => e.preventDefault()}>Add your first character</a>.</p>
      </div>
    );
  }

  return (
    <div className="character-list">
      {characters.map((character) => (
        <Card
          key={character.id || character.name}
          isHoverable
          isPressable
          onClick={() => {
            setSelectedCharacter(character);
            if (onSelect) onSelect(character.id || character.name);
          }}
        >
          <CardHeader>
            <h3>{character.name || 'Unnamed Character'}</h3>
            <small>{character.class && character.level ? `${character.class} ${character.level}` : 'Class/Level unknown'}</small>
          </CardHeader>
          <CardBody>
            <p>{character.backstory || 'No backstory'}</p>
            {character.race && <p><strong>Race:</strong> {character.race}</p>}
            {character.class && <p><strong>Class:</strong> {character.class}</p>}
            {character.level && <p><strong>Level:</strong> {character.level}</p>}
          </CardBody>
          <CardFooter>
            <Button size="sm" variant="flat" color="primary" onClick={(e) => {
              e.stopPropagation();
              if (onEdit) onEdit(character);
            }}>
              Edit
            </Button>
            <Button size="sm" variant="flat" color="danger" onClick={(e) => {
              e.stopPropagation();
              if (onDelete) onDelete(character);
            }}>
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default CharacterList;