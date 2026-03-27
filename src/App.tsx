import { useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Spacer,
} from '@heroui/react';
import { '@heroui/system', '@heroui/styles' } from '@heroui/react';

function HeroUIIntegrationDemo() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [openCount, setOpenCount] = useState(0);

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          padding: '1rem',
          gap: '1.5rem',
        }}
      >
        {/* HeroUI Card */}
        <Card style={{ width: '250px' }}>
          <CardHeader>
            <h3>Campaign World</h3>
          </CardHeader>
          <CardBody>
            <p>Overview of the campaign world lore, history, and key locations.</p>
          </CardBody>
        </Card>

        {/* HeroUI Button + Modal Trigger */}
        <div>
          <Button color="primary" variant="shadow" onPress={() => onOpen()}>
            Add NPC
          </Button>
          <Spacer x={4} />
          <Button color="success" variant="flat" isDisabled={openCount < 1}>
            {openCount > 0 ? `${openCount} NPC(s) Added` : 'No NPCs Yet'}
          </Button>
        </div>

        {/* HeroUI Modal */}
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Add New NPC
                </ModalHeader>
                <ModalBody>
                  <label htmlFor="npcName">Name</label>
                  <input
                    id="npcName"
                    type="text"
                    style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
                  />
                  <label htmlFor="npcRole">Role</label>
                  <input
                    id="npcRole"
                    type="text"
                    style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => {
                      setOpenCount((c) => c + 1);
                      onClose();
                    }}
                  >
                    Add NPC
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>

      {/* Verify HeroUI global styles are loaded */}
      <div style={{ marginTop: '1rem' }}>
        <h4>Verify HeroUI Typography & UI Consistency:</h4>
        <p>
          HeroUI components should render with consistent font, spacing, and theming across the app.
          If the components above appear properly styled (rounded corners, primary/success buttons,
          modal overlay with backdrop), the integration is successful.
        </p>
      </div>
    </>
  );
}

export default HeroUIIntegrationDemo;