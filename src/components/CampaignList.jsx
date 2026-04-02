import React from 'react';
import { Card, CardBody, CardHeader, CardFooter, Button, Divider } from '@heroui/react';
import { Edit, Trash2, FileText } from 'lucide-react';

function CampaignList({ campaigns, onSelect, onDelete }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <FileText size={20} />
          Campaigns
        </h2>
        <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
          {campaigns.length} {campaigns.length === 1 ? 'Campaign' : 'Campaigns'}
        </span>
      </div>
      
      {campaigns.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <FileText size={48} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500">No campaigns yet. Create one to get started!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {campaigns.map((campaign) => (
            <Card 
              key={campaign.id} 
              isPressable 
              onClick={() => onSelect(campaign)}
              className={campaign.id === null ? 'border-primary' : ''}
            >
              <CardHeader className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{campaign.title}</h3>
                  {campaign.setting && (
                    <p className="text-sm text-gray-500 mt-1">Setting: {campaign.setting}</p>
                  )}
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {campaign.description || 'No description provided'}
                  </p>
                </div>
              </CardHeader>
              <Divider />
              <CardFooter className="gap-2">
                <Button 
                  size="sm" 
                  color="primary" 
                  startContent={<Edit size={14} />}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(campaign);
                  }}
                >
                  Edit
                </Button>
                <Button 
                  size="sm" 
                  color="danger" 
                  startContent={<Trash2 size={14} />}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(campaign.id);
                  }}
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default CampaignList;