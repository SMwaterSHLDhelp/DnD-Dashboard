# D&D Character Manager

A web application for managing Dungeons & Dragons campaigns, characters, and NPCs.

## Features

- **Campaign Management**
  - Create, read, update, delete campaigns
  - Track campaign progress and details

- **Character Management**
  - Manage player characters with full stats
  - Track character progression

- **NPC Management**
  - Create and manage non-player characters
  - Track NPC relationships and backstories

- **Session Management**
  - Plan and track game sessions
  - Log session details and outcomes

- **Session Planning**
  - Visual session planner with timeline
  - Integration with campaign and character data

- **History Log**
  - Track all changes and events
  - Maintain audit trail of modifications

## Project Structure

```
src/
├── components/
│   ├── CampaignForm.js
│   ├── CampaignList.js
│   ├── CharacterForm.js
│   ├── CharacterList.js
│   ├── HistoryLog.js
│   ├── NPCForm.js
│   ├── NPCList.js
│   ├── SessionForm.js
│   ├── SessionList.js
│   └── SessionPlanner.js
├── models/
│   ├── Campaign.js
│   └── Session.js
└── App.js
```

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development server with `npm start`

## Technologies Used

- React
- JavaScript
- CSS

## License

This project is licensed under the MIT License.