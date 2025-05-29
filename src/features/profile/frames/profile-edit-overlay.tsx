import { useAuth } from '@/features/auth';
import { Avatar, BottomSheet, Button, uniqueKey } from '@/features/core';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useProfileEditForm } from '../hooks/use-profile-edit-form';

import EditIcon from '@/assets/icons/solid/edit.svg?react';

export function ProfileEditOverlay({
  open,
  close,
}: {
  open: boolean;
  close: () => void;
}) {
  const [previewFile, setPreviewImage] = useState<string | null>(null);
  const { user } = useAuth();
  const { t } = useTranslation();
  const {
    form: { formState },
    onSubmit,
    handleImageChange,
  } = useProfileEditForm(previewFile, setPreviewImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleClose = () => {
    setPreviewImage(user?.picture ?? null);
    close();
  };

  useEffect(() => {
    if (!user) toast.error(t('toast.invalid_user'));
    else setPreviewImage(user.picture ?? null);
  }, [user]);

  if (!user) return null;

  // TODO: md 버전에서는 modal로

  return (
    <BottomSheet isOpen={open} close={handleClose}>
      <BottomSheet.Header>{t('profile_change.title')}</BottomSheet.Header>
      <BottomSheet.Body className="flex justify-center">
        <div
          className="relative w-fit cursor-pointer"
          onClick={handleEditClick}
        >
          <Avatar
            name={user.name}
            img={previewFile ?? undefined}
            seed={uniqueKey(user.studentId)}
            size={30}
            className="text-title-1"
          />
          <div className="bg-primary-600 absolute right-0 bottom-0 flex items-center justify-center rounded-full border-4 border-white p-1.5">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (!handleImageChange(e)) close();
              }}
              className="absolute h-0 w-0 appearance-none opacity-0"
            />
            <EditIcon
              color="white"
              width={20}
              height={20}
              className="cursor-pointer"
            />
          </div>
        </div>
      </BottomSheet.Body>
      <BottomSheet.Footer>
        <BottomSheet.Close>
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
          onClick={async () => {
            if (await onSubmit()) handleClose();
          }}
          disabled={previewFile === user.picture}
          loading={formState.isSubmitting}
          className="w-full"
        >
          {t('profile_change.button')}
        </Button>
      </BottomSheet.Footer>
    </BottomSheet>
  );
}
