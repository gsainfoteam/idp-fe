import { useLoaderData } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AuthorizeForm } from '../components/authorize-form';
import { useAuthorizeForm } from '../hooks/use-authorize-form';
import { useClient } from '../hooks/use-client';

import { getUserConsent } from '@/data/get-user-consent';
import { LoadingOverlay } from '@/features/core';

export function AuthorizeFrame() {
  const { form, onSubmit } = useAuthorizeForm();
  const { t } = useTranslation();
  const { clientId, scopes } = useLoaderData({
    from: '/_auth-required/authorize',
  });
  const { client } = useClient(clientId);

  const [isLoading, setLoading] = useState(true);

  const authorize = () => {
    window.location.href =
      'https://api.idp.gistory.me/oauth/authorize' + window.location.search;
  };

  useEffect(() => {
    // scope에 offline_access가 없을 때, 유저가 이미 인가를 한 경우 인가 페이지 패스
    const checkConsent = async () => {
      if (!scopes.includes('offline_access')) {
        const { data, error } = await getUserConsent();

        if (!data || error) throw error;
        if (data.list.some((c) => c.clientUuid === clientId)) {
          authorize();
          return;
        }
      }

      setLoading(false);
    };

    checkConsent();
  }, [clientId, scopes]);

  // TODO: Loading, Error 상태에 대한 UI를 추가해야 함
  if (isLoading || !client) {
    return (
      <div className="flex min-h-screen items-center justify-center"></div>
    );
  } else {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex w-full max-w-[400px] flex-col px-5 py-8">
          <LoadingOverlay show={form.formState.isSubmitting}>
            <div className="text-title-1 text-pretty whitespace-pre-wrap">
              {t('authorize.title', { client: client.name })}
            </div>
            <div className="h-8" />
            <div className="text-body-2 text-pretty text-neutral-800">
              {t('authorize.description', { client: client.name })}
            </div>
          </LoadingOverlay>
          <div className="h-1" />
          <FormProvider {...form}>
            <form
              onSubmit={async (e) => {
                await onSubmit(e);
                authorize();
              }}
            >
              <AuthorizeForm client={client} />
            </form>
          </FormProvider>
        </div>
      </div>
    );
  }
}
