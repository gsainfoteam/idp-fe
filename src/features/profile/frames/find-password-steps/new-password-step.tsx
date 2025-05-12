import { useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useNewPasswordForm } from '../../hooks/find-password-steps/use-new-password-form';

import { Button, FunnelLayout, Label, PasswordInput } from '@/features/core';

export function NewPasswordStep({
  context,
  onNext,
  onUndo,
}: Parameters<typeof useNewPasswordForm>[0] & { onUndo: () => void }) {
  const {
    form: { register, control },
    onSubmit,
  } = useNewPasswordForm({ context, onNext });
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
          <Label text={t('register.inputs.password.label')}>
            <PasswordInput
              placeholder={t('register.inputs.password.placeholder')}
              error={errors.password?.message || errors.root != null}
              disabled={isSubmitting}
              {...register('password')}
            />
          </Label>
          <Label text={t('register.inputs.password_confirm.label')}>
            <PasswordInput
              placeholder={t('register.inputs.password_confirm.placeholder')}
              error={
                errors.passwordConfirm?.message ||
                (errors.root?.message ?? false)
              }
              disabled={isSubmitting}
              {...register('passwordConfirm')}
            />
          </Label>
        </div>
      </FunnelLayout>
    </form>
  );
}
