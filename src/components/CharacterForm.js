import React, { useState } from 'react';

const CharacterForm = ({ onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    playerName: initialData?.playerName || '',
    characterName: initialData?.characterName || '',
    class: initialData?.class || '',
    race: initialData?.race || '',
    level: initialData?.level || 1,
    backstory: initialData?.backstory || '',
    questThreads: initialData?.questThreads || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="character-form">
      <div>
        <label htmlFor="playerName">Player Name:</label>
        <input
          type="text"
          id="playerName"
          name="playerName"
          value={formData.playerName}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="characterName">Character Name:</label>
        <input
          type="text"
          id="characterName"
          name="characterName"
          value={formData.characterName}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="class">Class:</label>
        <input
          type="text"
          id="class"
          name="class"
          value={formData.class}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="race">Race:</label>
        <input
          type="text"
          id="race"
          name="race"
          value={formData.race}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="level">Level:</label>
        <input
          type="number"
          id="level"
          name="level"
          value={formData.level}
          onChange={handleChange}
          min="1"
        />
      </div>

      <div>
        <label htmlFor="backstory">Backstory:</label>
        <textarea
          id="backstory"
          name="backstory"
          value={formData.backstory}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="questThreads">Quest Threads:</label>
        <textarea
          id="questThreads"
          name="questThreads"
          value={formData.questThreads}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Save Character</button>
    </form>
  );
};

export default CharacterForm;