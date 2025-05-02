import { useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { usePasswordForm } from '../../hooks/steps/use-password-form';

import { Button, FunnelStep, Input } from '@/features/core';

// TODO: 만료 타이머, 5회 횟수 제한 기능

export function PasswordStep(props: Parameters<typeof usePasswordForm>[0]) {
  const {
    form: { register, control },
    onSubmit,
  } = usePasswordForm(props);
  const { isSubmitting, isValid, isDirty, errors } = useFormState({ control });
  const { t } = useTranslation();

  return (
    <FunnelStep
      title={t('register.title')}
      stepTitle={t('register.steps.password.title')}
      button={
        <Button
          variant="primary"
          onClick={onSubmit}
          isLoading={isSubmitting}
          disabled={!(isValid && isDirty)}
        >
          {t('register.steps.password.button')}
        </Button>
      }
    >
      <div className="flex flex-col gap-5">
        <Input
          type="password"
          label={t('register.inputs.password.label')}
          placeholder={t('register.inputs.password.placeholder')}
          error={errors.password?.message}
          disabled={isSubmitting}
          {...register('password')}
        />
        <Input
          type="password"
          label={t('register.inputs.password_confirm.label')}
          placeholder={t('register.inputs.password_confirm.placeholder')}
          error={errors.passwordConfirm?.message}
          disabled={isSubmitting}
          {...register('passwordConfirm')}
        />
      </div>
    </FunnelStep>
  );
}
