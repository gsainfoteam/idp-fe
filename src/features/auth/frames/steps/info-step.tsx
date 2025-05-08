import { useRouter } from '@tanstack/react-router';
import { useState } from 'react';
import { useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useInfoForm } from '../../hooks/steps/use-info-form';

import { Button, FunnelLayout, Input, Label, Modal } from '@/features/core';

export function InfoStep(props: Parameters<typeof useInfoForm>[0]) {
  const {
    form: { register, control },
    onSubmit,
  } = useInfoForm(props);
  const { isSubmitting, isValid, isDirty, errors } = useFormState({ control });
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <form onSubmit={onSubmit}>
        <FunnelLayout
          onUndoClick={(history) => {
            if (history.canGoBack() && !isModalOpen) setIsModalOpen(true);
          }}
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
            <Label text={t('register.inputs.name.label')}>
              <Input
                type="text"
                placeholder={t('register.inputs.name.placeholder')}
                error={errors.name?.message || !!errors.root}
                disabled={isSubmitting}
                {...register('name')}
              />
            </Label>
            <Label text={t('register.inputs.student_id.label')}>
              <Input
                type="text"
                placeholder={t('register.inputs.student_id.placeholder', {
                  format: `${new Date().getFullYear()}0000`,
                })}
                error={errors.studentId?.message || !!errors.root}
                disabled={isSubmitting}
                {...register('studentId')}
              />
            </Label>
            <Label text={t('register.inputs.phone_number.label')}>
              <Input
                type="tel"
                placeholder={t('register.inputs.phone_number.placeholder')}
                error={errors.phoneNumber?.message || errors.root?.message}
                disabled={isSubmitting}
                {...register('phoneNumber')}
              />
            </Label>
          </div>
        </FunnelLayout>
      </form>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t('register.warnings.undo.title')}
        button={
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              {t('register.warnings.undo.cancel')}
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setIsModalOpen(false);
                if (router.history.canGoBack()) router.history.back();
              }}
            >
              {t('register.warnings.undo.button')}
            </Button>
          </div>
        }
      />
    </>
  );
}
