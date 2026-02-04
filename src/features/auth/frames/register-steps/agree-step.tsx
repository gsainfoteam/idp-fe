import { useRouter } from '@tanstack/react-router';
import { overlay } from 'overlay-kit';
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
  Dialog,
  FunnelLayout,
  LoadingEllipse,
  LogClick,
  StepProgress,
} from '@/features/core';

function TermsDialogOverlay({
  isOpen,
  close,
  title,
  iframeSrc,
  isTermsVersionLoading,
}: {
  isOpen: boolean;
  close: () => void;
  title: string;
  iframeSrc: string;
  isTermsVersionLoading: boolean;
}) {
  const { t } = useTranslation();

  return (
    <Dialog
      isOpen={isOpen}
      close={(_: unknown) => close()}
      defaultCloseValue={null}
      className="min-h-[60vh] w-full"
    >
      <Dialog.Header>{title}</Dialog.Header>
      <Dialog.Body className="min-h-[60vh]">
        {isTermsVersionLoading ? (
          <div className="flex h-[60vh] w-full items-center justify-center">
            <LoadingEllipse />
          </div>
        ) : (
          <iframe
            src={iframeSrc}
            title={title}
            className="h-[60vh] w-full border-0"
          />
        )}
      </Dialog.Body>
      <Dialog.Footer>
        <Dialog.Close closeValue={null} className="w-full">
          <Button variant="primary" className="w-full">
            {t('register.steps.agree.modal.close')}
          </Button>
        </Dialog.Close>
      </Dialog.Footer>
    </Dialog>
  );
}

function AgreeForm({
  onOpenTerms,
  onOpenPrivacy,
}: {
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
}) {
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
                  <button
                    key="terms-link"
                    type="button"
                    className="underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenTerms();
                    }}
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
                  <button
                    key="privacy-link"
                    type="button"
                    className="underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenPrivacy();
                    }}
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
  const { form, onSubmit, embeddedUrls, isTermsVersionLoading } = useAgreeForm({
    onNext,
  });

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
          <AgreeForm
            onOpenTerms={() =>
              overlay.open(({ isOpen, close }) => (
                <TermsDialogOverlay
                  isOpen={isOpen}
                  close={close}
                  title={t('register.steps.agree.modal.terms_title')}
                  iframeSrc={embeddedUrls.terms}
                  isTermsVersionLoading={isTermsVersionLoading}
                />
              ))
            }
            onOpenPrivacy={() =>
              overlay.open(({ isOpen, close }) => (
                <TermsDialogOverlay
                  isOpen={isOpen}
                  close={close}
                  title={t('register.steps.agree.modal.privacy_title')}
                  iframeSrc={embeddedUrls.privacy}
                  isTermsVersionLoading={isTermsVersionLoading}
                />
              ))
            }
          />
        </FunnelLayout>
      </form>
    </FormProvider>
  );
}
