import { useParams } from '@tanstack/react-router';
import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ClientDeleteForm } from '../components/client-delete-form';
import { ClientIdTokenForm } from '../components/client-id-token-form';
import { ClientInfoForm } from '../components/client-info-form';
import { ClientMemberForm } from '../components/client-members-form';
import { ClientNameForm } from '../components/client-name-form';
import { ClientPictureForm } from '../components/client-picture-form';
import { ClientScopesForm } from '../components/client-scopes-form';
import { ClientUrlsForm } from '../components/client-urls-form';
import { type Client, useClient } from '../hooks/use-client';
import { useClientDetailsForm } from '../hooks/use-client-details-form';

import { cn, FunnelLayout } from '@/features/core';

type Tab = 1 | 2 | 3 | 4;

function ClientDetailTab({
  tab,
  setTab,
}: {
  tab: Tab;
  setTab: (tab: Tab) => void;
}) {
  const { t } = useTranslation();

  return (
    <div className="text-title-3 text-label -mx-5 flex">
      <button
        className="flex w-full flex-col gap-2 text-center"
        onClick={() => setTab(1)}
      >
        {t('services.detail.tabs.default')}
        <div
          className={cn(
            'h-2 w-full',
            tab === 1 ? 'bg-funnel-separator-active' : 'bg-funnel-separator',
          )}
        />
      </button>
      <button
        className="flex w-full flex-col gap-2 text-center"
        onClick={() => setTab(2)}
      >
        {t('services.detail.tabs.connection')}
        <div
          className={cn(
            'h-2 w-full',
            tab === 2 ? 'bg-funnel-separator-active' : 'bg-funnel-separator',
          )}
        />
      </button>
      <button
        className="flex w-full flex-col gap-2 text-center"
        onClick={() => setTab(3)}
      >
        {t('services.detail.tabs.scopes')}
        <div
          className={cn(
            'h-2 w-full',
            tab === 3 ? 'bg-funnel-separator-active' : 'bg-funnel-separator',
          )}
        />
      </button>
      <button
        className="flex w-full flex-col gap-2 text-center"
        onClick={() => setTab(4)}
      >
        {t('services.detail.tabs.members')}
        <div
          className={cn(
            'h-2 w-full',
            tab === 4 ? 'bg-funnel-separator-active' : 'bg-funnel-separator',
          )}
        />
      </button>
    </div>
  );
}

const Inner = ({
  client,
  refetch,
}: {
  client: Client;
  refetch: () => void;
}) => {
  const [tab, setTab] = useState<Tab>(1);
  const { t } = useTranslation();
  const onUpdated = () => refetch();

  const { form } = useClientDetailsForm(client, onUpdated);

  return (
    <FormProvider {...form}>
      <FunnelLayout
        title={t('services.detail.title')}
        stepTitle={<ClientNameForm client={client} />}
        description={
          client.deleteRequestedAt &&
          t('services.detail.description', {
            date: new Date(client.deleteRequestedAt).toLocaleString(),
          })
        }
      >
        <div className="mb-4 flex flex-col gap-5">
          <ClientDetailTab tab={tab} setTab={setTab} />
          {tab === 1 && (
            <>
              <ClientPictureForm client={client} onUpdated={onUpdated} />
              <FunnelLayout.Separator />
              <ClientInfoForm client={client} />
              <FunnelLayout.Separator />
              <ClientDeleteForm client={client} />
            </>
          )}
          {tab === 2 && (
            <>
              <ClientIdTokenForm client={client} />
              <FunnelLayout.Separator />
              <ClientUrlsForm client={client} />
            </>
          )}
          {tab === 3 && (
            <>
              <ClientScopesForm client={client} />
            </>
          )}
          {tab === 4 && (
            <>
              <ClientMemberForm client={client} />
            </>
          )}
        </div>
      </FunnelLayout>
    </FormProvider>
  );
};

export function ClientDetailFrame() {
  const { id } = useParams({ from: '/_auth-required/clients/$id' });
  const { client, refetch } = useClient(id);

  // TODO: Error Boundary + Suspense
  if (!client) return null;

  return <Inner client={client} refetch={refetch} />;
}
