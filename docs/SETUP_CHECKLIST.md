# Setup Checklist

This document verifies the development environment before building the D&D campaign manager.

## Prerequisites

- [x] Node.js installed (v18+ recommended)
- [x] npm installed (bundled with Node.js)
- [x] System `PATH` includes Node.js and npm binaries
- [x] Network access to npm registry (registry.npmjs.org)
- [x] No firewall or proxy blocking package downloads
- [x] Linux environment confirmed (tested on Ubuntu/Debian-based)

## Verification Steps

Run these commands to confirm setup:

```bash
# Verify Node.js
node --version

# Verify npm
npm --version

# Test npm registry connectivity
curl -s https://registry.npmjs.org/npm > /dev/null && echo 'npm registry reachable'

# Check npm config for proxy settings
npm config get proxy
npm config get https-proxy
```

## Known Issues & Fixes

| Issue | Symptom | Fix |
|-------|---------|-----|
| Node.js not in PATH | `command not found: node` | Add Node.js bin to PATH or reinstall via NodeSource |
| npm registry unreachable | `ECONNREFUSED` on `npm install` | Check firewall, DNS, or set npm proxy |
| Slow downloads | >30s for `npm install` | Use `--cache /tmp` or `--registry https://registry.npmmirror.com` |
| Proxy blocking requests | Connection timeouts during npm install | Set proxy: `npm config set proxy http://proxy:port` |

## Current Environment Status

Verified with:
- Node.js: v25.8.1 (>=20.x LTS requirement met)
- npm: 11.11.1 (>=9.x requirement met)
- Registry connectivity: ✅ reachable
- Proxy configuration: None configured (standard setup)
- PATH includes /usr/local/bin where Node.js is installed
- Network test to registry.npmjs.org: ✅ successful

All prerequisites are satisfied for development. No further configuration needed for PATH or network connectivity.