import { overlay } from 'overlay-kit';
import { useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, Dialog, FunnelLayout, Input, Label } from '@/features/core';

import { useInfoForm } from '../../hooks/register-steps/use-info-form';

export function InfoStep({
  context,
  onNext,
  onUndo,
}: Parameters<typeof useInfoForm>[0] & { onUndo: () => void }) {
  const {
    form: { register, control },
    onVerify,
    onSubmit,
    studentId,
  } = useInfoForm({ context, onNext });
  const { isSubmitting, isValid, isDirty, errors } = useFormState({ control });
  const { t } = useTranslation();

  return (
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
                      {t('register.steps.info.dialog.title')}
                    </div>
                    <div className="text-body-1">
                      {t('register.steps.info.dialog.description')}
                    </div>
                  </Dialog.Header>
                  <Dialog.Body>
                    <div className="text-title-1 text-label w-full text-center">
                      {studentId}
                    </div>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.Close className="grow">
                      <Button variant="secondary" className="w-full">
                        {t('register.steps.info.dialog.buttons.cancel')}
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
                      {t('register.steps.info.dialog.buttons.continue')}
                    </Button>
                  </Dialog.Footer>
                </Dialog>
              ));
            }
          }}
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
        <Label text={t('register.steps.info.inputs.phone_number.label')}>
          <Input
            type="tel"
            placeholder={t(
              'register.steps.info.inputs.phone_number.placeholder',
            )}
            error={errors.phoneNumber?.message || !!errors.root}
            disabled={isSubmitting}
            {...register('phoneNumber')}
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
