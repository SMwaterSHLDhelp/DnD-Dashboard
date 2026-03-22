import React, { useState } from 'react';

const HistoryLog = ({ events, onAddEvent, onDeleteEvent }) => {
  const [newEvent, setNewEvent] = useState({
    date: '',
    description: '',
    type: 'event', // default type
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newEvent.date && newEvent.description) {
      onAddEvent({ ...newEvent, id: Date.now().toString() });
      setNewEvent({ date: '', description: '', type: 'event' });
    }
  };

  const handleDelete = (id) => {
    onDeleteEvent(id);
  };

  return (
    <div className="history-log">
      <h2>Timeline / History Log</h2>

      <form onSubmit={handleSubmit} className="event-form">
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={newEvent.date}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={newEvent.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            name="type"
            value={newEvent.type}
            onChange={handleInputChange}
          >
            <option value="event">Event</option>
            <option value="quest">Quest</option>
            <option value="battle">Battle</option>
            <option value="milestone">Milestone</option>
          </select>
        </div>

        <button type="submit">Add Event</button>
      </form>

      <div className="events-list">
        {events.length === 0 ? (
          <p>No events recorded yet.</p>
        ) : (
          <ul>
            {events.map((event) => (
              <li key={event.id} className="event-item">
                <div className="event-header">
                  <span className="event-date">{event.date}</span>
                  <span className="event-type">{event.type}</span>
                </div>
                <p className="event-description">{event.description}</p>
                <button onClick={() => handleDelete(event.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HistoryLog;