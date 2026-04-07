import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@heroui/react';
import { Info, X, ChevronRight, ChevronLeft } from 'lucide-react';

const tutorialSteps = [
  {
    targetId: 'sidebar-campaign',
    title: 'Campaign & World Building',
    description: 'Start by creating your world. Store your lore, maps, and history here.',
    icon: '🌐'
  },
  {
    targetId: 'sidebar-session',
    title: 'Session Management',
    description: 'Plan your next session with encounter notes and plot hooks.',
    icon: '📅'
  },
  {
    targetId: 'sidebar-npc',
    title: 'NPC Tracker',
    description: 'Never forget a name again. Track NPCs, their motivations, and status.',
    icon: '🎭'
  },
  {
    targetId: 'sidebar-combat',
    title: 'Combat Tools',
    description: 'Manage initiative, monster stats, and conditions during intense battles.',
    icon: '⚔️'
  },
  {
    targetId: 'sidebar-loot',
    title: 'Loot & Inventory',
    description: 'Log magic items and gold to keep your players balanced.',
    icon: '💰'
  }
];

const OnboardingTutorial = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentStep, setCurrentStep] = useState(0);
  const [hasSeenTutorial, setHasSeenTutorial] = useState(() => {
    const seen = localStorage.getItem('hasSeenOnboarding');
    return seen === 'true';
  });

  useEffect(() => {
    if (!hasSeenTutorial) {
      onOpen();
    }
  }, [hasSeenTutorial, onOpen]);

  const handleClose = () => {
    setHasSeenTutorial(true);
    localStorage.setItem('hasSeenOnboarding', 'true');
    onClose();
  };

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  if (hasSeenTutorial) return null;

  const step = tutorialSteps[currentStep];

  return (
    <Modal isOpen={isOpen} onClose={handleClose} hideDragHandle>
      <ModalContent>
        <ModalHeader className="flex items-center gap-2">
          <span className="text-2xl">{step.icon}</span>
          {step.title}
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col items-center text-center py-4">
            <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full mb-4">
              <Info className="w-8 h-8 text-blue-600 dark:text-blue-300" />
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              {step.description}
            </p>
          </div>
        </ModalBody>
        <ModalFooter className="justify-between">
          <Button variant="light" onPress={prevStep} disabled={currentStep === 0}>
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>
          <Button color="primary" onPress={nextStep}>
            {currentStep === tutorialSteps.length - 1 ? 'Finish' : 'Next'}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default OnboardingTutorial;