import React, { useState } from 'react';
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, useDisclosure, Textarea } from '@heroui/react';
import { Upload, Download, AlertCircle, CheckCircle, FileJson } from 'lucide-react';

function CampaignExportImport({ campaignData }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalMode, setModalMode] = useState('export'); // 'export' or 'import'
  const [importContent, setImportContent] = useState('');
  const [importError, setImportError] = useState('');
  const [importSuccess, setImportSuccess] = useState(false);

  // Validate campaign data structure
  const validateCampaignData = (data) => {
    if (!data || typeof data !== 'object') {
      return 'Invalid data: must be an object';
    }
    
    if (!data.campaigns || !Array.isArray(data.campaigns)) {
      return 'Invalid data: must have campaigns array';
    }
    
    return null;
  };

  const handleExport = () => {
    if (!campaignData || !campaignData.campaigns) {
      alert('No campaign data to export');
      return;
    }
    
    const exportData = JSON.stringify(campaignData, null, 2);
    const blob = new Blob([exportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `campaign-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    setImportError('');
    setImportSuccess(false);
    
    try {
      const data = JSON.parse(importContent);
      const error = validateCampaignData(data);
      
      if (error) {
        setImportError(error);
        return;
      }
      
      localStorage.setItem('campaignData', JSON.stringify(data));
      setImportSuccess(true);
      setImportContent('');
    } catch (e) {
      setImportError(`Invalid JSON: ${e.message}`);
    }
  };

  return (
    <>
      <div className="flex gap-2 mb-4">
        <Button 
          color="primary" 
          startContent={<Download size={16} />}
          onClick={() => {
            setModalMode('export');
            onOpen();
          }}
        >
          Export Campaign
        </Button>
        <Button 
          color="secondary" 
          startContent={<Upload size={16} />}
          onClick={() => {
            setModalMode('import');
            setImportError('');
            setImportSuccess(false);
            onOpen();
          }}
        >
          Import Campaign
        </Button>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {modalMode === 'export' ? 'Export Campaign Data' : 'Import Campaign Data'}
              </ModalHeader>
              <ModalBody>
                {modalMode === 'export' ? (
                  <div className="flex flex-col gap-4">
                    <div className="bg-warning/10 p-4 rounded-lg flex gap-3 items-start">
                      <AlertCircle className="text-warning shrink-0" size={20} />
                      <div className="text-warning">
                        <p className="font-medium">Export Data</p>
                        <p className="text-sm">This will download a JSON file containing all your campaign data including campaigns, NPCs, characters, sessions, and more.</p>
                      </div>
                    </div>
                    <Button 
                      color="primary" 
                      startContent={<FileJson size={16} />}
                      onClick={handleExport}
                      className="w-full"
                    >
                      Download JSON File
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <div className="bg-info/10 p-4 rounded-lg flex gap-3 items-start">
                      <AlertCircle className="text-info shrink-0" size={20} />
                      <div className="text-info">
                        <p className="font-medium">Import Campaign Data</p>
                        <p className="text-sm">Paste your campaign JSON file content below. This will replace your current campaign data.</p>
                      </div>
                    </div>
                    <Textarea
                      label="JSON Content"
                      placeholder="Paste your campaign JSON here..."
                      value={importContent}
                      onChange={(e) => setImportContent(e.target.value)}
                      minRows={8}
                      isInvalid={!!importError}
                      validationState={importError ? 'invalid' : undefined}
                      className="font-mono text-sm"
                    />
                    {importError && (
                      <div className="bg-danger/10 p-3 rounded-lg text-danger text-sm">
                        {importError}
                      </div>
                    )}
                    {importSuccess && (
                      <div className="bg-success/10 p-3 rounded-lg text-success text-sm flex items-center gap-2">
                        <CheckCircle size={16} />
                        Campaign data imported successfully!
                      </div>
                    )}
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onClick={onClose}>
                  Close
                </Button>
                {modalMode === 'import' && (
                  <Button 
                    color="primary" 
                    onClick={handleImport}
                    isDisabled={!importContent || !!importError}
                  >
                    Import Data
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default CampaignExportImport;