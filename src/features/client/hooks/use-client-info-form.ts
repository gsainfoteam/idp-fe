import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { patchClientSecret } from '@/data/client';

import { Client } from './use-client';

const schema = z.object({
  clientId: z.string().min(1),
  clientSecret: z.string().nullable(),
});

export type ClientInfoFormSchema = z.infer<typeof schema>;

export const useClientInfoForm = (client: Client) => {
  const form = useForm<ClientInfoFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      clientId: client.clientId,
      clientSecret: null,
    },
  });
  const { t } = useTranslation();

  const onSubmit = form.handleSubmit(async () => {
    const res = await patchClientSecret({ clientId: client.clientId });
    if (!res.ok) {
      if (res.status === 403) {
        form.setError('root', { message: t('common.errors.forbidden') });
      }
      return;
    }

    form.setValue('clientSecret', res.data.clientSecret);
  });

  return { form, onSubmit };
};
