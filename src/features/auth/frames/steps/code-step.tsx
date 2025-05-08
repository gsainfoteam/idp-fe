import { useRouter } from '@tanstack/react-router';
import { useState } from 'react';
import { useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useCodeForm } from '../../hooks/steps/use-code-form';

import { Button, FunnelLayout, Input, Label, Modal } from '@/features/core';

export function CodeStep(props: Parameters<typeof useCodeForm>[0]) {
  const {
    form: { register, control },
    onSubmit,
  } = useCodeForm(props);
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
          stepTitle={t('register.steps.code.title')}
          button={
            <Button
              variant="primary"
              className="w-full"
              loading={isSubmitting}
              disabled={!(isValid && isDirty)}
            >
              {t('register.steps.code.button')}
            </Button>
          }
        >
          <Label text={t('register.inputs.code.label')}>
            <Input
              type="text"
              placeholder={t('register.inputs.code.placeholder')}
              error={errors.code?.message}
              disabled={isSubmitting}
              {...register('code')}
            />
          </Label>
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
