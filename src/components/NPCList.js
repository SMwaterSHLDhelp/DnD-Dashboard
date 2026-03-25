import React from 'react';
import NPCDetail from './NPCDetail';

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
    <div className="space-y-3">
      {npcs.map(npc => (
        <div
          key={npc.id}
          className="border rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div className="cursor-pointer" onClick={() => setSelectedNPC(npc)}>
              <h3 className="font-semibold">{npc.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {npc.role || 'Unknown Role'} • {npc.status || 'Status unknown'}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(npc)}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(npc.id)}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
          {npc.description && (
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
              {npc.description}
            </p>
          )}
          <div className="mt-2 flex gap-2">
            <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
              {npc.motivation || 'No motivation set'}
            </span>
            <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
              {npc.relationship || 'Neutral'}
            </span>
          </div>
        </div>
      ))}

      {selectedNPC && (
        <NPCDetail
          npc={selectedNPC}
          onClose={() => setSelectedNPC(null)}
          onSave={(updatedNPC) => {
            onEdit(updatedNPC);
            setSelectedNPC(null);
          }}
        />
      )}
    </div>
  );
};

export default NPCList;