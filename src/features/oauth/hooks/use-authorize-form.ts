import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { postOauthConsent } from '@/data/post-oauth-consent';
import {
  ClientScopeEnum,
  ClientScopeType,
} from '@/routes/_auth-required/authorize';

export const createSchema = () =>
  z.object({ scopes: z.record(ClientScopeEnum, z.boolean()) });

export type ConsentFormSchema = z.infer<ReturnType<typeof createSchema>>;

export const useAuthorizeForm = ({
  clientId,
  onDone,
}: {
  clientId: string;
  onDone: (scopes: ClientScopeType[]) => void;
}) => {
  const form = useForm({
    resolver: zodResolver(createSchema()),
    mode: 'onBlur',
    defaultValues: { scopes: {} },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const scopes = Object.entries(data.scopes)
      .filter(([, value]) => value === true)
      .map(([key]) => key as ClientScopeType);

    const { status } = await postOauthConsent({
      client_id: clientId,
      scope: scopes.join(' '),
    });

    if (status) {
      switch (status) {
        case 'SERVER_ERROR':
          console.error('Server error');
          break;
        case 'UNKNOWN_ERROR':
          console.error('Unknown error');
          break;
      }

      return;
    }

    onDone(scopes);
  });

  return { form, onSubmit };
};
