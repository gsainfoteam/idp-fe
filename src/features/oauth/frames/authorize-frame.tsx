import { useSearch } from '@tanstack/react-router';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AuthorizeForm } from '../components/authorize-form';
import { useAuthorizeForm } from '../hooks/use-authorize-form';
import { useClient } from '../hooks/use-client';

import { LoadingOverlay } from '@/features/core';

export function AuthorizeFrame() {
  const { form, onSubmit } = useAuthorizeForm();
  const { t } = useTranslation();

  const { clientId, redirectUrl } = useSearch({
    from: '/_auth-required/authorize',
  });
  const { client, isLoading, error } = useClient(clientId);

  // TODO: Loading, Error 상태에 대한 UI를 추가해야 함
  if (isLoading || error || client == null) {
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
                window.location.href = redirectUrl;
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
