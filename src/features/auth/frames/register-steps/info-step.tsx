import { useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useInfoForm } from '../../hooks/register-steps/use-info-form';

import { Button, FunnelLayout, Input, Label } from '@/features/core';

export function InfoStep({
  context,
  onNext,
  onUndo,
}: Parameters<typeof useInfoForm>[0] & { onUndo: () => void }) {
  const {
    form: { register, control },
    onSubmit,
  } = useInfoForm({ context, onNext });
  const { isSubmitting, isValid, isDirty, errors } = useFormState({ control });
  const { t } = useTranslation();

  return (
    <form onSubmit={onSubmit}>
      <FunnelLayout
        onUndo={onUndo}
        loading={isSubmitting}
        title={t('register.title')}
        stepTitle={t('register.steps.info.title')}
        button={
          <Button
            variant="primary"
            className="w-full"
            loading={isSubmitting}
            disabled={!(isValid && isDirty)}
          >
            {t('register.steps.info.button')}
          </Button>
        }
      >
        <div className="flex flex-col gap-5">
          <Label text={t('register.steps.info.inputs.name.label')}>
            <Input
              type="text"
              placeholder={t('register.steps.info.inputs.name.placeholder')}
              error={errors.name?.message || !!errors.root}
              disabled={isSubmitting}
              {...register('name')}
            />
          </Label>
          <Label text={t('register.steps.info.inputs.student_id.label')}>
            <Input
              type="text"
              placeholder={t(
                'register.steps.info.inputs.student_id.placeholder',
                {
                  format: `${new Date().getFullYear()}0000`,
                },
              )}
              error={errors.studentId?.message || !!errors.root}
              disabled={isSubmitting}
              {...register('studentId')}
            />
          </Label>
          <Label text={t('register.steps.info.inputs.phone_number.label')}>
            <Input
              type="tel"
              placeholder={t(
                'register.steps.info.inputs.phone_number.placeholder',
              )}
              error={errors.phoneNumber?.message || errors.root?.message}
              disabled={isSubmitting}
              {...register('phoneNumber')}
            />
          </Label>
        </div>
      </FunnelLayout>
    </form>
  );
}
