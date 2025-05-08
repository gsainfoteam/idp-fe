import { useParams } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { useClient } from '../hooks/use-client';

import ClipboardIcon from '@/assets/icons/line/clipboard.svg?react';
import { Button, FunnelLayout, Input, Label } from '@/features/core';

export function ClientDetailFrame() {
  const { t } = useTranslation();
  const { id } = useParams({ from: '/_auth-required/clients/$id' });
  const {
    client,
    clientSecret,
    copyClientId,
    copyClientSecret,
    regenerateClientSecret,
    isSecretLoading,
  } = useClient(id);

  if (!client) return null;

  return (
    <FunnelLayout
      title={t('services.detail.title')}
      stepTitle={`'${client.name}'`}
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          <div className="text-title-3">{t('services.detail.info.title')}</div>
          <div className="flex flex-col gap-5">
            <Label text={t('services.detail.info.id')}>
              <Input
                value={client.clientId}
                readOnly
                suffixIcon={<ClipboardIcon onClick={copyClientId} />}
              />
            </Label>
            <Label text={t('services.detail.info.secret')}>
              <div className="flex gap-2">
                <Input
                  className="flex-1"
                  value={clientSecret ?? client.clientId}
                  readOnly
                  type={clientSecret ? 'text' : 'password'}
                  suffixIcon={
                    clientSecret ? (
                      <ClipboardIcon onClick={copyClientSecret} />
                    ) : null
                  }
                />
                <Button
                  variant="default"
                  onClick={regenerateClientSecret}
                  disabled={isSecretLoading}
                >
                  {t('services.detail.info.regenerate_secret.action')}
                </Button>
              </div>
            </Label>
          </div>
        </div>
        <div className="-mx-5 h-2 bg-neutral-50" />
        <div className="flex flex-col gap-4">
          <div className="text-title-3">
            {t('services.detail.id_token.title')}
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div>{t('services.detail.id_token.enable')}</div>
              <div>toggle</div>
            </div>
          </div>
        </div>
        <div className="-mx-5 h-2 bg-neutral-50" />
        <div className="flex flex-col gap-4">
          <div className="text-title-3">
            {t('services.detail.scopes.title')}
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <div>{t('services.detail.scopes.type.profile')}</div>
              <div>toggle</div>
            </div>
            <div className="flex flex-col gap-2">
              <div>{t('services.detail.scopes.type.student_id')}</div>
              <div>toggle</div>
            </div>
            <div className="flex flex-col gap-2">
              <div>{t('services.detail.scopes.type.email')}</div>
              <div>toggle</div>
            </div>
            <div className="flex flex-col gap-2">
              <div>{t('services.detail.scopes.type.phone_number')}</div>
              <div>toggle</div>
            </div>
          </div>
        </div>
      </div>
    </FunnelLayout>
  );
}
