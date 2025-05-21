import { useParams } from '@tanstack/react-router';
import { FormProvider } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { ClientIdTokenForm } from '../components/client-id-token-form';
import { ClientInfoForm } from '../components/client-info-form';
import { ClientScopesForm } from '../components/client-scopes-form';
import { ClientUrlsForm } from '../components/client-urls-form';
import { Client, useClient } from '../hooks/use-client';
import { useClientDetailsForm } from '../hooks/use-client-details-form';
import { useClientInfoForm } from '../hooks/use-client-info-form';

import { FunnelLayout } from '@/features/core';

const Inner = ({
  client,
  refetch,
}: {
  client: Client;
  refetch: () => void;
}) => {
  const { t } = useTranslation();
  const { form: infoForm, onSubmit: onInfoSubmit } = useClientInfoForm(client);
  const { form: scopesForm } = useClientDetailsForm(client, () => {
    toast.success(t('services.detail.updated'));
    refetch();
  });

  return (
    <FunnelLayout
      title={t('services.detail.title')}
      stepTitle={`'${client.name}'`}
    >
      <div className="mb-4 flex flex-col gap-5">
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
          <div className="-mx-5 h-2 bg-neutral-50" />
          <ClientUrlsForm />
        </FormProvider>
      </div>
    </FunnelLayout>
  );
};

export function ClientDetailFrame() {
  const { id } = useParams({ from: '/_auth-required/clients/$id' });
  const { client, refetch } = useClient(id);

  // TODO: Loading, Error 상태에 대한 UI를 추가해야 함 -> 모달 컴포넌트로 Error 메시지 띄우기, Loading Spinner 띄우기
  if (!client) return null;

  return <Inner client={client} refetch={refetch} />;
}
