import { useState } from 'react';
import { Card, CardBody, CardHeader, Textarea, Button } from '@heroui/react';

export default function NotesView() {
  const [notes, setNotes] = useState([
    { id: 1, title: 'Campaign Overview', content: 'This campaign takes place in the Forgotten Realms...', isSecret: true },
    { id: 2, title: 'Session 1 Notes', content: 'Players met at the tavern and accepted the quest...', isSecret: true }
  ]);
  const [newNote, setNewNote] = useState({ title: '', content: '', isSecret: true });

  const handleAddNote = () => {
    if (newNote.title) {
      setNotes([...notes, { ...newNote, id: Date.now() }]);
      setNewNote({ title: '', content: '', isSecret: true });
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">DM Notes & Secrets</h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <Input
              label="Note Title"
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            />
            <Textarea
              label="Note Content"
              value={newNote.content}
              onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              placeholder="Enter your secret notes here..."
            />
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="secret"
                checked={newNote.isSecret}
                onChange={(e) => setNewNote({ ...newNote, isSecret: e.target.checked })}
              />
              <label htmlFor="secret">Secret (hidden from players)</label>
            </div>
            <Button onPress={handleAddNote} color="primary">Add Note</Button>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Saved Notes</h3>
            <div className="space-y-2">
              {notes.map(note => (
                <Card key={note.id}>
                  <CardBody>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold flex items-center">
                          {note.title}
                          {note.isSecret && <span className="ml-2 px-2 py-0.5 text-xs bg-red-500 text-white rounded">SECRET</span>}
                        </h4>
                        <p className="mt-2">{note.content}</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}