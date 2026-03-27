import React, { useState, useEffect } from 'react';
import HistoryLog from './HistoryLog';

const SessionTimeline = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Load events from localStorage on mount
    const savedEvents = localStorage.getItem('dndTimelineEvents');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  const saveEvents = (updatedEvents) => {
    setEvents(updatedEvents);
    localStorage.setItem('dndTimelineEvents', JSON.stringify(updatedEvents));
  };

  const handleAddEvent = (event) => {
    const updatedEvents = [...events, event];
    saveEvents(updatedEvents);
  };

  const handleDeleteEvent = (id) => {
    const updatedEvents = events.filter(event => event.id !== id);
    saveEvents(updatedEvents);
  };

  return (
    <div className="session-timeline">
      <h2 className="text-2xl font-bold mb-4">Timeline & History Log</h2>
      <HistoryLog 
        events={events}
        onAddEvent={handleAddEvent}
        onDeleteEvent={handleDeleteEvent}
      />
    </div>
  );
};

export default SessionTimeline;