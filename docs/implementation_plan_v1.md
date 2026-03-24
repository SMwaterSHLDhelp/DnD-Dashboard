# Rules Reference Sidebar Implementation Plan

## Objective
Implement the Rules Reference sidebar component to allow the DM to quickly look up spell mechanics and effects during gameplay.

## Components Required
1. **Search Bar**: Allows filtering spells by name or description.
2. **Filter Controls**: Dropdowns for Class, School, Level, and Source.
3. **Spell List**: Collapsible accordion items for each spell.
4. **Detail View**: Modal or expanded view for specific spell rules.

## Data Integration
- Ingest spell data from the provided JSON structure.
- Normalize spell keys (e.g., `name` vs `title`)
- Handle missing `casting_time` or `duration` gracefully.

## UI/UX Requirements
- Sidebar must be sticky or collapsible within the main layout.
- Search must be debounce-friendly for performance.
- Accessibility: Keyboard navigable, ARIA labels for inputs.

## Dependencies
- `docs/rules_reference_spec.md`
- `docs/spell_data_validation.md`

## Milestones
- **Day 1**: Setup component structure + Data fetching
- **Day 2**: Implement Search/Filter logic
- **Day 3**: Polish UI/UX + Accessibility
