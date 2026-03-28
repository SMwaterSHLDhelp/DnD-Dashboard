import React from 'react';

const MonsterStatBlock = ({ monster = {} }) => {
  const {
    name = 'Unknown Monster',
    size = 'Medium',
    type = 'Humanoid',
    alignment = 'Neutral',
    armorClass = 10,
    hitPoints = 10,
    speed = '30 ft',
    strength = 10,
    dexterity = 10,
    constitution = 10,
    intelligence = 10,
    wisdom = 10,
    charisma = 10,
    savingThrows = [],
    skills = [],
    senses = [],
    languages = [],
    challengeRating = '0',
    abilities = [],
    actions = [],
    bonusActions = [],
    reactions = []
  } = monster;

  const abilityModifier = (score) => {
    const mod = Math.floor((score - 10) / 2);
    return mod >= 0 ? `+${mod}` : mod.toString();
  };

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-2">{name}</h2>
      
      <div className="grid grid-cols-3 gap-2 mb-4 text-sm">
        <div><strong>Size:</strong> {size}</div>
        <div><strong>Type:</strong> {type}</div>
        <div><strong>Alignment:</strong> {alignment}</div>
        <div><strong>AC:</strong> {armorClass}</div>
        <div><strong>HP:</strong> {hitPoints}</div>
        <div><strong>Speed:</strong> {speed}</div>
      </div>

      <div className="grid grid-cols-6 gap-2 mb-4 text-center">
        <div>
          <div className="font-bold">STR</div>
          <div>{strength}</div>
          <div className="text-sm">{abilityModifier(strength)}</div>
        </div>
        <div>
          <div className="font-bold">DEX</div>
          <div>{dexterity}</div>
          <div className="text-sm">{abilityModifier(dexterity)}</div>
        </div>
        <div>
          <div className="font-bold">CON</div>
          <div>{constitution}</div>
          <div className="text-sm">{abilityModifier(constitution)}</div>
        </div>
        <div>
          <div className="font-bold">INT</div>
          <div>{intelligence}</div>
          <div className="text-sm">{abilityModifier(intelligence)}</div>
        </div>
        <div>
          <div className="font-bold">WIS</div>
          <div>{wisdom}</div>
          <div className="text-sm">{abilityModifier(wisdom)}</div>
        </div>
        <div>
          <div className="font-bold">CHA</div>
          <div>{charisma}</div>
          <div className="text-sm">{abilityModifier(charisma)}</div>
        </div>
      </div>

      {abilities.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold mb-1">Abilities</h3>
          {abilities.map((ability, i) => (
            <div key={i} className="mb-2 text-sm">
              <span className="font-medium">{ability.name}:</span> {ability.description}
            </div>
          ))}
        </div>
      )}

      {actions.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold mb-1">Actions</h3>
          {actions.map((action, i) => (
            <div key={i} className="mb-2 text-sm">
              <span className="font-medium">{action.name}:</span> {action.description}
            </div>
          ))}
        </div>
      )}

      {bonusActions.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold mb-1">Bonus Actions</h3>
          {bonusActions.map((action, i) => (
            <div key={i} className="mb-2 text-sm">
              <span className="font-medium">{action.name}:</span> {action.description}
            </div>
          ))}
        </div>
      )}

      {reactions.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold mb-1">Reactions</h3>
          {reactions.map((reaction, i) => (
            <div key={i} className="mb-2 text-sm">
              <span className="font-medium">{reaction.name}:</span> {reaction.description}
            </div>
          ))}
        </div>
      )}

      {challengeRating && (
        <div className="text-sm">
          <strong>Challenge:</strong> {challengeRating}
        </div>
      )}
    </div>
  );
};

export default MonsterStatBlock;