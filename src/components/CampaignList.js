import React from 'react';
import { Card, CardBody, CardFooter, CardHeader, Button } from '@heroui/react';

function CampaignList({ campaigns, onSelect, onEdit, onDelete }) {
  return (
    <div className="campaign-list">
      {campaigns.map((campaign) => (
        <Card
          key={campaign.id || campaign.name}
          isHoverable
          isPressable
          onClick={() => {
            setSelectedCampaign(campaign);
            if (onSelect) onSelect(campaign.id || campaign.name);
          }}
        >
          <CardHeader>
            <h3>{campaign.name}</h3>
          </CardHeader>
          <CardBody>
            <p>{campaign.description || 'No description'}</p>
            {campaign.world && (
              <p><strong>World:</strong> {campaign.world}</p>
            )}
            {campaign.status && (
              <p><strong>Status:</strong> {campaign.status}</p>
            )}
          </CardBody>
          <CardFooter>
            <Button size="sm" variant="flat" color="primary" onClick={(e) => {
              e.stopPropagation();
              if (onEdit) onEdit(campaign);
            }}>
              Edit
            </Button>
            <Button size="sm" variant="flat" color="danger" onClick={(e) => {
              e.stopPropagation();
              if (onDelete) onDelete(campaign);
            }}>
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default CampaignList;