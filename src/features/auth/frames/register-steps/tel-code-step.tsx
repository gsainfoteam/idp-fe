import { useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useTelCodeForm } from '../../hooks/register-steps/use-tel-code-form';
import { RegisterSteps } from '../register-frame';

import {
  Button,
  FunnelLayout,
  Input,
  Label,
  LogClick,
  StepProgress,
  formatTimeToMMSS,
} from '@/features/core';

export function TelCodeStep({
  context,
  onNext,
  onUndo,
}: Parameters<typeof useTelCodeForm>[0] & {
  onUndo: () => void;
}) {
  const { t } = useTranslation();
  const {
    form: { register, control },
    onSubmit,
    remainSec,
    onResendCode,
    isResending,
    isExpired,
    isMaxCountReached,
  } = useTelCodeForm({ context, onNext });
  const { isSubmitting, isValid, isDirty, errors } = useFormState({ control });

  return (
    <form onSubmit={onSubmit}>
      <FunnelLayout
        onUndo={onUndo}
        loading={isSubmitting}
        title={t('register.title')}
        stepTitle={
          <div className="flex flex-col items-start gap-5">
            <StepProgress
              currentStep={RegisterSteps.indexOf('telCode')}
              totalSteps={RegisterSteps.length}
            />
            {t('register.steps.tel_code.title')}
          </div>
        }
        button={
          <LogClick event="register_tel_code_submit">
            <Button
              variant="primary"
              className="w-full"
              loading={isSubmitting}
              disabled={
                !(isValid && isDirty && !isExpired && !isMaxCountReached)
              }
            >
              {t('register.steps.tel_code.button')}
            </Button>
          </LogClick>
        }
      >
        <div className="w-full">
          <Label text={t('register.steps.tel_code.inputs.code.label')}>
            <Input
              type="text"
              placeholder={t('register.steps.tel_code.inputs.code.placeholder')}
              error={errors.code?.message}
              disabled={isSubmitting}
              suffixAdornment={
                <div className="text-label-1">
                  {formatTimeToMMSS(Math.max(remainSec, 0))}
                </div>
              }
              {...register('code')}
            />
          </Label>
          <div className="mt-1 flex w-full justify-end">
            <LogClick event="register_tel_code_resend">
              <Button
                variant="link"
                size="none"
                onClick={onResendCode}
                loading={isResending}
                type="button"
              >
                {t('register.steps.tel_code.resend')}
              </Button>
            </LogClick>
          </div>
        </div>
      </FunnelLayout>
    </form>
  );
}
