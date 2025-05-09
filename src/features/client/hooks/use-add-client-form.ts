import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { postClient } from '@/data/post-client';

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
    const { data, status } = await postClient({ name: formData.name });

    if (!data || status) {
      switch (status) {
        case 'DUPLICATED_CLIENT_ID':
          form.setError('name', { message: t('services.add.name.duplicated') });
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

    onSuccess(data);
  });

  return { form, onSubmit };
};
