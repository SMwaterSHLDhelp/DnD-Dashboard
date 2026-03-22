import React from 'react';

const CampaignList = ({ campaigns, onSelect, onDelete }) => {
  return (
    <div>
      <h2>Campaigns</h2>
      {campaigns.length === 0 ? (
        <p>No campaigns created yet.</p>
      ) : (
        <ul>
          {campaigns.map((campaign) => (
            <li key={campaign.id}>
              <span>{campaign.name}</span>
              <button onClick={() => onSelect(campaign)}>Edit</button>
              <button onClick={() => onDelete(campaign.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CampaignList;