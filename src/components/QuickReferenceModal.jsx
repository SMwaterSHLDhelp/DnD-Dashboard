import React, { useState, useEffect, useRef } from 'react';
import MonsterSearch from './MonsterSearch';
import SpellSearch from './SpellSearch';
import { Button, Modal, ModalContent, ModalHeader, ModalBody, Input, Tabs, Tab } from '@heroui/react';

const QuickReferenceModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('spells');
  const [searchTerm, setSearchTerm] = useState('');
  const modalRef = useRef(null);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+K to open modal
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        if (!isOpen) {
          // Modal should be opened by parent component
          document.dispatchEvent(new CustomEvent('open-quick-reference'));
        }
      }
      // Escape to close modal
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus search input when modal opens
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const input = modalRef.current.querySelector('input');
      if (input) input.focus();
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      placement="center"
      className="quick-reference-modal"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Quick Reference</h3>
            <button onClick={onClose} className="close-btn">
              <span className="text-2xl">&times;</span>
            </button>
          </div>
          <Input
            type="search"
            placeholder="Search spells, monsters, rules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            ref={modalRef}
          />
        </ModalHeader>
        <ModalBody>
          <Tabs
            activeKey={activeTab}
            onSelect={(key) => setActiveTab(key)}
            className="reference-tabs"
          >
            <Tab
              key="spells"
              title="Spells"
              className="tab-content"
            >
              <SpellSearch searchTerm={searchTerm} />
            </Tab>
            <Tab
              key="monsters"
              title="Monsters"
              className="tab-content"
            >
              <MonsterSearch searchTerm={searchTerm} />
            </Tab>
            <Tab
              key="rules"
              title="Rules"
              className="tab-content"
            >
              <div className="rules-content p-4">
                <h4 className="text-lg font-semibold mb-2">Rules Reference</h4>
                <p>Quick rules reference coming soon...</p>
                <ul className="mt-2">
                  <li className="mb-1">Basic rules for D&D 5e</li>
                  <li className="mb-1">Condition management</li>
                  <li className="mb-1">Combat rules</li>
                </ul>
              </div>
            </Tab>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default QuickReferenceModal;