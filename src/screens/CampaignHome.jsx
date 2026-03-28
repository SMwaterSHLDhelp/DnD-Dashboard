import React from 'react';
import { Button, Card, CardBody, Grid, Spacer } from '@heroui/react';
import { useNavigate } from 'react-router-dom';

function CampaignHome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-6">
      <h2 className="text-3xl font-bold mb-6">Campaign Dashboard</h2>
      <p className="mb-8 text-gray-600">Manage your world, sessions, and all campaign elements.</p>

      <Grid className="gap-4" cols={2}>
        <Card onClick={() => navigate('/app/campaign')} isPressable>
          <CardBody>
            <div className="text-2xl mb-2">🗺️</div>
            <h3 className="font-bold text-lg">Campaign Builder</h3>
            <p>World building, lore, locations, factions, and history.</p>
          </CardBody>
        </Card>

        <Card onClick={() => navigate('/app/sessions')} isPressable>
          <CardBody>
            <div className="text-2xl mb-2">📅</div>
            <h3 className="font-bold text-lg">Sessions</h3>
            <p>Plan and record individual sessions.</p>
          </CardBody>
        </Card>

        <Card onClick={() => navigate('/app/npcs')} isPressable>
          <CardBody>
            <div className="text-2xl mb-2">🎭</div>
            <h3 className="font-bold text-lg">NPCs</h3>
            <p>Character roster with motivations, relationships, and status.</p>
          </CardBody>
        </Card>
      </Grid>
    </div>
  );
}

export default CampaignHome;