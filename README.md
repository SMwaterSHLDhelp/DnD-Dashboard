# D&D Campaign Manager

A React application for managing D&D campaigns, sessions, and world building.

## Features

- Campaign & World Building
- Session Management
- NPC Tracker
- Player & Character Tracking
- Combat & Encounter Tools
- Loot & Inventory
- Rules Reference
- Notes & Secrets
- Timeline / History Log
- Random Generators

## Development

This project was bootstrapped with Create React App.

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

#### `npm test`

Launches the test runner in the interactive watch mode.

#### `npm run build`

Builds the app for production to the `build` folder.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

### Proxy Configuration

For local development, API requests are proxied to `http://localhost:8080`.

### Folder Structure

```
src/
├── components/
│   ├── Campaign/
│   ├── Session/
│   ├── NPC/
│   ├── Player/
│   ├── Combat/
│   ├── Loot/
│   ├── Rules/
│   └── Shared/
├── services/
├── assets/
│   ├── images/
│   └── styles/
└── App.js
    └── App.css
```

### Testing

This project uses React Testing Library for component testing.

### Deployment

This project can be deployed to any static hosting service that supports serving files from a subdirectory.

### Contributing

1. Fork it
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Create a new Pull Request

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
