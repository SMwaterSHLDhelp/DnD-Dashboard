import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@heroui/react';
import Sidebar from './components/Sidebar';
import Generators from './pages/Generators';

// Create HeroUI theme
const theme = createTheme({
  type: 'dark',
  theme: {
    colors: {
      primary: '#2563eb',
      secondary: '#7c3aed',
      success: '#059669',
      warning: '#d97706',
      danger: '#dc2626'
    }
  }
});

// Main App Component
function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          <Sidebar />
          <main style={{ flex: 1, padding: '20px' }}>
            <Routes>
              <Route path="/" element={<Generators />} />
              <Route path="/generators" element={<Generators />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
