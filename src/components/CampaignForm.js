import React, { useState } from 'react';

const CampaignForm = ({ onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    theme: initialData?.theme || '',
    factions: initialData?.factions?.join(', ') || '',
    tone: initialData?.tone || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      factions: formData.factions.split(',').map(f => f.trim()).filter(f => f),
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit}>
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
        <label>Theme:</label>
        <input
          type="text"
          name="theme"
          value={formData.theme}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Factions (comma-separated):</label>
        <input
          type="text"
          name="factions"
          value={formData.factions}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Tone:</label>
        <input
          type="text"
          name="tone"
          value={formData.tone}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Save Campaign</button>
    </form>
  );
};

export default CampaignForm;