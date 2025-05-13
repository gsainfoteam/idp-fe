import { useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useEmailForm } from '../../hooks/register-steps/use-email-form';

import { Button, FunnelLayout, Input, Label } from '@/features/core';

export function EmailStep(props: Parameters<typeof useEmailForm>[0]) {
  const {
    form: { register, control },
    onSubmit,
  } = useEmailForm(props);
  const { isSubmitting, isValid, isDirty, errors } = useFormState({ control });
  const { t } = useTranslation();

  return (
    <form onSubmit={onSubmit}>
      <FunnelLayout
        loading={isSubmitting}
        title={t('register.title')}
        stepTitle={t('register.steps.email.title')}
        button={
          <Button
            variant="primary"
            className="w-full"
            loading={isSubmitting}
            disabled={!(isValid && isDirty)}
          >
            {t('register.steps.email.button')}
          </Button>
        }
      >
        <Label text={t('register.inputs.email.label')}>
          <Input
            type="email"
            placeholder={t('register.inputs.email.placeholder')}
            error={errors.email?.message}
            disabled={isSubmitting}
            {...register('email')}
          />
        </Label>
      </FunnelLayout>
    </form>
  );
}
