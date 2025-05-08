import { useParams } from '@tanstack/react-router';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ClientInfoForm } from '../components/client-info-form';
import { Client, useClient } from '../hooks/use-client';
import { useClientInfoForm } from '../hooks/use-client-info-form';
import { useClientScopesForm } from '../hooks/use-client-scopes-form';

import { FunnelLayout, MultiStateSwitch, Switch } from '@/features/core';

const Inner = ({ client }: { client: Client }) => {
  const { t } = useTranslation();
  const { form: infoForm, onSubmit: onInfoSubmit } = useClientInfoForm(client);
  const { form: scopesForm, onSubmit: onScopesSubmit } =
    useClientScopesForm(client);

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
          <form onSubmit={onScopesSubmit}>
            <div className="flex flex-col gap-4">
              <div className="text-title-3">
                {t('services.detail.id_token.title')}
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <div>{t('services.detail.id_token.enable')}</div>
                  <Switch />
                </div>
              </div>
            </div>
          </form>
          <div className="-mx-5 h-2 bg-neutral-50" />
          <form>
            <div className="flex flex-col gap-4">
              <div className="text-title-3">
                {t('services.detail.scopes.title')}
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <div>{t('services.detail.scopes.type.profile')}</div>
                  <MultiStateSwitch
                    labels={[
                      t('services.detail.scopes.choices.no'),
                      t('services.detail.scopes.choices.optional'),
                      t('services.detail.scopes.choices.required'),
                    ]}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div>{t('services.detail.scopes.type.student_id')}</div>
                  <MultiStateSwitch
                    labels={[
                      t('services.detail.scopes.choices.no'),
                      t('services.detail.scopes.choices.optional'),
                      t('services.detail.scopes.choices.required'),
                    ]}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div>{t('services.detail.scopes.type.email')}</div>
                  <MultiStateSwitch
                    labels={[
                      t('services.detail.scopes.choices.no'),
                      t('services.detail.scopes.choices.optional'),
                      t('services.detail.scopes.choices.required'),
                    ]}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div>{t('services.detail.scopes.type.phone_number')}</div>
                  <MultiStateSwitch
                    labels={[
                      t('services.detail.scopes.choices.no'),
                      t('services.detail.scopes.choices.optional'),
                      t('services.detail.scopes.choices.required'),
                    ]}
                  />
                </div>
              </div>
            </div>
          </form>
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
