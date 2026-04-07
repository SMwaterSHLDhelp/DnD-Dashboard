import React from 'react';
import { TemplateLibrary } from './components/templates/TemplateLibrary';
import { HeroUIProvider } from '@heroui/react';

function App() {
  return (
    <HeroUIProvider>
      <main className="min-h-screen bg-background text-foreground">
        <TemplateLibrary />
      </main>
    </HeroUIProvider>
  );
}

export default App;