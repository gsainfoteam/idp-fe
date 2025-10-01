import { useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, FunnelLayout, Input, Label } from '@/features/core';
import { usePasskeyForm } from '@/features/passkey';

export function RegisterStep({ onNext }: { onNext: () => void }) {
  const {
    form: { control, register },
    onSubmit,
  } = usePasskeyForm({ onNext });
  const { isSubmitting, isValid, errors } = useFormState({ control });
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
          >
            {t('passkey.steps.register.button')}
          </Button>
        }
      >
        <Label text={t('passkey.steps.register.name.label')}>
          <Input
            type="text"
            placeholder={t('passkey.steps.register.name.placeholder')}
            error={errors.name?.message}
            disabled={isSubmitting}
            {...register('name')}
          />
        </Label>
      </FunnelLayout>
    </form>
  );
}
