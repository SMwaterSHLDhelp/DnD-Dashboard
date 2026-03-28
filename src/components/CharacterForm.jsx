import React from 'react';

const CharacterForm = ({ character, onSave, onClose }) => {
  const [formData, setFormData] = React.useState(character || {
    playerName: '',
    characterName: '',
    race: '',
    class: '',
    level: 1,
    backstory: '',
    hitPoints: 10,
    attributes: {}
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!onClose) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-2xl font-bold">
              {character ? 'Edit Character' : 'New Character'}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Close
            </button>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Player Name</label>
                <input
                  name="playerName"
                  value={formData.playerName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Character Name</label>
                <input
                  name="characterName"
                  value={formData.characterName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
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
                  min="1"
                  value={formData.level}
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
          </div>
          <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {character ? 'Update Character' : 'Create Character'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CharacterForm;