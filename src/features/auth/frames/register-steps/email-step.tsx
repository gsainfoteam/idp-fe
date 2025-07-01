import { useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useEmailForm } from '../../hooks/register-steps/use-email-form';

import { Button, FunnelLayout, Input, Label, Modal } from '@/features/core';
import { overlay } from 'overlay-kit';

function EmailOverlay({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: (agree: boolean) => void;
}) {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} close={() => close(false)} className="min-w-100">
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
        <Button variant="primary" onClick={() => close(true)} className="grow">
          {t('register.steps.email_overlay.button')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export function EmailStep({
  context,
  onNext,
}: Omit<Parameters<typeof useEmailForm>[0], 'overlay'>) {
  const {
    form: { register, control },
    onSubmit,
  } = useEmailForm({
    context,
    onNext,
    overlay: async () => {
      return await overlay.openAsync<boolean>(({ isOpen, close }) => (
        <EmailOverlay isOpen={isOpen} close={close} />
      ));
    },
  });

  const { isSubmitting, isValid, isDirty, errors } = useFormState({ control });
  const { t } = useTranslation();

  return (
    <form onSubmit={onSubmit}>
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
    </form>
  );
}
