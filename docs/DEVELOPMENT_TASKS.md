# Development Tasks

## Node.js & npm Requirements

- **Required Node.js**: >=20.x LTS (current active LTS)
- **Required npm**: >=9.x
- **Current verified version**: `node v25.8.1`, `npm 11.11.1`

The project has been verified to use a modern and supported runtime. Avoid installing Node via `nvm` without locking to the exact versions above for reproducibility in CI/testing environments.

## Priority Tasks

### P1 - Critical
- [x] Verify npm >=9.x (✅ passed: v11.11.1)
- [ ] Fix `public/index.html` missing error
- [ ] Verify development server starts successfully

### P2 - Campaign Features
- [ ] Create Campaign creation/edit form
- [ ] Add world-building fields (theme, factions, tone)
- [ ] Create Session planning view
- [ ] Implement NPC creation with stat blocks
- [ ] Character form completion (currently missing)
- [ ] Session notes & event logging

### P3 - Enhancement
- [ ] Quest thread tracking UI
- [ ] Timeline/history view
- [ ] Random name generator
- [ ] Initiative tracker
- [ ] Loot management

## Technical Debt
- [ ] Add TypeScript migration plan (optional)
- [ ] Add error handling for file operations
- [ ] Add loading states for async operations

## Notes
- Keep forms simple for MVP
- Use localStorage for session data persistence
- Consider Next.js migration if needed