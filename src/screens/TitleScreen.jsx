import React from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Image } from '@heroui/react';
import { useNavigate } from 'react-router-dom';

function TitleScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          D&D Campaign Manager
        </h1>
        <p className="text-xl text-gray-600 mb-10">
          A complete tool for DMs to organize campaigns, manage sessions, track NPCs, and more.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="shadow-lg">
            <CardHeader className="font-bold text-lg">Campaign & World Building</CardHeader>
            <CardBody>
              <p>Store story, lore, maps, locations, factions, and history.</p>
            </CardBody>
          </Card>
          <Card className="shadow-lg">
            <CardHeader className="font-bold text-lg">Session Management</CardHeader>
            <CardBody>
              <p>Plan sessions, notes, pacing, and post-session summaries.</p>
            </CardBody>
          </Card>
          <Card className="shadow-lg">
            <CardHeader className="font-bold text-lg">NPC & Player Tracking</CardHeader>
            <CardBody>
              <p>Manage NPC rosters, relationships, and player characters.</p>
            </CardBody>
          </Card>
          <Card className="shadow-lg">
            <CardHeader className="font-bold text-lg">Combat Tools</CardHeader>
            <CardBody>
              <p>Initiative tracking, monster stat blocks, and condition tracking.</p>
            </CardBody>
          </Card>
          <Card className="shadow-lg">
            <CardHeader className="font-bold text-lg">Loot & Inventory</CardHeader>
            <CardBody>
              <p>Track gold, items, and magic items distributed.</p>
            </CardBody>
          </Card>
          <Card className="shadow-lg">
            <CardHeader className="font-bold text-lg">Rules & Generators</CardHeader>
            <CardBody>
              <p>Quick reference for spells and random content generators.</p>
            </CardBody>
          </Card>
        </div>
        <div className="flex justify-center gap-4">
          <Button
            color="primary"
            size="lg"
            onClick={() => navigate('/app')}
            className="font-bold"
          >
            Start Campaign
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TitleScreen;
