import { useEffect, useRef, useState } from 'react';
import { Client } from '../hooks/use-client';
import { useTranslation } from 'react-i18next';
import { useClientPictureForm } from '../hooks/use-client-picture-form';
import {
  Avatar,
  UndoWarningOverlay,
  uniqueKey,
  FileUpload,
} from '@/features/core';
import EditIcon from '@/assets/icons/solid/edit.svg?react';
import TrashBinIcon from '@/assets/icons/solid/trash-bin.svg?react';
import { useLoading } from '@/features/core';
import { IconButton } from '@/features/core/components/icon-button';

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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setPreviewImage(client.picture ?? null);
  }, [client]);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="text-title-3">{t('services.detail.picture.title')}</div>
        <div className="flex gap-3">
          <div
            className="h-fit w-fit cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Avatar
              name={client.name}
              img={previewImage ?? undefined}
              seed={uniqueKey(client.clientId)}
              size={25}
              className="rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-3">
            <FileUpload
              ref={fileInputRef}
              accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
              maxSizeMb={1}
              onSave={(files, previewUrls) =>
                startUploadLoading(onSave(files, previewUrls).then(uploadImage))
              }
            >
              <IconButton
                variant="primary"
                disabled={client.deleteRequestedAt != null}
                loading={uploadLoading}
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
              onClick={() => setOpen(true)}
            />
          </div>
        </div>
      </div>
      {open && (
        <UndoWarningOverlay
          onNext={() =>
            startDeleteLoading(deleteImage()).then(() => setOpen(false))
          }
          close={() => setOpen(false)}
        />
      )}
    </>
  );
}
