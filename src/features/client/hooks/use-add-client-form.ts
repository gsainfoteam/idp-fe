import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { postClient } from '@/data/client';
import { Log } from '@/features/core';

const createSchema = (t: TFunction) =>
  z.object({
    name: z.string().min(1, { message: t('services.add.name.placeholder') }),
  });

export type CreateFormSchema = z.infer<ReturnType<typeof createSchema>>;

export const useAddClientForm = ({
  onSuccess,
}: {
  onSuccess: (client: { clientId: string; clientSecret: string }) => void;
}) => {
  const { t } = useTranslation();
  const form = useForm<CreateFormSchema>({
    resolver: zodResolver(createSchema(t)),
    mode: 'onBlur',
  });

  const onSubmit = form.handleSubmit(async (formData) => {
    const res = await postClient({ name: formData.name });

    if (!res.ok) {
      if (res.status === 409) {
        form.setError('name', { message: t('services.add.name.duplicated') });
      } else if (res.status === 500) {
        toast.error(t('toast.server_error'));
      } else {
        toast.error(t('toast.unknown_error'));
      }

      return;
    }

    Log.submit('client_create');
    onSuccess(res.data);
  });

  return { form, onSubmit };
};
