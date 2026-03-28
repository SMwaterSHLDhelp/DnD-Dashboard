// App.jsx - Main application component
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Campaign from './pages/Campaign';
import Sessions from './pages/Sessions';
import NpcTracker from './pages/NpcTracker';
import PlayerTracker from './pages/PlayerTracker';
import Combat from './pages/Combat';
import Loot from './pages/Loot';
import Rules from './pages/Rules';
import Notes from './pages/Notes';
import Timeline from './pages/Timeline';
import Generators from './pages/Generators';

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