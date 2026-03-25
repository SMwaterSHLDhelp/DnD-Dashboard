import React, { useState } from 'react';
import CampaignList from './CampaignList';
import CampaignForm from './CampaignForm';

const CampaignManager = ({ campaigns, addCampaign, updateCampaign }) => {
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleAdd = (campaign) => {
    addCampaign(campaign);
    setEditingCampaign(null);
    setShowForm(false);
  };

  const handleUpdate = (campaign) => {
    updateCampaign(campaign.id, campaign);
    setEditingCampaign(null);
    setShowForm(false);
  };

  const handleEdit = (campaign) => {
    setEditingCampaign(campaign);
    setShowForm(true);
  };

  const handleDelete = (campaign) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      updateCampaign(campaign.id, { deleted: true });
    }
  };

  const handleCancel = () => {
    setEditingCampaign(null);
    setShowForm(false);
  };

  const activeCampaigns = campaigns.filter(c => !c.deleted);

  return (
    <div className="campaign-manager">
      <div className="campaign-header">
        <h2>Campaigns</h2>
        <button 
          onClick={() => { setEditingCampaign(null); setShowForm(true); }}
          className="add-campaign-btn"
        >
          + New Campaign
        </button>
      </div>

      {showForm ? (
        <CampaignForm
          campaign={editingCampaign}
          onSave={editingCampaign ? handleUpdate : handleAdd}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
      ) : (
        <CampaignList
          campaigns={activeCampaigns}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default CampaignManager;
