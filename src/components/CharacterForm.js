import React, { useState } from 'react';

const CharacterForm = ({ character, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: character?.name || '',
    race: character?.race || '',
    class: character?.class || '',
    level: character?.level || 1,
    backstory: character?.backstory || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="character-form">
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Race:</label>
        <input
          type="text"
          name="race"
          value={formData.race}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Class:</label>
        <input
          type="text"
          name="class"
          value={formData.class}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Level:</label>
        <input
          type="number"
          name="level"
          value={formData.level}
          onChange={handleChange}
          min="1"
        />
      </div>
      <div>
        <label>Backstory:</label>
        <textarea
          name="backstory"
          value={formData.backstory}
          onChange={handleChange}
        />
      </div>
      <div className="form-actions">
        <button type="submit">Save Character</button>
        <button type="button" onClick={onCancel} className="cancel-btn">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CharacterForm;