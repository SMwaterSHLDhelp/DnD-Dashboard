import { useState } from 'react';
import { Card, CardBody, CardHeader, Input, Select, SelectItem, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/react';
import NPCList from '../components/NPCList';

export default function NPCView() {
  const [npcs, setNpcs] = useState([]);
  const [currentNpc, setCurrentNpc] = useState({
    name: '',
    role: '',
    description: '',
    status: 'alive'
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleAddNpc = () => {
    if (currentNpc.name) {
      setNpcs([...npcs, { ...currentNpc, id: Date.now() }]);
      setCurrentNpc({ name: '', role: '', description: '', status: 'alive' });
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">NPC Tracker</h2>
        </CardHeader>
        <CardBody>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Add New NPC</h3>
            <div className="space-y-2">
              <Input
                label="Name"
                value={currentNpc.name}
                onChange={(e) => setCurrentNpc({ ...currentNpc, name: e.target.value })}
              />
              <Input
                label="Role/Position"
                value={currentNpc.role}
                onChange={(e) => setCurrentNpc({ ...currentNpc, role: e.target.value })}
              />
              <Input
                label="Status"
                value={currentNpc.status}
                onChange={(e) => setCurrentNpc({ ...currentNpc, status: e.target.value })}
              />
              <Button onPress={onOpen} color="primary">Add NPC</Button>
            </div>
          </div>
          <NPCList npcs={npcs} />
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Add NPC</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to add this NPC?</p>
          </ModalBody>
          <ModalFooter>
            <Button onPress={onOpenChange}>Close</Button>
            <Button color="primary" onPress={() => {
              handleAddNpc();
              onOpenChange();
            }}>Add</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}