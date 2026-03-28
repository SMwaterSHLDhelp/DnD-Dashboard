import React from 'react';

const SessionForm = () => {
  return (
    <div className="session-form">
      <h2>Session Details</h2>
      <form>
        <input type="text" placeholder="Session Title" />
        <textarea placeholder="Session Summary" />
        <button type="submit">Save Session</button>
      </form>
    </div>
  );
};

export default SessionForm;
