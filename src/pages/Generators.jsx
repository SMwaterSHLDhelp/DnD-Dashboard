import React, { useState } from 'react';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Button, 
  Select, 
  SelectItem, 
  Tab, 
  Tabs, 
  Divider,
  Spacer,
  Input
} from '@heroui/react';

// ============ Utility: Deterministic pseudo-random (seeded) ============
// Simple LCG for reproducible results (not cryptographically secure)
class SeededRandom {
  constructor(seed = Date.now().toString()) {
    this.seed = this.hashString(seed);
  }

  hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }

  next() {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }

  choice(arr) {
    return arr[Math.floor(this.next() * arr.length)];
  }

  range(min, max) {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }
}

// ============ Data: Generator Databases ============
const FIRST_NAMES = {
  human: ['Arin', 'Brenna', 'Caelan', 'Dara', 'Evan', 'Fiona', 'Gareth', 'Hazel', 'Ivor', 'Jessa', 'Kael', 'Lira'],
  elf: ['Aerendil', 'Baelen', 'Celeborn', 'Delwen', 'Eärwen', 'Finarfin', 'Galadriel', 'Haldir', 'Imrahil', 'Legolas', 'Mithrellas', 'Thranduil'],
  dwarf: ['Balin', 'Dwalin', 'Fili', 'Gloin', 'Kili', 'Nain', 'Norri', 'Ori', 'Dori', 'Balin', 'Bifur', 'Bofur'],
  halfling: ['Adala', 'Bruno', 'Caelum', 'Dorothy', 'Elmo', 'Fenella', 'Gilbert', 'Hilda', 'Ivor', 'Largo', 'Milo', 'Nora'],
  orc: ['Grak', 'Snarl', 'Gor', 'Mug', 'Zog', 'Thrak', 'Grim', 'Uzg', 'Blok', 'Razg', 'Shat', 'Thrak'],
  gnome: ['Alaric', 'Bram', 'Cory', 'Dunn', 'Elric', 'Finn', 'Glim', 'Jed', 'Kip', 'Lorin', 'Ned', 'Osric']
};

const LAST_NAMES = {
  human: ['Smith', 'Miller', 'Jones', 'Baker', 'Cooper', 'Hawthorne', 'Feldman', 'Greene', 'Whitaker', 'Hale', 'Cole', 'Stark'],
  elf: ['Fenris', 'Moonwhisper', 'Starweaver', 'Silverleaf', 'Dawnbreaker', 'Windrunner', 'Thorne', 'Briar', 'River', 'Crown'],
  dwarf: ['Ironheart', 'Stonefist', 'Beardbraid', 'Deepdelver', 'Hammerhold', 'Shieldwall', 'Moundward', 'Stonehand'],
  halfling: ['Baggins', 'Bolger', 'Bracegirdle', 'Brandybuck', 'Gamgee', 'Goodearth', 'Maggot', 'Tock', 'Waterleaf'],
  orc: ['Goregrit', 'Skullcrusher', 'Bloodfang', 'Warstomp', 'Baneblade', 'Maulfang', 'Ragehowl', 'Deathkrush'],
  gnome: ['Brightwood', 'Sparkfizzle', 'Tinkerbell', 'Gadgetsmith', 'Wicklight', 'Glimmerdust', 'Whizbang', 'Tumbleton']
};

const TAVERN_NAMES = [
  'The Rusty Tankard', 'The Golden Griffin', 'The Drunken Dragon', 'The Firing Forge',
  'The Moonlit Muse', 'The Emerald Rose', 'The Crow\'s Nest', 'The Wandering Wanderer',
  'The Last Resort', 'The Shattered Shield', 'The Whispering Oak', 'The Gilded Galleon',
  'The Iron Boar', 'The Singing Sword', 'The Starry Vault', 'The Blackened Candle'
];

const TAVERN_OWNERS = {
  human: ['Bartholomew', 'Celia', 'Darius', 'Edna', 'Garrett', 'Helena'],
  dwarf: ['Durgin', 'Fjord', 'Grundig', 'Kragg', 'Rognar'],
  halfling: ['Gilly', 'Marmaduke', 'Nance', 'Peregrin'],
  elf: ['Aelar', 'Branwen', 'Caelira', 'Darien'],
  orc: ['Grak', 'Mog', 'Shat', 'Thrak'],
  gnome: ['Blick', 'Flik', 'Zipp', 'Zorvo']
};

const TAVERN_SPECIALTIES = [
  'spiced lamb stew', 'maple-pecan pie', 'smoked elk ribs', 'forest berry cobbler',
  'honeyed ale', 'dwarven stout', 'elffruit wine', 'spiced rum punch',
  'roasted root vegetables', 'venison sausages', 'crusty sourdough bread'
];

const TAVERN_AMBIANCE = [
  'crackling fireplace', 'lute music in the corner', 'rain tapping on windows',
  'overhead lanterns swaying', 'a scent of roasted meat', 'warm wood smoke',
  'a bard performing a ballad', 'a chessboard with a tense match',
  'low booths for private talks', 'a jukebox playing old folk tunes'
];

const WEATHER_CONDITIONS = ['clear', 'cloudy', 'rainy', 'stormy', 'snowy', 'foggy', 'windy'];
const TERRAIN_WEIGHTS = {
  plains: { clear: 0.3, cloudy: 0.3, rainy: 0.2, stormy: 0.1, foggy: 0.1, wind: 0.1 },
  forest: { cloudy: 0.3, foggy: 0.3, rainy: 0.2, clear: 0.1, stormy: 0.05, snowy: 0.05 },
  mountain: { windy: 0.3, cloudy: 0.3, snowy: 0.2, foggy: 0.1, clear: 0.05, stormy: 0.05 },
  desert: { clear: 0.6, cloudy: 0.2, foggy: 0.05, sandstorm: 0.15, windy: 0.1 },
  swamp: { foggy: 0.4, cloudy: 0.3, rainy: 0.2, clear: 0.1, stormy: 0.0 },
  arctic: { snowy: 0.4, cloudy: 0.3, clear: 0.2, foggy: 0.1, wind: 0.0 }
};

const ENCOUNTER_RARITY = ['trivial', 'low', 'medium', 'high', 'deadly'];
const TERRAINS = ['plains', 'forest', 'mountain', 'desert', 'swamp', 'arctic'];

const MONSTERS = {
  plains: [
    { name: 'Giant Eagle', cr: 2 }, { name: 'Lion', cr: 1 },
    { name: 'Kobold Swarm', cr: 0.25 }, { name: 'Bandit Captain', cr: 2 },
    { name: 'Hawk', cr: 0 }, { name: 'Nomadic Trader', cr: 0 }
  ],
  forest: [
    { name: 'Brown Bear', cr: 3 }, { name: 'Worg', cr: 2 },
    { name: 'Drow', cr: 2 }, { name: 'Giant Snake', cr: 2 },
    { name: 'Elven Scout', cr: 1 }, { name: 'Snej (owl)', cr: 0 }
  ],
  mountain: [
    { name: 'Eagle', cr: 0 }, { name: 'Giant Goat', cr: 2 },
    { name: 'Stone Giant', cr: 9 }, { name: 'Goblin Scout', cr: 0.25 },
    { name: 'Rock Golem', cr: 5 }, { name: 'Minotaur', cr: 3 }
  ],
  desert: [
    { name: 'Carnivorous Monkey', cr: 0.5 }, { name: 'Purple Worm', cr: 21 },
    { name: 'Marilith', cr: 16 }, { name: 'Vulture', cr: 0 },
    { name: 'Nomadic Merchant', cr: 0.5 }, { name: 'Efreeti', cr: 11 }
  ],
  swamp: [
    { name: 'Otyugh', cr: 5 }, { name: 'Bulette', cr: 5 },
    { name: 'Drowned Zombie', cr: 0.25 }, { name: 'Siren', cr: 3 },
    { name: 'Giant Toad', cr: 1 }, { name: 'Swamp Gas', cr: 0 }
  ],
  arctic: [
    { name: 'Polar Bear', cr: 3 }, { name: 'Ice Mephit', cr: 2 },
    { name: 'White Dragon', cr: 9 }, { name: 'Winter Wolf', cr: 3 },
    { name: 'Snow Owlbear', cr: 5 }, { name: 'Yeti', cr: 6 }
  ]
};

const TREASURE_TYPES = ['coins', 'gems', 'artifacts', 'jewelry', 'potions', 'scrolls', 'wondrous items', 'magic weapons'];
const RARITY_MULTIPLIERS = {
  common: 1,
  uncommon: 3,
  rare: 10,
  veryRare: 25,
  legendary: 100
};
const RARITY = ['common', 'uncommon', 'rare', 'veryRare', 'legendary'];

// ============ Generators ============

const NameGenerator = ({ race = 'human', count = 1 }) => {
  const [seed, setSeed] = useState(Date.now().toString());
  const [result, setResult] = useState([]);

  const generate = () => {
    const rng = new SeededRandom(seed);
    const firstNames = FIRST_NAMES[race] || FIRST_NAMES.human;
    const lastNames = LAST_NAMES[race] || LAST_NAMES.human;
    const names = [];
    for (let i = 0; i < count; i++) {
      const first = rng.choice(firstNames);
      const last = rng.choice(lastNames);
      names.push(`${first} ${last}`);
    }
    setResult(names);
  };

  return (
    <Card>
      <CardHeader className="font-semibold">Name Generator</CardHeader>
      <CardBody>
        <div className="flex flex-col gap-2">
          <Select
            label="Race"
            value={race}
            onChange={(e) => setSeed(e.target.value + Date.now())}
            className="max-w-xs"
          >
            {Object.keys(FIRST_NAMES).map((r) => (
              <SelectItem key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</SelectItem>
            ))}
          </Select>
          <div>
            <label className="text-sm">Names to generate:</label>
            <Input
              type="number"
              min="1"
              max="10"
              defaultValue={count}
              onChange={(e) => setSeed(seed + '|' + e.target.value)}
            />
          </div>
          <Button onPress={generate}>Generate Names</Button>
          {result.length > 0 && (
            <div className="mt-3">
              <h4 className="font-semibold">Results:</h4>
              <ul className="list-disc pl-5">
                {result.map((n, i) => (
                  <li key={i}>{n}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

const TavernGenerator = () => {
  const [seed, setSeed] = useState(Date.now().toString());
  const [result, setResult] = useState(null);

  const generate = () => {
    const rng = new SeededRandom(seed);
    const name = rng.choice(TAVERN_NAMES);
    const owners = Object.values(TAVERN_OWNERS).flat();
    const owner = rng.choice(owners);
    const specialty = rng.choice(TAVERN_SPECIALTIES);
    const ambiance = rng.choice(TAVERN_AMBIANCE);
    setResult({ name, owner, specialty, ambiance });
  };

  return (
    <Card>
      <CardHeader className="font-semibold">Tavern Generator</CardHeader>
      <CardBody>
        <div className="flex flex-col gap-2">
          <Button onPress={() => setSeed(Date.now().toString())}>New Random Seed</Button>
          <Button onPress={generate}>Generate Tavern</Button>
          {result && (
            <div className="mt-3">
              <h4 className="font-semibold">Tavern Name:</h4>
              <p>{result.name}</p>
              <h4 className="font-semibold mt-2">Owner:</h4>
              <p>{result.owner}</p>
              <h4 className="font-semibold mt-2">Signature Dish:</h4>
              <p>{result.specialty}</p>
              <h4 className="font-semibold mt-2">Ambiance:</h4>
              <p>{result.ambiance}</p>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

const WeatherGenerator = ({ terrain = 'plains' }) => {
  const [seed, setSeed] = useState(Date.now().toString());
  const [result, setResult] = useState(null);

  const generate = () => {
    const rng = new SeededRandom(seed);
    const weights = TERRAIN_WEIGHTS[terrain] || TERRAIN_WEIGHTS.plains;
    const conditions = Object.keys(weights);
    const totalWeight = conditions.reduce((sum, c) => sum + weights[c], 0);
    let r = rng.next() * totalWeight;
    let selected = 'clear';
    for (const c of conditions) {
      r -= weights[c];
      if (r <= 0) {
        selected = c;
        break;
      }
    }
    // Determine severity/description
    let desc = 'Weather is clear.';
    switch (selected) {
      case 'clear': desc = 'Sunny and pleasant. Good visibility.'; break;
      case 'cloudy': desc = 'Overcast. No precipitation expected.'; break;
      case 'rainy': desc = 'Light to moderate rain. Road conditions slippery.'; break;
      case 'stormy': desc = 'Thunderstorms and high winds. Danger of lightning.'; break;
      case 'snowy': desc = 'Heavy snowfall. Visibility low and roads blocked.'; break;
      case 'foggy': desc = 'Thick fog. Reduced visibility. Navigation penalty.'; break;
      case 'windy': desc = 'Strong winds. Missiles affected and noise carries.'; break;
      case 'sandstorm': desc = 'Severe sandstorm. Blindness risk and movement penalty.'; break;
    }
    setResult({ condition: selected, desc });
  };

  return (
    <Card>
      <CardHeader className="font-semibold">Weather Generator</CardHeader>
      <CardBody>
        <div className="flex flex-col gap-2">
          <Select
            label="Terrain"
            value={terrain}
            onChange={(e) => setSeed(e.target.value + Date.now())}
            className="max-w-xs"
          >
            {Object.keys(TERRAIN_WEIGHTS).map((t) => (
              <SelectItem key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</SelectItem>
            ))}
          </Select>
          <Button onPress={generate}>Generate Weather</Button>
          {result && (
            <div className="mt-3">
              <h4 className="font-semibold">Condition:</h4>
              <p>{result.condition.toUpperCase()}</p>
              <h4 className="font-semibold mt-2">Effect:</h4>
              <p>{result.desc}</p>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

const EncounterGenerator = ({ terrain = 'forest', danger = 'medium' }) => {
  const [seed, setSeed] = useState(Date.now().toString());
  const [result, setResult] = useState(null);

  const generate = () => {
    const rng = new SeededRandom(seed);
    const monsters = MONSTERS[terrain] || MONSTERS.forest;
    // Filter by challenge rating
    let crThreshold;
    switch (danger) {
      case 'trivial': crThreshold = 0.5; break;
      case 'low': crThreshold = 2; break;
      case 'medium': crThreshold = 5; break;
      case 'high': crThreshold = 10; break;
      case 'deadly': crThreshold = 20; break;
      default: crThreshold = 5;
    }
    const filtered = monsters.filter(m => m.cr <= crThreshold);
    const count = rng.range(1, 4);
    const encounter = [];
    for (let i = 0; i < count; i++) {
      const mon = rng.choice(filtered);
      encounter.push(mon);
    }
    setResult({ terrain, danger, count, monsters: encounter });
  };

  return (
    <Card>
      <CardHeader className="font-semibold">Encounter Generator</CardHeader>
      <CardBody>
        <div className="flex flex-col gap-2">
          <Select
            label="Terrain"
            value={terrain}
            onChange={(e) => setSeed(e.target.value + Date.now())}
            className="max-w-xs"
          >
            {TERRAINS.map((t) => (
              <SelectItem key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</SelectItem>
            ))}
          </Select>
          <Select
            label="Danger Level"
            value={danger}
            onChange={(e) => setSeed(e.target.value + Date.now())}
            className="max-w-xs"
          >
            {ENCOUNTER_RARITY.map((d) => (
              <SelectItem key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</SelectItem>
            ))}
          </Select>
          <Button onPress={generate}>Generate Encounter</Button>
          {result && (
            <div className="mt-3">
              <h4 className="font-semibold">Terrain: {result.terrain.toUpperCase()}</h4>
              <p>Danger: {result.danger.toUpperCase()} | Number of Creatures: {result.count}</p>
              <ul className="list-disc pl-5 mt-2">
                {result.monsters.map((m, i) => (
                  <li key={i}>{m.name} (CR {m.cr})</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

const TreasureGenerator = ({ rarity = 'uncommon', type = 'coins' }) => {
  const [seed, setSeed] = useState(Date.now().toString());
  const [result, setResult] = useState(null);

  const generate = () => {
    const rng = new SeededRandom(seed);
    const multiplier = RARITY_MULTIPLIERS[rarity] || 1;
    let items = [];
    let description = '';

    if (type === 'coins') {
      const copper = rng.range(10, 100) * multiplier;
      const silver = rng.range(5, 50) * multiplier;
      const gold = rng.range(2, 20) * multiplier;
      const platinum = rng.range(0, 5) * multiplier;
      description = `${copper} cp, ${silver} sp, ${gold} gp, ${platinum} pp`;
    } else if (type === 'gems') {
      const count = rng.range(1, 6);
      description = `${count} ${rarity === 'legendary' ? 'legendary' : 'beautiful'} gems worth up to ${multiplier * 100} gp each`;
    } else if (type === 'potions') {
      const count = rng.range(1, 3);
      description = `${count} random potions of ${rarity}`;
    } else if (type === 'scrolls') {
      const count = rng.range(1, 2);
      description = `${count} random scrolls of ${rarity}`;
    } else {
      const count = rng.range(1, 3);
      description = `${count} ${type} of ${rarity}`;
    }
    setResult({ rarity, type, description });
  };

  return (
    <Card>
      <CardHeader className="font-semibold">Treasure Generator</CardHeader>
      <CardBody>
        <div className="flex flex-col gap-2">
          <Select
            label="Rarity"
            value={rarity}
            onChange={(e) => setSeed(e.target.value + Date.now())}
            className="max-w-xs"
          >
            {RARITY.map((r) => (
              <SelectItem key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</SelectItem>
            ))}
          </Select>
          <Select
            label="Type"
            value={type}
            onChange={(e) => setSeed(e.target.value + Date.now())}
            className="max-w-xs"
          >
            {TREASURE_TYPES.map((t) => (
              <SelectItem key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</SelectItem>
            ))}
          </Select>
          <Button onPress={generate}>Generate Treasure</Button>
          {result && (
            <div className="mt-3">
              <h4 className="font-semibold">Treasure Found:</h4>
              <p>{result.description}</p>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

const Generators = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Random Generators</h1>
      <Tabs aria-label="Generator categories" color="primary">
        <Tab title="Names" key="names">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NameGenerator />
          </div>
        </Tab>
        <Tab title="Taverns" key="taverns">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TavernGenerator />
          </div>
        </Tab>
        <Tab title="Weather" key="weather">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <WeatherGenerator />
          </div>
        </Tab>
        <Tab title="Encounters" key="encounters">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EncounterGenerator />
          </div>
        </Tab>
        <Tab title="Treasure" key="treasure">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TreasureGenerator />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Generators;