import React, { useState, useMemo } from 'react';
import LootForm from './LootForm';

const LootTracker = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all'); // all, unassigned, magic, consumed
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [sortBy, setSortBy] = useState('name'); // name, value, rarity, powerLevel
  const [showPowerReport, setShowPowerReport] = useState(false);

  // Calculate totals
  const totals = useMemo(() => {
    const activeItems = items.filter(item => !item.isConsumed);
    return {
      gold: activeItems.reduce((sum, item) => sum + (item.value?.gold || 0), 0),
      silver: activeItems.reduce((sum, item) => sum + (item.value?.silver || 0), 0),
      copper: activeItems.reduce((sum, item) => sum + (item.value?.copper || 0), 0),
      totalInGold: activeItems.reduce((sum, item) => {
        return sum + (item.value?.gold || 0) + 
               ((item.value?.silver || 0) / 10) + 
               ((item.value?.copper || 0) / 100);
      }, 0),
      itemCount: activeItems.length,
      magicItemCount: activeItems.filter(item => item.isMagicItem).length,
      averagePowerLevel: activeItems.length > 0 
        ? (activeItems.reduce((sum, item) => sum + (item.powerLevel || 1), 0) / activeItems.length).toFixed(1)
        : 0,
    };
  }, [items]);

  // Calculate party balance (gold per character)
  const partyBalance = useMemo(() => {
    const activeItems = items.filter(item => !item.isConsumed);
    const characterTotals = {};
    
    activeItems.forEach(item => {
      const owner = item.assignedTo || 'Unassigned';
      if (!characterTotals[owner]) {
        characterTotals[owner] = { gold: 0, silver: 0, copper: 0, items: 0, powerLevel: 0 };
      }
      characterTotals[owner].gold += item.value?.gold || 0;
      characterTotals[owner].silver += item.value?.silver || 0;
      characterTotals[owner].copper += item.value?.copper || 0;
      characterTotals[owner].items += item.quantity || 1;
      characterTotals[owner].powerLevel += (item.powerLevel || 1) * (item.quantity || 1);
    });

    Object.keys(characterTotals).forEach(owner => {
      const ct = characterTotals[owner];
      ct.totalInGold = ct.gold + (ct.silver / 10) + (ct.copper / 100);
      ct.averagePowerLevel = ct.items > 0 ? (ct.powerLevel / ct.items).toFixed(1) : 0;
    });

    return characterTotals;
  }, [items]);

  // Power level distribution
  const powerDistribution = useMemo(() => {
    const activeItems = items.filter(item => !item.isConsumed);
    const distribution = {
      low: { min: 1, max: 5, count: 0, value: 0 },
      medium: { min: 6, max: 10, count: 0, value: 0 },
      high: { min: 11, max: 15, count: 0, value: 0 },
      epic: { min: 16, max: 20, count: 0, value: 0 },
    };

    activeItems.forEach(item => {
      const power = item.powerLevel || 1;
      const itemValue = (item.value?.gold || 0) + 
                        ((item.value?.silver || 0) / 10) + 
                        ((item.value?.copper || 0) / 100);
      
      if (power <= 5) {
        distribution.low.count += item.quantity || 1;
        distribution.low.value += itemValue * (item.quantity || 1);
      } else if (power <= 10) {
        distribution.medium.count += item.quantity || 1;
        distribution.medium.value += itemValue * (item.quantity || 1);
      } else if (power <= 15) {
        distribution.high.count += item.quantity || 1;
        distribution.high.value += itemValue * (item.quantity || 1);
      } else {
        distribution.epic.count += item.quantity || 1;
        distribution.epic.value += itemValue * (item.quantity || 1);
      }
    });

    return distribution;
  }, [items]);

  // Filter and sort items
  const filteredItems = useMemo(() => {
    let result = [...items];

    // Apply filter
    switch (filter) {
      case 'unassigned':
        result = result.filter(item => !item.assignedTo || item.assignedTo === '');
        break;
      case 'magic':
        result = result.filter(item => item.isMagicItem && !item.isConsumed);
        break;
      case 'consumed':
        result = result.filter(item => item.isConsumed);
        break;
      default:
        break;
    }

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(item => 
        item.name?.toLowerCase().includes(term) ||
        item.description?.toLowerCase().includes(term) ||
        item.assignedTo?.toLowerCase().includes(term) ||
        item.location?.toLowerCase().includes(term)
      );
    }

    // Apply sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'value':
          const valueA = (a.value?.gold || 0) + ((a.value?.silver || 0) / 10) + ((a.value?.copper || 0) / 100);
          const valueB = (b.value?.gold || 0) + ((b.value?.silver || 0) / 10) + ((b.value?.copper || 0) / 100);
          return valueB - valueA;
        case 'rarity':
          const rarityOrder = { legendary: 0, veryrare: 1, rare: 2, uncommon: 3, common: 4 };
          return (rarityOrder[a.rarity] || 4) - (rarityOrder[b.rarity] || 4);
        case 'powerLevel':
          return (b.powerLevel || 1) - (a.powerLevel || 1);
        default:
          return (a.name || '').localeCompare(b.name || '');
      }
    });

    return result;
  }, [items, filter, searchTerm, sortBy]);

  const handleSave = (formData) => {
    if (editingItem) {
      setItems(items.map(item => 
        item._id === editingItem._id 
          ? { ...formData, _id: editingItem._id, updatedAt: new Date().toISOString() }
          : item
      ));
    } else {
      setItems([...items, { ...formData, _id: Date.now().toString(), createdAt: new Date().toISOString() }]);
    }
    setShowForm(false);
    setEditingItem(null);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setItems(items.filter(item => item._id !== id));
    setShowForm(false);
    setEditingItem(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  const getRarityClass = (rarity) => {
    const classes = {
      common: 'rarity-common',
      uncommon: 'rarity-uncommon',
      rare: 'rarity-rare',
      veryrare: 'rarity-very-rare',
      legendary: 'rarity-legendary',
    };
    return classes[rarity] || classes.common;
  };

  const getItemIcon = (type) => {
    const icons = {
      weapon: '⚔️',
      armor: '🛡️',
      consumable: '🧪',
      magic: '✨',
      quest: '📜',
      treasure: '💰',
      misc: '📦',
    };
    return icons[type] || icons.misc;
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
          onCancel={handleCancel}
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

        <div className="balance-card">
          <h3>Item Summary</h3>
          <div className="stat-row">
            <span>Active Items:</span>
            <strong>{totals.itemCount}</strong>
          </div>
          <div className="stat-row">
            <span>Magic Items:</span>
            <strong>{totals.magicItemCount}</strong>
          </div>
          <div className="stat-row">
            <span>Avg Power Level:</span>
            <strong>{totals.averagePowerLevel}</strong>
          </div>
        </div>

        <div className="balance-card">
          <h3>Quick Stats</h3>
          <div className="stat-row">
            <span>Characters:</span>
            <strong>{Object.keys(partyBalance).length}</strong>
          </div>
          <div className="stat-row">
            <span>Low Power (1-5):</span>
            <strong>{powerDistribution.low.count}</strong>
          </div>
          <div className="stat-row">
            <span>Epic (16-20):</span>
            <strong>{powerDistribution.epic.count}</strong>
          </div>
        </div>
      </div>

      {/* Power Level Report */}
      <div className="power-report-toggle">
        <button 
          onClick={() => setShowPowerReport(!showPowerReport)}
          className="toggle-report-btn"
        >
          {showPowerReport ? '▼ Hide' : '▶ Show'} Power Balance Report
        </button>
      </div>

      {showPowerReport && (
        <div className="power-report">
          <h3>📊 Power Level Distribution</h3>
          <div className="power-distribution">
            <div className="power-tier">
              <span className="tier-label">Low (1-5)</span>
              <div className="tier-bar">
                <div 
                  className="tier-fill low"
                  style={{ width: `${Math.min(100, (powerDistribution.low.count / totals.itemCount) * 100)}%` }}
                />
              </div>
              <span className="tier-count">{powerDistribution.low.count} items</span>
              <span className="tier-value">{powerDistribution.low.value.toFixed(0)} gp</span>
            </div>
            <div className="power-tier">
              <span className="tier-label">Medium (6-10)</span>
              <div className="tier-bar">
                <div 
                  className="tier-fill medium"
                  style={{ width: `${Math.min(100, (powerDistribution.medium.count / totals.itemCount) * 100)}%` }}
                />
              </div>
              <span className="tier-count">{powerDistribution.medium.count} items</span>
              <span className="tier-value">{powerDistribution.medium.value.toFixed(0)} gp</span>
            </div>
            <div className="power-tier">
              <span className="tier-label">High (11-15)</span>
              <div className="tier-bar">
                <div 
                  className="tier-fill high"
                  style={{ width: `${Math.min(100, (powerDistribution.high.count / totals.itemCount) * 100)}%` }}
                />
              </div>
              <span className="tier-count">{powerDistribution.high.count} items</span>
              <span className="tier-value">{powerDistribution.high.value.toFixed(0)} gp</span>
            </div>
            <div className="power-tier">
              <span className="tier-label">Epic (16-20)</span>
              <div className="tier-bar">
                <div 
                  className="tier-fill epic"
                  style={{ width: `${Math.min(100, (powerDistribution.epic.count / totals.itemCount) * 100)}%` }}
                />
              </div>
              <span className="tier-count">{powerDistribution.epic.count} items</span>
              <span className="tier-value">{powerDistribution.epic.value.toFixed(0)} gp</span>
            </div>
          </div>

          <h3>👥 Character Balance</h3>
          <div className="character-balance-grid">
            {Object.entries(partyBalance).map(([character, data]) => (
              <div key={character} className="character-balance-card">
                <h4>{character}</h4>
                <div className="char-stat">
                  <span>Total Value:</span>
                  <strong>{data.totalInGold.toFixed(2)} gp</strong>
                </div>
                <div className="char-stat">
                  <span>Items:</span>
                  <strong>{data.items}</strong>
                </div>
                <div className="char-stat">
                  <span>Avg Power:</span>
                  <strong>{data.averagePowerLevel}</strong>
                </div>
                <div className="char-currency">
                  {formatCurrency(data.gold, data.silver, data.copper)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="loot-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-controls">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Items</option>
            <option value="unassigned">Unassigned</option>
            <option value="magic">Magic Items</option>
            <option value="consumed">Consumed/Used</option>
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="name">Sort by Name</option>
            <option value="value">Sort by Value</option>
            <option value="rarity">Sort by Rarity</option>
            <option value="powerLevel">Sort by Power Level</option>
          </select>
        </div>
      </div>

      {/* Items List */}
      <div className="items-list">
        {filteredItems.length === 0 ? (
          <div className="empty-state">
            <p>No items found. Add your first loot item!</p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <div 
              key={item._id} 
              className={`item-card ${getRarityClass(item.rarity)} ${item.isConsumed ? 'consumed' : ''}`}
              onClick={() => handleEdit(item)}
            >
              <div className="item-header">
                <span className="item-icon">{getItemIcon(item.type)}</span>
                <span className="item-name">{item.name}</span>
                {item.isMagicItem && <span className="magic-badge">✨</span>}
                {item.isConsumed && <span className="consumed-badge">✓</span>}
              </div>
              <div className="item-details">
                <span className="item-rarity">{item.rarity}</span>
                <span className="item-type">{item.type}</span>
                {item.quantity > 1 && <span className="item-quantity">×{item.quantity}</span>}
              </div>
              <div className="item-value">
                {formatCurrency(item.value?.gold, item.value?.silver, item.value?.copper)}
              </div>
              <div className="item-meta">
                <span className="item-power">Power: {item.powerLevel}</span>
                {item.assignedTo && <span className="item-owner">→ {item.assignedTo}</span>}
              </div>
              {item.description && (
                <div className="item-description">{item.description}</div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LootTracker;
