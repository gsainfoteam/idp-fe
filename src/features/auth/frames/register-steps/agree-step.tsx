import { useRouter } from '@tanstack/react-router';
import { useMemo } from 'react';
import {
  Controller,
  FormProvider,
  useFormContext,
  useWatch,
} from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';

import {
  useAgreeForm,
  type AgreeFormSchema,
} from '../../hooks/register-steps/use-agree-form';
import { RegisterSteps } from '../register-frame';

import {
  Button,
  Checkbox,
  FunnelLayout,
  LogClick,
  StepProgress,
} from '@/features/core';

function AgreeForm() {
  const { control } = useFormContext<AgreeFormSchema>();

  return (
    <div className="flex flex-col gap-3">
      <Controller
        name="terms"
        control={control}
        render={({ field }) => (
          <Checkbox
            checked={field.value ?? false}
            onChange={(e) => field.onChange(e.target.checked)}
          >
            <div className="text-label">
              <Trans
                i18nKey="register.steps.agree.checkboxes.terms"
                components={[
                  <a
                    key="terms-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://terms.gistory.me/account/tos/250520/"
                    className="underline"
                    onClick={(e) => e.stopPropagation()}
                  />,
                ]}
              />
            </div>
          </Checkbox>
        )}
      />
      <Controller
        name="privacy"
        control={control}
        render={({ field }) => (
          <Checkbox
            checked={field.value ?? false}
            onChange={(e) => field.onChange(e.target.checked)}
          >
            <div className="text-label">
              <Trans
                i18nKey="register.steps.agree.checkboxes.privacy"
                components={[
                  <a
                    key="privacy-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://terms.gistory.me/account/privacy/250520/"
                    className="underline"
                    onClick={(e) => e.stopPropagation()}
                  />,
                ]}
              />
            </div>
          </Checkbox>
        )}
      />
    </div>
  );
}

export function AgreeStep({ onNext }: { onNext: () => void }) {
  const router = useRouter();
  const { t } = useTranslation();
  const { form, onSubmit } = useAgreeForm({ onNext });

  const termsValue = useWatch({ name: 'terms', control: form.control });
  const privacyValue = useWatch({ name: 'privacy', control: form.control });

  const allAgreed = useMemo(
    () => termsValue && privacyValue,
    [termsValue, privacyValue],
  );

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit}>
        <FunnelLayout
          title={t('register.title')}
          stepTitle={
            <div className="flex flex-col items-start gap-5">
              <StepProgress
                currentStep={RegisterSteps.indexOf('agree')}
                totalSteps={RegisterSteps.length}
              />
              {t('register.steps.agree.title')}
            </div>
          }
          button={
            <div className="flex w-full gap-3">
              <LogClick event="register_agree_undo_button">
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => {
                    if (router.history.canGoBack()) router.history.back();
                  }}
                >
                  {t('register.steps.agree.undo_button')}
                </Button>
              </LogClick>
              <LogClick event="register_agree_submit">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  disabled={!allAgreed}
                >
                  {t('register.steps.agree.button')}
                </Button>
              </LogClick>
            </div>
          }
        >
          <AgreeForm />
        </FunnelLayout>
      </form>
    </FormProvider>
  );
}
