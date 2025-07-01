import { useAuth } from '@/features/auth';
import {
  Avatar,
  Button,
  Modal,
  FileUpload,
  uniqueKey,
  IconButton,
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

  useEffect(() => {
    if (!user) toast.error(t('toast.invalid_user'));
    else setPreviewImage(user.picture ?? null);
  }, [user]);

  const handleClose = () => {
    setPreviewImage(user?.picture ?? null);
    close();
  };

  if (!user) return null;

  return (
    <Modal isOpen={isOpen} close={handleClose} className="min-w-100">
      <Modal.Header>{t('profile_change.title')}</Modal.Header>
      <Modal.Body className="flex justify-center">
        <div
          className="relative w-fit cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
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
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setPreviewImage(null)}
          disabled={previewFile == null}
          className="grow"
        >
          {t('profile_change.sub_button')}
        </Button>
        <Button
          variant="primary"
          onClick={() => startLoading(onSubmit().then(handleClose))}
          disabled={previewFile === user.picture}
          loading={loading}
          className="grow"
        >
          {t('profile_change.button')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
