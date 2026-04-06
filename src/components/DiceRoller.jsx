import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Divider,
  ScrollShadow
} from '@herui/react';

const DICE_TYPES = [4, 6, 8, 10, 12, 20, 100];

const DiceRoller = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [modifier, setModifier] = useState(0);
  const [history, setHistory] = useState([]);

  const rollDice = (dieType) => {
    const roll = Math.floor(Math.random() * dieType) + 1;
    const total = roll + modifier;
    const newEntry = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString(),
      dieType,
      roll,
      modifier,
      total
    };
    setHistory((prev) => [newEntry, ...prev].slice(0, 50)); // Keep last 50 rolls
  };

  const clearHistory = () => setHistory([]);

  return (
    <>
      <Button 
        color="primary" 
        variant="shadow" 
        className="fixed bottom-8 right-8 rounded-full w-16 h-16 text-2xl shadow-2xl z-50"
        onClick={onOpen}
      >
        🎲
      </Boolean>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md" scrollBehavior="inside">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Dice Roller</ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <Input
                      type="number"
                      label="Modifier"
                      labelPlacement="outside"
                      value={modifier.toString()}
                      onChange={(e) => setModifier(parseInt(e.target.value) || 0)}
                      className="w-24"
                    />
                    <span className="text-sm text-gray-500">Add or subtract from roll</span>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {DICE_TYPES.map((die) => (
                      <Button
                        key={die}
                        variant="flat"
                        color="primary"
                        onPress={() => rollDice(die)}
                        className="font-bold"
                      >
                        d{die}
                      </Button>
                    ))}
                  </div>

                  <Divider className="my-2" />

                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Roll History</h3>
                    <Button size="sm" variant="light" color="danger" onPress={clearHistory}>
                      Clear
                    </Button>
                  </div>

                  <ScrollShadow className="h-[300px] w-full">
                    {history.length === 0 ? (
                      <div className="text-center text-gray-400 py-10">No rolls yet. Start rolling!</div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        {history.map((entry) => (
                          <div 
                            key={entry.id} 
                            className="flex justify-between items-center p-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                          >
                            <div className="text-xs text-gray-500">{entry.timestamp}</div>
                            <div className="font-medium">
                              d{entry.dieType} ({entry.roll}) {(entry.modifier >= 0 ? '+' : '') + entry.modifier} 
                              <span className="ml-2 text-primary font-bold text-lg">= {entry.total}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollShadow>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DiceRoller;