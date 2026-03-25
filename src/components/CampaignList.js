import React, { useState } from 'react';
import { Card, CardBody, CardHeader, CardFooter, Button, Divider } from '@heroui/react';

export const CampaignList = ({ campaigns, onEdit, onDelete, onSelect }) => {
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  if (campaigns.length === 0) {
    return (
      <div className="empty-state">
        <p>No campaigns found. <a href="#" onClick={(e) => e.preventDefault()}>Add your first campaign</a>.</p>
      </div>
    );
  }

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
};

export default CampaignList;