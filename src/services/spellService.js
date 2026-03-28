import spellData from '../data/spells.json';

const validateSpell = (spell) => {
  const requiredFields = ['id', 'name', 'level', 'school', 'castingTime', 'range', 'components', 'duration', 'description'];
  
  const errors = [];
  
  for (const field of requiredFields) {
    if (!spell[field] && field !== 'higherLevel' && field !== 'ritual') {
      errors.push(`Missing required field: ${field}`);
    }
  }
  
  if (typeof spell.level !== 'number' || spell.level < 0 || spell.level > 9) {
    errors.push(`Invalid spell level for spell ${spell.name}`);
  }
  
  const validSchools = ['Abjuration', 'Conjuration', 'Divination', 'Enchantment', 'Evocation', 'Illusion', 'Necromancy', 'Transmutation'];
  if (!validSchools.includes(spell.school)) {
    errors.push(`Invalid school for spell ${spell.name}: ${spell.school}`);
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

const SpellService = {
  getAllSpells: async () => {
    try {
      // Simulate async fetch with immediate return
      const spells = Array.isArray(spellData) ? spellData : [spellData];
      
      // Validate each spell
      const validatedSpells = spells.map(spell => {
        const validation = validateSpell(spell);
        if (!validation.valid) {
          console.warn(`Spell validation failed for ${spell.name}:`, validation.errors);
        }
        return spell;
      });
      
      return validatedSpells;
    } catch (error) {
      console.error('Error fetching spells:', error);
      throw new Error('Failed to load spell data');
    }
  },

  getSpellById: async (id) => {
    try {
      const spells = await SpellService.getAllSpells();
      const spell = spells.find(s => s.id === id);
      
      if (!spell) {
        throw new Error(`Spell with ID '${id}' not found`);
      }
      
      return spell;
    } catch (error) {
      console.error(`Error fetching spell with ID ${id}:`, error);
      throw error;
    }
  },

  getSpellsByLevel: async (level) => {
    try {
      const spells = await SpellService.getAllSpells();
      return spells.filter(spell => spell.level === level);
    } catch (error) {
      console.error(`Error filtering spells by level ${level}:`, error);
      throw error;
    }
  },

  searchSpells: async (query) => {
    try {
      const spells = await SpellService.getAllSpells();
      const lowerQuery = query.toLowerCase();
      
      return spells.filter(spell => {
        return spell.name.toLowerCase().includes(lowerQuery) ||
               spell.description.toLowerCase().includes(lowerQuery) ||
               spell.school.toLowerCase().includes(lowerQuery);
      });
    } catch (error) {
      console.error('Error searching spells:', error);
      throw error;
    }
  }
};

export default SpellService;