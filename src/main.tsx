import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@heroui/react';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={{
      theme: {
        colors: {
          primary: '#10b981',
          danger: '#ef4444',
          warning: '#f59e0b',
          default: '#f3f4f6'
        }
      }
    }}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
