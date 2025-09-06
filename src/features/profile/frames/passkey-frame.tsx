import { Button, FunnelLayout } from '@/features/core';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { usePasskeyForm } from '../hooks/use-passkey-form';

import KeyIcon from '@/assets/icons/line/key.svg?react';

export function PasskeyFrame() {
  const { form, onSubmit } = usePasskeyForm();
  const { t } = useTranslation();

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit}>
        <FunnelLayout
          loading={form.formState.isSubmitting}
          title={t('passkey.title')}
          stepTitle={t('passkey.title')}
          description={t('passkey.description')}
          button={
            <Button
              variant="primary"
              className="w-full"
              loading={form.formState.isSubmitting}
              prefixIcon={<KeyIcon />}
            >
              {t('passkey.button')}
            </Button>
          }
        />
      </form>
    </FormProvider>
  );
}
