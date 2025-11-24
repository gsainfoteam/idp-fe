import { overlay } from 'overlay-kit';
import { useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  Button,
  FunnelLayout,
  Input,
  Label,
  LogClick,
  LogModal,
} from '@/features/core';

import { useEmailForm } from '../../hooks/register-steps/use-email-form';

function EmailOverlay({
  isOpen,
  close,
  onSubmit,
}: {
  isOpen: boolean;
  close: () => void;
  onSubmit: () => Promise<void>;
}) {
  const { t } = useTranslation();

  return (
    <LogModal
      isOpen={isOpen}
      close={(_: boolean) => close()}
      defaultCloseValue={false}
      dialogClassName="min-w-100"
      event="email_verification_overlay"
      closeProperties={(value) => ({ result: value ? 'accept' : 'cancel' })}
    >
      <LogModal.Header>
        {t('register.steps.email_overlay.title')}
      </LogModal.Header>
      <LogModal.Body>
        <div className="mt-2 flex w-full flex-col justify-center gap-1.5">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://infoteam-rulrudino.notion.site/GIST-1e5365ea27df8051a3e6f6dc2bb11ded"
          >
            <Button variant="link" size="none" className="text-body-2">
              {t('register.steps.email_overlay.contents.terms')}
            </Button>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://infoteam-rulrudino.notion.site/GSA-90e5824ded1c42479ab61354c8d15db5?pvs=4"
          >
            <Button variant="link" size="none" className="text-body-2">
              {t('register.steps.email_overlay.contents.privacy')}
            </Button>
          </a>
        </div>
      </LogModal.Body>
      <LogModal.Footer>
        <LogModal.Close className="grow" closeValue={false}>
          <LogClick event="register_email_overlay_cancel">
            <Button variant="secondary" className="w-full">
              {t('register.steps.email_overlay.sub_button')}
            </Button>
          </LogClick>
        </LogModal.Close>
        <LogModal.Close className="grow" closeValue={true}>
          <LogClick event="register_email_overlay_accept">
            <Button variant="primary" className="w-full" onClick={onSubmit}>
              {t('register.steps.email_overlay.button')}
            </Button>
          </LogClick>
        </LogModal.Close>
      </LogModal.Footer>
    </LogModal>
  );
}

export function EmailStep({
  context,
  onNext,
}: Parameters<typeof useEmailForm>[0]) {
  const {
    form: { register, control },
    onCheckEmail,
    onSubmit,
  } = useEmailForm({
    context,
    onNext,
  });

  const { isSubmitting, isValid, isDirty, errors } = useFormState({ control });
  const { t } = useTranslation();

  return (
    <FunnelLayout
      loading={isSubmitting}
      title={t('register.title')}
      stepTitle={t('register.steps.email.title')}
      button={
        <LogClick event="register_email_check">
          <Button
            variant="primary"
            className="w-full"
            loading={isSubmitting}
            disabled={!(isValid && isDirty)}
            onClick={async () => {
              if (await onCheckEmail()) {
                overlay.open(({ isOpen, close }) => (
                  <EmailOverlay
                    isOpen={isOpen}
                    close={close}
                    onSubmit={onSubmit}
                  />
                ));
              }
            }}
          >
            {t('register.steps.email.button')}
          </Button>
        </LogClick>
      }
    >
      <Label text={t('register.steps.email.inputs.email.label')}>
        <Input
          type="email"
          placeholder={t('register.steps.email.inputs.email.placeholder')}
          error={errors.email?.message}
          disabled={isSubmitting}
          {...register('email')}
        />
      </Label>
    </FunnelLayout>
  );
}
