import { useFormState } from 'react-hook-form';
import { usePasskeyForm } from '../../hooks/use-passkey-form';
import { useTranslation } from 'react-i18next';
import { Button, FunnelLayout } from '@/features/core';

import KeyIcon from '@/assets/icons/line/key.svg?react';

export function RegisterStep({ onNext }: { onNext: () => void }) {
  const {
    form: { control },
    onSubmit,
  } = usePasskeyForm({ onNext });
  const { isSubmitting, isValid } = useFormState({ control });
  const { t } = useTranslation();

  return (
    <form onSubmit={onSubmit}>
      <FunnelLayout
        loading={isSubmitting}
        title={t('passkey.title')}
        stepTitle={t('passkey.steps.register.title')}
        description={t('passkey.steps.register.description')}
        button={
          <Button
            variant="primary"
            className="w-full"
            loading={isSubmitting}
            disabled={!isValid || isSubmitting}
            prefixIcon={<KeyIcon />}
          >
            {t('passkey.steps.register.button')}
          </Button>
        }
      />
    </form>
  );
}
