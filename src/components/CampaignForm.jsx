import React, { useState, useEffect } from 'react';
import { Button, Input, Textarea, Card, CardBody, CardFooter, CardHeader, Spacer } from '@heroui/react';

function CampaignForm({ initialData, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    world: '',
    theme: '',
    factions: [],
    status: 'active'
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        world: initialData.world || '',
        theme: initialData.theme || '',
        factions: initialData.factions || [],
        status: initialData.status || 'active'
      });
    }
  }, [initialData]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: initialData?.id || null,
      ...formData
    });
  };

  return (
    <Card isPressable>
      <CardHeader>
        <h3 className="text-xl font-bold">
          {initialData ? 'Edit Campaign' : 'New Campaign'}
        </h3>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          <Input
            label="Campaign Name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Enter campaign name"
            isRequired
          />

          <Textarea
            label="Description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Campaign overview"
          />

          <Input
            label="World Name"
            value={formData.world}
            onChange={(e) => handleChange('world', e.target.value)}
            placeholder="World setting"
          />

          <Input
            label="Theme"
            value={formData.theme}
            onChange={(e) => handleChange('theme', e.target.value)}
            placeholder="Tone and style"
          />

          <Input
            label="Factions"
            value={formData.factions.join(', ')}
            onChange={(e) =>
              handleChange(
                'factions',
                e.target.value.split(',').map((f) => f.trim())
              )
            }
            placeholder="Factions (comma-separated)"
          />
        </div>
      </CardBody>
      <CardFooter>
        <Button variant="flat" onClick={onCancel} className="mr-2">
          Cancel
        </Button>
        <Button color="primary" onClick={handleSubmit}>
          {initialData ? 'Update Campaign' : 'Create Campaign'}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default CampaignForm;