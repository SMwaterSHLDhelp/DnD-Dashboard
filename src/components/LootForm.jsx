import React from 'react';
import { Input, Button, Card, CardBody, CardFooter } from '@heroui/react';
import { Plus } from 'lucide-react';

function LootForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = React.useState({
    name: '',
    type: 'item',
    count: '1',
    value: '',
    description: ''
  });

  const types = ['Gold', 'Gem', 'Jewelry', 'Art Object', 'Magic Item', 'Other'];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    setFormData({
      name: '',
      type: 'Gold',
      count: '1',
      value: '',
      description: ''
    });
  };

  return (
    <Card className="mb-4">
      <CardBody>
        <form onSubmit={handleSubmit}>
          <Input
            label="Item Name"
            placeholder="Enter item name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mb-3"
            isRequired
          />
          <Select
            label="Type"
            placeholder="Select item type"
            className="mb-3"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            {types.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </Select>
          <div className="flex gap-3">
            <Input
              label="Count"
              type="number"
              min="1"
              value={formData.count}
              onChange={(e) => setFormData({ ...formData, count: e.target.value })}
              className="mb-3 w-1/2"
            />
            <Input
              label="Value (GP)"
              type="number"
              min="0"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              className="mb-3 w-1/2"
            />
          </div>
          <Input
            label="Description"
            placeholder="Item details, rarity, etc."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mb-3"
          />
          <div className="flex justify-end gap-2">
            <Button type="button" onClick={onCancel} color="default">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              <Plus size={16} className="mr-1" />
              Add Loot
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}

export default LootForm;
