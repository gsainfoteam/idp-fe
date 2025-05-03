import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { postOauthConsent } from '@/data/post-oauth-consent';
import { ScopeEnum } from '@/routes/_auth-required/authorize';

export const createSchema = () =>
  z.object({ scopes: z.record(ScopeEnum, z.boolean()).default({}) });

export type ConsentFormSchema = z.infer<ReturnType<typeof createSchema>>;

export const useAuthorizeForm = ({
  clientId,
  onDone,
}: {
  clientId: string;
  onDone: () => void;
}) => {
  const form = useForm({
    resolver: zodResolver(createSchema()),
    mode: 'onBlur',
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const requestBody = {
      client_id: clientId,
      scope: Object.entries(data.scopes)
        .filter(([, value]) => value === true)
        .map(([key]) => key)
        .join(' '),
    };

    await postOauthConsent(requestBody);
    onDone();
  });

  return { form, onSubmit };
};
