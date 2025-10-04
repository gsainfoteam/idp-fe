import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { patchClientSecret } from '@/data/patch-client-secret';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

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
    const { data, status } = await patchClientSecret(client.clientId);
    if (!data || status) {
      switch (status) {
        case 'FORBIDDEN':
          form.setError('root', { message: t('common.errors.forbidden') });
          break;
      }
      return;
    }
    form.setValue('clientSecret', data.clientSecret);
  });

  return { form, onSubmit };
};
