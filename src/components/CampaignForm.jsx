import React from 'react';
import { Input, Textarea, Button, Card, CardBody, CardFooter } from '@heroui/react';
import { Plus } from 'lucide-react';

function CampaignForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    setting: '',
    campaignType: 'D&D 5e'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    setFormData({ title: '', description: '', setting: '', campaignType: 'D&D 5e' });
  };

  return (
    <Card className="mb-4">
      <CardBody>
        <form onSubmit={handleSubmit}>
          <Input
            label="Campaign Title"
            placeholder="Enter campaign name"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="mb-3"
            isRequired
          />
          <Input
            label="Setting"
            placeholder="World or campaign setting"
            value={formData.setting}
            onChange={(e) => setFormData({ ...formData, setting: e.target.value })}
            className="mb-3"
          />
          <Textarea
            label="Description"
            placeholder="Campaign overview, main plot points, etc."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mb-3"
            minRows={3}
          />
          <div className="flex justify-end gap-2">
            <Button type="button" onClick={onCancel} color="default">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              <Plus size={16} className="mr-1" />
              Add Campaign
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}

export default CampaignForm;
