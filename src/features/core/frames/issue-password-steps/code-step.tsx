import { useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useCodeForm } from '../../hooks/issue-password-steps/use-code-form';

import {
  Button,
  formatTimeToMMSS,
  FunnelLayout,
  Input,
  IssuePasswordSteps,
  Label,
  LogClick,
  StepProgress,
} from '@/features/core';

export function CodeStep({
  context,
  onNext,
}: Parameters<typeof useCodeForm>[0]) {
  const { t } = useTranslation();
  const {
    form: { register, control },
    onSubmit,
    remainSec,
    onResendCode,
    isResending,
    isExpired,
    isMaxCountReached,
  } = useCodeForm({ context, onNext });
  const { isSubmitting, isValid, isDirty, errors } = useFormState({ control });

  return (
    <form onSubmit={onSubmit}>
      <FunnelLayout
        loading={isSubmitting}
        title={t('issue_password.title')}
        stepTitle={
          <div className="flex flex-col items-start gap-5">
            <StepProgress
              currentStep={IssuePasswordSteps.indexOf('code')}
              totalSteps={IssuePasswordSteps.length}
            />
            {t('issue_password.steps.code.title')}
          </div>
        }
        button={
          <LogClick event="issue_password_code_submit">
            <Button
              variant="primary"
              className="w-full"
              loading={isSubmitting}
              disabled={
                !(isValid && isDirty && !isExpired && !isMaxCountReached)
              }
            >
              {t('issue_password.steps.code.button')}
            </Button>
          </LogClick>
        }
      >
        <div className="w-full">
          <Label text={t('issue_password.steps.code.inputs.code.label')}>
            <Input
              type="text"
              placeholder={t(
                'issue_password.steps.code.inputs.code.placeholder',
              )}
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
            <LogClick event="issue_password_code_resend">
              <Button
                variant="link"
                size="none"
                onClick={onResendCode}
                loading={isResending}
                type="button"
              >
                {t('issue_password.steps.code.resend')}
              </Button>
            </LogClick>
          </div>
        </div>
      </FunnelLayout>
    </form>
  );
}
