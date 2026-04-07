import { Card, CardHeader, CardBody, CardFooter, Image, Button } from '@heroui/react';
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface TemplateCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onSelect: () => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ title, description, icon: Icon, onSelect }) => {
  return (
    <Card className="max-w-[300px] border-none bg-content1 shadow-lg">
      <CardHeader className="flex gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Icon className="text-primary" size={24} />
        </div>
        <div className="flex flex-col">
          <p className="text-md font-bold">{title}</p>
        </div>
      </CardHeader>
      <CardBody>
        <p className="text-small text-default-500">{description}</p>
      </CardBody>
      <CardFooter>
        <Button size="sm" variant="flat" color="primary" onPress={onSelect}>
          Use Template
        </crumb>
      </CardFooter>
    </Card>
  );
};