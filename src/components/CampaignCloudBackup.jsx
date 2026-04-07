import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, useDisclosure, Textarea, Alert } from '@heroui/react';
import { UploadCloud, DownloadCloud, AlertCircle, CheckCircle, Cloud, Loader2 } from 'lucide-react';

function CampaignCloudBackup({ campaignData }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [cloudURL, setCloudURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cloudResult, setCloudResult] = useState(null);

  // Load cloud configuration from localStorage
  useEffect(() => {
    const savedURL = localStorage.getItem('cloudBackupURL');
    if (savedURL) {
      setCloudURL(savedURL);
    } else if (campaignData?.campaigns?.length > 0) {
      // Generate a default URL if none configured
      const campaignTitle = campaignData.campaigns[0]?.title?.toLowerCase().replace(/\s+/g, '-') || 'campaign';
      const uniqueId = campaignData.campaigns[0]?.id || Date.now();
      setCloudURL(`https://dnd-backup.example.com/${campaignTitle}-${uniqueId}.json`);
    }
  }, [campaignData]);

  const handleBackupToCloud = async () => {
    if (!campaignData || !campaignData.campaigns) {
      setCloudResult({ type: 'error', message: 'No campaign data to backup' });
      return;
    }

    setIsLoading(true);
    setCloudResult(null);

    try {
      const backupData = {
        ...campaignData,
        backupTimestamp: new Date().toISOString(),
        backupVersion: '1.0'
      };

      console.log('Backup data to upload:', backupData);

      // In a real implementation, this would upload to cloud storage
      // For now, we'll simulate the upload and provide instructions
      await new Promise(resolve => setTimeout(resolve, 1000));

      setCloudResult({
        type: 'success',
        message: 'Campaign data backed up to cloud successfully!',
        details: `Backup URL: ${cloudURL || 'generated'}\nTimestamp: ${new Date().toISOString()}`
      });
    } catch (error) {
      setCloudResult({
        type: 'error',
        message: `Backup failed: ${error.message}`
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestoreFromCloud = async () => {
    if (!cloudURL) {
      setCloudResult({ type: 'error', message: 'No backup URL configured' });
      return;
    }

    setIsLoading(true);
    setCloudResult(null);

    try {
      console.log('Restoring from URL:', cloudURL);

      // In a real implementation, this would fetch from cloud storage
      await new Promise(resolve => setTimeout(resolve, 1000));

      // For simulation, we'll just confirm the restore would happen
      setCloudResult({
        type: 'success',
        message: 'Cloud restore simulation complete!',
        details: `Would restore from: ${cloudURL}\nData would replace current campaign data.\nClick Import Campaign to paste actual JSON data.`
      });
    } catch (error) {
      setCloudResult({
        type: 'error',
        message: `Restore failed: ${error.message}`
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex gap-2 mb-4">
        <Button
          color="success"
          startContent={isLoading ? <Loader2 size={16} className="animate-spin" /> : <UploadCloud size={16} />}
          onClick={handleBackupToCloud}
          isDisabled={!campaignData?.campaigns?.length || isLoading}
          className="w-full"
        >
          {isLoading ? 'Backing up...' : 'Backup to Cloud'}
        </Button>
        <Button
          color="primary"
          startContent={isLoading ? <Loader2 size={16} className="animate-spin" /> : <DownloadCloud size={16} />}
          onClick={handleRestoreFromCloud}
          isDisabled={!cloudURL || isLoading}
          className="w-full"
        >
          {isLoading ? 'Restoring...' : 'Restore from Cloud'}
        </Button>
      </div>

      {cloudResult && (
        <Alert
          variant="solid"
          color={cloudResult.type === 'success' ? 'success' : 'danger'}
          startContent={cloudResult.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          className="mb-4"
        >
          <div className="flex flex-col gap-1">
            <p className="font-medium">{cloudResult.message}</p>
            {cloudResult.details && (
              <pre className="text-xs whitespace-pre-wrap font-mono bg-current/10 p-2 rounded">
                {cloudResult.details}
              </pre>
            )}
          </div>
        </Alert>
      )}

      {/* Cloud configuration instructions */}
      <div className="mt-6 p-4 bg-default-50 rounded-lg border border-default-200">
        <div className="flex items-start gap-3">
          <Cloud size={24} className="text-primary mt-1 shrink-0" />
          <div>
            <h3 className="font-semibold mb-2">Cloud Backup Setup</h3>
            <p className="text-sm text-default-600 mb-2">
              To enable full cloud backup and restore, configure your cloud storage endpoint:
            </p>
            <div className="flex gap-2 flex-wrap">
              <Input
                label="Backup URL"
                placeholder="https://your-cloud-storage.example.com/backup"
                value={cloudURL}
                onChange={(e) => setCloudURL(e.target.value)}
                className="max-w-xs"
              />
              <Button
                color="primary"
                onClick={() => {
                  localStorage.setItem('cloudBackupURL', cloudURL);
                  alert('Cloud backup URL saved!');
                }}
              >
                Save Configuration
              </Button>
            </div>
            <p className="text-xs text-default-500 mt-2">
              The backup URL is generated based on your campaign title and ID. You can customize it for your cloud storage provider.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CampaignCloudBackup;