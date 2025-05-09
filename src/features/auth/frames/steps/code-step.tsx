import { useState, useEffect } from 'react';
import { useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useCodeForm } from '../../hooks/steps/use-code-form';
import { useResendCode } from '../../hooks/use-resend-code';

import {
  Button,
  FunnelLayout,
  Input,
  Label,
  timeString,
} from '@/features/core';

export function CodeStep({
  context,
  onNext,
  onUndo,
}: Parameters<typeof useCodeForm>[0] & { onUndo: () => void }) {
  const [remainTime, setRemainTime] = useState(300);
  const { t } = useTranslation();
  const {
    form: { register, control },
    onSubmit,
  } = useCodeForm({ context, onNext });
  const { isSubmitting, isValid, isDirty, errors } = useFormState({ control });
  const { onResetTimer, isLoading: isResending } = useResendCode({
    context,
    resetTimer: () => setRemainTime(300),
  });

  useEffect(() => {
    if (remainTime <= 0) return;

    const interval = setTimeout(() => {
      setRemainTime((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(interval);
  }, [remainTime]);

  return (
    <form onSubmit={onSubmit}>
      <FunnelLayout
        onUndoClick={onUndo}
        loading={isSubmitting}
        title={t('register.title')}
        stepTitle={t('register.steps.code.title')}
        button={
          <Button
            variant="primary"
            className="w-full"
            loading={isSubmitting}
            disabled={!(isValid && isDirty)}
          >
            {t('register.steps.code.button')}
          </Button>
        }
      >
        <div className="w-full">
          <Label text={t('register.inputs.code.label')}>
            <Input
              type="text"
              placeholder={t('register.inputs.code.placeholder')}
              error={errors.code?.message}
              disabled={isSubmitting}
              suffixAdornment={
                <div className="text-label-1 text-neutral-600">
                  {timeString(remainTime)}
                </div>
              }
              {...register('code')}
            />
          </Label>
          <div className="mt-1 flex w-full justify-end">
            <Button variant="link" onClick={onResetTimer} loading={isResending}>
              {t('register.steps.code.resend')}
            </Button>
          </div>
        </div>
      </FunnelLayout>
    </form>
  );
}
