import React, { useState } from 'react';

const CharacterDetail = ({ character, onClose, onSave }) => {
  const [formData, setFormData] = useState(character);
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

  if (!character) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {formData.playerName} - {formData.characterName}
          </h2>
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
                  <label className="block text-sm font-medium mb-1">Player Name</label>
                  <input
                    type="text"
                    name="playerName"
                    value={formData.playerName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Character Name</label>
                  <input
                    type="text"
                    name="characterName"
                    value={formData.characterName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Class</label>
                  <input
                    type="text"
                    name="class"
                    value={formData.class || ''}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Race</label>
                  <input
                    type="text"
                    name="race"
                    value={formData.race || ''}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Level</label>
                  <input
                    type="number"
                    name="level"
                    value={formData.level || 1}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Backstory</label>
                <textarea
                  name="backstory"
                  value={formData.backstory || ''}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Quest Threads</label>
                <textarea
                  name="questThreads"
                  value={formData.questThreads || ''}
                  onChange={handleChange}
                  rows={2}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-sm text-gray-600 dark:text-gray-400">Player</h3>
                  <p>{formData.playerName}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-gray-600 dark:text-gray-400">Character</h3>
                  <p>{formData.characterName}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h3 className="font-semibold text-sm text-gray-600 dark:text-gray-400">Class</h3>
                  <p>{formData.class || 'N/A'}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-gray-600 dark:text-gray-400">Race</h3>
                  <p>{formData.race || 'N/A'}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-gray-600 dark:text-gray-400">Level</h3>
                  <p>{formData.level || 1}</p>
                </div>
              </div>

              {formData.backstory && (
                <div>
                  <h3 className="font-semibold text-sm text-gray-600 dark:text-gray-400 mb-2">Backstory</h3>
                  <p className="whitespace-pre-wrap">{formData.backstory}</p>
                </div>
              )}

              {formData.questThreads && (
                <div>
                  <h3 className="font-semibold text-sm text-gray-600 dark:text-gray-400 mb-2">Quest Threads</h3>
                  <p className="whitespace-pre-wrap">{formData.questThreads}</p>
                </div>
              )}

              {/* Character stat simulation */}
              <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded border">
                <h3 className="font-semibold text-sm text-gray-600 dark:text-gray-400 mb-2">Character Stats</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">AC:</span> {formData.ac || '—'}
                  </div>
                  <div>
                    <span className="text-gray-500">Init:</span> {formData.init || '—'}
                  </div>
                  <div>
                    <span className="text-gray-500">Speed:</span> {formData.speed || '—'}
                  </div>
                  <div>
                    <span className="text-gray-500">Proficiency:</span> {formData.proficiency || '—'}
                  </div>
                </div>
              </div>

              {/* Personal Secrets (DM only) */}
              <div className="border border-yellow-300/20 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded">
                <h3 className="font-semibold text-sm text-yellow-700 dark:text-yellow-500 mb-2">Secrets (DM Only)</h3>
                <p className="text-sm text-yellow-800 dark:text-yellow-600">
                  {formData.secret || 'No personal secrets set.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;