import { useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useCodeForm } from '../../hooks/steps/use-code-form';

import { Button, FunnelLayout, Input, Label } from '@/features/core';

// TODO: code step 이후 부터는 뒤로가기 버튼 누를 시 모달로 얼럿 표시하기

export function CodeStep(props: Parameters<typeof useCodeForm>[0]) {
  const {
    form: { register, control },
    onSubmit,
  } = useCodeForm(props);
  const { isSubmitting, isValid, isDirty, errors } = useFormState({ control });
  const { t } = useTranslation();

  return (
    <form onSubmit={onSubmit}>
      <FunnelLayout
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
        <Label text={t('register.inputs.code.label')}>
          <Input
            type="text"
            placeholder={t('register.inputs.code.placeholder')}
            error={errors.code?.message}
            disabled={isSubmitting}
            {...register('code')}
          />
        </Label>
      </FunnelLayout>
    </form>
  );
}
