import React, { useState, useEffect } from 'react';
import { Card, CardBody, Button, Input, Textarea } from '@heroui/react';
import { Plus } from 'lucide-react';

function CampaignForm({ initialData, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    setting: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        setting: initialData.setting || ''
      });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <Card className="mb-4">
      <CardBody>
        <form onSubmit={handleSubmit}>
          <Input
            label="Campaign Title"
            placeholder="Enter campaign name"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="mb-3"
            isRequired
          />
          <Input
            label="Setting"
            placeholder="World or campaign setting"
            value={formData.setting}
            onChange={(e) => handleInputChange('setting', e.target.value)}
            className="mb-3"
          />
          <Textarea
            label="Description"
            placeholder="Campaign overview, main plot points, etc."
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="mb-3"
            minRows={3}
          />
          <div className="flex justify-end gap-2">
            <Button type="button" onClick={onCancel} color="default">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              <Plus size={16} className="mr-1" />
              {initialData ? 'Update Campaign' : 'Add Campaign'}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}

export default CampaignForm;