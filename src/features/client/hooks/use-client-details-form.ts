import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { Client } from './use-client';

import { patchClient } from '@/data/patch-client';
import { ClientScopeEnum } from '@/routes/_auth-required/authorize';

const schema = z.object({
  idTokenAllowed: z.boolean(),
  scopes: z.record(ClientScopeEnum, z.enum(['no', 'optional', 'required'])),
  urls: z.array(z.string().url()),
});

export type ClientDetailsFormSchema = z.infer<typeof schema>;

export const useClientDetailsForm = (client: Client) => {
  const form = useForm<ClientDetailsFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      idTokenAllowed: client.idTokenAllowed,
      scopes: Object.fromEntries([
        ...client.scopes.map((v) => [v, 'required']),
        ...client.optionalScopes.map((v) => [v, 'optional']),
      ]),
      urls: [...client.urls, ''],
    },
  });

  const isFirst = useRef(true);
  const [updateRequired, setUpdateRequired] = useState(false);
  const values = useWatch({ control: form.control });
  const { t } = useTranslation();

  useEffect(() => {
    if (!updateRequired) return;
    window.onbeforeunload = () => true;

    return () => {
      window.onbeforeunload = null;
    };
  }, [updateRequired]);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    setUpdateRequired(true);
    const timer = setTimeout(async () => {
      const { data, status } = await patchClient(client.clientId, {
        scopes: Object.entries(values.scopes ?? {})
          .filter(([, value]) => value === 'required')
          .map(([key]) => key),
        optionalScopes: Object.entries(values.scopes ?? {})
          .filter(([, value]) => value === 'optional')
          .map(([key]) => key),
        idTokenAllowed: values.idTokenAllowed,
        urls: values.urls?.filter((url) => url !== ''),
      });
      if (!data || status) {
        switch (status) {
          case 'FORBIDDEN':
            form.setError('root', { message: t('common.errors.forbidden') });
            break;
        }
      }
      setUpdateRequired(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [client.clientId, form, t, values]);

  return { form };
};
