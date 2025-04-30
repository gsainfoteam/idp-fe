import { useSearch } from '@tanstack/react-router';
import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AuthorizeForm } from '../components/authorize-form';
import { useAuthorizeForm } from '../hooks/use-authorize-form';
import { useClient } from '../hooks/use-client';
import { getUserConsent } from '../services/get-user-consent';

import { LoadingOverlay } from '@/features/core';

export function AuthorizeFrame() {
  const { form, onSubmit } = useAuthorizeForm();
  const { t } = useTranslation();
  const { clientId, scopes } = useSearch({
    from: '/_auth-required/authorize',
  });
  const { client } = useClient(clientId);

  const [skipRender, setSkipRender] = useState(false);

  const authorize = () => {
    window.location.href =
      'https://api.idp.gistory.me/oauth/authorize' + window.location.search;
  };

  // scope에 offline_access가 없을 때, 유저가 이미 인가를 한 경우 인가 페이지 패스
  if (!scopes.includes('offline_access')) {
    getUserConsent().then((consent) => {
      if (consent.list.some((c) => c.clientUuid === clientId)) {
        authorize();
        setSkipRender(true);
      }
    });
  }

  if (skipRender) return null;

  // TODO: Loading, Error 상태에 대한 UI를 추가해야 함
  if (client == null) {
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
