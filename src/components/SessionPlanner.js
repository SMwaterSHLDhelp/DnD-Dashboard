import React, { useState } from 'react';

const SessionPlanner = () => {
  const [encounters, setEncounters] = useState([
    { id: 1, name: '', notes: '', plotHooks: '', pacing: 5 }
  ]);

  const addEncounter = () => {
    setEncounters([...encounters, { id: Date.now(), name: '', notes: '', plotHooks: '', pacing: 5 }]);
  };

  const updateEncounter = (id, field, value) => {
    setEncounters(encounters.map(enc => 
      enc.id === id ? { ...enc, [field]: value } : enc
    ));
  };

  const removeEncounter = (id) => {
    setEncounters(encounters.filter(enc => enc.id !== id));
  };

  return (
    <div className="session-planner">
      <h2>Session Encounter Planner</h2>
      <div className="encounter-list">
        {encounters.map((encounter) => (
          <div key={encounter.id} className="encounter-card">
            <div className="encounter-header">
              <input
                type="text"
                placeholder="Encounter Name"
                value={encounter.name}
                onChange={(e) => updateEncounter(encounter.id, 'name', e.target.value)}
                className="encounter-name"
              />
              <button onClick={() => removeEncounter(encounter.id)} className="remove-btn">Remove</button>
            </div>
            <textarea
              placeholder="Encounter Notes"
              value={encounter.notes}
              onChange={(e) => updateEncounter(encounter.id, 'notes', e.target.value)}
              className="encounter-notes"
            />
            <textarea
              placeholder="Plot Hooks"
              value={encounter.plotHooks}
              onChange={(e) => updateEncounter(encounter.id, 'plotHooks', e.target.value)}
              className="plot-hooks"
            />
            <div className="pacing-tracker">
              <label>Pacing: </label>
              <input
                type="range"
                min="1"
                max="10"
                value={encounter.pacing}
                onChange={(e) => updateEncounter(encounter.id, 'pacing', parseInt(e.target.value))}
                className="pacing-slider"
              />
              <span>{encounter.pacing}/10</span>
            </div>
          </div>
        ))}
      </div>
      <button onClick={addEncounter} className="add-encounter-btn">Add Encounter</button>
    </div>
  );
};

export default SessionPlanner;