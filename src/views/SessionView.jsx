import { useState } from 'react';
import { Card, CardBody, CardHeader, Input, Textarea, Button, Tabs, Tab } from '@heroui/react';

export default function SessionView() {
  const [currentSession, setCurrentSession] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    plannedEncounters: '',
    notes: '',
    pacing: 'relaxed'
  });

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Session Management</h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <Input
              label="Session Title"
              value={currentSession.title}
              onChange={(e) => setCurrentSession({ ...currentSession, title: e.target.value })}
            />
            <Input
              type="date"
              label="Session Date"
              value={currentSession.date}
              onChange={(e) => setCurrentSession({ ...currentSession, date: e.target.value })}
            />
            <Tabs fullWidth>
              <Tab title="Pre-Session Planning" key="planning">
                <div className="space-y-4 mt-4">
                  <Textarea
                    label="Planned Encounters & Plot Hooks"
                    value={currentSession.plannedEncounters}
                    onChange={(e) => setCurrentSession({ ...currentSession, plannedEncounters: e.target.value })}
                    placeholder="List expected encounters, NPCs, and plot developments..."
                  />
                  <div>
                    <h3 className="font-semibold mb-2">Pacing</h3>
                    <div className="flex space-x-2">
                      {['relaxed', 'balanced', 'fast-paced'].map((pacing) => (
                        <Button
                          key={pacing}
                          color={currentSession.pacing === pacing ? 'primary' : 'default'}
                          onPress={() => setCurrentSession({ ...currentSession, pacing })}
                        >
                          {pacing.charAt(0).toUpperCase() + pacing.slice(1).replace('-', ' ')}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab title="Post-Session Summary" key="summary">
                <div className="space-y-4 mt-4">
                  <Textarea
                    label="Session Summary & Key Events"
                    value={currentSession.notes}
                    onChange={(e) => setCurrentSession({ ...currentSession, notes: e.target.value })}
                    placeholder="What actually happened in the session? What should carry over to next session?"
                  />
                </div>
              </Tab>
            </Tabs>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}