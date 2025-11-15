import { useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useNewPasswordForm } from '../../hooks/change-password-steps/use-new-password-form';

import { Button, FunnelLayout, Label, PasswordInput } from '@/features/core';

export function NewPasswordStep({
  step,
  onUndo,
  ...props
}: Parameters<typeof useNewPasswordForm>[0] & {
  step: string;
  onUndo: () => void;
}) {
  const {
    form: { register, control },
    onSubmit,
  } = useNewPasswordForm(props);
  const { isSubmitting, isValid, isDirty, errors } = useFormState({ control });
  const { t } = useTranslation();

  return (
    <form onSubmit={onSubmit}>
      <FunnelLayout
        key={step}
        onUndo={onUndo}
        loading={isSubmitting}
        title={t('change_password.title')}
        stepTitle={t('change_password.steps.new_password.title')}
        button={
          <Button
            variant="primary"
            className="w-full"
            loading={isSubmitting}
            disabled={!(isValid && isDirty)}
          >
            {t('change_password.steps.new_password.button')}
          </Button>
        }
      >
        <div className="flex flex-col gap-5">
          <Label
            text={t('change_password.steps.new_password.inputs.password.label')}
          >
            <PasswordInput
              placeholder={t(
                'change_password.steps.new_password.inputs.password.placeholder',
              )}
              error={errors.password?.message || errors.root != null}
              disabled={isSubmitting}
              {...register('password')}
            />
          </Label>
          <Label
            text={t(
              'change_password.steps.new_password.inputs.password_confirm.label',
            )}
          >
            <PasswordInput
              placeholder={t(
                'change_password.steps.new_password.inputs.password_confirm.placeholder',
              )}
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
