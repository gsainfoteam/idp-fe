import { useState, useEffect } from 'react';
import { useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useCodeForm } from '../../hooks/register-steps/use-code-form';
import { useResendCode } from '../../hooks/use-resend-code';

import {
  Button,
  FunnelLayout,
  Input,
  Label,
  timeString,
} from '@/features/core';

const CODE_EXPIRED_TIME = 300;
export const CODE_MAX_COUNT = 5;

export function CodeStep({
  context,
  onNext,
  onUndo,
}: Omit<Parameters<typeof useCodeForm>[0], 'count'> & { onUndo: () => void }) {
  const [remainTime, setRemainTime] = useState(CODE_EXPIRED_TIME);
  const [count, setCount] = useState(0);

  const { t } = useTranslation();
  const {
    form: { register, control, setError, clearErrors },
    onSubmit,
  } = useCodeForm({ context, onNext, count });
  const { isSubmitting, isValid, isDirty, errors } = useFormState({ control });
  const { onResetTimer, isLoading: isResending } = useResendCode({
    context,
    resetTimer: () => {
      setRemainTime(CODE_EXPIRED_TIME);
      setCount(0);
      clearErrors();
    },
  });

  useEffect(() => {
    if (remainTime <= 0) {
      setError('code', {
        message: t('register.steps.code.inputs.code.errors.expired'),
        type: 'value',
      });
    }

    if (count >= CODE_MAX_COUNT) {
      setError('code', {
        message: t('register.steps.code.inputs.code.errors.max_try'),
        type: 'value',
      });
    }

    const timer = setTimeout(() => {
      setRemainTime((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, remainTime, setError, t]);

  return (
    <form
      onSubmit={(e) => {
        setCount((prev) => prev + 1);
        onSubmit(e);
      }}
    >
      <FunnelLayout
        onUndo={onUndo}
        loading={isSubmitting}
        title={t('register.title')}
        stepTitle={t('register.steps.code.title')}
        button={
          <Button
            variant="primary"
            className="w-full"
            loading={isSubmitting}
            disabled={
              !(isValid && isDirty && remainTime > 0 && count < CODE_MAX_COUNT)
            }
          >
            {t('register.steps.code.button')}
          </Button>
        }
      >
        <div className="w-full">
          <Label text={t('register.steps.code.inputs.code.label')}>
            <Input
              type="text"
              placeholder={t('register.steps.code.inputs.code.placeholder')}
              error={errors.code?.message}
              disabled={isSubmitting}
              suffixAdornment={
                <div className="text-label-1">
                  {timeString(Math.max(remainTime, 0))}
                </div>
              }
              {...register('code')}
            />
          </Label>
          <div className="mt-1 flex w-full justify-end">
            <Button
              variant="link"
              size="none"
              onClick={onResetTimer}
              loading={isResending}
              type="button"
            >
              {t('register.steps.code.resend')}
            </Button>
          </div>
        </div>
      </FunnelLayout>
    </form>
  );
}
