import React, { useState } from 'react';

const NPCDetail = ({ npc, onClose, onSave }) => {
  const [formData, setFormData] = useState(npc);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setIsEditing(false);
  };

  if (!npc) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold">{formData.name}</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm"
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1 bg-red-500 text-white rounded text-sm"
            >
              Close
            </button>
          </div>
        </div>

        <div className="p-6">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Class/Role</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role || ''}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description || ''}
                  onChange={handleChange}
                  rows={3}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Motivation</label>
                <textarea
                  name="motivation"
                  value={formData.motivation || ''}
                  onChange={handleChange}
                  rows={2}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status || 'alive'}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="alive">Alive</option>
                  <option value="deceased">Deceased</option>
                  <option value="unknown">Unknown</option>
                  <option value="missing">Missing</option>
                </select>
              </div>

              <div className="flex justify-end gap-2">
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-sm text-gray-600 dark:text-gray-400">Description</h3>
                <p className="whitespace-pre-wrap">{formData.description || 'No description'}</p>
              </div>

              <div>
                <h3 className="font-semibold text-sm text-gray-600 dark:text-gray-400">Motivation</h3>
                <p className="whitespace-pre-wrap">{formData.motivation || 'Unknown'}</p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <h3 className="font-semibold text-sm text-gray-600 dark:text-gray-400">Role</h3>
                  <p>{formData.role || 'N/A'}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-gray-600 dark:text-gray-400">Status</h3>
                  <p>{formData.status || 'Unknown'}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-gray-600 dark:text-gray-400">Relationship</h3>
                  <p>{formData.relationship || 'Neutral'}</p>
                </div>
              </div>

              {formData.notes && (
                <div>
                  <h3 className="font-semibold text-sm text-gray-600 dark:text-gray-400">Notes</h3>
                  <p className="whitespace-pre-wrap">{formData.notes}</p>
                </div>
              )}

              {/* Stat block simulation for RPG reference */}
              {formData.hp || formData.ac || formData.cr && (
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded border">
                  <h3 className="font-semibold text-sm text-gray-600 dark:text-gray-400 mb-2">Combat Stats</h3>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">AC:</span> {formData.ac || '-'}
                    </div>
                    <div>
                      <span className="text-gray-500">HP:</span> {formData.hp || '-'}
                    </div>
                    <div>
                      <span className="text-gray-500">CR:</span> {formData.cr || '-'}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NPCDetail;