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
        
        <Card onClick={() => navigate('/app/players')} isPressable>
          <CardBody>
            <div className="text-2xl mb-2">⚔️</div>
            <h3 className="font-bold text-lg">Players</h3>
            <p>Track player characters and personal quest threads.</p>
          </CardBody>
        </Card>
        
        <Card onClick={() => navigate('/app/combat')} isPressable>
          <CardBody>
            <div className="text-2xl mb-2">⚔️</div>
            <h3 className="font-bold text-lg">Combat & Encounters</h3>
            <p>Initiative, stat blocks, difficulty calculator, and conditions.</p>
          </CardBody>
        </Card>
        
        <Card onClick={() => navigate('/app/loot')} isPressable>
          <CardBody>
            <div className="text-2xl mb-2">💎</div>
            <h3 className="font-bold text-lg">Loot & Inventory</h3>
            <p>Track gold, items, and magic distribution.</p>
          </CardBody>
        </Card>
        
        <Card onClick={() => navigate('/app/rules')} isPressable>
          <CardBody>
            <div className="text-2xl mb-2">📜</div>
            <h3 className="font-bold text-lg">Rules Reference</h3>
            <p>Spells, abilities, and quick rules lookup.</p>
          </CardBody>
        </Card>
        
        <Card onClick={() => navigate('/app/notes')} isPressable>
          <CardBody>
            <div className="text-2xl mb-2">🔒</div>
            <h3 className="font-bold text-lg">Notes & Secrets</h3>
            <p>Private DM-only content like hidden plots and secrets.</p>
          </CardBody>
        </Card>
        
        <Card onClick={() => navigate('/app/timeline')} isPressable>
          <CardBody>
            <div className="text-2xl mb-2">⏳</div>
            <h3 className="font-bold text-lg">Timeline</h3>
            <p>History log, dates, and story milestones.</p>
          </CardBody>
        </Card>
        
        <Card onClick={() => navigate('/app/generators')} isPressable>
          <CardBody>
            <div className="text-2xl mb-2">🎲</div>
            <h3 className="font-bold text-lg">Random Generators</h3>
            <p>Names, taverns, weather, encounters, treasure, and more.</p>
          </CardBody>
        </Card>
      </Grid>
      
      <Spacer y={4} />
      
      <div className="flex justify-center gap-4">
        <Button
          color="primary"
          onClick={() => navigate('/')}
        >
          Back to Title
        </Button>
      </div>
    </div>
  );
}

export default CampaignHome;
