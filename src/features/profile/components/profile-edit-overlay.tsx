import { useEffect, useRef, useState } from 'react';

import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import EditIcon from '@/assets/icons/solid/edit.svg?react';
import { useAuth } from '@/features/auth';
import {
  Avatar,
  Button,
  FileUpload,
  IconButton,
  LogClick,
  LogModal,
  uniqueKey,
} from '@/features/core';
import { useLoading } from '@/features/core';

import { useProfileEditForm } from '../../core/hooks/use-profile-edit-form';

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

  useEffect(() => {
    if (!user) {
      if (isOpen) toast.error(t('toast.invalid_user'));
    } else setPreviewImage(user.picture ?? null);
  }, [user]);

  const handleClose = (_: boolean) => {
    setPreviewImage(user?.picture ?? null);
    close();
  };

  if (!user) return null;

  return (
    <LogModal
      isOpen={isOpen}
      close={handleClose}
      defaultCloseValue={false}
      dialogClassName="min-w-100"
      event="profile_edit_modal"
      openProperties={{}}
      closeProperties={() => ({})}
    >
      <LogModal.Header>{t('profile_change.title')}</LogModal.Header>
      <LogModal.Body className="flex justify-center">
        <div className="relative w-fit cursor-pointer">
          <Avatar
            img={previewFile ?? undefined}
            seed={uniqueKey(user.studentId)}
            size={30}
            onClick={() => fileInputRef.current?.click()}
          >
            {user.name.charAt(0)}
          </Avatar>
          <FileUpload
            ref={fileInputRef}
            accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
            maxSizeMb={1}
            onSave={onSave}
          >
            <div className="absolute right-0 bottom-0">
              <LogClick event="home_profile_picture_upload">
                <IconButton
                  variant="primary"
                  icon={<EditIcon width={20} height={20} />}
                  className="border-funnel-background rounded-full border-4 p-2"
                />
              </LogClick>
            </div>
          </FileUpload>
        </div>
      </LogModal.Body>
      <LogModal.Footer>
        <LogModal.Close className="grow" closeValue={false}>
          <LogClick event="home_profile_picture_delete">
            <Button
              variant="secondary"
              onClick={() => setPreviewImage(null)}
              disabled={previewFile == null}
              className="w-full"
            >
              {t('profile_change.sub_button')}
            </Button>
          </LogClick>
        </LogModal.Close>
        <LogModal.Close className="grow" closeValue={true}>
          <LogClick event="home_profile_save_button">
            <Button
              variant="primary"
              onClick={() => startLoading(onSubmit().then(handleClose))}
              disabled={previewFile === user.picture}
              loading={loading}
              className="w-full"
            >
              {t('profile_change.button')}
            </Button>
          </LogClick>
        </LogModal.Close>
      </LogModal.Footer>
    </LogModal>
  );
}
