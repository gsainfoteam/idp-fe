import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import EditIcon from '@/assets/icons/solid/edit.svg?react';
import TrashBinIcon from '@/assets/icons/solid/trash-bin.svg?react';
import {
  Avatar,
  Button,
  Dialog,
  FileUpload,
  cn,
  uniqueKey,
} from '@/features/core';
import { useLoading } from '@/features/core';
import { IconButton } from '@/features/core/components/icon-button';
import { overlay } from 'overlay-kit';

import { Client } from '../hooks/use-client';
import { useClientPictureForm } from '../hooks/use-client-picture-form';

function ClientPictureOverlay({
  isOpen,
  close,
  onContinue,
}: {
  isOpen: boolean;
  close: () => void;
  onContinue: () => Promise<void>;
}) {
  const { t } = useTranslation();

  return (
    <Dialog isOpen={isOpen} close={close} className="mx-10 w-auto">
      <Dialog.Header>
        {t('services.detail.picture.delete_overlay.title')}
      </Dialog.Header>
      <Dialog.Body>
        {t('services.detail.picture.delete_overlay.description')}
      </Dialog.Body>
      <Dialog.Footer>
        <Dialog.Close className="grow">
          <Button variant="secondary" className="w-full">
            {t('services.detail.picture.delete_overlay.cancel')}
          </Button>
        </Dialog.Close>
        <Button
          variant="primary"
          onClick={() => onContinue().then(close)}
          className="grow"
        >
          {t('services.detail.picture.delete_overlay.confirm')}
        </Button>
      </Dialog.Footer>
    </Dialog>
  );
}

export function ClientPictureForm({
  client,
  onUpdated,
}: {
  client: Client;
  onUpdated: () => void;
}) {
  const fileInputRef = useRef<HTMLDivElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploadLoading, startUploadLoading] = useLoading();
  const [deleteLoading, startDeleteLoading] = useLoading();
  const { t } = useTranslation();
  const { uploadImage, deleteImage, onSave } = useClientPictureForm(
    client,
    setPreviewImage,
    onUpdated,
  );

  useEffect(() => {
    setPreviewImage(client.picture ?? null);
  }, [client]);

  return (
    <div className="flex flex-col gap-4">
      <div className="text-title-3 text-label">
        {t('services.detail.picture.title')}
      </div>
      <div className="flex gap-3">
        <div
          className={cn(
            'h-fit w-fit',
            client.deleteRequestedAt != null
              ? 'cursor-default'
              : 'cursor-pointer',
          )}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className={client.deleteRequestedAt != null ? 'grayscale' : ''}>
            <Avatar
              img={previewImage ?? undefined}
              seed={uniqueKey(client.clientId)}
              size={25}
              className="rounded-lg"
            >
              {client.name.charAt(0)}
            </Avatar>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <FileUpload
            ref={fileInputRef}
            disabled={client.deleteRequestedAt != null}
            accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
            maxSizeMb={1}
            onSave={(files, previewUrls) =>
              startUploadLoading(onSave(files, previewUrls).then(uploadImage))
            }
          >
            <IconButton
              variant="primary"
              loading={uploadLoading}
              disabled={deleteLoading || client.deleteRequestedAt != null}
              className="p-2.5"
              icon={<EditIcon />}
            />
          </FileUpload>
          <IconButton
            variant="secondary"
            loading={deleteLoading}
            disabled={!previewImage || client.deleteRequestedAt != null}
            className="p-2.5"
            icon={<TrashBinIcon />}
            onClick={async () => {
              overlay.open(({ isOpen, close }) => (
                <ClientPictureOverlay
                  isOpen={isOpen}
                  close={close}
                  onContinue={async () => {
                    await startDeleteLoading(deleteImage());
                  }}
                />
              ));
            }}
          />
        </div>
      </div>
    </div>
  );
}
