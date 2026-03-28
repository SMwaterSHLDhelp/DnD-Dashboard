import { useState } from 'react';
import { Navbar, NavbarContent, NavbarItem, Button, Link, Dropdown, DropdownTrigger, DropdownMenu, DropdownSection } from "@heroui/react";
import CampaignList from './components/CampaignList.jsx';
import SessionTimeline from './components/SessionTimeline.jsx';
import NPCList from './components/NPCList.jsx';
import CharacterList from './components/CharacterList.jsx';
import LootInventory from './components/LootInventory.jsx';
import RulesReference from './components/RulesReference.jsx';
import CampaignForm from './components/CampaignForm.jsx';
import SessionForm from './components/SessionForm.jsx';
import NPCForm from './components/NPCForm.jsx';
import CharacterForm from './components/CharacterForm.jsx';
import CombatTracker from './components/CombatTracker.jsx';

function App() {
  const [activeView, setActiveView] = useState('campaign');
  const [campaigns, setCampaigns] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [npcs, setNpcs] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [loot, setLoot] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [combatants, setCombatants] = useState([]);
  const [combatTurn, setCombatTurn] = useState(0);
  const [dmNotes, setDmNotes] = useState([]);
  const [campaignId, setCampaignId] = useState(null);
  const [showCampaignForm, setShowCampaignForm] = useState(false);
  const [showSessionForm, setShowSessionForm] = useState(false);
  const [showNpcForm, setShowNpcForm] = useState(false);
  const [showCharacterForm, setShowCharacterForm] = useState(false);

  const campaignList = campaigns.map(campaign => ({
    id: campaign.id,
    title: campaign.title,
    description: campaign.description,
    status: campaign.status,
    date: campaign.date
  }));

  const sessionList = sessions.map(session => ({
    id: session.id,
    title: session.title,
    campaignId: session.campaignId,
    date: session.date,
    status: session.status,
    notes: session.notes
  }));

  const npcList = npcs.map(npc => ({
    id: npc.id,
    name: npc.name,
    description: npc.description,
    role: npc.role,
    status: npc.status,
    campaignId: npc.campaignId
  }));

  const characterList = characters.map(character => ({
    id: character.id,
    name: character.name,
    class: character.class,
    level: character.level,
    race: character.race,
    backstory: character.backstory,
    player: character.player
  }));

  const lootList = loot.map(item => ({
    id: item.id,
    name: item.name,
    type: item.type,
    quantity: item.quantity,
    description: item.description,
    campaignId: item.campaignId
  }));

  const handleAddCampaign = (campaign) => {
    setCampaigns([...campaigns, { ...campaign, id: Date.now() }]);
    setShowCampaignForm(false);
  };

  const handleAddSession = (session) => {
    setSessions([...sessions, { ...session, id: Date.now() }]);
    setShowSessionForm(false);
  };

  const handleAddNpc = (npc) => {
    setNpcs([...npcs, { ...npc, id: Date.now() }]);
    setShowNpcForm(false);
  };

  const handleAddCharacter = (character) => {
    setCharacters([...characters, { ...character, id: Date.now() }]);
    setShowCharacterForm(false);
  };

  const handleViewChange = (view) => {
    setActiveView(view);
  };

  return (
    <div className="flex h-screen flex-col">
      <Navbar>
        <NavbarContent>
          <NavbarItem>
            <Link color="foreground" href="#">
              D&D Campaign Manager
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button
              as={Link}
              color="primary"
              variant="flat"
              onClick={() => setShowCampaignForm(true)}
            >
              Add Campaign
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <div className="flex flex-1">
        <div className="w-64 border-r border-gray-200 bg-white">
          <div className="p-4">
            <h2 className="text-lg font-bold">Navigation</h2>
            <ul className="space-y-2">
              <li>
                <Button
                  color={activeView === 'campaign' ? 'primary' : 'default'}
                  variant="flat"
                  onClick={() => handleViewChange('campaign')}
                >
                  Campaigns
                </Button>
              </li>
              <li>
                <Button
                  color={activeView === 'sessions' ? 'primary' : 'default'}
                  variant="flat"
                  onClick={() => handleViewChange('sessions')}
                >
                  Sessions
                </Button>
              </li>
              <li>
                <Button
                  color={activeView === 'npcs' ? 'primary' : 'default'}
                  variant="flat"
                  onClick={() => handleViewChange('npcs')}
                >
                  NPCs
                </Button>
              </li>
              <li>
                <Button
                  color={activeView === 'characters' ? 'primary' : 'default'}
                  variant="flat"
                  onClick={() => handleViewChange('characters')}
                >
                  Characters
                </Button>
              </li>
              <li>
                <Button
                  color={activeView === 'loot' ? 'primary' : 'default'}
                  variant="flat"
                  onClick={() => handleViewChange('loot')}
                >
                  Loot & Inventory
                </Button>
              </li>
              <li>
                <Button
                  color={activeView === 'rules' ? 'primary' : 'default'}
                  variant="flat"
                  onClick={() => handleViewChange('rules')}
                >
                  Rules Reference
                </Button>
              </li>
              <li>
                <Button
                  color={activeView === 'combat' ? 'primary' : 'default'}
                  variant="flat"
                  onClick={() => handleViewChange('combat')}
                >
                  Combat Tracker
                </Button>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          {activeView === 'campaign' && (
            <div>
              <div className="mb-4">
                <Button
                  color="primary"
                  onClick={() => setShowCampaignForm(true)}
                >
                  Add Campaign
                </Button>
              </div>
              <CampaignList campaigns={campaignList} onCampaignClick={(campaign) => {
                setCampaignId(campaign.id);
                setActiveView('campaign-details');
              }} />
            </div>
          )}

          {activeView === 'campaign-details' && campaignId && (
            <CampaignList campaigns={campaignList} campaignId={campaignId} />
          )}

          {activeView === 'sessions' && (
            <div>
              <div className="mb-4">
                <Button
                  color="primary"
                  onClick={() => setShowSessionForm(true)}
                >
                  Add Session
                </Button>
              </div>
              <SessionTimeline sessions={sessionList} />
            </div>
          )}

          {activeView === 'npcs' && (
            <div>
              <div className="mb-4">
                <Button
                  color="primary"
                  onClick={() => setShowNpcForm(true)}
                >
                  Add NPC
                </Button>
              </div>
              <NPCList npcs={npcList} />
            </div>
          )}

          {activeView === 'characters' && (
            <div>
              <div className="mb-4">
                <Button
                  color="primary"
                  onClick={() => setShowCharacterForm(true)}
                >
                  Add Character
                </Button>
              </div>
              <CharacterList characters={characterList} />
            </div>
          )}

          {activeView === 'loot' && (
            <div>
              <div className="mb-4">
                <Button
                  color="primary"
                  onClick={() => setShowCharacterForm(true)}
                >
                  Add Loot
                </Button>
              </div>
              <LootInventory loot={lootList} />
            </div>
          )}

          {activeView === 'rules' && (
            <div>
              <RulesReference />
            </div>
          )}

          {activeView === 'combat' && (
            <div>
              <CombatTracker combatants={combatants} turn={combatTurn} />
              <Button
                className="mt-4"
                color="primary"
                onClick={() => {
                  const newCombatant = {
                    id: Date.now(),
                    name: 'Goblin',
                    initiative: Math.floor(Math.random() * 20) + 1,
                    hp: 7,
                    maxHp: 7,
                    status: []
                  };
                  setCombatants([...combatants, newCombatant]);
                }}
              >
                Add Combatant
              </Button>
            </div>
          )}
        </div>
      </div>

      {showCampaignForm && (
        <CampaignForm
          onSubmit={handleAddCampaign}
          onClose={() => setShowCampaignForm(false)}
        />
      )}

      {showSessionForm && (
        <SessionForm
          onSubmit={handleAddSession}
          onClose={() => setShowSessionForm(false)}
        />
      )}

      {showNpcForm && (
        <NPCForm
          onSubmit={handleAddNpc}
          onClose={() => setShowNpcForm(false)}
        />
      )}

      {showCharacterForm && (
        <CharacterForm
          onSubmit={handleAddCharacter}
          onClose={() => setShowCharacterForm(false)}
        />
      )}
    </div>
  );
}

export default App;