import { useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { usePasswordForm } from '../../hooks/register-steps/use-password-form';

import { Button, FunnelLayout, Label, PasswordInput } from '@/features/core';

export function PasswordStep({
  context,
  onNext,
  onUndo,
}: Parameters<typeof usePasswordForm>[0] & { onUndo: () => void }) {
  const {
    form: { register, control },
    onSubmit,
  } = usePasswordForm({ context, onNext });
  const { isSubmitting, isValid, isDirty, errors } = useFormState({ control });
  const { t } = useTranslation();

  return (
    <form onSubmit={onSubmit}>
      <FunnelLayout
        onUndoClick={onUndo}
        title={t('register.title')}
        stepTitle={t('register.steps.password.title')}
        button={
          <Button
            variant="primary"
            className="w-full"
            loading={isSubmitting}
            disabled={!(isValid && isDirty)}
          >
            {t('register.steps.password.button')}
          </Button>
        }
      >
        <div className="flex flex-col gap-5">
          <Label text={t('register.steps.password.inputs.password.label')}>
            <PasswordInput
              placeholder={t(
                'register.steps.password.inputs.password.placeholder',
              )}
              error={errors.password?.message}
              disabled={isSubmitting}
              {...register('password')}
            />
          </Label>
          <Label
            text={t('register.steps.password.inputs.password_confirm.label')}
          >
            <PasswordInput
              placeholder={t(
                'register.steps.password.inputs.password_confirm.placeholder',
              )}
              error={errors.passwordConfirm?.message}
              disabled={isSubmitting}
              {...register('passwordConfirm')}
            />
          </Label>
        </div>
      </FunnelLayout>
    </form>
  );
}
