import { useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useEmailForm } from '../../hooks/steps/use-email-form';

import { Button, FunnelStep, Input, Label } from '@/features/core';

// TODO: 이용 약관 동의 오버레이 기능 추가

export function EmailStep(props: Parameters<typeof useEmailForm>[0]) {
  const {
    form: { register, control },
    onSubmit,
  } = useEmailForm(props);
  const { isSubmitting, isValid, isDirty, errors } = useFormState({ control });
  const { t } = useTranslation();

  return (
    <FunnelStep
      loading={isSubmitting}
      title={t('register.title')}
      stepTitle={t('register.steps.email.title')}
      button={
        <Button
          variant="primary"
          className="w-full"
          onClick={onSubmit}
          loading={isSubmitting}
          disabled={!(isValid && isDirty)}
        >
          {t('register.steps.email.button')}
        </Button>
      }
    >
      <Label text={t('register.inputs.email.label')} htmlFor="email">
        <Input
          type="email"
          id="email"
          placeholder={t('register.inputs.email.placeholder')}
          error={errors.email?.message}
          disabled={isSubmitting}
          {...register('email')}
        />
      </Label>
    </FunnelStep>
  );
}
