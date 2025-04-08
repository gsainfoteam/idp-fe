import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z, ZodBoolean } from 'zod';

import { consent } from '../services/use-consent';

export const ClientScopeList = [
  'profile',
  'name',
  'email',
  'phone_number',
  'student_id',
] as const;
export type ClientScopeType = (typeof ClientScopeList)[number];

export const TokenScopeList = ['openid', 'offline_access'] as const;
export type TokenScopeType = (typeof TokenScopeList)[number];

export const ScopeList = [...ClientScopeList, ...TokenScopeList];
export type ScopeType = (typeof ScopeList)[number];

export const createSchema = (t: TFunction) =>
  z.object({
    client_id: z.string().min(1, t('authorize.errors.client_id')), // TODO: i18next
    ...ScopeList.reduce(
      (acc, scope) => {
        acc[scope] = z.boolean().default(false);
        return acc;
      },
      {} as Record<ScopeType, z.ZodDefault<ZodBoolean>>,
    ),
  });

export type ConsentFormSchema = z.infer<ReturnType<typeof createSchema>>;

export const useAuthorizeForm = () => {
  const { t } = useTranslation();
  const form = useForm({
    resolver: zodResolver(createSchema(t)),
    mode: 'onBlur',
  });

  const onSubmit = form.handleSubmit(async (data) => {
    console.log({
      client_id: data.client_id,
      scope: ScopeList.filter((scope) => data[scope]).join(' '),
    }); // TESTING
    await consent({
      client_id: data.client_id,
      scope: ScopeList.filter((scope) => data[scope]).join(' '),
    });
  });

  return { form, onSubmit };
};
