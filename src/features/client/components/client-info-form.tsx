import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ClientInfoFormSchema } from '../hooks/use-client-info-form';

import { Button, Label } from '@/features/core';
import { CopyInput } from '@/features/core/components/copy-input';

export function ClientInfoForm() {
  const { t } = useTranslation();
  const { watch, formState } = useFormContext<ClientInfoFormSchema>();
  const id = watch('clientId');
  const secret = watch('clientSecret');

  return (
    <div className="flex flex-col gap-4">
      <div className="text-title-3">{t('services.detail.info.title')}</div>
      <div className="flex flex-col gap-5">
        <Label text={t('services.detail.info.id')}>
          <CopyInput
            value={id}
            success={t('services.detail.info.id_copied')}
            readOnly
          />
        </Label>
        <Label text={t('services.detail.info.secret')}>
          <div className="flex gap-2">
            <CopyInput
              className="flex-1"
              type={secret ? 'text' : 'password'}
              value={secret ?? id}
              success={t('services.detail.info.secret_copied')}
              readOnly
            />
            <Button variant="default" disabled={formState.isSubmitting}>
              {t('services.detail.info.regenerate_secret.action')}
            </Button>
          </div>
        </Label>
      </div>
    </div>
  );
}
