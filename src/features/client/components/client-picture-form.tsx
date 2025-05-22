import { useEffect, useRef, useState } from 'react';
import { Client } from '../hooks/use-client';
import { useTranslation } from 'react-i18next';
import { useClientPictureForm } from '../hooks/use-client-picture-form';
import { Avatar, Button, uniqueKey } from '@/features/core';
import EditIcon from '@/assets/icons/solid/edit.svg?react';
import TrashBinIcon from '@/assets/icons/solid/trash-bin.svg?react';

export function ClientPictureForm({
  client,
  onUpdated,
}: {
  client: Client;
  onUpdated: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loadings, setLoadings] = useState<[boolean, boolean]>([false, false]);
  const { t } = useTranslation();
  const { changeImage, deleteImage, uploadImage } = useClientPictureForm(
    client,
    setPreviewImage,
    onUpdated,
  );

  useEffect(() => {
    setPreviewImage(client.picture ?? null);
  }, [client]);

  return (
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
              onChange={async (e) => {
                setLoadings(([_, b]) => [true, b]);
                if (await changeImage(e)) await uploadImage();
                setLoadings(([_, b]) => [false, b]);
              }}
              className="absolute h-0 w-0 appearance-none opacity-0"
            />
            <Button
              variant="primary"
              className="p-2.5"
              loading={loadings[0]}
              prefixIcon={<EditIcon />}
              onClick={() => fileInputRef.current?.click()}
            />
          </div>
          <Button
            variant="secondary"
            className="p-2.5"
            loading={loadings[1]}
            prefixIcon={<TrashBinIcon />}
            onClick={async () => {
              setLoadings(([a, _]) => [a, true]);
              await deleteImage();
              setLoadings(([a, _]) => [a, false]);
            }}
          />
        </div>
      </div>
    </div>
  );
}
