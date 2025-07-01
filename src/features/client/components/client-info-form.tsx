import { useTranslation } from 'react-i18next';

import { useClientInfoForm } from '../hooks/use-client-info-form';

import { Button, Label } from '@/features/core';
import { CopyInput } from '@/features/core/components/copy-input';
import { Client } from '../hooks/use-client';

export function ClientInfoForm({ client }: { client: Client }) {
  const { t } = useTranslation();
  const {
    form: { watch, formState },
    onSubmit,
  } = useClientInfoForm(client);

  const id = watch('clientId');
  const secret = watch('clientSecret');

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">
        <div className="text-title-3 text-basics-primary-label">
          {t('services.detail.info.title')}
        </div>
        <div className="flex flex-col gap-5">
          <Label text={t('services.detail.info.id')}>
            <CopyInput
              value={id}
              disabled={client.deleteRequestedAt != null}
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
                showIcon={!!secret}
                disabled={client.deleteRequestedAt != null}
              />
              <Button
                variant="default"
                disabled={
                  formState.isSubmitting || client.deleteRequestedAt != null
                }
              >
                {t('services.detail.info.regenerate_secret.action')}
              </Button>
            </div>
          </Label>
        </div>
      </div>
    </form>
  );
}
