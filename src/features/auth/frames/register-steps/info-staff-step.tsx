import { useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useInfoStaffForm } from '../../hooks/register-steps/use-info-staff-form';
import { RegisterSteps } from '../register-frame';

import {
  Button,
  FunnelLayout,
  Input,
  Label,
  LogClick,
  StepProgress,
} from '@/features/core';

export function InfoStaffStep({
  context,
  onNext,
  onUndo,
}: Parameters<typeof useInfoStaffForm>[0] & { onUndo: () => void }) {
  const {
    form: { register, control },
    onSubmit,
  } = useInfoStaffForm({ context, onNext });
  const { isSubmitting, isValid, isDirty, errors } = useFormState({ control });
  const { t } = useTranslation();

  return (
    <form onSubmit={onSubmit}>
      <FunnelLayout
        onUndo={onUndo}
        loading={isSubmitting}
        title={t('register.title')}
        stepTitle={
          <div className="flex flex-col items-start gap-5">
            <StepProgress
              currentStep={RegisterSteps.indexOf('info')}
              totalSteps={RegisterSteps.length}
            />
            {t('register.steps.info_staff.title')}
          </div>
        }
        button={
          <LogClick event="register_info_staff_submit">
            <Button
              variant="primary"
              className="w-full"
              loading={isSubmitting}
              disabled={!(isValid && isDirty)}
            >
              {t('register.steps.info_staff.button')}
            </Button>
          </LogClick>
        }
      >
        <div className="flex flex-col gap-5">
          <Label text={t('register.steps.info_staff.inputs.name.label')}>
            <Input
              type="text"
              placeholder={t(
                'register.steps.info_staff.inputs.name.placeholder',
              )}
              error={errors.name?.message || !!errors.root}
              disabled={isSubmitting}
              {...register('name')}
            />
          </Label>
          <Label text={t('register.steps.info_staff.inputs.id.label')}>
            <Input
              type="text"
              placeholder={t('register.steps.info_staff.inputs.id.placeholder')}
              error={errors.studentId?.message || errors.root?.message}
              disabled={isSubmitting}
              {...register('studentId')}
            />
          </Label>
        </div>
      </FunnelLayout>
    </form>
  );
}
