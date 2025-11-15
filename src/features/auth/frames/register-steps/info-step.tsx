import { useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, FunnelLayout, Input, Label } from '@/features/core';

import { useInfoForm } from '../../hooks/register-steps/use-info-form';

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
              placeholder={t(
                'register.steps.info.inputs.birth_date.placeholder',
              )}
              error={errors.birthDate?.message || errors.root?.message}
              disabled={isSubmitting}
              {...register('birthDate', {
                valueAsDate: true,
              })}
            />
          </Label>
        </div>
      </FunnelLayout>
    </form>
  );
}
