import React, { useState, useEffect } from 'react';
import CampaignList from '../components/CampaignList';
import CampaignForm from '../components/CampaignForm';
import CampaignExportImport from '../components/CampaignExportImport';

function Campaign() {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    setting: ''
  });

  // Load campaigns from localStorage
  useEffect(() => {
    const savedCampaigns = localStorage.getItem('campaignData');
    if (savedCampaigns) {
      try {
        const data = JSON.parse(savedCampaigns);
        if (data.campaigns && Array.isArray(data.campaigns)) {
          setCampaigns(data.campaigns);
        }
      } catch (e) {
        console.error('Failed to parse campaign data:', e);
        setCampaigns([]);
      }
    }
  }, []);

  // Save campaigns to localStorage whenever they change
  useEffect(() => {
    const data = { campaigns };
    localStorage.setItem('campaignData', JSON.stringify(data));
  }, [campaigns]);

  // Update campaign export data
  const campaignData = { campaigns };

  const handleAddCampaign = (campaign) => {
    const newCampaign = {
      id: Date.now(),
      ...campaign,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setCampaigns([...campaigns, newCampaign]);
    setIsEditing(false);
    setFormData({ title: '', description: '', setting: '' });
  };

  const handleUpdateCampaign = (updatedCampaign) => {
    setCampaigns(campaigns.map(c => 
      c.id === updatedCampaign.id ? { ...updatedCampaign, updatedAt: new Date().toISOString() } : c
    ));
    setIsEditing(false);
    setFormData({ title: '', description: '', setting: '' });
  };

  const handleDeleteCampaign = (id) => {
    setCampaigns(campaigns.filter(c => c.id !== id));
    if (selectedCampaign?.id === id) {
      setSelectedCampaign(null);
    }
  };

  const handleSelectCampaign = (campaign) => {
    setSelectedCampaign(campaign);
    setFormData({
      title: campaign.title,
      description: campaign.description || '',
      setting: campaign.setting || ''
    });
    setIsEditing(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Campaign Management</h1>
      
      {/* Export/Import Tools */}
      <CampaignExportImport campaignData={campaignData} />
      
      <div className="flex gap-6">
        <div className="w-2/3">
          <CampaignList
            campaigns={campaigns}
            onSelect={handleSelectCampaign}
            onDelete={handleDeleteCampaign}
          />
        </div>
        
        <div className="w-1/3">
          {isEditing ? (
            <CampaignForm
              initialData={selectedCampaign}
              onSave={selectedCampaign ? handleUpdateCampaign : handleAddCampaign}
              onCancel={() => {
                setIsEditing(false);
                setFormData({ title: '', description: '', setting: '' });
              }}
            />
          ) : (
            <div className="bg-gray-100 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-3">Select or Create Campaign</h2>
              <p className="text-gray-600 text-sm">
                Choose a campaign from the list to view details, or create a new one to get started.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Campaign;