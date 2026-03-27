import React, { useState, useEffect } from 'react';

const LootForm = ({ item, onSave, onCancel, onDelete }) => {
  const [formData, setFormData] = useState(
    item || {
      name: '',
      quantity: 1,
      type: 'consumable',
      rarity: 'common',
      gold: 0,
      silver: 0,
      copper: 0,
      description: ''
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' || name === 'gold' || name === 'silver' || name === 'copper' ? parseInt(value, 10) || 0 : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="loot-form">
      <div className="form-header">
        <h3>{item ? 'Edit Loot Item' : 'Add New Loot Item'}</h3>
        <button type="button" onClick={onCancel} className="cancel-btn">
          Cancel
        </button>
      </div>

      <div className="form-group">
        <label htmlFor="name">Item Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., Magic Sword"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="quantity">Quantity</label>
        <input
          id="quantity"
          name="quantity"
          type="number"
          min="1"
          value={formData.quantity}
          onChange={handleChange}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="consumable">Consumable</option>
            <option value="weapon">Weapon</option>
            <option value="armor">Armor</option>
            <option value="wondrous">Wondrous Item</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="rarity">Rarity</label>
          <select
            id="rarity"
            name="rarity"
            value={formData.rarity}
            onChange={handleChange}
          >
            <option value="common">Common</option>
            <option value="uncommon">Uncommon</option>
            <option value="rare">Rare</option>
            <option value="very-rare">Very Rare</option>
            <option value="legendary">Legendary</option>
            <option value="artifacts">Artifact</option>
          </select>
        </div>
      </div>

      <div className="form-group currency-group">
        <label>Currency Value</label>
        <div className="currency-inputs">
          <div>
            <label htmlFor="gold">Gold</label>
            <input
              id="gold"
              name="gold"
              type="number"
              min="0"
              value={formData.gold}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="silver">Silver</label>
            <input
              id="silver"
              name="silver"
              type="number"
              min="0"
              value={formData.silver}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="copper">Copper</label>
            <input
              id="copper"
              name="copper"
              type="number"
              min="0"
              value={formData.copper}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the item's properties and effects..."
        />
      </div>

      <div className="form-actions">
        {item && (
          <button type="button" onClick={() => onDelete(item.id)} className="delete-btn">
            Delete Item
          </button>
        )}
        <button type="submit" className="save-btn">
          {item ? 'Save Changes' : 'Add Item'}
        </button>
      </div>
    </form>
  );
};

export default LootForm;