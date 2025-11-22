import { overlay } from 'overlay-kit';
import { useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, FunnelLayout, Input, Label, Modal } from '@/features/core';

import { useEmailForm } from '../../hooks/register-steps/use-email-form';

function EmailOverlay({
  isOpen,
  close,
  onSubmit,
}: {
  isOpen: boolean;
  close: (agree: boolean) => void;
  onSubmit: () => Promise<void>;
}) {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      close={() => close(false)}
      dialogClassName="min-w-100"
    >
      <Modal.Header>{t('register.steps.email_overlay.title')}</Modal.Header>
      <Modal.Body>
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
      </Modal.Body>
      <Modal.Footer>
        <Modal.Close className="grow">
          <Button variant="secondary" className="w-full">
            {t('register.steps.email_overlay.sub_button')}
          </Button>
        </Modal.Close>
        <Button
          variant="primary"
          onClick={async () => {
            close(true);
            await onSubmit();
          }}
          className="grow"
        >
          {t('register.steps.email_overlay.button')}
        </Button>
      </Modal.Footer>
    </Modal>
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
