import { useParams } from '@tanstack/react-router';
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
import { useSeparatorTab } from '../hooks/use-separator-tab';

import { FunnelLayout } from '@/features/core';

const Inner = ({
  client,
  refetch,
}: {
  client: Client;
  refetch: () => void;
}) => {
  const { t } = useTranslation();
  const onUpdated = () => refetch();

  const { form } = useClientDetailsForm(client, onUpdated);
  const tab = useSeparatorTab({
    items: ['default', 'connection', 'scopes', 'members'],
    defaultValue: 'default',
  });

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
          <tab.Provider>
            <tab.List>
              <tab.Label value="default">
                {t('services.detail.tabs.default')}
              </tab.Label>
              <tab.Label value="connection">
                {t('services.detail.tabs.connection')}
              </tab.Label>
              <tab.Label value="scopes">
                {t('services.detail.tabs.scopes')}
              </tab.Label>
              <tab.Label value="members">
                {t('services.detail.tabs.members')}
              </tab.Label>
            </tab.List>
            <tab.Render value="default">
              <ClientPictureForm client={client} onUpdated={onUpdated} />
              <FunnelLayout.Separator />
              <ClientInfoForm client={client} />
              <FunnelLayout.Separator />
              <ClientDeleteForm client={client} />
            </tab.Render>
            <tab.Render value="connection">
              <ClientIdTokenForm client={client} />
              <FunnelLayout.Separator />
              <ClientUrlsForm client={client} />
            </tab.Render>
            <tab.Render value="scopes">
              <ClientScopesForm client={client} />
            </tab.Render>
            <tab.Render value="members">
              <ClientMemberForm client={client} />
            </tab.Render>
          </tab.Provider>
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
