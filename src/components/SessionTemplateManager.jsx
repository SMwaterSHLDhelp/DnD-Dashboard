import React from 'react';
import { Card, CardHeader, CardBody, Button, Input, Textarea, Divider } from '@heroui/react';
import { Plus, Copy, Trash2 } from 'lucide-react';

export const SessionTemplateManager = ({ templates, onApplyTemplate, onSaveTemplate, onDeleteTemplate }) => {
  const [newTemplateName, setNewTemplateName] = React.useState('');
  const [isCreating, setIsCreating] = React.useState(false);

  const handleCreateNew = () => {
    if (!newTemplateName.trim()) return;
    setIsCreating(true);
  };

  const handleSaveCustom = () => {
    const newTemp = {
      id: `custom-${Date.now()}`,
      title: newTemplateName,
      description: 'Custom user template',
      category: 'custom',
      icon: () => <div className="w-6 h-6 bg-default-300 rounded" />
    };
    onSaveTemplate(newTemp);
    setNewTemplateName('');
    setIsCreating(false);
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-default-900">Template Manager</h1>
          <p className="text-default-500">Manage and create session planning structures.</p>
        </div>
        <Button 
          color="primary" 
          startContent={<Plus size={18} />}
          onClick={() => setIsCreating(true)}
        >
          Create Custom Template
        </Button>
      </div>

      {isCreating && (
        <Card className="border-2 border-primary/20">
          <CardHeader className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">New Template Configuration</h3>
            <Button isIconOnly size="sm" variant="light" onClick={() => setIsCreating(false)}>
              <Trash2 size={18} />
            </Button>
          </CardHeader>
          <CardBody className="space-y-4">
            <Input 
              label="Template Name"
              placeholder="e.g., Dungeon Crawl Setup"
              value={newTemplateName}
              onChange={(e) => setNewTemplate className(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button variant="flat" onClick={() => setIsCreating(false)}>Cancel</Button>
              <Button color="primary" onClick={handleSaveCustom}>Save Template</Button>
            </div>
          </CardBody>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-none bg-default-50">
          <CardHeader className="font-bold text-lg">Available Presets</CardHeader>
          <CardBody className="space-y-2">
            {templates.map(t => (
              <div key={t.id} className="flex justify-between items-center p-2 hover:bg-default-200 rounded-lg transition-colors">
                <span className="text-sm">{t.title}</span>
                <Button size="sm" variant="light" onPress={() => onApplyTemplate(t.id)}>
                  <Copy size={16} />
                </Button>
              </div>
            ))}
          </CardBody>
        </Card>

        <Card className="border-none bg-default-50">
          <CardHeader className="font-bold text-lg">Your Custom Templates</Card</Header>
          <CardBody className="space-y-2">
            {templates.filter(t => t.id.startsWith('custom-')).length === 0 ? (
              <p className="text-sm text-default-400 italic">No custom templates created yet.</p>
            ) : (
              templates.filter(t => t.id.startsWith('custom-')).map(t => (
                <div key={t.id} className="flex justify-between items-center p-2 hover:bg-default-200 rounded-lg transition-colors">
                  <span className="text-sm">{t.title}</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="light" onPress={() => onApplyTemplate(t.id)}>
                      <Copy size={16} />
                    </Button>
                    <Button size="sm" variant="light" color="danger" onPress={() => onDeleteTemplate(t.id)}>
                      <Trash2 size={16} />
                    </nButton>
                  </div>
                </div>
              ))
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
