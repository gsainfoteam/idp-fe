import { Dispatch, SetStateAction } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import imageCompression from 'browser-image-compression';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { deleteUserPicture, patchUserPicture } from '@/data/user';
import { useAuth } from '@/features/auth';

const schema = z.object({
  image: z.instanceof(File).optional(),
});

export const useProfileEditForm = (
  previewFile: string | null,
  setPreviewImage: Dispatch<SetStateAction<string | null>>,
) => {
  const { refetch } = useAuth();
  const { t } = useTranslation();
  const form = useForm({
    resolver: zodResolver(schema),
  });

  const { formState, getValues, setValue } = form;

  const onSave = async (files: File[], previewUrls: string[]) => {
    setPreviewImage(previewUrls[0]!);
    setValue('image', files[0]!, { shouldDirty: true });
  };

  const deleteImage = async () => {
    const res = await deleteUserPicture();

    if (!res.ok) {
      if (res.status === 401) {
        toast.error(t('toast.invalid_token'));
      } else if (res.status === 500) {
        toast.error(t('toast.server_error'));
      } else {
        toast.error(t('toast.unknown_error'));
      }

      return false;
    }

    setPreviewImage(null);
    setValue('image', undefined, { shouldDirty: true });
    await refetch();

    return true;
  };

  const compressImage = async (file: File) => {
    try {
      return await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 512,
        useWebWorker: true,
        fileType: 'image/webp',
      });
    } catch (error) {
      toast.error(t('profile_change.errors.failed_to_compress'));
      return null;
    }
  };

  const changeImage = async () => {
    const image = getValues('image');
    if (!image) return false;

    const error = formState.errors.image;
    if (error?.message != null) {
      toast.error(error.message);
      return false;
    }

    const compressedImage = await compressImage(image);
    if (!compressedImage) return false;

    const res = await patchUserPicture({ length: compressedImage.size });

    if (!res.ok) {
      if (res.status === 401) {
        toast.error(t('toast.invalid_token'));
      } else if (res.status === 500) {
        toast.error(t('toast.server_error'));
      } else {
        toast.error(t('toast.unknown_error'));
      }

      return false;
    }

    try {
      const uploadResponse = await fetch(res.data.presignedUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'image/webp' },
        body: compressedImage,
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

  return { form, onSubmit, onSave };
};
