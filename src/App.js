import { HeroUIProvider } from '@heroui/react';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <HeroUIProvider>
      <Routes>
        <Route path="/*" element={<div>Welcome to D&D Campaign Manager</div>} />
      </Routes>
    </HeroUIProvider>
  );
}

export default App;
