# D&D Character Manager

A comprehensive dashboard for managing D&D campaigns, characters, sessions, and NPCs.

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

## Project Status

| Feature | Status | Notes |
|---------|--------|-------|
| Campaign Management | ✅ | Basic CRUD operations implemented |
| Character Management | ✅ | Basic CRUD operations implemented |
| NPC Management | ✅ | Basic CRUD operations implemented |
| Session Management | ✅ | Basic CRUD operations implemented |
| Session Planning | ⚠️ | Partially implemented, needs refinement |
| History Log | ⚠️ | Basic functionality, needs enhancement |
| Data Persistence | ❌ | Not implemented yet |
| User Authentication | ❌ | Not implemented yet |
| Export/Import | ❌ | Not implemented yet |

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

## Available Scripts

In the project directory, you can run:

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects the app from Create React App

## Development Status

The project is currently in active development with:
- Basic React structure in place
- Component scaffolding completed
- Data models defined
- Development environment configured

## Next Steps

1. Implement data persistence layer
2. Complete session planning functionality
3. Add history logging enhancements
4. Implement user authentication
5. Add export/import capabilities

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.
