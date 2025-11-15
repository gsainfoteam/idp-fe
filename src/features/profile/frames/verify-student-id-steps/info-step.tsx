import { useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useAuth } from '@/features/auth';
import { Button, FunnelLayout, Input, Label } from '@/features/core';

import { useVerifyStudentInfoForm } from '../../hooks/use-verify-student-info-form';

export function InfoStep({
  onSuccess,
  onFailure,
}: {
  onSuccess: () => void;
  onFailure: () => void;
}) {
  const {
    form: { register, control },
    onSubmit,
  } = useVerifyStudentInfoForm({ onSuccess, onFailure });
  const { isSubmitting, isValid, isDirty, errors } = useFormState({ control });
  const { t } = useTranslation();
  const { user } = useAuth();

  if (!user) return null;

  return (
    <form onSubmit={onSubmit}>
      <FunnelLayout
        title={t('verify_student_id.title')}
        stepTitle={t('verify_student_id.steps.info.title')}
        button={
          <Button
            variant="primary"
            className="w-full"
            loading={isSubmitting}
            disabled={!(isValid && isDirty)}
          >
            {t('verify_student_id.steps.info.button')}
          </Button>
        }
      >
        <div className="flex flex-col gap-5">
          <Label
            text={t('verify_student_id.steps.info.inputs.birth_date.label')}
          >
            <Input
              type="date"
              placeholder={t(
                'verify_student_id.steps.info.inputs.birth_date.placeholder',
              )}
              error={errors.birthDate?.message}
              disabled={isSubmitting}
              {...register('birthDate', {
                valueAsDate: true,
              })}
            />
          </Label>
          <div className="text-label-2 text-basics-secondary-label">
            {t('verify_student_id.steps.info.inputs.birth_date.description')}
          </div>
        </div>
      </FunnelLayout>
    </form>
  );
}
