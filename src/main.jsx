import React from 'react';
import ReactDOM from 'react-dom/client';
import { createTheme, ThemeProvider } from '@heroui/react';
import App from './App.jsx';

// Global styles import
import '@heroui/styles/dist/reset.css';

const theme = createTheme({
  type: 'light',
  theme: {
    colors: {
      background: '#ffffff',
      foreground: '#1a1a1a',
      primary: {
        DEFAULT: '#0070f3',
        dark: '#0051cc'
      }
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);