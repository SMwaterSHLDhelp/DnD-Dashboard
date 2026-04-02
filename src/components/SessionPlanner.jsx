import React, { useState } from 'react';
import { Button, Input, Textarea, Card, CardBody, CardHeader, CardFooter } from '@heroui/react';
import { Plus, Trash2, Clock, FileText } from 'lucide-react';

const SessionPlanner = ({ encounters = [], onAddEncounter, onUpdateEncounter, onRemoveEncounter }) => {
  const [localEncounters, setLocalEncounters] = useState(encounters);

  React.useEffect(() => {
    if (encounters.length > 0) {
      setLocalEncounters(encounters);
    }
  }, [encounters]);

  const handleAddEncounter = () => {
    const newEncounter = {
      id: Date.now(),
      name: '',
      notes: '',
      plotHooks: '',
      pacing: 5
    };
    setLocalEncounters([...localEncounters, newEncounter]);
    if (onAddEncounter) onAddEncounter(newEncounter);
  };

  const handleUpdateEncounter = (id, field, value) => {
    const updatedEncounters = localEncounters.map(enc =>
      enc.id === id ? { ...enc, [field]: value } : enc
    );
    setLocalEncounters(updatedEncounters);
    if (onUpdateEncounter) onUpdateEncounter(updatedEncounters);
  };

  const handleRemoveEncounter = (id) => {
    const updatedEncounters = localEncounters.filter(enc => enc.id !== id);
    setLocalEncounters(updatedEncounters);
    if (onRemoveEncounter) onRemoveEncounter(updatedEncounters);
  };

  return (
    <div className="session-planner">
      <h2 className="text-xl font-bold mb-4">Session Encounter Planner</h2>
      <div className="space-y-4">
        {localEncounters.map((encounter) => (
          <Card key={encounter.id} className="encounter-card">
            <CardHeader>
              <div className="flex justify-between items-center">
                <Input
                  size="sm"
                  placeholder="Encounter Name"
                  value={encounter.name}
                  onChange={(e) => handleUpdateEncounter(encounter.id, 'name', e.target.value)}
                  className="encounter-name"
                />
                <Button
                  size="sm"
                  color="danger"
                  variant="light"
                  onClick={() => handleRemoveEncounter(encounter.id)}
                  startContent={<Trash2 size={14} />}
                >
                  Remove
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                <Textarea
                  size="sm"
                  placeholder="Encounter Notes"
                  value={encounter.notes}
                  onChange={(e) => handleUpdateEncounter(encounter.id, 'notes', e.target.value)}
                  className="encounter-notes"
                />
                <Textarea
                  size="sm"
                  placeholder="Plot Hooks & Story Developments"
                  value={encounter.plotHooks}
                  onChange={(e) => handleUpdateEncounter(encounter.id, 'plotHooks', e.target.value)}
                  className="plot-hooks"
                />
                <div className="pacing-tracker">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-sm font-medium">Pacing: {encounter.pacing}/10</label>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={encounter.pacing}
                    onChange={(e) => handleUpdateEncounter(encounter.id, 'pacing', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
      <div className="mt-4">
        <Button
          onClick={handleAddEncounter}
          variant="solid"
          color="primary"
          startContent={<Plus size={18} />}
        >
          Add Encounter
        </Button>
      </div>
    </div>
  );
};

export default SessionPlanner;