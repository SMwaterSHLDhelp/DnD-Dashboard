import React, { useState, useEffect } from 'react';

const LootForm = ({ item, onSave, onCancel, onDelete }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'misc', // misc, weapon, armor, consumable, magic, quest
    rarity: 'common', // common, uncommon, rare, very rare, legendary
    quantity: 1,
    value: {
      gold: 0,
      silver: 0,
      copper: 0,
    },
    assignedTo: '', // character name or party
    location: '', // where found
    sessionAcquired: '',
    isMagicItem: false,
    isConsumed: false,
    powerLevel: 1, // 1-20 scale for balance tracking
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || '',
        description: item.description || '',
        type: item.type || 'misc',
        rarity: item.rarity || 'common',
        quantity: item.quantity || 1,
        value: item.value || { gold: 0, silver: 0, copper: 0 },
        assignedTo: item.assignedTo || '',
        location: item.location || '',
        sessionAcquired: item.sessionAcquired || '',
        isMagicItem: item.isMagicItem || false,
        isConsumed: item.isConsumed || false,
        powerLevel: item.powerLevel || 1,
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData((prev) => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleValueChange = (currency, value) => {
    setFormData((prev) => ({
      ...prev,
      value: {
        ...prev.value,
        [currency]: parseInt(value) || 0,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      onDelete(item._id);
    }
  };

  const totalValueInGold = () => {
    const { gold, silver, copper } = formData.value;
    return gold + (silver / 10) + (copper / 100);
  };

  return (
    <form onSubmit={handleSubmit} className="loot-form">
      <h2>{item ? 'Edit Loot Item' : 'Add New Loot Item'}</h2>

      <div className="form-group">
        <label htmlFor="name">Item Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="e.g., Flaming Longsword, Potion of Healing"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Brief description of the item"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="type">Item Type:</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="misc">Miscellaneous</option>
            <option value="weapon">Weapon</option>
            <option value="armor">Armor</option>
            <option value="consumable">Consumable</option>
            <option value="magic">Magic Item</option>
            <option value="quest">Quest Item</option>
            <option value="treasure">Treasure/Gold</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="rarity">Rarity:</label>
          <select
            id="rarity"
            name="rarity"
            value={formData.rarity}
            onChange={handleChange}
          >
            <option value="common">Common</option>
            <option value="uncommon">Uncommon</option>
            <option value="rare">Rare</option>
            <option value="veryrare">Very Rare</option>
            <option value="legendary">Legendary</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="0"
          />
        </div>
      </div>

      <h3>Value (in GP equivalent: {totalValueInGold().toFixed(2)} gp)</h3>
      <div className="value-grid">
        <div className="value-item">
          <label htmlFor="gold">Gold (gp):</label>
          <input
            type="number"
            id="gold"
            value={formData.value.gold}
            onChange={(e) => handleValueChange('gold', e.target.value)}
            min="0"
          />
        </div>
        <div className="value-item">
          <label htmlFor="silver">Silver (sp):</label>
          <input
            type="number"
            id="silver"
            value={formData.value.silver}
            onChange={(e) => handleValueChange('silver', e.target.value)}
            min="0"
          />
          <small>1gp = 10sp</small>
        </div>
        <div className="value-item">
          <label htmlFor="copper">Copper (cp):</label>
          <input
            type="number"
            id="copper"
            value={formData.value.copper}
            onChange={(e) => handleValueChange('copper', e.target.value)}
            min="0"
          />
          <small>1gp = 100cp</small>
        </div>
      </div>

      <h3>Assignment & Tracking</h3>
      <div className="form-group">
        <label htmlFor="assignedTo">Assigned To:</label>
        <input
          type="text"
          id="assignedTo"
          name="assignedTo"
          value={formData.assignedTo}
          onChange={handleChange}
          placeholder="Character name or 'Party'"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="location">Location Found:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g., Dragon's hoard, Shop"
          />
        </div>

        <div className="form-group">
          <label htmlFor="sessionAcquired">Session Acquired:</label>
          <input
            type="text"
            id="sessionAcquired"
            name="sessionAcquired"
            value={formData.sessionAcquired}
            onChange={handleChange}
            placeholder="e.g., Session 5"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="isMagicItem"
              checked={formData.isMagicItem}
              onChange={handleChange}
            />
            Magic Item
          </label>
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="isConsumed"
              checked={formData.isConsumed}
              onChange={handleChange}
            />
            Consumed/Used
          </label>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="powerLevel">Power Level (1-20): {formData.powerLevel}</label>
        <input
          type="range"
          id="powerLevel"
          name="powerLevel"
          value={formData.powerLevel}
          onChange={handleChange}
          min="1"
          max="20"
          className="power-slider"
        />
        <div className="power-labels">
          <span>Low</span>
          <span>High</span>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="save-btn">Save Item</button>
        {item && (
          <button type="button" onClick={handleDelete} className="delete-btn">
            Delete Item
          </button>
        )}
        <button type="button" onClick={onCancel} className="cancel-btn">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default LootForm;
