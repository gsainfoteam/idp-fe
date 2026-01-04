import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { type Client } from './use-client';

import { patchClient } from '@/data/client';
import { ClientScopeEnum } from '@/routes/_auth-required/authorize';

const schema = z.object({
  name: z.string().refine((v) => v.trim() !== ''),
  idTokenAllowed: z.boolean(),
  scopes: z.record(ClientScopeEnum, z.enum(['no', 'optional', 'required'])),
  urls: z.array(z.string().url()),
});

export type ClientDetailsFormSchema = z.infer<typeof schema>;

export const useClientDetailsForm = (client: Client, onUpdated: () => void) => {
  const { t } = useTranslation();
  const clientIdRef = useRef(client.clientId);
  const isResettingRef = useRef(false);

  const form = useForm<ClientDetailsFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: client.name,
      idTokenAllowed: client.idTokenAllowed,
      scopes: Object.fromEntries([
        ...client.scopes.map((v) => [v, 'required']),
        ...client.optionalScopes.map((v) => [v, 'optional']),
      ]),
      urls: client.urls,
    },
    mode: 'onChange',
  });

  const [updateRequired, setUpdateRequired] = useState(false);
  const values = useWatch({ control: form.control });
  const hasDirty = Object.keys(form.formState.dirtyFields).length > 0;
  const isInvalid = Object.keys(form.formState.errors).length > 0;

  // client가 변경될 때만 폼을 리셋 (탭 전환 시에는 업데이트 트리거하지 않음)
  useEffect(() => {
    if (clientIdRef.current !== client.clientId) {
      clientIdRef.current = client.clientId;
      isResettingRef.current = true;
      form.reset({
        name: client.name,
        idTokenAllowed: client.idTokenAllowed,
        scopes: Object.fromEntries([
          ...client.scopes.map((v) => [v, 'required']),
          ...client.optionalScopes.map((v) => [v, 'optional']),
        ]),
        urls: client.urls,
      });
      setUpdateRequired(false);
    }
  }, [client, form]);

  useEffect(() => {
    if (!updateRequired) return;
    window.onbeforeunload = () => true;

    return () => {
      window.onbeforeunload = null;
    };
  }, [updateRequired]);

  useEffect(() => {
    if (!updateRequired || isInvalid || isResettingRef.current) return;

    const timer = setTimeout(async () => {
      await toast.promise(
        async () => {
          const urls = (values.urls ?? [])
            .filter((v) => v != null)
            .filter((v) => v !== '');

          const res = await patchClient(
            { clientId: client.clientId },
            {
              name: values.name,
              scopes: Object.entries(values.scopes ?? {})
                .filter(([, value]) => value === 'required')
                .map(([key]) => key),
              optionalScopes: Object.entries(values.scopes ?? {})
                .filter(([, value]) => value === 'optional')
                .map(([key]) => key),
              idTokenAllowed: values.idTokenAllowed,
              urls,
            },
          );

          if (!res.ok) {
            if (res.status === 401) {
              toast.error(t('toast.invalid_user'));
            } else if (res.status === 403) {
              toast.error(t('common.errors.forbidden'));
            } else if (res.status === 500) {
              toast.error(t('toast.server_error'));
            } else {
              toast.error(t('toast.unknown_error'));
            }

            return;
          }

          setUpdateRequired(false);
          onUpdated();

          isResettingRef.current = true;
          form.reset({
            name: res.data.name,
            idTokenAllowed: res.data.idTokenAllowed,
            scopes: Object.fromEntries([
              ...res.data.scopes.map((v) => [v, 'required']),
              ...res.data.optionalScopes.map((v) => [v, 'optional']),
            ]),
            urls: res.data.urls,
          });
        },
        {
          loading: t('services.detail.saving'),
          success: t('services.detail.updated'),
          error: t('services.detail.update_failed'),
        },
      );
    }, 1000);
    return () => clearTimeout(timer);
  }, [client.clientId, form, onUpdated, t, updateRequired, values, isInvalid]);

  useEffect(() => {
    if (!hasDirty && isResettingRef.current) {
      isResettingRef.current = false;
    }
  }, [hasDirty]);

  useEffect(() => {
    if (hasDirty && !isInvalid && !isResettingRef.current) {
      setUpdateRequired(true);
    } else if (!hasDirty) {
      setUpdateRequired(false);
    }
  }, [hasDirty, isInvalid]);

  return { form };
};
