import React from 'react';

const CampaignForm = () => {
  return (
    <div className="campaign-form">
      <h2>Create Campaign</h2>
      <form>
        <input type="text" placeholder="Campaign Name" />
        <textarea placeholder="Campaign Description" />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CampaignForm;
