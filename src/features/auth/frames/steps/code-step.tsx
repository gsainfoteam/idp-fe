import { useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useCodeForm } from '../../hooks/steps/use-code-form';

import { Button, FunnelStep, Input, Label } from '@/features/core';

// TODO: 만료 타이머, 5회 횟수 제한 기능, 인증번호 재요청

export function CodeStep(props: Parameters<typeof useCodeForm>[0]) {
  const {
    form: { register, control },
    onSubmit,
  } = useCodeForm(props);
  const { isSubmitting, isValid, isDirty, errors } = useFormState({ control });
  const { t } = useTranslation();

  return (
    <FunnelStep
      loading={isSubmitting}
      title={t('register.title')}
      stepTitle={t('register.steps.code.title')}
      button={
        <Button
          variant="primary"
          className="w-full"
          onClick={onSubmit}
          loading={isSubmitting}
          disabled={!(isValid && isDirty)}
        >
          {t('register.steps.code.button')}
        </Button>
      }
    >
      <Label text={t('register.inputs.code.label')} htmlFor="code">
        <Input
          type="text"
          id="code"
          placeholder={t('register.inputs.code.placeholder')}
          error={errors.code?.message}
          disabled={isSubmitting}
          {...register('code')}
        />
      </Label>
    </FunnelStep>
  );
}
