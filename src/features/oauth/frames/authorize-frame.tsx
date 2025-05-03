import { useLoaderData } from '@tanstack/react-router';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AuthorizeForm } from '../components/authorize-form';
import { useAuthorize } from '../hooks/use-authorize';
import { useClient } from '../hooks/use-client';

import { components } from '@/@types/api-schema';
import { LoadingOverlay } from '@/features/core';

const Inner = ({
  client,
}: {
  client: components['schemas']['ClientPublicResDto'];
}) => {
  const { t } = useTranslation();

  const { form, onSubmit } = useAuthorize({ client });

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
          <form onSubmit={onSubmit}>
            <AuthorizeForm client={client} />
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export function AuthorizeFrame() {
  const { clientId } = useLoaderData({
    from: '/_auth-required/authorize',
  });
  const { client } = useClient(clientId);

  if (client) return <Inner client={client} />;
  return <div className="flex min-h-screen items-center justify-center"></div>;
}
