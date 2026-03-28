import spellData from '../data/spells.json';

// Spell validation schema per docs/spell_data_validation.md
const SPELL_FIELDS = {
  required: ['name', 'level', 'school', 'ritual', 'castingTime', 'range', 'components', 'duration', 'description'],
  optional: ['higherLevel'],
  types: {
    name: 'string',
    level: 'number',
    school: 'string',
    ritual: 'boolean',
    castingTime: 'string',
    range: 'string',
    components: 'string',
    duration: 'string',
    description: 'string',
    higherLevel: 'string'
  }
};

// Validation function — throws Error if invalid
const validateSpell = (spell) => {
  if (!spell || typeof spell !== 'object') {
    throw new Error('Spell must be a non-null object');
  }

  // Check required fields
  const missing = SPELL_FIELDS.required.filter(field => !(field in spell));
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(', ')}`);
  }

  // Type validation
  for (const [field, expectedType] of Object.entries(SPELL_FIELDS.types)) {
    if (spell[field] !== undefined && typeof spell[field] !== expectedType) {
      throw new Error(`Field '${field}' expected type '${expectedType}', got '${typeof spell[field]}'`);
    }
  }

  // Validate numeric constraints
  if (spell.level < 0) {
    throw new Error(`Spell level must be non-negative, got ${spell.level}`);
  }
  if (spell.level > 9) {
    throw new Error(`Spell level must be <= 9, got ${spell.level}`);
  }

  // Validate school
  const validSchools = ['Evocation', 'Conjuration', 'Divination', 'Enchantment', 'Illusion', 'Necromancy', 'Transmutation', 'Abjuration'];
  if (!validSchools.includes(spell.school)) {
    throw new Error(`Invalid school '${spell.school}'. Must be one of: ${validSchools.join(', ')}`);
  }

  return true;
};

// Service layer — clean abstraction over spell data
const SpellService = {
  /**
   * Fetches all spells and validates each entry
   * @returns {Promise<Array>} Array of validated spells
   */
  async getAllSpells() {
    try {
      // In production, this would be a real fetch(); for now use parsed JSON
      const spells = spellData.spells || spellData; // handle both formats
      
      if (!Array.isArray(spells)) {
        throw new Error('Spells data must be an array or contain a spells array');
      }

      const validated = spells.map(spell => {
        validateSpell(spell);
        return spell;
      });

      return validated;
    } catch (error) {
      console.error('Error loading spell data:', error.message);
      throw error;
    }
  },

  /**
   * Get a spell by name (case-insensitive match)
   * @param {string} name — spell name
   * @returns {Promise<Object|null>} Spell object or null
   */
  async getSpellByName(name) {
    const spells = await this.getAllSpells();
    const normalized = name.toLowerCase();
    return spells.find(s => s.name.toLowerCase() === normalized) || null;
  },

  /**
   * Filter spells by multiple optional criteria
   * @param {Object} filters - level, school, ritual
   * @returns {Promise<Array>} Filtered spells
   */
  async filterSpells({ level, school, ritual } = {}) {
    const spells = await this.getAllSpells();
    
    return spells.filter(spell => {
      if (level !== undefined && spell.level !== level) return false;
      if (school !== undefined && spell.school !== school) return false;
      if (ritual !== undefined && spell.ritual !== ritual) return false;
      return true;
    });
  }
};

export default SpellService;