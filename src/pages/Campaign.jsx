import React, { useState, useEffect } from 'react';
import { Button, Input, Card, CardBody, CardFooter, CardHeader, Spacer, Textarea } from '@heroui/react';
import CampaignList from '../components/CampaignList';
import CampaignForm from '../components/CampaignForm';

function Campaign() {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Load campaigns from localStorage
    const savedCampaigns = localStorage.getItem('campaigns');
    if (savedCampaigns) {
      setCampaigns(JSON.parse(savedCampaigns));
    }
  }, []);

  const saveCampaigns = (campaignsToSave) => {
    setCampaigns(campaignsToSave);
    localStorage.setItem('campaigns', JSON.stringify(campaignsToSave));
  };

  const handleAddCampaign = (campaign) => {
    const newCampaign = {
      ...campaign,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      worldLore: [],
      locations: [],
      factions: [],
      history: [],
      maps: [],
      sessions: []
    };
    saveCampaigns([...campaigns, newCampaign]);
    setSelectedCampaign(newCampaign);
    setIsEditing(true);
  };

  const handleEditCampaign = (campaign) => {
    setSelectedCampaign(campaign);
    setIsEditing(true);
  };

  const handleUpdateCampaign = (updatedCampaign) => {
    const updatedCampaigns = campaigns.map((c) =>
      c.id === updatedCampaign.id
        ? { ...updatedCampaign, updatedAt: new Date().toISOString() }
        : c
    );
    saveCampaigns(updatedCampaigns);
    setIsEditing(false);
  };

  const handleDeleteCampaign = (campaign) => {
    const updatedCampaigns = campaigns.filter((c) => c.id !== campaign.id);
    saveCampaigns(updatedCampaigns);
    setSelectedCampaign(null);
    setIsEditing(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Campaign & World Building</h2>
      
      {!isEditing && (
        <Button
          color="primary"
          onClick={() => {
            setSelectedCampaign(null);
            setIsEditing(true);
          }}
        >
          Add Campaign
        </Button>
      )}

      <Spacer y={4} />

      <div className="flex gap-6">
        <div className="w-2/3">
          <CampaignList
            campaigns={campaigns}
            onSelect={(id) => {
              const campaign = campaigns.find((c) => c.id === id);
              setSelectedCampaign(campaign);
              setIsEditing(!!campaign);
            }}
            onEdit={handleEditCampaign}
            onDelete={handleDeleteCampaign}
          />
        </div>

        {isEditing && (
          <div className="w-1/3">
            <CampaignForm
              initialData={selectedCampaign}
              onSave={selectedCampaign ? handleUpdateCampaign : handleAddCampaign}
              onCancel={() => setIsEditing(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Campaign;