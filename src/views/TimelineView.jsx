import { useState } from 'react';
import { Card, CardBody, CardHeader, Input, Button } from '@heroui/react';

export default function TimelineView() {
  const [timeline, setTimeline] = useState([
    { id: 1, date: '15 Midsummer', event: 'Party arrived in Waterdeep', isMilestone: false },
    { id: 2, date: '16 Midsummer', event: 'Quest accepted from Lord Axebane', isMilestone: true }
  ]);
  const [newEvent, setNewEvent] = useState({ date: '', event: '', isMilestone: false });

  const handleAddEvent = () => {
    if (newEvent.date && newEvent.event) {
      setTimeline([...timeline, { ...newEvent, id: Date.now() }].sort((a, b) => a.date.localeCompare(b.date)));
      setNewEvent({ date: '', event: '', isMilestone: false });
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Timeline & History Log</h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="In-World Date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              />
              <Input
                label="Event Description"
                value={newEvent.event}
                onChange={(e) => setNewEvent({ ...newEvent, event: e.target.value })}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="milestone"
                checked={newEvent.isMilestone}
                onChange={(e) => setNewEvent({ ...newEvent, isMilestone: e.target.checked })}
              />
              <label htmlFor="milestone">Major Story Milestone</label>
            </div>
            <Button onPress={handleAddEvent} color="primary">Add Event</Button>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Timeline Events</h3>
            <div className="space-y-2">
              {timeline.map(event => (
                <Card key={event.id}>
                  <CardBody>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-20 text-center py-2 bg-gray-200 rounded">
                          <p className="font-bold">{event.date}</p>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <h4 className="font-bold">{event.event}</h4>
                          {event.isMilestone && <span className="ml-2 px-2 py-0.5 text-xs bg-amber-500 text-white rounded">MILESTONE</span>}
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}