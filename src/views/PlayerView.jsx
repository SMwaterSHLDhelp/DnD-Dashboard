import { useState } from 'react';
import { Card, CardBody, CardHeader, Input, Select, SelectItem, Button } from '@heroui/react';

export default function PlayerView() {
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState({
    name: '',
    characterClass: '',
    race: '',
    level: 1,
    notes: ''
  });

  const handleAddPlayer = () => {
    if (currentPlayer.name) {
      setPlayers([...players, { ...currentPlayer, id: Date.now() }]);
      setCurrentPlayer({ name: '', characterClass: '', race: '', level: 1, notes: '' });
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Player Characters</h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <Input
              label="Player Name"
              value={currentPlayer.name}
              onChange={(e) => setCurrentPlayer({ ...currentPlayer, name: e.target.value })}
            />
            <Input
              label="Character Class"
              value={currentPlayer.characterClass}
              onChange={(e) => setCurrentPlayer({ ...currentPlayer, characterClass: e.target.value })}
            />
            <Input
              label="Race"
              value={currentPlayer.race}
              onChange={(e) => setCurrentPlayer({ ...currentPlayer, race: e.target.value })}
            />
            <Input
              type="number"
              label="Level"
              value={currentPlayer.level}
              onChange={(e) => setCurrentPlayer({ ...currentPlayer, level: parseInt(e.target.value) || 1 })}
            />
            <Button onPress={handleAddPlayer} color="primary">Add Player</Button>
          </div>
          {players.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Character Summary</h3>
              <div className="grid gap-4">
                {players.map(player => (
                  <Card key={player.id}>
                    <CardBody>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold">{player.name}</h4>
                          <p className="text-sm text-gray-500">{player.race} {player.characterClass} (Lvl {player.level})</p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}