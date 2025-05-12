import { useState, useEffect } from 'react';
import { useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useCodeForm } from '../../hooks/find-password-steps/use-code-form';

import { useResendCode } from '@/features/auth';
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
    context: { ...context, emailAgree: true },
    resetTimer: () => {
      setRemainTime(CODE_EXPIRED_TIME);
      setCount(0);
      clearErrors();
    },
  });

  useEffect(() => {
    if (remainTime <= 0) {
      setError('code', {
        message: t('find_password.errors.code_expired'),
        type: 'value',
      });
    }

    if (count >= CODE_MAX_COUNT) {
      setError('code', {
        message: t('find_password.errors.code_max_try'),
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
        onUndoClick={onUndo}
        loading={isSubmitting}
        title={t('find_password.title')}
        stepTitle={t('find_password.steps.code.title')}
        button={
          <Button
            variant="primary"
            className="w-full"
            loading={isSubmitting}
            disabled={
              !(isValid && isDirty && remainTime > 0 && count < CODE_MAX_COUNT)
            }
          >
            {t('find_password.steps.code.button')}
          </Button>
        }
      >
        <div className="w-full">
          <Label text={t('find_password.steps.code.inputs.code.label')}>
            <Input
              type="text"
              placeholder={t(
                'find_password.steps.code.inputs.code.placeholder',
              )}
              error={errors.code?.message}
              disabled={isSubmitting}
              suffixAdornment={
                <div className="text-label-1 text-neutral-600">
                  {timeString(Math.max(remainTime, 0))}
                </div>
              }
              {...register('code')}
            />
          </Label>
          <div className="mt-1 flex w-full justify-end">
            <Button
              variant="link"
              onClick={onResetTimer}
              loading={isResending}
              type="button"
            >
              {t('find_password.steps.code.resend')}
            </Button>
          </div>
        </div>
      </FunnelLayout>
    </form>
  );
}
