import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { Client } from './use-client';
import { TFunction } from 'i18next';

import { patchClient } from '@/data/patch-client';
import { ClientScopeEnum } from '@/routes/_auth-required/authorize';
import toast from 'react-hot-toast';

const createSchema = (t: TFunction) =>
  z.object({
    idTokenAllowed: z.boolean(),
    scopes: z.record(ClientScopeEnum, z.enum(['no', 'optional', 'required'])),
    urls: z.array(z.string().url()),
    newUrl: z.string().url(t('services.detail.urls.errors.format')),
  });

export type ClientDetailsFormSchema = z.infer<ReturnType<typeof createSchema>>;

export const useClientDetailsForm = (client: Client, onUpdated: () => void) => {
  const { t } = useTranslation();
  const form = useForm<ClientDetailsFormSchema>({
    resolver: zodResolver(createSchema(t)),
    mode: 'onBlur',
    defaultValues: {
      idTokenAllowed: client.idTokenAllowed,
      scopes: Object.fromEntries([
        ...client.scopes.map((v) => [v, 'required']),
        ...client.optionalScopes.map((v) => [v, 'optional']),
      ]),
      urls: client.urls,
    },
  });

  const [updateRequired, setUpdateRequired] = useState(false);
  const values = useWatch({ control: form.control });
  const hasDirty =
    Object.keys(form.formState.dirtyFields).filter(
      (field) => field !== 'newUrl',
    ).length > 0;

  useEffect(() => {
    if (!updateRequired) return;
    window.onbeforeunload = () => true;

    return () => {
      window.onbeforeunload = null;
    };
  }, [updateRequired]);

  useEffect(() => {
    if (!updateRequired) return;

    const timer = setTimeout(async () => {
      const urls = [values.newUrl, ...(values.urls ?? [])]
        .filter((v) => v != null)
        .filter((v) => v !== '');

      const { data, status } = await patchClient(client.clientId, {
        scopes: Object.entries(values.scopes ?? {})
          .filter(([, value]) => value === 'required')
          .map(([key]) => key),
        optionalScopes: Object.entries(values.scopes ?? {})
          .filter(([, value]) => value === 'optional')
          .map(([key]) => key),
        idTokenAllowed: values.idTokenAllowed,
        urls,
      });

      if (!data || status) {
        switch (status) {
          case 'UNAUTHORIZED':
            toast.error(t('toast.invalid_user'));
            break;
          case 'FORBIDDEN':
            form.setError('newUrl', { message: t('common.errors.forbidden') });
            break;
          case 'SERVER_ERROR':
            toast.error(t('toast.server_error'));
            break;
          case 'UNKNOWN_ERROR':
            toast.error(t('toast.unknown_error'));
            break;
        }

        return;
      }

      setUpdateRequired(false);
      onUpdated();

      form.reset({
        idTokenAllowed: data.idTokenAllowed,
        scopes: Object.fromEntries([
          ...data.scopes.map((v) => [v, 'required']),
          ...data.optionalScopes.map((v) => [v, 'optional']),
        ]),
        urls: data.urls,
        newUrl: '',
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [client.clientId, form, onUpdated, t, updateRequired, values]);

  useEffect(() => {
    if (hasDirty) {
      setUpdateRequired(true);
    }
  }, [hasDirty]);

  return { form, setUpdateRequired };
};
