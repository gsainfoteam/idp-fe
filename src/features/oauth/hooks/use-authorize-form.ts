import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { consent, ConsentRequestBody } from '../services/consent';

export const ClientScopeList = [
  'profile',
  'name',
  'email',
  'phone_number',
  'student_id',
] as const;
export const ClientScopeEnum = z.enum(ClientScopeList);
export type ClientScopeType = z.infer<typeof ClientScopeEnum>;

export const TokenScopeList = ['openid', 'offline_access'] as const;
export const TokenScopeEnum = z.enum(TokenScopeList);
export type TokenScopeType = z.infer<typeof TokenScopeEnum>;

export const ScopeList = [...ClientScopeList, ...TokenScopeList] as const;
export const ScopeEnum = z.enum(ScopeList);
export type ScopeType = z.infer<typeof ScopeEnum>;

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
    const requestBody: ConsentRequestBody = {
      client_id: data.client_id,
      scope: Object.entries(data.scopes)
        .filter(([, value]) => value === true)
        .map(([key]) => key)
        .join(' '),
    };

    try {
      await consent(requestBody);
    } catch (err) {
      console.error('consent error', err); // TODO: error handling
    }
  });

  return { form, onSubmit };
};
