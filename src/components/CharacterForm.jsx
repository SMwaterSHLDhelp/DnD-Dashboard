import React from 'react';
import { Input, Select, SelectItem, Button, Card, CardBody, CardFooter } from '@heroui/react';
import { Plus } from 'lucide-react';

function CharacterForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = React.useState({
    name: '',
    player: '',
    race: '',
    class: '',
    level: '1',
    hp: '',
    ac: '',
    notes: ''
  });

  const races = ['Human', 'Elf', 'Dwarf', 'Halfling', 'Dragonborn', 'Gnome', 'Tiefling', 'Half-Elf', 'Half-Orc'];
  const classes = ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard'];

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
      player: '',
      race: '',
      class: '',
      level: '1',
      hp: '',
      ac: '',
      notes: ''
    });
  };

  return (
    <Card className="mb-4">
      <CardBody>
        <form onSubmit={handleSubmit}>
          <Input
            label="Character Name"
            placeholder="Enter character name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mb-3"
            isRequired
          />
          <Input
            label="Player"
            placeholder="Enter player name"
            value={formData.player}
            onChange={(e) => setFormData({ ...formData, player: e.target.value })}
            className="mb-3"
            isRequired
          />
          <Select
            label="Race"
            placeholder="Select a race"
            className="mb-3"
            value={formData.race}
            onChange={(e) => setFormData({ ...formData, race: e.target.value })}
          >
            {races.map((race) => (
              <SelectItem key={race} value={race}>
                {race}
              </SelectItem>
            ))}
          </Select>
          <Select
            label="Class"
            placeholder="Select a class"
            className="mb-3"
            value={formData.class}
            onChange={(e) => setFormData({ ...formData, class: e.target.value })}
          >
            {classes.map((cls) => (
              <SelectItem key={cls} value={cls}>
                {cls}
              </SelectItem>
            ))}
          </Select>
          <div className="flex gap-3">
            <Input
              label="Level"
              type="number"
              min="1"
              max="20"
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: e.target.value })}
              className="mb-3 w-1/2"
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
          <div className="flex gap-3">
            <Input
              label="AC"
              type="number"
              min="10"
              value={formData.ac}
              onChange={(e) => setFormData({ ...formData, ac: e.target.value })}
              className="mb-3 w-1/2"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" onClick={onCancel} color="default">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              <Plus size={16} className="mr-1" />
              Add Character
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}

export default CharacterForm;
