import { useState } from 'react';
import { Card, CardBody, CardHeader, Input, Tabs, Tab, Accordion, AccordionItem } from '@heroui/react';
import { useSpellData } from '../hooks/useSpellData';

export default function RulesView() {
  const [selectedTab, setSelectedTab] = useState('spells');
  const { spells, loading, error } = useSpellData();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSpells = spells.filter(spell =>
    spell.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    spell.level.includes(searchTerm) ||
    spell.school.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="p-8">Loading spell data...</div>;
  if (error) return <div className="p-8 text-red-500">Error loading spells: {error}</div>;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Rules Reference</h2>
        </CardHeader>
        <CardBody>
          <Tabs
            fullWidth
            selectedKey={selectedTab}
            onSelect={(key) => setSelectedTab(key)}
            className="mb-4"
          >
            <Tab title="Spells" key="spells">
              <div className="space-y-4">
                <Input
                  label="Search Spells"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, level, or school"
                />
                <div className="space-y-2">
                  {filteredSpells.map(spell => (
                    <Card key={spell.index}>
                      <CardBody>
                        <h4 className="font-bold">{spell.name}</h4>
                        <p className="text-sm text-gray-500">
                          {spell.level} level {spell.school} | Casting time: {spell.casting_time} | Range: {spell.range}
                        </p>
                        <p className="mt-2">{spell.desc.join(' ')}</p>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </div>
            </Tab>
            <Tab title="Rules" key="rules">
              <Accordion>
                <AccordionItem key="1" aria-label="Combat Rules" title="Combat Rules">
                  <p>Combat is resolved in rounds, each round lasting 6 seconds in-game. Participants take turns in initiative order.</p>
                </AccordionItem>
                <AccordionItem key="2" aria-label="Movement Rules" title="Movement Rules">
                  <p>Most creatures have a movement speed of 30 feet. Movement can be split before and after actions.</p>
                </AccordionItem>
                <AccordionItem key="3" aria-label="Skills" title="Skills">
                  <p>Skills represent proficiency in specific areas. Each skill is tied to an ability score.</p>
                </AccordionItem>
              </Accordion>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}