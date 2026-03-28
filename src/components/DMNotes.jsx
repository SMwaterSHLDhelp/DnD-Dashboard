import React, { useState, useEffect } from 'react';
import { Button, Input, Textarea, Card, CardBody, CardHeader, Tabs, Tab } from '@heroui/react';
import { Eye, EyeOff, Plus, Trash, Tag } from 'lucide-react';

function DMNotes() {
  const [notes, setNotes] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [showSecrets, setShowSecrets] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'general',
    secret: false,
    campaignId: null
  });

  useEffect(() => {
    const savedNotes = localStorage.getItem('dmNotes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dmNotes', JSON.stringify(notes));
  }, [notes]);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newNote = {
      id: Date.now(),
      title: formData.title,
      content: formData.content,
      type: formData.type,
      secret: formData.secret || false,
      createdAt: new Date().toISOString(),
      campaignId: formData.campaignId || null
    };
    setNotes([...notes, newNote]);
    setFormData({
      title: '',
      content: '',
      type: 'general',
      secret: false,
      campaignId: null
    });
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleToggleSecret = (id) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, secret: !note.secret } : note
    ));
  };

  const filteredNotes = activeTab === 'all'
    ? notes
    : activeTab === 'secrets'
      ? notes.filter(note => note.secret)
      : notes.filter(note => !note.secret);

  const getNoteTypeColor = (type) => {
    const colors = {
      general: 'default',
      plot: 'primary',
      secret: 'danger',
      mystery: 'warning',
      character: 'success'
    };
    return colors[type] || 'default';
  };

  return (
    <div className="dm-notes p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">DM Notes & Secrets</h2>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="flat"
            color={showSecrets ? 'primary' : 'default'}
            startContent={<Eye size={18} />}
            onClick={() => setShowSecrets(!showSecrets)}
          >
            {showSecrets ? 'Hide Secrets' : 'Show Secrets'}
          </Button>
        </div>
      </div>

      {/* Note Creation Form */}
      <Card className="mb-6">
        <CardHeader>
          <h3 className="font-bold">Add New Note</h3>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Note title..."
              required
            />
            <Textarea
              label="Content"
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              placeholder="Note content..."
              required
            />
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm mb-1">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="general">General</option>
                  <option value="plot">Plot Thread</option>
                  <option value="mystery">Mystery</option>
                  <option value="character">Character Secret</option>
                </select>
              </div>
              <div className="flex items-center pt-6">
                <input
                  type="checkbox"
                  id="secret"
                  checked={formData.secret}
                  onChange={(e) => handleInputChange('secret', e.target.checked)}
                  className="w-5 h-5"
                />
                <label htmlFor="secret" className="ml-2">Secret Note</label>
              </div>
            </div>
            <Button type="submit" color="primary" className="w-full">
              <Plus size={18} className="mr-1" />
              Add Note
            </Button>
          </form>
        </CardBody>
      </Card>

      <div className="flex gap-6">
        {/* Filter Sidebar */}
        <div className="w-64 flex-shrink-0">
          <Card>
            <CardHeader>
              <h3 className="font-bold">Filter Notes</h3>
            </CardHeader>
            <CardBody>
              <div className="flex flex-wrap gap-2">
                <Button
                  color={activeTab === 'all' ? 'primary' : 'default'}
                  variant="flat"
                  onClick={() => setActiveTab('all')}
                >
                  All ({notes.length})
                </Button>
                <Button
                  color={activeTab === 'secrets' ? 'danger' : 'default'}
                  variant="flat"
                  onClick={() => setActiveTab('secrets')}
                >
                  <Tag size={16} className="mr-1" />
                  Secrets ({notes.filter(n => n.secret).length})
                </Button>
                <Button
                  color={activeTab === 'general' ? 'default' : 'default'}
                  variant="flat"
                  onClick={() => setActiveTab('general')}
                >
                  General ({notes.filter(n => !n.secret && n.type === 'general').length})
                </Button>
                <Button
                  color={activeTab === 'plot' ? 'primary' : 'default'}
                  variant="flat"
                  onClick={() => setActiveTab('plot')}
                >
                  Plot ({notes.filter(n => n.type === 'plot').length})
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Notes List */}
        <div className="flex-1">
          <div className="space-y-4">
            {filteredNotes.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No notes found. Create your first note above!
              </div>
            ) : (
              filteredNotes.map(note => (
                <Card key={note.id} className="overflow-hidden">
                  <CardHeader className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold">{note.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full bg-${getNoteTypeColor(note.type)}-100 text-${getNoteTypeColor(note.type)}-800`}>
                          {note.type}
                        </span>
                        {note.secret && (
                          <span className="text-xs px-2 py-1 rounded-full bg-danger-100 text-danger-800">
                            🔒 SECRET
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">
                        {new Date(note.createdAt).toLocaleDateString()}
                        {note.campaignId && ` • Campaign #${note.campaignId}`}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="flat"
                        color={note.secret ? 'danger' : 'default'}
                        isIconOnly
                        onClick={() => handleToggleSecret(note.id)}
                        title="Toggle Secret Status"
                      >
                        {note.secret ? <EyeOff size={16} /> : <Eye size={16} />}
                      </Button>
                      <Button
                        size="sm"
                        variant="flat"
                        color="danger"
                        isIconOnly
                        onClick={() => handleDeleteNote(note.id)}
                        title="Delete Note"
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardBody>
                    {note.secret ? (
                      showSecrets ? (
                        <div className="bg-danger-50 border-l-4 border-danger-500 p-4">
                          <p className="text-sm text-danger-900 whitespace-pre-wrap">{note.content}</p>
                        </div>
                      ) : (
                        <div className="bg-gray-100 border-l-4 border-gray-400 p-4 flex items-center justify-center h-32">
                          <span className="text-sm font-medium text-gray-500">
                            🔒 This is a secret note. Click "Show Secrets" above to reveal.
                          </span>
                        </div>
                      )
                    ) : (
                      <p className="whitespace-pre-wrap text-gray-700">{note.content}</p>
                    )}
                  </CardBody>
                  <CardBody className="bg-gray-50 text-xs text-gray-500">
                    {note.secret && !showSecrets && (
                      <span className="text-danger-600">🔒 SECRET: Hidden until revealed</span>
                    )}
                  </CardBody>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DMNotes;