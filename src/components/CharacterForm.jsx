import React, { useState } from 'react';

const CharacterForm = ({ onSave, initialData = {} }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    race: initialData.race || '',
    class: initialData.class || '',
    level: initialData.level || 1,
    hp: initialData.hp || 10,
    ac: initialData.ac || 10,
    backstory: initialData.backstory || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Character Sheet</h2>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Character Name"
          value={formData.name}
          onChange={handleChange}
          className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        />
        <input
          type="text"
          name="race"
          placeholder="Race"
          value={formData.race}
          onChange={handleChange}
          className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        />
        <input
          type="text"
          name="class"
          placeholder="Class"
          value={formData.class}
          onChange={handleChange}
          className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        />
        <input
          type="number"
          name="level"
          placeholder="Level"
          value={formData.level}
          onChange={handleChange}
          className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        />
        <input
          type="number"
          name="hp"
          placeholder="Hit Points"
          value={formData.hp}
          onChange={handleChange}
          className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        />
        <input
          type="number"
          name="ac"
          placeholder="Armor Class"
          value={formData.ac}
          onChange={handleChange}
          className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        />
      </div>
      <textarea
        name="backstory"
        placeholder="Backstory"
        value={formData.backstory}
        onChange={handleChange}
        className="mt-4 p-2 w-full border rounded dark:bg-gray-700 dark:border-gray-600"
        rows={3}
      />
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Save Character
      </button>
    </form>
  );
};

export default CharacterForm;
