import { useParams } from '@tanstack/react-router';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ClientIdTokenForm } from '../components/client-id-token-form';
import { ClientInfoForm } from '../components/client-info-form';
import { ClientScopesForm } from '../components/client-scopes-form';
import { Client, useClient } from '../hooks/use-client';
import { useClientInfoForm } from '../hooks/use-client-info-form';
import { useClientScopesForm } from '../hooks/use-client-scopes-form';

import { FunnelLayout } from '@/features/core';

const Inner = ({ client }: { client: Client }) => {
  const { t } = useTranslation();
  const { form: infoForm, onSubmit: onInfoSubmit } = useClientInfoForm(client);
  const { form: scopesForm } = useClientScopesForm(client);

  return (
    <FunnelLayout
      title={t('services.detail.title')}
      stepTitle={`'${client.name}'`}
    >
      <div className="flex flex-col gap-5">
        <FormProvider {...infoForm}>
          <form onSubmit={onInfoSubmit}>
            <ClientInfoForm />
          </form>
        </FormProvider>
        <div className="-mx-5 h-2 bg-neutral-50" />
        <FormProvider {...scopesForm}>
          <ClientIdTokenForm />
          <div className="-mx-5 h-2 bg-neutral-50" />
          <ClientScopesForm />
        </FormProvider>
      </div>
    </FunnelLayout>
  );
};

export function ClientDetailFrame() {
  const { id } = useParams({ from: '/_auth-required/clients/$id' });
  const { client } = useClient(id);

  if (!client) return null;

  return <Inner client={client} />;
}
