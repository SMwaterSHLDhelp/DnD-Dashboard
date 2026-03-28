import { useState } from 'react';
import { Card, CardBody, CardHeader, Input, Select, SelectItem, Button } from '@heroui/react';

export default function LootView() {
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({
    name: '',
    type: 'weapon',
    value: 0,
    description: ''
  });

  const handleAddItem = () => {
    if (currentItem.name) {
      setItems([...items, { ...currentItem, id: Date.now() }]);
      setCurrentItem({ name: '', type: 'weapon', value: 0, description: '' });
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Loot & Inventory</h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <Input
              label="Item Name"
              value={currentItem.name}
              onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
            />
            <Select
              label="Item Type"
              value={currentItem.type}
              onChange={(e) => setCurrentItem({ ...currentItem, type: e.target.value })}
            >
              <SelectItem key="weapon" value="weapon">Weapon</SelectItem>
              <SelectItem key="armor" value="armor">Armor</SelectItem>
              <SelectItem key="consumable" value="consumable">Consumable</SelectItem>
              <SelectItem key="wondrous" value="wondrous">Wondrous Item</SelectItem>
              <SelectItem key="currency" value="currency">Currency/Gold</SelectItem>
            </Select>
            <Input
              type="number"
              label="Value (GP)"
              value={currentItem.value}
              onChange={(e) => setCurrentItem({ ...currentItem, value: parseInt(e.target.value) || 0 })}
            />
            <Input
              label="Description"
              value={currentItem.description}
              onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
            />
            <Button onPress={handleAddItem} color="primary">Add Item</Button>
          </div>

          {items.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Inventory</h3>
              <div className="space-y-2">
                {items.map(item => (
                  <Card key={item.id}>
                    <CardBody>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold">{item.name}</h4>
                          <p className="text-sm text-gray-500">Type: {item.type} | Value: {item.value} GP</p>
                          <p className="text-sm">{item.description}</p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}