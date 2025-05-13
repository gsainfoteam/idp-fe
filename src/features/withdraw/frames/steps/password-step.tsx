import { useTranslation } from 'react-i18next';

import { usePasswordForm } from '../../hooks/steps/use-password-form';

import { Button, FunnelLayout, Input, Label } from '@/features/core';

export function PasswordStep({
  onNext,
}: {
  onNext: (password: string) => void;
}) {
  const { t } = useTranslation();
  const { register, onSubmit, formState } = usePasswordForm({
    onNext,
  });

  return (
    <form onSubmit={onSubmit}>
      <FunnelLayout
        title={t('withdraw.title')}
        stepTitle={t('withdraw.steps.password.title')}
        loading={formState.isSubmitting}
        button={
          <Button
            variant="primary"
            className="w-full"
            disabled={!formState.isValid}
            loading={formState.isSubmitting}
          >
            {t('withdraw.steps.password.button')}
          </Button>
        }
      >
        <Label text={t('withdraw.steps.password.inputs.password.label')}>
          <Input
            {...register('password')}
            type="password"
            placeholder={t(
              'withdraw.steps.password.inputs.password.placeholder',
            )}
            error={
              formState.errors.password?.message ??
              formState.errors.root?.message
            }
          />
        </Label>
      </FunnelLayout>
    </form>
  );
}
