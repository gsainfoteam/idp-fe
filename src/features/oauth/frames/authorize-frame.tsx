import { useSearch } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AuthorizeForm } from '../components/authorize-form';
import { useAuthorizeForm } from '../hooks/use-authorize-form';
import { getClient, GetClientResponse } from '../services/get-client';

export function AuthorizeFrame() {
  const { form, onSubmit } = useAuthorizeForm();
  const { t } = useTranslation();
  const [client, setClient] = useState<GetClientResponse | undefined>();

  const clientId = useSearch({
    from: '/authorize',
    select: (v) => v.client_id,
  });

  useEffect(() => {
    const fetch = async () => setClient(await getClient(clientId));

    fetch();
  }, [clientId]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-[400px] flex-col px-5 py-8">
        {client != null && (
          <>
            <div className="text-title-1 text-pretty whitespace-pre-wrap">
              {t('authorize.title', { client: client.name })}
            </div>
            <div className="h-8" />
            <div className="text-body-2 text-pretty text-neutral-800">
              {t('authorize.description', { client: client.name })}
            </div>
            <div className="h-1" />
            <FormProvider {...form}>
              <form onSubmit={onSubmit}>
                <AuthorizeForm client={client} />
              </form>
            </FormProvider>
          </>
        )}
      </div>
    </div>
  );
}
