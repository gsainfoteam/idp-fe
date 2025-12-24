import { useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useTelForm } from '../../hooks/register-steps/use-tel-form';

import {
  Button,
  FunnelLayout,
  Input,
  Label,
  LogClick,
  StepProgress,
} from '@/features/core';

export function TelStep({
  onTelCodeNext,
  onTelSkipNext,
  onUndo,
}: Parameters<typeof useTelForm>[0] & { onUndo: () => void }) {
  const {
    form: { register, control },
    onSubmit,
  } = useTelForm({
    onTelCodeNext,
    onTelSkipNext,
  });

  const { isSubmitting, isValid, isDirty, errors } = useFormState({ control });
  const { t } = useTranslation();

  return (
    <form onSubmit={onSubmit}>
      <FunnelLayout
        onUndo={onUndo}
        loading={isSubmitting}
        title={
          <div className="flex flex-col gap-5">
            <StepProgress currentStep={4} totalSteps={7} />
            {t('register.title')}
          </div>
        }
        stepTitle={t('register.steps.tel.title')}
        button={
          <LogClick event="register_tel_verify">
            <Button
              variant="primary"
              className="w-full"
              loading={isSubmitting}
              disabled={!(isValid && isDirty)}
            >
              {t('register.steps.tel.button')}
            </Button>
          </LogClick>
        }
      >
        <Label text={t('register.steps.tel.inputs.phone_number.label')}>
          <Input
            type="tel"
            placeholder={t(
              'register.steps.tel.inputs.phone_number.placeholder',
            )}
            error={errors.phoneNumber?.message}
            disabled={isSubmitting}
            {...register('phoneNumber')}
          />
        </Label>
      </FunnelLayout>
    </form>
  );
}
