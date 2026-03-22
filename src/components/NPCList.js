import React from 'react';

const NPCList = ({ npcs, onEdit, onDelete }) => {
  if (npcs.length === 0) {
    return <p>No NPCs found.</p>;
  }

  return (
    <div className="npc-list">
      <h2>NPCs</h2>
      <ul>
        {npcs.map((npc) => (
          <li key={npc.id} className="npc-item">
            <div className="npc-header">
              <h3>{npc.name}</h3>
              <span className={`status ${npc.status}`}>{npc.status}</span>
            </div>
            <p className="npc-description">{npc.description}</p>
            <div className="npc-actions">
              <button onClick={() => onEdit(npc)}>Edit</button>
              <button onClick={() => onDelete(npc.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NPCList;