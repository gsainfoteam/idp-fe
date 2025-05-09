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

const CODE_EXPIRED_TIME = 10;

// FIXME: 인증 번호 만료 상황에서 form validate error가 뜨면 만료 에러 메시지를 덮어 씌우고 이후 사라지면 에러가 아예 사라짐

export function CodeStep({
  context,
  onNext,
  onUndo,
}: Parameters<typeof useCodeForm>[0] & { onUndo: () => void }) {
  const [remainTime, setRemainTime] = useState(CODE_EXPIRED_TIME);
  const { t } = useTranslation();
  const {
    form: { register, control, setError },
    onSubmit,
  } = useCodeForm({ context, onNext });
  const { isSubmitting, isValid, isDirty, errors } = useFormState({ control });
  const { onResetTimer, isLoading: isResending } = useResendCode({
    context,
    resetTimer: () => setRemainTime(CODE_EXPIRED_TIME),
  });

  useEffect(() => {
    if (remainTime <= 0) {
      setError('code', {
        message: t('register.errors.code_expired'),
        type: 'value',
      });
      return;
    }

    const interval = setTimeout(() => {
      setRemainTime((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(interval);
  }, [remainTime, setError, t]);

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
            disabled={!(isValid && isDirty && remainTime > 0)}
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
