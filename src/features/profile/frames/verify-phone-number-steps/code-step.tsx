import { useEffect, useState } from 'react';
import { useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useResendPhoneNumberCode } from '../../hooks/use-resend-phone-number-code';
import { useVerifyPhoneNumberCodeForm } from '../../hooks/use-verify-phone-number-code-form';

import { useAuth } from '@/features/auth';
import {
  Button,
  FunnelLayout,
  Input,
  Label,
  LogClick,
  formatTimeToMMSS,
} from '@/features/core';

const CODE_EXPIRED_TIME = 300;
export const CODE_MAX_COUNT = 5;

export function CodeStep({
  context,
  onNext,
}: Omit<Parameters<typeof useVerifyPhoneNumberCodeForm>[0], 'count'>) {
  const [remainTime, setRemainTime] = useState(CODE_EXPIRED_TIME);
  const [count, setCount] = useState(0);

  const { t } = useTranslation();
  const {
    form: { register, control, setError, clearErrors },
    onSubmit,
  } = useVerifyPhoneNumberCodeForm({ context, onNext, count });
  const { isSubmitting, isValid, isDirty, errors } = useFormState({ control });
  const { onResetTimer, isLoading: isResending } = useResendPhoneNumberCode({
    context,
    resetTimer: () => {
      setRemainTime(CODE_EXPIRED_TIME);
      setCount(0);
      clearErrors();
    },
  });
  const { user } = useAuth();

  useEffect(() => {
    if (remainTime <= 0) {
      setError('code', {
        message: t('verify_phone_number.steps.code.inputs.code.errors.expired'),
        type: 'value',
      });
    }

    if (count >= CODE_MAX_COUNT) {
      setError('code', {
        message: t('verify_phone_number.steps.code.inputs.code.errors.max_try'),
        type: 'value',
      });
    }

    const timer = setTimeout(() => {
      setRemainTime((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, remainTime, setError, t]);

  if (!user) return null;

  return (
    <form
      onSubmit={(e) => {
        setCount((prev) => prev + 1);
        onSubmit(e);
      }}
    >
      <FunnelLayout
        title={t('verify_phone_number.title')}
        stepTitle={t('verify_phone_number.steps.code.title')}
        button={
          <Button
            variant="primary"
            className="w-full"
            loading={isSubmitting}
            disabled={
              !(isValid && isDirty && remainTime > 0 && count < CODE_MAX_COUNT)
            }
          >
            {t('verify_phone_number.steps.code.button')}
          </Button>
        }
      >
        <div className="w-full">
          <Label text={t('verify_phone_number.steps.code.inputs.code.label')}>
            <Input
              type="text"
              placeholder={t(
                'verify_phone_number.steps.code.inputs.code.placeholder',
              )}
              error={errors.code?.message || errors.root?.message}
              disabled={isSubmitting}
              suffixAdornment={
                <div className="text-label-1">
                  {formatTimeToMMSS(Math.max(remainTime, 0))}
                </div>
              }
              {...register('code')}
            />
          </Label>
          <div className="mt-1 flex w-full justify-end">
            <LogClick event="phone_number_verify_code_resend">
              <Button
                variant="link"
                size="none"
                onClick={onResetTimer}
                loading={isResending}
                type="button"
              >
                {t('verify_phone_number.steps.code.resend')}
              </Button>
            </LogClick>
          </div>
        </div>
      </FunnelLayout>
    </form>
  );
}
