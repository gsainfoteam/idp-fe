import { overlay } from 'overlay-kit';
import { useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, Dialog, FunnelLayout, Input, Label } from '@/features/core';

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
                <Dialog
                  isOpen={isOpen}
                  close={close}
                  className="mx-10 min-w-[300px]"
                >
                  <Dialog.Header className="flex flex-col gap-1">
                    <div className="text-title-1">
                      {t('verify_student_id.steps.new_info.dialog.title')}
                    </div>
                    <div className="text-body-1">
                      {t('verify_student_id.steps.new_info.dialog.description')}
                    </div>
                  </Dialog.Header>
                  <Dialog.Body>
                    <div className="text-title-1 text-label w-full text-center">
                      {getValues('studentId')}
                    </div>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.Close className="grow">
                      <Button variant="secondary" className="w-full">
                        {t(
                          'verify_student_id.steps.new_info.dialog.buttons.cancel',
                        )}
                      </Button>
                    </Dialog.Close>
                    <Button
                      variant="primary"
                      className="grow"
                      onClick={async () => {
                        close();
                        await onSubmit();
                      }}
                    >
                      {t(
                        'verify_student_id.steps.new_info.dialog.buttons.continue',
                      )}
                    </Button>
                  </Dialog.Footer>
                </Dialog>
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
