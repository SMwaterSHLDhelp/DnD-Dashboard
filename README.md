# D&D Character Manager

A DM and player companion for managing D&D campaigns, characters, and encounters.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

- Node.js >=20.x LTS (current active LTS)
- npm >=9.x

### Installing

1. Clone the repository
2. Navigate to the project directory
3. Run `npm install`

### Running the App

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.

#### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Development Status

- ✅ Core project structure set up
- ✅ Campaign & Session components (UI complete)
- ✅ NPC & Character tracking forms implemented
- ✅ Timeline/History log working
- ⏳ Combat & Loot tracking in progress
- ⏳ Proxy configuration for multiplayer access (Linux host: 192.168.1.100)

## Multiplayer Access

The development server is accessible over the local network. Ensure your firewall allows traffic on port 3000.

To expose the app to other devices on your LAN, verify:
1. Your Linux machine’s IP address (`ip addr show`)
2. The app starts with `On Your Network: http://<your-ip>:3000`
3. Other devices use that URL in their browser

⚠️ **Production deployment**: Use a reverse proxy (e.g., nginx) with HTTPS for secure multiplayer access.

## Troubleshooting

If you encounter integrity checksum failures:
```
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

## License

MIT
