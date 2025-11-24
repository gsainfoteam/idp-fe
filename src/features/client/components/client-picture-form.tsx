import { useEffect, useRef, useState } from 'react';

import { overlay } from 'overlay-kit';
import { useTranslation } from 'react-i18next';

import EditIcon from '@/assets/icons/solid/edit.svg?react';
import TrashBinIcon from '@/assets/icons/solid/trash-bin.svg?react';
import {
  Avatar,
  Button,
  Dialog,
  FileUpload,
  LogClick,
  LogDialog,
  cn,
  uniqueKey,
} from '@/features/core';
import { useLoading } from '@/features/core';
import { IconButton } from '@/features/core';

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
    <LogDialog
      isOpen={isOpen}
      close={(_: boolean) => close()}
      defaultCloseValue={false}
      className="mx-10 w-auto"
      event="client_picture_delete_dialog"
      closeProperties={() => ({ result: 'confirm' })}
    >
      <Dialog.Header>
        {t('services.detail.picture.delete_overlay.title')}
      </Dialog.Header>
      <Dialog.Body>
        {t('services.detail.picture.delete_overlay.description')}
      </Dialog.Body>
      <Dialog.Footer>
        <Dialog.Close className="grow" closeValue={false}>
          <Button variant="secondary" className="w-full">
            {t('services.detail.picture.delete_overlay.cancel')}
          </Button>
        </Dialog.Close>
        <Dialog.Close className="grow" closeValue={true}>
          <Button variant="primary" onClick={onContinue}>
            {t('services.detail.picture.delete_overlay.confirm')}
          </Button>
        </Dialog.Close>
      </Dialog.Footer>
    </LogDialog>
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
            <LogClick
              event="client_edit_button"
              properties={{ clientId: client.clientId }}
            >
              <IconButton
                variant="primary"
                loading={uploadLoading}
                disabled={deleteLoading || client.deleteRequestedAt != null}
                className="p-2.5"
                icon={<EditIcon />}
              />
            </LogClick>
          </FileUpload>
          <LogClick
            event="client_picture_delete"
            properties={{ clientId: client.clientId }}
          >
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
          </LogClick>
        </div>
      </div>
    </div>
  );
}
