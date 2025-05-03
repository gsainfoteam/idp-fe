import { useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useInfoForm } from '../../hooks/steps/use-info-form';

import { Button, FunnelStep, Input } from '@/features/core';

export function InfoStep(props: Parameters<typeof useInfoForm>[0]) {
  const {
    form: { register, control },
    onSubmit,
  } = useInfoForm(props);
  const { isSubmitting, isValid, isDirty, errors } = useFormState({ control });
  const { t } = useTranslation();

  return (
    <FunnelStep
      isLoading={isSubmitting}
      title={t('register.title')}
      stepTitle={t('register.steps.info.title')}
      button={
        <Button
          variant="primary"
          onClick={onSubmit}
          loading={isSubmitting}
          disabled={!(isValid && isDirty)}
        >
          {t('register.steps.info.button')}
        </Button>
      }
    >
      <div className="flex flex-col gap-5">
        <Input
          type="text"
          label={t('register.inputs.name.label')}
          placeholder={t('register.inputs.name.placeholder')}
          error={errors.name?.message || !!errors.root}
          disabled={isSubmitting}
          {...register('name')}
        />
        <Input
          type="text"
          label={t('register.inputs.student_id.label')}
          placeholder={t('register.inputs.student_id.placeholder', {
            format: `${new Date().getFullYear()}0000`,
          })}
          error={errors.studentId?.message || !!errors.root}
          disabled={isSubmitting}
          {...register('studentId')}
        />
        <Input
          type="tel"
          label={t('register.inputs.phone_number.label')}
          placeholder={t('register.inputs.phone_number.placeholder')}
          error={errors.phoneNumber?.message || errors.root?.message}
          disabled={isSubmitting}
          {...register('phoneNumber')}
        />
      </div>
    </FunnelStep>
  );
}
