import React from 'react';

const SessionList = ({ sessions, onSelect, onDelete }) => {
  return (
    <div>
      <h2>Sessions</h2>
      {sessions.length === 0 ? (
        <p>No sessions created yet.</p>
      ) : (
        <ul>
          {sessions.map((session) => (
            <li key={session.id}>
              <span>{session.name}</span>
              <button onClick={() => onSelect(session)}>Edit</button>
              <button onClick={() => onDelete(session.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SessionList;