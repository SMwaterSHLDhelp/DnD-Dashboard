import React, { useState, useEffect } from 'react';
import LootForm from './LootForm';

const LootTracker = () => {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('dnd_loot_items');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Calculate totals
  const totals = items.reduce(
    (acc, item) => {
      acc.gold += item.gold || 0;
      acc.silver += item.silver || 0;
      acc.copper += item.copper || 0;
      acc.totalInGold += (item.gold || 0) + (item.silver || 0) / 10 + (item.copper || 0) / 100;
      return acc;
    },
    { gold: 0, silver: 0, copper: 0, totalInGold: 0 }
  );

  useEffect(() => {
    localStorage.setItem('dnd_loot_items', JSON.stringify(items));
  }, [items]);

  const handleSave = (item) => {
    if (editingItem) {
      setItems(
        items.map((i) => (i.id === item.id ? { ...item, id: item.id } : i))
      );
    } else {
      setItems([...items, { ...item, id: Date.now().toString() }]);
    }
    setShowForm(false);
    setEditingItem(null);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const formatCurrency = (gold, silver, copper) => {
    const parts = [];
    if (gold > 0) parts.push(`${gold}gp`);
    if (silver > 0) parts.push(`${silver}sp`);
    if (copper > 0) parts.push(`${copper}cp`);
    return parts.length > 0 ? parts.join(', ') : '—';
  };

  if (showForm) {
    return (
      <div className="loot-tracker">
        <LootForm
          item={editingItem}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingItem(null);
          }}
          onDelete={handleDelete}
        />
      </div>
    );
  }

  return (
    <div className="loot-tracker">
      <div className="loot-header">
        <h2>🎒 Loot & Inventory</h2>
        <button onClick={() => setShowForm(true)} className="add-item-btn">
          + Add Item
        </button>
      </div>

      {/* Balance Dashboard */}
      <div className="balance-dashboard">
        <div className="balance-card total-balance">
          <h3>Total Party Wealth</h3>
          <div className="balance-amount">
            <span className="gold-value">{totals.totalInGold.toFixed(2)} gp</span>
          </div>
          <div className="currency-breakdown">
            {formatCurrency(totals.gold, totals.silver, totals.copper)}
          </div>
        </div>
      </div>

      {/* Items List */}
      <div className="items-list">
        {items.length === 0 ? (
          <p className="empty-state">No loot items recorded yet.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="item-card">
              <h4>{item.name}</h4>
              <p className="item-details">
                {item.quantity} × {item.type || 'Item'} • {item.rarity || 'Common'}
              </p>
              <div className="item-notes">
                {item.description && <p>{item.description}</p>}
              </div>
              <div className="item-actions">
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LootTracker;