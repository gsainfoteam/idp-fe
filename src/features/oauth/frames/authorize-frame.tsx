import { useQuery } from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-router';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AuthorizeForm } from '../components/authorize-form';
import { useAuthorizeForm } from '../hooks/use-authorize-form';
import { getClient, GetClientResponse } from '../services/get-client';

import { Overlay } from '@/features/core';

export function AuthorizeFrame() {
  const { form, onSubmit } = useAuthorizeForm();
  const { t } = useTranslation();

  const clientId = useSearch({
    from: '/authorize',
    select: (v) => v.clientId,
  });

  const {
    data: client,
    isLoading,
    error,
  } = useQuery<GetClientResponse>({
    queryKey: ['client', clientId],
    queryFn: () => getClient(clientId),
    enabled: !!clientId,
  });

  if (error || client == null) {
    console.error('Error fetching client:', error);
    return <></>;
  }

  // TODO: Loading 상태에 대한 UI를 추가해야 함
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex w-full max-w-[400px] flex-col px-5 py-8"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-[400px] flex-col px-5 py-8">
        <Overlay show={form.formState.isSubmitting}>
          <div className="text-title-1 text-pretty whitespace-pre-wrap">
            {t('authorize.title', { client: client.name })}
          </div>
          <div className="h-8" />
          <div className="text-body-2 text-pretty text-neutral-800">
            {t('authorize.description', { client: client.name })}
          </div>
        </Overlay>
        <div className="h-1" />
        <FormProvider {...form}>
          <form onSubmit={onSubmit}>
            <AuthorizeForm client={client} />
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
