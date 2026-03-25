import React, { useState } from 'react';

const MonsterStatBlock = ({ monster, onAdd }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const abilities = {
    strength: { score: monster.strength || 10, mod: Math.floor((monster.strength || 10) / 2 - 5) },
    dexterity: { score: monster.dexterity || 10, mod: Math.floor((monster.dexterity || 10) / 2 - 5) },
    constitution: { score: monster.constitution || 10, mod: Math.floor((monster.constitution || 10) / 2 - 5) },
    intelligence: { score: monster.intelligence || 10, mod: Math.floor((monster.intelligence || 10) / 2 - 5) },
    wisdom: { score: monster.wisdom || 10, mod: Math.floor((monster.wisdom || 10) / 2 - 5) },
    charisma: { score: monster.charisma || 10, mod: Math.floor((monster.charisma || 10) / 2 - 5) },
  };

  const abilityModDisplay = (mod) => (mod >= 0 ? `+${mod}` : mod.toString());

  return (
    <div className="monster-stat-block">
      <div className="stat-block-header">
        <h3>{monster.name}</h3>
        <span className="monster-type">
          {monster.size || 'Medium'} {monster.type || 'humanoid'}, {monster.alignment || 'neutral'}
        </span>
        <button onClick={() => onAdd(monster)} className="add-combatant-btn">+ Combat</button>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="expand-btn"
        >
          {isExpanded ? '−' : '+'}
        </button>
      </div>

      <div className="stat-block-summary">
        <div className="summary-row">
          <span>AC {monster.armorClass || 10}</span>
          <span>HP {monster.hitPoints || 1} ({monster.hitDice || '1d8'})</span>
          <span>Speed {monster.speed || '30 ft'}</span>
        </div>
        <div className="summary-row">
          <span>STR {abilities.strength.score} ({abilityModDisplay(abilities.strength.mod)})</span>
          <span>DEX {abilities.dexterity.score} ({abilityModDisplay(abilities.dexterity.mod)})</span>
          <span>CON {abilities.constitution.score} ({abilityModDisplay(abilities.constitution.mod)})</span>
          <span>INT {abilities.intelligence.score} ({abilityModDisplay(abilities.intelligence.mod)})</span>
          <span>WIS {abilities.wisdom.score} ({abilityModDisplay(abilities.wisdom.mod)})</span>
          <span>CHA {abilities.charisma.score} ({abilityModDisplay(abilities.charisma.mod)})</span>
        </div>
        <div className="summary-row">
          <span>Save: {monster.savingThrows || '—'}</span>
          <span>Skill: {monster.skills || '—'}</span>
          <span>Challenge {monster.challengeRating || '0'}</span>
        </div>
      </div>

      {isExpanded && (
        <div className="stat-block-details">
          <h4>Damage Vulnerabilities</h4>
          <p>{monster.damageVulnerabilities || '—'}</p>

          <h4>Damage Resistances</h4>
          <p>{monster.damageResistances || '—'}</p>

          <h4>Damage Immunities</h4>
          <p>{monster.damageImmunities || '—'}</p>

          <h4>Condition Immunities</h4>
          <p>{monster.conditionImmunities || '—'}</p>

          <h4>Senses</h4>
          <p>{monster.senses || 'passive Perception ' + (10 + (abilities.wisdom.mod || 0))}</p>

          <h4>Languages</h4>
          <p>{monster.languages || '—'}</p>

          <h4>Traits</h4>
          <ul>
            {monster.traits?.map((trait, i) => (
              <li key={i}>
                <strong>{trait.name}.</strong> {trait.description}
              </li>
            )) || <li>No special traits</li>}
          </ul>

          <h4>Actions</h4>
          <ul>
            {monster.actions?.map((action, i) => (
              <li key={i}>
                <strong>{action.name}.</strong> {action.description}
              </li>
            )) || <li>No actions</li>}
          </ul>

          <h4>Reactions</h4>
          <p>{monster.reactions || '—'}</p>
        </div>
      )}
    </div>
  );
};

export default MonsterStatBlock;
