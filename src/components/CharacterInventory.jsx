import React, { useState } from 'react';

const CharacterInventory = ({ character, onClose, onItemsChange }) => {
  const [items, setItems] = useState(character?.inventory || []);
  const [gold, setGold] = useState(character?.gold || 0);
  const [newItem, setNewItem] = useState({ name: '', quantity: 1, note: '' });

  const addItem = (e) => {
    e.preventDefault();
    if (!newItem.name.trim()) return;
    
    const newItemEntry = {
      id: Date.now(),
      ...newItem
    };
    setItems(prev => [...prev, newItemEntry]);
    setNewItem({ name: '', quantity: 1, note: '' });
  };

  const removeItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateItem = (id, field, value) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleSave = () => {
    onItemsChange({ items, gold });
  };

  if (!character) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Inventory Management</h2>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Close
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Gold</label>
            <input
              type="number"
              value={gold}
              onChange={(e) => setGold(Number(e.target.value))}
              className="w-32 px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Current Items</h3>
            {items.length === 0 ? (
              <p className="text-gray-500 italic">No items in inventory.</p>
            ) : (
              <div className="space-y-2">
                {items.map(item => (
                  <div key={item.id} className="flex items-center gap-2 p-2 border rounded dark:border-gray-600">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                      className="w-16 px-2 py-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                      min="1"
                    />
                    <span className="flex-1">{item.name}</span>
                    {item.note && (
                      <span className="text-sm text-gray-500">({item.note})</span>
                    )}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={addItem} className="p-4 border rounded dark:border-gray-600 space-y-2">
            <h3 className="font-semibold">Add Item</h3>
            <div className="flex gap-2">
              <input
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                placeholder="Item name"
                className="flex-1 px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              />
              <input
                type="number"
                value={newItem.quantity}
                onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
                className="w-16 px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                min="1"
              />
              <input
                value={newItem.note}
                onChange={(e) => setNewItem({ ...newItem, note: e.target.value })}
                placeholder="Note (optional)"
                className="flex-1 px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Add
              </button>
            </div>
          </form>

          <div className="flex justify-end gap-2 pt-4 border-t dark:border-gray-600">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterInventory;