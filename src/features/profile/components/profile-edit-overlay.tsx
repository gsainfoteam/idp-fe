import { useAuth } from '@/features/auth';
import {
  Avatar,
  BottomSheet,
  Button,
  FileUpload,
  uniqueKey,
} from '@/features/core';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useProfileEditForm } from '../hooks/use-profile-edit-form';

import EditIcon from '@/assets/icons/solid/edit.svg?react';
import { useLoading } from '@/features/core';

export function ProfileEditOverlay({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) {
  const [previewFile, setPreviewImage] = useState<string | null>(null);
  const [loading, startLoading] = useLoading();

  const { user } = useAuth();
  const { t } = useTranslation();
  const { onSubmit, onSave } = useProfileEditForm(previewFile, setPreviewImage);
  const fileInputRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setPreviewImage(user?.picture ?? null);
    close();
  };

  useEffect(() => {
    if (!user) toast.error(t('toast.invalid_user'));
    else setPreviewImage(user.picture ?? null);
  }, [user]);

  if (!user) return null;

  // TODO: md 버전에서는 dialog로

  return (
    <BottomSheet isOpen={isOpen} close={handleClose}>
      <BottomSheet.Header>{t('profile_change.title')}</BottomSheet.Header>
      <BottomSheet.Body className="flex justify-center">
        <div
          className="relative w-fit cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <Avatar
            name={user.name}
            img={previewFile ?? undefined}
            seed={uniqueKey(user.studentId)}
            size={30}
          />
          <FileUpload
            ref={fileInputRef}
            accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
            maxSizeMb={1}
            onSave={onSave}
          >
            <div className="bg-primary-600 absolute right-0 bottom-0 flex items-center justify-center rounded-full border-4 border-white p-1.5">
              <EditIcon
                color="white"
                width={20}
                height={20}
                className="cursor-pointer"
              />
            </div>
          </FileUpload>
        </div>
      </BottomSheet.Body>
      <BottomSheet.Footer>
        <Button
          variant="secondary"
          onClick={() => setPreviewImage(null)}
          disabled={previewFile == null}
          className="w-full"
        >
          {t('profile_change.sub_button')}
        </Button>
        <Button
          variant="primary"
          onClick={() => startLoading(onSubmit().then(handleClose))}
          disabled={previewFile === user.picture}
          loading={loading}
          className="w-full"
        >
          {t('profile_change.button')}
        </Button>
      </BottomSheet.Footer>
    </BottomSheet>
  );
}
