import { useEffect, useRef, useState } from 'react';
import { Client } from '../hooks/use-client';
import { useTranslation } from 'react-i18next';
import { useClientPictureForm } from '../hooks/use-client-picture-form';
import { Avatar, Button, UndoWarningOverlay, uniqueKey } from '@/features/core';
import EditIcon from '@/assets/icons/solid/edit.svg?react';
import TrashBinIcon from '@/assets/icons/solid/trash-bin.svg?react';
import { useLoading } from '@/features/core';

export function ClientPictureForm({
  client,
  onUpdated,
}: {
  client: Client;
  onUpdated: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploadLoading, startUploadLoading] = useLoading();
  const [deleteLoading, startDeleteLoading] = useLoading();
  const { t } = useTranslation();
  const { changeImage, deleteImage, uploadImage } = useClientPictureForm(
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
            <div className="relative">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) =>
                  startUploadLoading(changeImage(e).then(uploadImage))
                }
                className="absolute h-0 w-0 appearance-none opacity-0"
              />
              <Button
                variant="primary"
                className="p-2.5"
                loading={uploadLoading}
                prefixIcon={<EditIcon />}
                onClick={() => fileInputRef.current?.click()}
              />
            </div>
            <Button
              variant="secondary"
              className="p-2.5"
              loading={deleteLoading}
              prefixIcon={<TrashBinIcon />}
              disabled={!previewImage}
              onClick={() => setOpen(true)}
            />
          </div>
        </div>
      </div>
      {open && (
        <UndoWarningOverlay
          onNext={async () => {
            if (await startDeleteLoading(deleteImage())) setOpen(false);
          }}
          close={() => setOpen(false)}
        />
      )}
    </>
  );
}
