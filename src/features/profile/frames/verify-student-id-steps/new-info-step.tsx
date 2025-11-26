import { overlay } from 'overlay-kit';
import { useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  Button,
  FunnelLayout,
  Input,
  Label,
  StudentIdVerificationDialog,
} from '@/features/core';

import { useVerifyStudentNewInfoForm } from '../../hooks/use-verify-student-new-info-form';
import { VerifyStudentIdSteps } from '../verify-student-id-frame';

export function NewInfoStep({
  context,
  onNext,
}: {
  context: VerifyStudentIdSteps['failure'];
  onNext: () => void;
}) {
  const {
    form: { register, control, getValues },
    onVerify,
    onSubmit,
  } = useVerifyStudentNewInfoForm({ onNext });
  const { isSubmitting, isValid, isDirty, errors } = useFormState({ control });
  const { t } = useTranslation();

  return (
    <FunnelLayout
      title={t('verify_student_id.title')}
      stepTitle={t('verify_student_id.steps.new_info.title')}
      button={
        <Button
          type="button"
          variant="primary"
          className="w-full"
          loading={isSubmitting}
          disabled={!(isValid && isDirty)}
          onClick={async () => {
            if (await onVerify()) {
              overlay.open(({ isOpen, close }) => (
                <StudentIdVerificationDialog
                  isOpen={isOpen}
                  close={close}
                  defaultCloseValue={false}
                  studentId={getValues('studentId')!}
                  onConfirm={onSubmit}
                />
              ));
            }
          }}
        >
          {t('verify_student_id.steps.new_info.button')}
        </Button>
      }
    >
      <div className="flex flex-col gap-5">
        <Label text={t('verify_student_id.steps.new_info.inputs.name.label')}>
          <Input
            type="text"
            placeholder={t(
              'verify_student_id.steps.new_info.inputs.name.placeholder',
            )}
            error={errors.name?.message || !!errors.root}
            disabled={isSubmitting}
            {...register('name')}
          />
        </Label>
        <Label
          text={t('verify_student_id.steps.new_info.inputs.birth_date.label')}
        >
          <Input
            type="date"
            placeholder={t(
              'verify_student_id.steps.new_info.inputs.birth_date.placeholder',
            )}
            error={errors.birthDate?.message || errors.root?.message}
            disabled={isSubmitting}
            defaultValue={context.birthDate.toISOString().split('T')[0]}
            {...register('birthDate', {
              valueAsDate: true,
            })}
          />
        </Label>
        <div className="text-label-2 text-basics-secondary-label">
          {t('verify_student_id.steps.new_info.inputs.birth_date.description')}
        </div>
      </div>
    </FunnelLayout>
  );
}
