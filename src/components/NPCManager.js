import React, { useState } from 'react';
import NPCList from './NPCList';
import NPCForm from './NPCForm';

const NPCManager = ({ npcs, addNPC, updateNPC }) => {
  const [editingNPC, setEditingNPC] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleAdd = (npc) => {
    addNPC(npc);
    setEditingNPC(null);
    setShowForm(false);
  };

  const handleUpdate = (npc) => {
    updateNPC(npc.id || npc._id, npc);
    setEditingNPC(null);
    setShowForm(false);
  };

  const handleEdit = (npc) => {
    setEditingNPC(npc);
    setShowForm(true);
  };

  const handleDelete = (npc) => {
    if (window.confirm('Are you sure you want to delete this NPC?')) {
      updateNPC(npc.id || npc._id, { deleted: true });
    }
  };

  const handleCancel = () => {
    setEditingNPC(null);
    setShowForm(false);
  };

  const activeNPCs = npcs.filter(n => !n.deleted);

  return (
    <div className="npc-manager">
      <div className="npc-header">
        <h2>NPCs</h2>
        <button 
          onClick={() => { setEditingNPC(null); setShowForm(true); }}
          className="add-npc-btn"
        >
          + New NPC
        </button>
      </div>

      {showForm ? (
        <NPCForm
          npc={editingNPC}
          onSave={editingNPC ? handleUpdate : handleAdd}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
      ) : (
        <NPCList
          npcs={activeNPCs}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default NPCManager;
