import React, { useState, useEffect } from 'react';

const NPCForm = ({ npc, onSave, onCancel, onDelete }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    motivation: '',
    status: 'alive',
    stats: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    },
    combat: {
      armorClass: 10,
      hitPoints: 10,
      speed: 30,
      initiative: 0,
    },
    sessions: [],
  });

  useEffect(() => {
    if (npc) {
      setFormData(npc);
    }
  }, [npc]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStatsChange = (stat, value) => {
    setFormData((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        [stat]: parseInt(value) || 0,
      },
    }));
  };

  const handleCombatChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      combat: {
        ...prev.combat,
        [field]: parseInt(value) || 0,
      },
    }));
  };

  const handleSessionsChange = (e) => {
    const sessions = e.target.value.split(',').map((s) => s.trim()).filter((s) => s);
    setFormData((prev) => ({
      ...prev,
      sessions,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this NPC?')) {
      onDelete(npc._id);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="npc-form">
      <h2>{npc ? 'Edit NPC' : 'Add New NPC'}</h2>

      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="motivation">Motivation:</label>
        <textarea
          id="motivation"
          name="motivation"
          value={formData.motivation}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      <h3>Stats</h3>
      <div className="stats-grid">
        {Object.entries(formData.stats).map(([stat, value]) => (
          <div key={stat} className="stat-item">
            <label htmlFor={`stat-${stat}`}>{stat.charAt(0).toUpperCase() + stat.slice(1)}:</label>
            <input
              type="number"
              id={`stat-${stat}`}
              value={value}
              onChange={(e) => handleStatsChange(stat, e.target.value)}
              min="0"
              max="30"
            />
          </div>
        ))}
      </div>

      <h3>Combat Capabilities</h3>
      <div className="combat-grid">
        <div className="combat-item">
          <label htmlFor="armorClass">Armor Class:</label>
          <input
            type="number"
            id="armorClass"
            value={formData.combat.armorClass}
            onChange={(e) => handleCombatChange('armorClass', e.target.value)}
            min="0"
          />
        </div>
        <div className="combat-item">
          <label htmlFor="hitPoints">Hit Points:</label>
          <input
            type="number"
            id="hitPoints"
            value={formData.combat.hitPoints}
            onChange={(e) => handleCombatChange('hitPoints', e.target.value)}
            min="0"
          />
        </div>
        <div className="combat-item">
          <label htmlFor="speed">Speed:</label>
          <input
            type="number"
            id="speed"
            value={formData.combat.speed}
            onChange={(e) => handleCombatChange('speed', e.target.value)}
            min="0"
          />
        </div>
        <div className="combat-item">
          <label htmlFor="initiative">Initiative:</label>
          <input
            type="number"
            id="initiative"
            value={formData.combat.initiative}
            onChange={(e) => handleCombatChange('initiative', e.target.value)}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="sessions">Sessions (comma separated IDs):</label>
        <input
          type="text"
          id="sessions"
          value={formData.sessions.join(', ')}
          onChange={handleSessionsChange}
          placeholder="e.g., session1, session2, session3"
        />
      </div>

      <div className="form-actions">
        <button type="submit">Save NPC</button>
        {npc && (
          <button type="button" onClick={handleDelete} className="delete-btn">
            Delete NPC
          </button>
        )}
        <button type="button" onClick={onCancel} className="cancel-btn">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NPCForm;
