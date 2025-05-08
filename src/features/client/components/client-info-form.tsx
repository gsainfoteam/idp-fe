import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { ClientInfoFormSchema } from '../hooks/use-client-info-form';

import ClipboardIcon from '@/assets/icons/line/clipboard.svg?react';
import { Button, Input, Label } from '@/features/core';

const copy = (text: string, message: string) => {
  navigator.clipboard.writeText(text);
  toast.success(message);
};

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
          <Input
            value={id}
            readOnly
            suffixIcon={
              <ClipboardIcon
                onClick={() => copy(id, t('services.detail.info.id_copied'))}
              />
            }
          />
        </Label>
        <Label text={t('services.detail.info.secret')}>
          <div className="flex gap-2">
            <Input
              className="flex-1"
              value={secret ?? id}
              readOnly
              type={secret ? 'text' : 'password'}
              suffixIcon={
                secret ? (
                  <ClipboardIcon
                    onClick={() =>
                      copy(secret, t('services.detail.info.secret_copied'))
                    }
                  />
                ) : null
              }
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
