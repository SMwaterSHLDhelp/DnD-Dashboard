import React, { useState, useEffect } from 'react';
import { Button, Input, Textarea, Card, CardBody, CardHeader, CardFooter, Tabs, Tab, Divider } from '@heroui/react';
import { Plus, Trash2, Clock, Calendar, FileText, CheckCircle } from 'lucide-react';

function Session() {
  const [sessions, setSessions] = useState([]);
  const [activeTab, setActiveTab] = useState('planned');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    pacing: [],
    encounters: []
  });

  useEffect(() => {
    const savedSessions = localStorage.getItem('sessions');
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sessions', JSON.stringify(sessions));
  }, [sessions]);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleAddSession = (e) => {
    e.preventDefault();
    const newSession = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString(),
      completed: false
    };
    setSessions([...sessions, newSession]);
    setFormData({
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      notes: '',
      pacing: [],
      encounters: []
    });
  };

  const handleDeleteSession = (id) => {
    setSessions(sessions.filter(session => session.id !== id));
  };

  const toggleSessionComplete = (id) => {
    setSessions(sessions.map(session =>
      session.id === id ? { ...session, completed: !session.completed } : session
    ));
  };

  const plannedSessions = sessions.filter(s => !s.completed);
  const completedSessions = sessions.filter(s => s.completed);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Session Management</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Session Form */}
        <div>
          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Plus size={20} />
                Create New Session
              </h2>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleAddSession} className="space-y-4">
                <Input
                  label="Session Title"
                  placeholder="Session title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  isRequired
                />
                <Input
                  label="Session Date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  isRequired
                />
                <Textarea
                  label="Session Description"
                  placeholder="Overview of what you plan to cover this session"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  minRows={3}
                />
                <div className="flex justify-end">
                  <Button type="submit" color="primary">
                    <Plus size={16} className="mr-1" />
                    Create Session
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Session Tools</h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Pacing Tracker</h3>
                <p className="text-sm text-gray-500 mb-2">Track time allocation for different parts of your session</p>
                <Button size="sm" startContent={<Clock size={14} />}>Add Time Block</Button>
              </div>
              <div>
                <h3 className="font-medium mb-2">Encounter Planning</h3>
                <p className="text-sm text-gray-500 mb-2">Plan and organize encounters for this session</p>
                <Button size="sm" startContent={<FileText size={14} />}>Add Encounter</Button>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Session List */}
        <div>
          <Tabs fullWidth size="md" selectedKey={activeTab} onSelectionChange={setActiveTab}>
            <Tab
              key="planned"
              title={<div className="flex items-center gap-2">Planned Sessions <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">{plannedSessions.length}</span></div>}
            >
              <div className="space-y-4">
                {plannedSessions.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <Calendar size={48} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500">No planned sessions yet.</p>
                  </div>
                ) : (
                  plannedSessions.map(session => (
                    <Card key={session.id}>
                      <CardHeader className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold">{session.title}</h3>
                          <p className="text-sm text-gray-500">{new Date(session.date).toLocaleDateString()}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            color="success" 
                            onClick={() => toggleSessionComplete(session.id)}
                          >
                            <CheckCircle size={16} />
                          </Button>
                          <Button 
                            size="sm" 
                            color="danger" 
                            onClick={() => handleDeleteSession(session.id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </CardHeader>
                      {session.description && (
                        <>
                          <Divider />
                          <CardBody>
                            <p className="text-sm">{session.description}</p>
                          </CardBody>
                        </>
                      )}
                    </Card>
                  ))
                )}
              </div>
            </Tab>

            <Tab
              key="completed"
              title={<div className="flex items-center gap-2">Completed Sessions <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">{completedSessions.length}</span></div>}
            >
              <div className="space-y-4">
                {completedSessions.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <CheckCircle size={48} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500">No completed sessions yet.</p>
                  </div>
                ) : (
                  completedSessions.map(session => (
                    <Card key={session.id} className="opacity-75">
                      <CardHeader className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold">{session.title}</h3>
                          <p className="text-sm text-gray-500">{new Date(session.date).toLocaleDateString()}</p>
                        </div>
                        <Button 
                          size="sm" 
                          color="danger" 
                          onClick={() => handleDeleteSession(session.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </CardHeader>
                      {session.description && (
                        <>
                          <Divider />
                          <CardBody>
                            <p className="text-sm">{session.description}</p>
                          </CardBody>
                        </>
                      )}
                    </Card>
                  ))
                )}
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Session;