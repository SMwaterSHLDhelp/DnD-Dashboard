import React from 'react';

const NPCList = ({ npcs, onEdit, onDelete }) => {
  if (npcs.length === 0) {
    return (
      <div className="empty-state">
        <p>No NPCs found. <a href="#" onClick={(e) => e.preventDefault()}>Add your first NPC</a>.</p>
      </div>
    );
  }

  return (
    <div className="npc-list">
      <h2>NPCs</h2>
      <div className="npc-grid">
        {npcs.map((npc) => (
          <div key={npc._id} className="npc-card">
            <h3>{npc.name}</h3>
            <p className="npc-status">{npc.status}</p>
            <p className="npc-description">{npc.description}</p>
            <div className="npc-stats">
              <span>STR: {npc.stats.strength}</span>
              <span>DEX: {npc.stats.dexterity}</span>
              <span>CON: {npc.stats.constitution}</span>
              <span>INT: {npc.stats.intelligence}</span>
              <span>WIS: {npc.stats.wisdom}</span>
              <span>CHA: {npc.stats.charisma}</span>
            </div>
            <div className="npc-combat">
              <span>AC: {npc.combat.armorClass}</span>
              <span>HP: {npc.combat.hitPoints}</span>
              <span>Speed: {npc.combat.speed}</span>
              <span>Init: {npc.combat.initiative}</span>
            </div>
            <div className="npc-sessions">
              <strong>Sessions:</strong> {npc.sessions.length > 0 ? npc.sessions.join(', ') : 'None'}
            </div>
            <div className="npc-actions">
              <button onClick={() => onEdit(npc)}>Edit</button>
              <button onClick={() => onDelete(npc._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NPCList;