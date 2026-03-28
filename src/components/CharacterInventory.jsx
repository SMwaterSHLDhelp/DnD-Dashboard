import React from 'react';

const CharacterInventory = ({ items = [], gold = 0 }) => {
  const totalWeight = items.reduce((sum, item) => sum + (item.weight || 0), 0);

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Inventory</h2>
      
      <div className="mb-4">
        <h3 className="font-semibold text-yellow-600 dark:text-yellow-400">Gold: {gold} GP</h3>
      </div>
      
      <div className="mb-4">
        <h3 className="font-semibold">Items ({items.length})</h3>
        <p className="text-sm text-gray-500">Total Weight: {totalWeight} lbs</p>
      </div>
      
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex justify-between text-sm border-b dark:border-gray-600 pb-1">
            <span>{item.name || 'Unknown Item'}</span>
            <span className="text-gray-500">
              {item.quantity ? `x${item.quantity} ` : ''}
              {item.weight ? `${item.weight} lbs` : ''}
            </span>
          </li>
        ))}
      </ul>
      
      {items.length === 0 && (
        <p className="text-sm text-gray-500 italic">No items in inventory</p>
      )}
    </div>
  );
};

export default CharacterInventory;
