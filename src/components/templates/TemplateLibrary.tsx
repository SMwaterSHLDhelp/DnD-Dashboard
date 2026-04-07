import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button } from '@heroui/react';
import { Sword, Map, Users, Scroll, Ghost, Compass, Database, History, Dice5, BookOpen } from 'lucide-react';
import { TemplateCard } from './TemplateCard';

interface Template {
  id: string;
  title: string;
  description: string;
  icon: any;
  category: 'combat' | 'exploration' | 'narrative' | 'utility';
}

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

export const TemplateLibrary: React.FC = () => {
  const handleSelect = (id: string) => {
    console.log('Selected template:', id);
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