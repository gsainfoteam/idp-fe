import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { deleteClientPicture } from '@/data/delete-client-picture';
import { patchClientPicture } from '@/data/patch-client-picture';
import { zodResolver } from '@hookform/resolvers/zod';
import imageCompression from 'browser-image-compression';
import { z } from 'zod';

import { Client } from './use-client';

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

  const onSave = async (files: File[], previewUrls: string[]) => {
    setPreviewImage(previewUrls[0]!);
    setValue('image', files[0]!, { shouldDirty: true });
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

  const compressImage = async (file: File) => {
    try {
      return await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 512,
        useWebWorker: true,
        fileType: 'image/webp',
      });
    } catch (error) {
      throw t('services.detail.picture.errors.failed_to_compress');
    }
  };

  const uploadImage = async () => {
    const image = watch('image');
    if (!image) return;

    const error = formState.errors.image;
    if (error?.message != null) throw error.message;

    const compressedImage = await compressImage(image);

    const { data, status } = await patchClientPicture(
      client.clientId,
      compressedImage.size,
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
        body: compressedImage,
      });

      if (!uploadResponse.ok) throw uploadResponse;
    } catch (error) {
      throw t('services.detail.picture.errors.failed_to_upload');
    }

    onUpdated();
  };

  const uploadImageWithToast = () =>
    toast.promise(uploadImage, {
      loading: t('services.detail.picture.saving'),
      success: t('services.detail.picture.uploaded'),
      error: (err) => err.toString(),
    });

  const deleteImageWithToast = () =>
    toast.promise(deleteImage, {
      loading: t('services.detail.picture.deleting'),
      success: t('services.detail.picture.deleted'),
      error: (err) => err.toString(),
    });

  return {
    form,
    uploadImage: uploadImageWithToast,
    deleteImage: deleteImageWithToast,
    onSave,
  };
};
