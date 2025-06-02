import { useAuth } from '@/features/auth';
import {
  Avatar,
  BottomSheet,
  Button,
  FileUpload,
  IconButton,
  uniqueKey,
} from '@/features/core';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useProfileEditForm } from '../hooks/use-profile-edit-form';

import EditIcon from '@/assets/icons/solid/edit.svg?react';
import { useLoading } from '@/features/core';

export function ProfileEditOverlay({
  open,
  close,
}: {
  open: boolean;
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
    <BottomSheet isOpen={open} close={handleClose}>
      <BottomSheet.Header>{t('profile_change.title')}</BottomSheet.Header>
      <BottomSheet.Body className="flex justify-center">
        <div className="relative w-fit cursor-pointer">
          <Avatar
            name={user.name}
            img={previewFile ?? undefined}
            seed={uniqueKey(user.studentId)}
            size={30}
            onClick={() => fileInputRef.current?.click()}
          />
          <FileUpload
            ref={fileInputRef}
            accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
            maxSizeMb={1}
            onSave={onSave}
          >
            <div className="absolute right-0 bottom-0">
              <IconButton
                variant="primary"
                icon={<EditIcon width={20} height={20} />}
                className="border-funnel-background rounded-full border-4 p-2"
              />
            </div>
          </FileUpload>
        </div>
      </BottomSheet.Body>
      <BottomSheet.Footer>
        <Button
          variant="secondary"
          onClick={() => setPreviewImage(null)}
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
