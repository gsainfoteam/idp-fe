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
        stepTitle={t('withdraw.password.title')}
        title={t('withdraw.password.title')}
        loading={formState.isSubmitting}
        button={
          <Button
            variant="primary"
            className="w-full"
            disabled={!formState.isValid}
            loading={formState.isSubmitting}
          >
            {t('withdraw.password.action')}
          </Button>
        }
      >
        <Label text={t('withdraw.password.label')}>
          <Input
            {...register('password')}
            type="password"
            placeholder={t('withdraw.password.placeholder')}
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
