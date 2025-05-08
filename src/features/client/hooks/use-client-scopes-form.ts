import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

import { Client } from './use-client';

import { patchClient } from '@/data/patch-client';
import { ClientScopeEnum } from '@/routes/_auth-required/authorize';

const schema = z.object({
  idTokenAllowed: z.boolean(),
  scopes: z.record(ClientScopeEnum, z.enum(['no', 'optional', 'required'])),
});

export type ClientScopesFormSchema = z.infer<typeof schema>;

export const useClientScopesForm = (client: Client) => {
  const form = useForm<ClientScopesFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      idTokenAllowed: client.idTokenAllowed,
      scopes: Object.fromEntries([
        ...client.scopes.map((v) => [v, 'required']),
        ...client.optionalScopes.map((v) => [v, 'optional']),
      ]),
    },
  });

  const values = useWatch({ control: form.control });

  useEffect(() => {
    const timer = setTimeout(async () => {
      await patchClient(client.clientId, {
        scopes: Object.entries(values.scopes ?? {})
          .filter(([, value]) => value === 'required')
          .map(([key]) => key),
        optionalScopes: Object.entries(values.scopes ?? {})
          .filter(([, value]) => value === 'optional')
          .map(([key]) => key),
        idTokenAllowed: values.idTokenAllowed,
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [client.clientId, values]);

  return { form };
};
