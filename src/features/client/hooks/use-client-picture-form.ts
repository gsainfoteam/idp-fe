import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { patchClientPicture } from '@/data/patch-client-picture';
import { Client } from './use-client';
import imageCompression from 'browser-image-compression';
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

  const changeImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return false;

    if (!file.type.startsWith('image/')) {
      toast.error(t('services.detail.picture.errors.invalid_image_type'));
      return false;
    }

    if (file.size > MAX_IMAGE_KB * 1000) {
      toast.error(
        t('services.detail.picture.errors.image_too_large', {
          max_size_mb: MAX_IMAGE_KB / 1024,
        }),
      );
      return false;
    }

    return new Promise<boolean>((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        if (typeof e.target?.result === 'string') {
          setPreviewImage(e.target?.result);
          setValue('image', file, { shouldDirty: true });
          resolve(true);
        } else {
          resolve(false);
        }
      };
      reader.onerror = () => {
        resolve(false);
      };
    });
  };

  const deleteImage = async () => {
    // FIXME: 백엔드에서 deleteClientPicture 함수 추가 후 수정
    // const { status } = await deleteUserPicture();

    // if (status) {
    //   switch (status) {
    //     case 'INVALID_TOKEN':
    //       toast.error(t('toast.invalid_token'));
    //       break;
    //     case 'SERVER_ERROR':
    //       toast.error(t('toast.server_error'));
    //       break;
    //     case 'UNKNOWN_ERROR':
    //       toast.error(t('toast.unknown_error'));
    //       break;
    //   }

    //   return false;
    // }

    setPreviewImage(null);
    setValue('image', undefined, { shouldDirty: true });
    onUpdated();

    return true;
  };

  const uploadImage = async () => {
    const imageFile = watch('image');
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
      toast.error(t('services.detail.picture.errors.failed_to_compress'));
      return false;
    }

    const { data, status } = await patchClientPicture(
      client.clientId,
      compressedFile.size,
    );

    if (!data || status) {
      switch (status) {
        case 'INVALID_TOKEN':
          toast.error(t('toast.invalid_token'));
          break;
        case 'FORBIDDEN':
          toast.error(t('toast.invalid_user'));
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
    } catch (error) {
      toast.error(t('services.detail.picture.errors.failed_to_upload'));
      return false;
    }

    onUpdated();

    return true;
  };

  return { form, changeImage, deleteImage, uploadImage };
};
