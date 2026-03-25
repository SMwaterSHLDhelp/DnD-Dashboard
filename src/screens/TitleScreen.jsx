import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@heroui/react';

function TitleScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-6">
      <h1 className="text-5xl font-extrabold mb-6 text-gray-900">D&D Campaign Manager</h1>
      <p className="text-xl text-gray-600 mb-12 max-w-2xl text-center">
        A comprehensive tool for Dungeon Masters to manage campaigns, sessions, NPCs, and combat encounters
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        <Link to="/campaign">
          <Button color="primary" size="lg" className="w-full text-lg">
            Campaign & World Building
          </Button>
        </Link>
        <Link to="/sessions">
          <Button color="primary" size="lg" className="w-full text-lg">
            Session Management
          </Button>
        </Link>
        <Link to="/npcs">
          <Button color="primary" size="lg" className="w-full text-lg">
            NPC Tracker
          </Button>
        </Link>
        <Link to="/players">
          <Button color="primary" size="lg" className="w-full text-lg">
            Player Tracking
          </Button>
        </Link>
        <Link to="/combat">
          <Button color="primary" size="lg" className="w-full text-lg">
            Combat & Encounters
          </Button>
        </Link>
        <Link to="/loot">
          <Button color="primary" size="lg" className="w-full text-lg">
            Loot & Inventory
          </Button>
        </Link>
        <Link to="/rules">
          <Button color="primary" size="lg" className="w-full text-lg">
            Rules Reference
          </Button>
        </Link>
        <Link to="/notes">
          <Button color="primary" size="lg" className="w-full text-lg">
            Notes & Secrets
          </Button>
        </Link>
        <Link to="/timeline">
          <Button color="primary" size="lg" className="w-full text-lg">
            Timeline
          </Button>
        </Link>
        <Link to="/random">
          <Button color="primary" size="lg" className="w-full text-lg">
            Random Generators
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default TitleScreen;