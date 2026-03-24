# D&D Character Manager

A React-based web application for managing Dungeons & Dragons campaigns, sessions, characters, and NPCs.

## Overview

This project provides tools for dungeon masters and players to track campaigns, sessions, player characters, and non-player characters (NPCs). It features a clean, responsive interface built with React and is designed to be easily extensible for future D&D tools.

## Features

### Implemented Features
- **Timeline/History Log** - Track campaign events and session history
- **NPC Tracker** - Create, edit, and manage NPCs with stats, combat info, and session history
- **Player & Character Tracking** - Create and manage player characters with full D&D stats
- **Campaign Management** - Create and manage campaigns
- **Session Management** - Track sessions with date, location, participants, and notes
- **Session Planner** - Prepare sessions with encounters, NPCs, and plot points

### Planned Features
- Combat & Encounter Tools
- Loot & Inventory Management
- Rules Reference
- Notes & Secrets
- Random Generators

## Project Status

| Feature | Status | Priority |
|---------|--------|----------|
| Campaign & World Building | Todo | High |
| Session Management | Todo | High |
| NPC Tracker | Done (UI) | Medium |
| Player & Character Tracking | Done (UI) | Medium |
| Combat & Encounter Tools | Backlog | Medium |
| Loot & Inventory | Backlog | Low |
| Rules Reference | Backlog | Low |
| Notes & Secrets | Backlog | Low |
| Timeline/History Log | Done | Medium |
| Random Generators | Backlog | Low |

## Tech Stack

- **Frontend Framework**: React 18.3.1
- **Styling**: CSS (custom)
- **Build Tool**: Create React App (react-scripts)
- **State Management**: Local component state (planned: Context API or Redux for complex state)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Project Structure

```
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── CampaignForm.js
│   │   ├── CampaignList.js
│   │   ├── CharacterForm.js
│   │   ├── CharacterList.js
│   │   ├── HistoryLog.js
│   │   ├── NPCForm.js
│   │   ├── NPCList.js
│   │   ├── SessionForm.js
│   │   ├── SessionList.js
│   │   └── SessionPlanner.js
│   ├── models/
│   │   ├── Campaign.js
│   │   └── Session.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── docs/
│   ├── DEVELOPMENT_TASKS.md
│   ├── MISSING_FILES_FIX.md
│   └── PROJECT_STATUS.md
├── package.json
├── README.md
└── LICENSE
```

## Development

### Running Tests

```bash
npm test
```

### Building for Production

```bash
npm run build
```

## Contributing

This is an active development project. Future contributions are welcome via pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [React](https://reactjs.org/)
- Designed for D&D 5e but can be adapted for other systems
