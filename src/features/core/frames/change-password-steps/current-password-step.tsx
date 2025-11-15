import { useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, FunnelLayout, Label, PasswordInput } from '@/features/core';

import { useCurrentPasswordForm } from '../../hooks/change-password-steps/use-current-password-form';

export function CurrentPasswordStep({
  step,
  onUndo,
  ...props
}: Parameters<typeof useCurrentPasswordForm>[0] & {
  step: string;
  onUndo: () => void;
}) {
  const {
    form: { register, control },
    onSubmit,
  } = useCurrentPasswordForm(props);
  const { isSubmitting, isValid, isDirty, errors } = useFormState({ control });
  const { t } = useTranslation();

  return (
    <form onSubmit={onSubmit}>
      <FunnelLayout
        key={step}
        onUndo={onUndo}
        loading={isSubmitting}
        title={t('change_password.title')}
        stepTitle={t('change_password.steps.current_password.title')}
        button={
          <Button
            variant="primary"
            className="w-full"
            loading={isSubmitting}
            disabled={!(isValid && isDirty)}
          >
            {t('change_password.steps.current_password.button')}
          </Button>
        }
      >
        <Label
          text={t(
            'change_password.steps.current_password.inputs.password.label',
          )}
        >
          <PasswordInput
            placeholder={t(
              'change_password.steps.current_password.inputs.password.placeholder',
            )}
            error={errors.password?.message}
            disabled={isSubmitting}
            {...register('password')}
          />
        </Label>
      </FunnelLayout>
    </form>
  );
}
