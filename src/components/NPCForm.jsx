import React from 'react';
import { Input, Select, SelectItem, Button, Card, CardBody, CardFooter } from '@heroui/react';
import { Plus } from 'lucide-react';

function NPCForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = React.useState({
    name: '',
    role: '',
    race: '',
    alignment: '',
    status: 'alive',
    notes: ''
  });

  const statuses = ['alive', 'dead', 'unknown'];
  const alignments = ['Lawful Good', 'Neutral Good', 'Chaotic Good', 'Lawful Neutral', 'True Neutral', 'Chaotic Neutral', 'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'];
  const races = ['Human', 'Elf', 'Dwarf', 'Halfling', 'Dragonborn', 'Gnome', 'Tiefling', 'Half-Elf', 'Half-Orc', 'Orc', 'Goblin', 'Kobold', 'Orc', 'Bugbear', 'Troll'];

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
      role: '',
      race: '',
      alignment: '',
      status: 'alive',
      notes: ''
    });
  };

  return (
    <Card className="mb-4">
      <CardBody>
        <form onSubmit={handleSubmit}>
          <Input
            label="NPC Name"
            placeholder="Enter NPC name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mb-3"
            isRequired
          />
          <Input
            label="Role/Title"
            placeholder="NPC's role in the story"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
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
            label="Alignment"
            placeholder="Select alignment"
            className="mb-3"
            value={formData.alignment}
            onChange={(e) => setFormData({ ...formData, alignment: e.target.value })}
          >
            {alignments.map((align) => (
              <SelectItem key={align} value={align}>
                {align}
              </SelectItem>
            ))}
          </Select>
          <Select
            label="Status"
            placeholder="Select status"
            className="mb-3"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            {statuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </SelectItem>
            ))}
          </Select>
          <div className="flex justify-end gap-2">
            <Button type="button" onClick={onCancel} color="default">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              <Plus size={16} className="mr-1" />
              Add NPC
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}

export default NPCForm;
