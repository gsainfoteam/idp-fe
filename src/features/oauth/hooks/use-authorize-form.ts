import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { postOauthConsent } from '@/data/post-oauth-consent';
import { ScopeEnum } from '@/routes/_auth-required/authorize';

export const createSchema = (t: TFunction) =>
  z.object({
    client_id: z.string().min(1, t('authorize.errors.client_id')),
    scopes: z.record(ScopeEnum, z.boolean()).default({}),
  });

export type ConsentFormSchema = z.infer<ReturnType<typeof createSchema>>;

export const useAuthorizeForm = () => {
  const { t } = useTranslation();
  const form = useForm({
    resolver: zodResolver(createSchema(t)),
    mode: 'onBlur',
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const requestBody = {
      client_id: data.client_id,
      scope: Object.entries(data.scopes)
        .filter(([, value]) => value === true)
        .map(([key]) => key)
        .join(' '),
    };

    await postOauthConsent(requestBody);
  });

  return { form, onSubmit };
};
