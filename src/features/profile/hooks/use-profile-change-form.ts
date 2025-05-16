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

const schema = z.object({
  image: z.instanceof(File).optional(),
});

export const useProfileChangeForm = (
  previewFile: string | null,
  setPreviewImage: Dispatch<SetStateAction<string | null>>,
) => {
  const { refetch } = useAuth();
  const { t } = useTranslation();
  const form = useForm({
    resolver: zodResolver(schema),
  });

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        setPreviewImage(e.target?.result);
        form.setValue('image', file, { shouldDirty: true });
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

      return;
    }

    setPreviewImage(null);
    form.setValue('image', undefined, { shouldDirty: true });
    await refetch();
  };

  const changeImage = async () => {
    const imageFile = form.getValues('image');
    if (!imageFile) return;

    let compressedFile: File;
    try {
      compressedFile = await imageCompression(imageFile, {
        maxSizeMB: 1,
        maxWidthOrHeight: 512,
        useWebWorker: true,
        fileType: 'image/webp',
      });
    } catch (error) {
      toast.error(t('profile_change.errors.failed_to_compress'));
      return;
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

      return;
    }

    try {
      const uploadResponse = await fetch(data.presignedUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'image/webp' },
        body: compressedFile,
      });

      if (!uploadResponse.ok) {
        toast.error(t('profile_change.errors.failed_to_upload'));
        console.log('Upload response:', uploadResponse); // DEBUG
        return;
      }

      await refetch();
    } catch (error) {
      toast.error(t('profile_change.errors.failed_to_upload'));
      console.log('Upload response:', error); // DEBUG
      return;
    }
  };

  const onSubmit = form.handleSubmit(async () => {
    if (!previewFile) await deleteImage();
    else await changeImage();
  });

  return { form, onSubmit, handleImageChange };
};
