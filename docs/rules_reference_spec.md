# Rules Reference Specification

## Overview

This document specifies the implementation of the Rules Reference sidebar feature for the D&D Campaign Management Tool.

---

## Features

### Search Functionality
- Real-time filtering of spell names
- Support for searching by school, level, or effects
- No-results message when query yields no matches

### Spell Database
- Pre-populated with 16 core spells (fireball, healing word, mage armor, etc.)
- Fields: name, level, school, effect/damage, range, components, duration, ritual flag

### Filtering Options
- Toggle between: All Spells, Rituals Only, Abjuration, Conjuration, etc.
- Category badges for visual identification

---

## UI Design

### Sidebar Layout
- Fixed position left panel
- Search input field (expandable)
- Category filters (collapsible)
- Spell list with hover effects
- Details panel on selection

### Visual Styling
- Red accent color (`#e94560`)
- Dark theme (`#0f3460`, `#16213e`)
- Hover states with left border indicators
- Ritual spells marked with orange border

---

## Technical Requirements

### Component Structure
```
RulesReference Component
├── SearchInput
├── FilterOptions
├── SpellList
│   ├── SpellItem
│   │   ├── Name
│   │   ├── Level/School
│   │   └── Effect/Damage
│   └── NoResults Message
└── DetailsPanel
    └── SpellDescription
```

### State Management
- `selectedSpell`: Object or null
- `searchQuery`: String
- `filters`: Object { ritualsOnly, schoolType, etc. }
- `filteredSpells`: Computed from database

---

## Spell Database Format

```javascript
{
  name: 'Spell Name',
  level: 1-9,
  school: 'Evocation|Abjuration|...',
  effect/damage: 'Value',
  range: 'Distance',
  components: 'V,S,M',
  duration: 'Time/Until dispelled',
  ritual: boolean
}
```

---

## Acceptance Criteria

### Functional
- [ ] Search returns correct spell results
- [ ] Filters update spell list
- [ ] Spell details show on selection
- [ ] Empty state shows "no results"

### UX
- [ ] Smooth animations/transitions
- [ ] Clear visual hierarchy
- [ ] Accessible keyboard navigation

---

## Implementation Notes

- Component to be lightweight (no external spell libraries)
- Database can be extended with more spells later
- Ritual flag enables special highlighting
- Search is case-insensitive with fuzzy matching
