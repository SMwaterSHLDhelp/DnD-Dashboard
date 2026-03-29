import React from 'react';
import { Input, Select, SelectItem, Button, Card, CardBody, CardFooter } from '@heroui/react';
import { Plus, Shield, Sword } from 'lucide-react';

function CombatForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = React.useState({
    name: '',
    type: 'npc',
    initiative: '',
    hp: '',
    ac: '',
    conditions: []
  });

  const types = ['player', 'npc', 'monster'];
  const conditionOptions = [
    'Blinded', 'Charmed', 'Deafened', 'Frightened', 'Grappled',
    'Incapacitated', 'Invisible', 'Paralyzed', 'Petrified', 'Poisoned',
    'Prone', 'Restrained', 'Stunned', 'Unconscious'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      currentHp: formData.hp,
      maxHp: formData.hp
    });
    setFormData({
      name: '',
      type: 'npc',
      initiative: '',
      hp: '',
      ac: '',
      conditions: []
    });
  };

  const toggleCondition = (condition) => {
    setFormData({
      ...formData,
      conditions: formData.conditions.includes(condition)
        ? formData.conditions.filter(c => c !== condition)
        : [...formData.conditions, condition]
    });
  };

  return (
    <Card className="mb-4">
      <CardBody>
        <form onSubmit={handleSubmit}>
          <Input
            label="Combatant Name"
            placeholder="Enter combatant name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mb-3"
            isRequired
          />
          <Select
            label="Type"
            placeholder="Select combatant type"
            className="mb-3"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            {types.map((type) => (
              <SelectItem key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </SelectItem>
            ))}
          </Select>
          <div className="flex gap-3">
            <Input
              label="Initiative"
              type="number"
              value={formData.initiative}
              onChange={(e) => setFormData({ ...formData, initiative: e.target.value })}
              className="mb-3 w-1/2"
              placeholder="D20 roll + modifier"
            />
            <Input
              label="HP"
              type="number"
              min="1"
              value={formData.hp}
              onChange={(e) => setFormData({ ...formData, hp: e.target.value })}
              className="mb-3 w-1/2"
            />
          </div>
          <Input
            label="AC"
            type="number"
            min="10"
            value={formData.ac}
            onChange={(e) => setFormData({ ...formData, ac: e.target.value })}
            className="mb-3"
          />
          <div className="mb-3">
            <p className="mb-2 text-sm font-medium">Conditions:</p>
            <div className="grid grid-cols-4 gap-2">
              {conditionOptions.map((condition) => (
                <Button
                  key={condition}
                  size="sm"
                  variant={formData.conditions.includes(condition) ? 'solid' : 'bordered'}
                  color={formData.conditions.includes(condition) ? 'danger' : 'default'}
                  onClick={() => toggleCondition(condition)}
                  className="text-xs"
                >
                  {condition}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" onClick={onCancel} color="default">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              <Plus size={16} className="mr-1" />
              Add Combatant
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}

export default CombatForm;
