import { useAuth } from '@/features/auth';
import {
  Avatar,
  BottomSheet,
  Button,
  Dialog,
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
  open,
  close,
}: {
  open: boolean;
  close: () => void;
}) {
  const [previewFile, setPreviewImage] = useState<string | null>(null);
  const [loading, startLoading] = useLoading();
  const [isPC, setIsPC] = useState(false);

  const { user } = useAuth();
  const { t } = useTranslation();
  const { onSubmit, onSave } = useProfileEditForm(previewFile, setPreviewImage);
  const fileInputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) toast.error(t('toast.invalid_user'));
    else setPreviewImage(user.picture ?? null);
  }, [user]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const handleResize = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsPC(e.matches);
    };

    handleResize(mediaQuery);

    mediaQuery.addEventListener('change', handleResize);
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  const handleClose = () => {
    setPreviewImage(user?.picture ?? null);
    close();
  };

  if (!user) return null;

  return isPC ? (
    <Dialog isOpen={open} close={handleClose} className="min-w-100">
      <Dialog.Header>{t('profile_change.title')}</Dialog.Header>
      <Dialog.Body className="flex justify-center">
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
      </Dialog.Body>
      <Dialog.Footer>
        <Dialog.Close className="grow">
          <Button
            variant="secondary"
            onClick={() => setPreviewImage(null)}
            className="w-full"
          >
            {t('profile_change.sub_button')}
          </Button>
        </Dialog.Close>
        <Button
          variant="primary"
          onClick={() => startLoading(onSubmit().then(handleClose))}
          disabled={previewFile === user.picture}
          loading={loading}
          className="grow"
        >
          {t('profile_change.button')}
        </Button>
      </Dialog.Footer>
    </Dialog>
  ) : (
    <BottomSheet isOpen={open} close={handleClose}>
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
        <BottomSheet.Close className="grow">
          <Button
            variant="secondary"
            onClick={() => setPreviewImage(null)}
            className="w-full"
          >
            {t('profile_change.sub_button')}
          </Button>
        </BottomSheet.Close>
        <Button
          variant="primary"
          onClick={() => startLoading(onSubmit().then(handleClose))}
          disabled={previewFile === user.picture}
          loading={loading}
          className="grow"
        >
          {t('profile_change.button')}
        </Button>
      </BottomSheet.Footer>
    </BottomSheet>
  );
}
