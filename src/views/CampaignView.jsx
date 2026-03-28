import { useState } from 'react';
import { Card, CardBody, CardHeader, Input, Textarea, Button } from '@heroui/react';

export default function CampaignView() {
  const [campaign, setCampaign] = useState({
    title: '',
    description: '',
    worldLore: '',
    locations: [],
    factions: []
  });

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>Campaign Details</CardHeader>
        <CardBody>
          <div className="space-y-4">
            <Input
              label="Campaign Title"
              value={campaign.title}
              onChange={(e) => setCampaign({ ...campaign, title: e.target.value })}
            />
            <Textarea
              label="Campaign Description"
              value={campaign.description}
              onChange={(e) => setCampaign({ ...campaign, description: e.target.value })}
            />
            <Textarea
              label="World Lore"
              value={campaign.worldLore}
              onChange={(e) => setCampaign({ ...campaign, worldLore: e.target.value })}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}