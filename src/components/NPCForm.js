import React, { useState } from 'react';

const NPCForm = ({ npc, onSave, onCancel, onDelete }) => {
  const [formData, setFormData] = useState({
    name: npc?.name || '',
    description: npc?.description || '',
    role: npc?.role || '',
    status: npc?.status || 'Alive',
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
    <form onSubmit={handleSubmit} className="npc-form">
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
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Role:</label>
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Status:</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="Unknown">Unknown</option>
        </select>
      </div>
      <div className="form-actions">
        <button type="submit">Save NPC</button>
        <button type="button" onClick={onCancel} className="cancel-btn">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NPCForm;