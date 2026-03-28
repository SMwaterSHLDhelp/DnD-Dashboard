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

        {!isEditing ? (
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Player Name</label>
                <p className="font-semibold">{formData.playerName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Character Name</label>
                <p className="font-semibold">{formData.characterName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Race</label>
                <p className="font-semibold">{formData.race}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Class</label>
                <p className="font-semibold">{formData.class}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Level</label>
                <p className="font-semibold">{formData.level}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Hit Points</label>
                <p className="font-semibold">{formData.hitPoints}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Backstory</label>
              <p className="mt-1">{formData.backstory || 'No backstory provided.'}</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Player Name</label>
                <input
                  name="playerName"
                  value={formData.playerName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Character Name</label>
                <input
                  name="characterName"
                  value={formData.characterName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Race</label>
                <input
                  name="race"
                  value={formData.race}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Class</label>
                <input
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Level</label>
                <input
                  name="level"
                  type="number"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Hit Points</label>
                <input
                  name="hitPoints"
                  type="number"
                  value={formData.hitPoints}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Backstory</label>
              <textarea
                name="backstory"
                value={formData.backstory}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CharacterDetail;