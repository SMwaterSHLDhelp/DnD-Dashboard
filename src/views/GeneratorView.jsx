import { useState } from 'react';
import { Card, CardBody, CardHeader, Button } from '@heroui/react';

// Simple random generators for quick reference
generateRandomName = () => {
  const prefixes = ['Grim', 'Iron', 'Storm', 'Shadow', 'Crystal', 'Flame', 'Frost', 'Lightning'];
  const suffixes = ['ward', 'strike', 'heart', 'blade', 'shield', 'step', 'call', 'will'];
  return prefixes[Math.floor(Math.random() * prefixes.length)] + suffixes[Math.floor(Math.random() * suffixes.length)];
};

generateRandomTavern = () => {
  const names = ['The Rusty Dragon', 'The Happy Kobold', 'The Broken Sword', 'The Wandering Minstrel', 'The Lucky Llama'];
  const features = ['with a mysterious patron', 'featuring live music', 'with hidden cellar', 'run by a reformed pirate', 'with secret recipe drinks'];
  return `${names[Math.floor(Math.random() * names.length)]} ${features[Math.floor(Math.random() * features.length)]}`;
};

export default function GeneratorView() {
  const [generated, setGenerated] = useState({});

  const generateName = () => {
    setGenerated(prev => ({ ...prev, name: generateRandomName() }));
  };

  const generateTavern = () => {
    setGenerated(prev => ({ ...prev, tavern: generateRandomTavern() }));
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Random Generators</h2>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardBody>
                <h3 className="font-semibold mb-2">Random Name</h3>
                <Button onPress={generateName} className="mb-2">Generate Name</Button>
                {generated.name && <p className="text-center font-medium text-lg">{generated.name}</p>}
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <h3 className="font-semibold mb-2">Random Tavern</h3>
                <Button onPress={generateTavern} className="mb-2">Generate Tavern</Button>
                {generated.tavern && <p className="text-center font-medium text-lg">{generated.tavern}</p>}
              </CardBody>
            </Card>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}