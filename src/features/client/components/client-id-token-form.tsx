import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ClientDetailsFormSchema } from '../hooks/use-client-details-form';

import { Switch } from '@/features/core';
import { Client } from '../hooks/use-client';

export function ClientIdTokenForm({ client }: { client: Client }) {
  const { t } = useTranslation();
  const { control } = useFormContext<ClientDetailsFormSchema>();

  return (
    <div className="flex flex-col gap-4">
      <div className="text-title-3 text-basics-primary-label">
        {t('services.detail.openid.title')}
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="text-label-1 text-basics-primary-label">
            {t('services.detail.openid.enable')}
          </div>
          <Controller
            control={control}
            name="idTokenAllowed"
            render={({ field: { value, disabled, ...field } }) => (
              <Switch
                disabled={disabled || client.deleteRequestedAt != null}
                checked={value}
                {...field}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}
