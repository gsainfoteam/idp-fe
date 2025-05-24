import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { patchClientPicture } from '@/data/patch-client-picture';
import { Client } from './use-client';
import imageCompression from 'browser-image-compression';
import { deleteClientPicture } from '@/data/delete-client-picture';

const MAX_IMAGE_KB = 1024;

const schema = z.object({
  image: z.instanceof(File).optional(),
});

export const useClientPictureForm = (
  client: Client,
  setPreviewImage: Dispatch<SetStateAction<string | null>>,
  onUpdated: () => void,
) => {
  const { t } = useTranslation();
  const form = useForm({
    resolver: zodResolver(schema),
  });

  const { formState, watch, setValue } = form;

  const handleChangeImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      throw t('services.detail.picture.errors.invalid_image_type');
    }

    if (file.size > MAX_IMAGE_KB * 1024) {
      throw t('services.detail.picture.errors.image_too_large', {
        max_size_mb: MAX_IMAGE_KB / 1024,
      });
    }

    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        if (typeof e.target?.result === 'string') {
          setPreviewImage(e.target?.result);
          setValue('image', file, { shouldDirty: true });
          resolve();
        } else {
          reject(t('services.detail.picture.errors.failed_to_read'));
        }
      };
      reader.onerror = () =>
        reject(t('services.detail.picture.errors.failed_to_read'));
    });
  };

  const deleteImage = async () => {
    const { status } = await deleteClientPicture(client.clientId);

    if (status) {
      switch (status) {
        case 'INVALID_TOKEN':
          throw t('toast.invalid_token');
        case 'FORBIDDEN':
          throw t('toast.invalid_user');
        case 'SERVER_ERROR':
          throw t('toast.server_error');
        case 'UNKNOWN_ERROR':
          throw t('toast.unknown_error');
      }
    }

    setPreviewImage(null);
    setValue('image', undefined, { shouldDirty: true });
    onUpdated();
  };

  const uploadImage = async () => {
    const imageFile = watch('image');
    if (!imageFile) return;

    const error = formState.errors.image;
    if (error?.message != null) {
      throw error.message;
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
      throw t('services.detail.picture.errors.failed_to_compress');
    }

    const { data, status } = await patchClientPicture(
      client.clientId,
      compressedFile.size,
    );

    if (!data || status) {
      switch (status) {
        case 'INVALID_TOKEN':
          throw t('toast.invalid_token');
        case 'FORBIDDEN':
          throw t('toast.invalid_user');
        case 'SERVER_ERROR':
          throw t('toast.server_error');
        case 'UNKNOWN_ERROR':
          throw t('toast.unknown_error');
      }

      return;
    }

    try {
      const uploadResponse = await fetch(data.presignedUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'image/webp' },
        body: compressedFile,
      });

      if (!uploadResponse.ok) throw uploadResponse;
    } catch (error) {
      throw t('services.detail.picture.errors.failed_to_upload');
    }

    onUpdated();
  };

  const changeImageWithToast = (event: ChangeEvent<HTMLInputElement>) =>
    toast.promise(handleChangeImage(event).then(uploadImage), {
      loading: t('services.detail.picture.saving'),
      success: t('services.detail.picture.uploaded'),
      error: (err) => err.toString(),
    });

  const deleteImageWithToast = () =>
    toast.promise(deleteImage(), {
      loading: t('services.detail.picture.deleting'),
      success: t('services.detail.picture.deleted'),
      error: (err) => err.toString(),
    });

  return {
    form,
    changeImage: changeImageWithToast,
    deleteImage: deleteImageWithToast,
  };
};
