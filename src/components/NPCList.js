import React, { useState } from 'react';
import { Card, CardBody, CardHeader, CardFooter, Button } from '@heroui/react';

const NPCList = ({ npcs, onEdit, onDelete, onSelect }) => {
  const [selectedNPC, setSelectedNPC] = useState(null);

  if (npcs.length === 0) {
    return (
      <div className="empty-state">
        <p>No NPCs found. <a href="#" onClick={(e) => e.preventDefault()}>Add your first NPC</a>.</p>
      </div>
    );
  }

  return (
    <div className="npc-list">
      {npcs.map((npc) => (
        <Card
          key={npc.id || npc.name}
          isHoverable
          isPressable
          onClick={() => {
            setSelectedNPC(npc);
            if (onSelect) onSelect(npc.id || npc.name);
          }}
        >
          <CardHeader>
            <h3>{npc.name || 'Unknown NPC'}</h3>
            <small>{npc.status || 'Status unknown'}</small>
          </CardHeader>
          <CardBody>
            <p>{npc.description || 'No description'}</p>
            <p><strong>Motivation:</strong> {npc.motivation || 'Unknown'}</p>
          </CardBody>
          <CardFooter>
            <Button size="sm" variant="flat" color="primary" onClick={(e) => {
              e.stopPropagation();
              if (onEdit) onEdit(npc);
            }}>
              Edit
            </Button>
            <Button size="sm" variant="flat" color="danger" onClick={(e) => {
              e.stopPropagation();
              if (onDelete) onDelete(npc);
            }}>
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default NPCList;