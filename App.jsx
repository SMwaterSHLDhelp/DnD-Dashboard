// App.jsx - Main application component
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Campaign from './pages/Campaign.jsx';
import Sessions from './pages/Sessions.jsx';
import NpcTracker from './pages/NpcTracker.jsx';
import PlayerTracker from './pages/PlayerTracker.jsx';
import Combat from './pages/Combat.jsx';
import Loot from './pages/Loot.jsx';
import Rules from './pages/Rules.jsx';
import Notes from './pages/Notes.jsx';
import Timeline from './pages/Timeline.jsx';
import Generators from './pages/Generators.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Campaign />} />
        <Route path='/campaign' element={<Campaign />} />
        <Route path='/sessions' element={<Sessions />} />
        <Route path='/npcs' element={<NpcTracker />} />
        <Route path='/players' element={<PlayerTracker />} />
        <Route path='/combat' element={<Combat />} />
        <Route path='/loot' element={<Loot />} />
        <Route path='/rules' element={<Rules />} />
        <Route path='/notes' element={<Notes />} />
        <Route path='/timeline' element={<Timeline />} />
        <Route path='/generators' element={<Generators />} />
      </Routes>
    </Router>
  );
};

export default App;