import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Client } from './use-client';

import { patchClientSecret } from '@/data/patch-client-secret';

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

  const onSubmit = form.handleSubmit(async () => {
    const { data } = await patchClientSecret(client.clientId);
    form.setValue('clientSecret', data?.clientSecret ?? null);
  });

  return { form, onSubmit };
};
