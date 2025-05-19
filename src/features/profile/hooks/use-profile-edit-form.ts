import { deleteUserPicture } from '@/data/delete-user-picture';
import { patchUserPicture } from '@/data/patch-user-picture';
import { useAuth } from '@/features/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import imageCompression from 'browser-image-compression';
import { TFunction } from 'i18next';

const MAX_IMAGE_KB = 1024;

const createSchema = (t: TFunction) =>
  z.object({
    image: z
      .instanceof(File)
      .refine((file) => file.size <= MAX_IMAGE_KB * 1000, {
        message: t('profile_change.errors.image_too_large', {
          max_size_mb: MAX_IMAGE_KB / 1024,
        }),
      })
      .optional(),
  });

export const useProfileEditForm = (
  previewFile: string | null,
  setPreviewImage: Dispatch<SetStateAction<string | null>>,
) => {
  const { refetch } = useAuth();
  const { t } = useTranslation();
  const form = useForm({
    resolver: zodResolver(createSchema(t)),
  });

  const { formState, getValues, setValue } = form;

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error(t('profile_change.errors.invalid_image_type'));
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        setPreviewImage(e.target?.result);
        setValue('image', file, { shouldDirty: true });
      }
    };
  };

  const deleteImage = async () => {
    const { status } = await deleteUserPicture();

    if (status) {
      switch (status) {
        case 'INVALID_TOKEN':
          toast.error(t('toast.invalid_token'));
          break;
        case 'SERVER_ERROR':
          toast.error(t('toast.server_error'));
          break;
        case 'UNKNOWN_ERROR':
          toast.error(t('toast.unknown_error'));
          break;
      }

      return false;
    }

    setPreviewImage(null);
    setValue('image', undefined, { shouldDirty: true });
    await refetch();
    return true;
  };

  const changeImage = async () => {
    const imageFile = getValues('image');
    if (!imageFile) return false;

    const error = formState.errors.image;
    if (error?.message != null) {
      toast.error(error.message);
      return false;
    }

    let compressedFile: File;
    try {
      compressedFile = await imageCompression(imageFile, {
        maxSizeMB: MAX_IMAGE_KB / 1024,
        maxWidthOrHeight: 512,
        useWebWorker: true,
        fileType: 'image/webp',
      });
    } catch (error) {
      toast.error(t('profile_change.errors.failed_to_compress'));
      return false;
    }

    const { data, status } = await patchUserPicture(compressedFile.size);

    if (!data || status) {
      switch (status) {
        case 'INVALID_TOKEN':
          toast.error(t('toast.invalid_token'));
          break;
        case 'SERVER_ERROR':
          toast.error(t('toast.server_error'));
          break;
        case 'UNKNOWN_ERROR':
          toast.error(t('toast.unknown_error'));
          break;
      }

      return false;
    }

    try {
      const uploadResponse = await fetch(data.presignedUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'image/webp' },
        body: compressedFile,
      });

      if (!uploadResponse.ok) throw uploadResponse;
      await refetch();
    } catch (error) {
      toast.error(t('profile_change.errors.failed_to_upload'));
      return false;
    }

    return true;
  };

  const onSubmit = async () => {
    if (!previewFile) return await deleteImage();
    else return await changeImage();
  };

  return { form, onSubmit, handleImageChange };
};
