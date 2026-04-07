import React from 'react';
import { Card, CardHeader, CardBody, Button, Divider } from '@heroui/react';
import { Sword, Map, Users, Scroll, Ghost, BookOpen, Database, History, Dice5, Compass } from 'lucide-react';

interface Template {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  category: string;
}

interface TemplateCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  onSelect: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ title, description, icon: Icon, onSelect }) => {
  return (
    <Card className="h-full border-none bg-default-100 shadow-sm">
      <CardHeader className="flex gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="text-primary" size={24} />
        </div>
        <div className="flex flex-col">
          <p className="text-md font-bold">{title}</p>
        </div>
      </CardHeader>
      <Divider className="opacity-50" />
      <CardBody className="py-4">
        <p className="text-small text-default-50/60 mb-4">{description}</p>
        <Button 
          size="sm" 
          variant="flat" 
          color="primary" 
          className="w-full" 
          onPress={onSelect}
        >
          Use Template
        </Button>
      </CardBody>
    </Card>
  );
};

const templates: Template[] = [
  { id: 'combat-enc', title: 'Combat Encounter', description: 'Standard combat setup with initiative and monsters.', icon: Sword, category: 'combat' },
  { id: 'world-map', title: 'Region Overview', description: 'Map focus with key locations and terrain.', icon: Map, category: 'exploration' },
  { id: 'npc-intro', title: 'NPC Introduction', description: 'New NPC details, motivations, and ties.', icon: Users, category: 'narrative' },
  { id: 'plot-hook', title: 'Plot Hook Library', description: 'A collection of hooks to drive the session.', icon: Scroll, category: 'narrative' },
  { id: 'mystery-solve', title: 'Mystery Investigation', description: 'Clue tracking and deduction framework.', icon: Ghost, category: 'exploration' },
  { id: 'lore-dump', title: 'Lore Chronicle', description: 'Detailed history and legend documentation.', icon: BookOpen, category: 'narrative' },
  { id: 'loot-table', title: 'Treasure Hoard', description: 'Randomized loot and magic item distributions.', icon: Database, category: 'utility' },
  { id: 'session-log', title: 'Session Recap', description: 'Timeline and major story milestones.', icon: History, category: 'utility' },
  { id: 'random-gen', title: 'Random Generator', description: 'Quick generators for names, weather, and more.', icon: Dice5, category: 'utility' },
  { id: 'travel-log', title: 'Traveler Guide', description: 'Tracking distance, weather, and encounters.', icon: Compass, category: 'exploration' },
];

export const TemplateLibrary: React.FC<{ onTemplateSelect: (id: string) => void }> = ({ onTemplateSelect }) => {
  const handleSelect = (id: string) => {
    onTemplateSelect(id);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-default-900">Session Planning Templates</h1>
        <p className="text-default-500">Quickly setup your next session with pre-built structures.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            title={template.title}
            description={template.description}
            icon={template.icon}
            onSelect={() => handleSelect(template.id)}
          />
        ))}
      </div>
    </div>
  );
};
