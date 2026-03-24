# Spell Data Validation Rules

## Scope
Define how the raw spell JSON will be processed before rendering.

## Rules
1. **Mandatory Fields**: `name`, `school`, `level` must exist.
2. **Optional Fields**: If `casting_time` or `duration` is missing, default to "1 action" or "Concentration" respectively.
3. **Source**: Must be a valid string; if empty, mark as "Custom".
4. **Description**: Trim whitespace.
5. **Type Check**: Ensure `type` is either `cantrip` or `spell`.

## Handling Errors
- Log validation errors in a console utility.
- Fallback to "Unknown" for missing metadata.
- Notify developer if >5% of spells fail validation.
