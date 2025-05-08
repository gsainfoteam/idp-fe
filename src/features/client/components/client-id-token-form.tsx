import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ClientDetailsFormSchema } from '../hooks/use-client-details-form';

import { Switch } from '@/features/core';

export function ClientIdTokenForm() {
  const { t } = useTranslation();
  const { control } = useFormContext<ClientDetailsFormSchema>();

  return (
    <div className="flex flex-col gap-4">
      <div className="text-title-3">{t('services.detail.openid.title')}</div>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div>{t('services.detail.openid.enable')}</div>
          <Controller
            control={control}
            name="idTokenAllowed"
            render={({ field: { value, ...field } }) => (
              <Switch {...field} checked={value} />
            )}
          />
        </div>
      </div>
    </div>
  );
}
