import React, { useState } from 'react';
import { Card, CardBody, CardHeader, CardFooter, Button, Divider } from '@heroui/react';

export const SessionList = ({ sessions, onEdit, onDelete, onSelect }) => {
  const [selectedSession, setSelectedSession] = useState(null);

  if (sessions.length === 0) {
    return (
      <div className="empty-state">
        <p>No sessions found. <a href="#" onClick={(e) => e.preventDefault()}>Add your first session</a>.</p>
      </div>
    );
  }

  return (
    <div className="session-list">
      {sessions.map((session) => (
        <Card
          key={session.id || session.title}
          isHoverable
          isPressable
          onClick={() => {
            setSelectedSession(session);
            if (onSelect) onSelect(session.id || session.title);
          }}
        >
          <CardHeader>
            <h3>{session.title || 'Untitled Session'}</h3>
            <small>{session.date || 'No date'}</small>
          </CardHeader>
          <CardBody>
            <p>{session.summary || 'No summary'}</p>
            {session.pacing && (
              <p><strong>Pacing:</strong> {session.pacing}</p>
            )}
          </CardBody>
          <CardFooter>
            <Button size="sm" variant="flat" color="primary" onClick={(e) => {
              e.stopPropagation();
              if (onEdit) onEdit(session);
            }}>
              Edit
            </Button>
            <Button size="sm" variant="flat" color="danger" onClick={(e) => {
              e.stopPropagation();
              if (onDelete) onDelete(session);
            }}>
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default SessionList;