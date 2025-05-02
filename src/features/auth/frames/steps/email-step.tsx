import { useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useEmailForm } from '../../hooks/steps/use-email-form';

import { Button, FunnelStep, Input } from '@/features/core';

// TODO: 이용 약관 동의 오버레이 기능 추가

// function Control({ control, onSubmit }) {
//   const { isSubmitting, isValid, isDirty } = useFormState({ control });
//   const { t } = useTranslation();

//   return (
//     <Button
//       variant="primary"
//       onClick={onSubmit}
//       isLoading={isSubmitting}
//       disabled={!(isValid && isDirty)}
//     >
//       {t('register.steps.email.button')}
//     </Button>
//   );
// }

export function EmailStep(props: Parameters<typeof useEmailForm>[0]) {
  const {
    form: { register, control },
    onSubmit,
  } = useEmailForm(props);
  const { isSubmitting, isValid, isDirty, errors } = useFormState({ control });
  const { t } = useTranslation();

  return (
    <FunnelStep
      title={t('register.title')}
      stepTitle={t('register.steps.email.title')}
      button={
        <Button
          variant="primary"
          onClick={onSubmit}
          isLoading={isSubmitting}
          disabled={!(isValid && isDirty)}
        >
          {t('register.steps.email.button')}
        </Button>
      }
    >
      <Input
        type="email"
        label={t('register.inputs.email.label')}
        placeholder={t('register.inputs.email.placeholder')}
        error={errors.email?.message}
        disabled={isSubmitting}
        {...register('email')}
      />
    </FunnelStep>
  );
}
