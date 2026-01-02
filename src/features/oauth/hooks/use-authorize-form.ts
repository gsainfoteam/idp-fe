import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { postOauthConsent } from '@/data/oauth';
import { useAuth } from '@/features/auth';
import {
  ClientScopeEnum,
  type ClientScopeType,
} from '@/routes/_auth-required/authorize';

export const createSchema = () =>
  z.object({ scopes: z.record(ClientScopeEnum, z.boolean()) });

export type ConsentFormSchema = z.infer<ReturnType<typeof createSchema>>;

export const useAuthorizeForm = ({
  clientId,
  requiredScopes,
  onDone,
}: {
  clientId: string;
  requiredScopes: ClientScopeType[];
  onDone: (scopes: ClientScopeType[]) => void;
}) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const form = useForm({
    resolver: zodResolver(createSchema()),
    mode: 'onBlur',
    defaultValues: { scopes: {} },
  });

  const isRequiredScopeNotVerified = useMemo(() => {
    if (!user) return true;
    if (requiredScopes.includes('student_id') && !user.isIdVerified) {
      return true;
    }
    if (
      requiredScopes.includes('phone_number') &&
      !user.isPhoneNumberVerified
    ) {
      return true;
    }
    return false;
  }, [user, requiredScopes]);

  const onSubmit = form.handleSubmit(async (data) => {
    const scopes = Object.entries(data.scopes)
      .filter(([, value]) => value === true)
      .map(([key]) => key as ClientScopeType);

    const res = await postOauthConsent({
      client_id: clientId,
      scope: scopes.join(' '),
    });

    if (!res.ok) {
      if (res.status === 500) {
        toast.error(t('toast.server_error'));
      } else {
        toast.error(t('toast.unknown_error'));
      }

      return;
    }

    onDone(scopes);
  });

  return { form, onSubmit, isRequiredScopeNotVerified };
};
