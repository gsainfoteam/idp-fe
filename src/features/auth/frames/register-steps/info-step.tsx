import { overlay } from 'overlay-kit';
import { useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useInfoForm } from '../../hooks/register-steps/use-info-form';

import {
  Button,
  FunnelLayout,
  Input,
  Label,
  LogClick,
  StepProgress,
  StudentIdVerificationDialog,
} from '@/features/core';

export function InfoStep({
  context,
  onNext,
  onUndo,
}: Parameters<typeof useInfoForm>[0] & { onUndo: () => void }) {
  const {
    form: { register, control, getValues },
    onVerify,
    onSubmit,
  } = useInfoForm({ context, onNext });
  const { isSubmitting, isValid, isDirty, errors } = useFormState({ control });
  const { t } = useTranslation();

  return (
    <FunnelLayout
      onUndo={onUndo}
      loading={isSubmitting}
      title={
        <div className="flex flex-col gap-5">
          <StepProgress currentStep={7} totalSteps={7} />
          {t('register.title')}
        </div>
      }
      stepTitle={t('register.steps.info.title')}
      button={
        <LogClick event="register_info_verify">
          <Button
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
            {t('register.steps.info.button')}
          </Button>
        </LogClick>
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
        <Label text={t('register.steps.info.inputs.birth_date.label')}>
          <Input
            type="date"
            placeholder={t('register.steps.info.inputs.birth_date.placeholder')}
            error={errors.birthDate?.message || errors.root?.message}
            disabled={isSubmitting}
            {...register('birthDate', {
              valueAsDate: true,
            })}
          />
        </Label>
        <div className="text-label-2 text-basics-secondary-label">
          {t('register.steps.info.inputs.birth_date.description')}
        </div>
      </div>
    </FunnelLayout>
  );
}
