import React, { useState } from 'react';

const CampaignForm = ({ campaign, onSave, onCancel, onDelete }) => {
  const [formData, setFormData] = useState({
    title: campaign?.title || '',
    description: campaign?.description || '',
    setting: campaign?.setting || '',
    status: campaign?.status || 'Active',
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
    <form onSubmit={handleSubmit} className="campaign-form">
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
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
        <label>Setting:</label>
        <input
          type="text"
          name="setting"
          value={formData.setting}
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
          <option value="Active">Active</option>
          <option value="On Hold">On Hold</option>
          <option value="Completed">Completed</option>
          <option value="Abandoned">Abandoned</option>
        </select>
      </div>
      <div className="form-actions">
        <button type="submit">Save Campaign</button>
        <button type="button" onClick={onCancel} className="cancel-btn">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CampaignForm;