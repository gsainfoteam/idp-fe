import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Client } from './use-client';

const schema = z.object({});

export type ClientScopesFormSchema = z.infer<typeof schema>;

export const useClientScopesForm = (client: Client) => {
  const form = useForm<ClientScopesFormSchema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  return { form, onSubmit };
};
