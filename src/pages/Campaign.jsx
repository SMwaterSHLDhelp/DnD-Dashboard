import React, { useState, useEffect } from 'react';
import CampaignList from '../components/CampaignList';
import CampaignForm from '../components/CampaignForm';
import CampaignExportImport from '../components/CampaignExportImport';
import CampaignCloudBackup from '../components/CampaignCloudBackup';

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

      {/* Cloud Backup Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Cloud size={20} className="text-primary" />
          Cloud Backup & Restore
        </h2>
        <CampaignCloudBackup campaignData={campaignData} />
      </div>

      {/* Export/Import Tools */}
      <CampaignExportImport campaignData={campaignData} />

      {/* Campaign Form */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? 'Edit Campaign' : 'Create New Campaign'}
        </h2>
        <CampaignForm
          formData={formData}
          isEditing={isEditing}
          onCancel={() => {
            setIsEditing(false);
            setFormData({ title: '', description: '', setting: '' });
          }}
          onSave={isEditing ? handleUpdateCampaign : handleAddCampaign}
        />
      </div>

      {/* Campaign List */}
      <CampaignList
        campaigns={campaigns}
        selectedCampaign={selectedCampaign}
        onSelectCampaign={handleSelectCampaign}
        onDeleteCampaign={handleDeleteCampaign}
      />
    </div>
  );
}

export default Campaign;