import { useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useEmailForm } from '../../hooks/register-steps/use-email-form';
import { RegisterSteps } from '../register-frame';

import {
  Button,
  FunnelLayout,
  Input,
  Label,
  LogClick,
  StepProgress,
} from '@/features/core';

export function EmailStep({
  context,
  onNext,
  onUndo,
}: Parameters<typeof useEmailForm>[0] & { onUndo: () => void }) {
  const {
    form: { register, control },
    onCheckEmail,
    onSubmit,
  } = useEmailForm({
    context,
    onNext,
  });

  const { isSubmitting, isValid, isDirty, errors } = useFormState({ control });
  const { t } = useTranslation();

  return (
    <FunnelLayout
      onUndo={onUndo}
      loading={isSubmitting}
      title={t('register.title')}
      stepTitle={
        <div className="flex flex-col items-start gap-5">
          <StepProgress
            currentStep={RegisterSteps.indexOf('email')}
            totalSteps={RegisterSteps.length}
          />
          {t('register.steps.email.title')}
        </div>
      }
      button={
        <LogClick event="register_email_check">
          <Button
            variant="primary"
            className="w-full"
            loading={isSubmitting}
            disabled={!(isValid && isDirty)}
            onClick={async () => {
              if (await onCheckEmail()) {
                await onSubmit();
              }
            }}
          >
            {t('register.steps.email.button')}
          </Button>
        </LogClick>
      }
    >
      <Label text={t('register.steps.email.inputs.email.label')}>
        <Input
          type="email"
          placeholder={t('register.steps.email.inputs.email.placeholder')}
          error={errors.email?.message}
          disabled={isSubmitting}
          {...register('email')}
        />
      </Label>
    </FunnelLayout>
  );
}
