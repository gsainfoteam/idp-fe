import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useEmailOverlayForm } from '../../hooks/register-steps/use-email-overlay-form';

import { Button, Dialog } from '@/features/core';
import { BottomSheet } from '@/features/core';

function Inner() {
  const { t } = useTranslation();

  return (
    <div className="mt-2 flex w-full flex-col gap-1.5">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://infoteam-rulrudino.notion.site/GIST-1e5365ea27df8051a3e6f6dc2bb11ded"
      >
        <Button variant="link" className="text-body-2">
          {t('register.steps.email_overlay.contents.terms')}
        </Button>
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://infoteam-rulrudino.notion.site/GSA-90e5824ded1c42479ab61354c8d15db5?pvs=4"
      >
        <Button variant="link" className="text-body-2">
          {t('register.steps.email_overlay.contents.privacy')}
        </Button>
      </a>
    </div>
  );
}

export function EmailOverlayStep({
  context,
  onNext,
  close,
}: {
  close: () => void;
} & Parameters<typeof useEmailOverlayForm>[0]) {
  const { form, onSubmit } = useEmailOverlayForm({ context, onNext });
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState(true);
  const [isPC, setIsPC] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const handleResize = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsPC(e.matches);
    };

    handleResize(mediaQuery);

    mediaQuery.addEventListener('change', handleResize);
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  const handleClose = () => {
    setOpen(false);
    close();
  };

  return isPC && !context.emailAgree ? (
    <Dialog isOpen={isOpen} close={handleClose} className="w-[400px]">
      <Dialog.Header>{t('register.steps.email_overlay.title')}</Dialog.Header>
      <Dialog.Body>
        <Inner />
      </Dialog.Body>
      <Dialog.Footer>
        <Dialog.Close>
          <Button variant="secondary" className="w-full">
            {t('register.steps.email_overlay.sub_button')}
          </Button>
        </Dialog.Close>
        <Button
          variant="primary"
          onClick={onSubmit}
          loading={form.formState.isSubmitting}
          className="w-full"
        >
          {t('register.steps.email_overlay.button')}
        </Button>
      </Dialog.Footer>
    </Dialog>
  ) : (
    <BottomSheet isOpen={isOpen} close={handleClose}>
      <BottomSheet.Header>
        {t('register.steps.email_overlay.title')}
      </BottomSheet.Header>
      <BottomSheet.Body>
        <Inner />
      </BottomSheet.Body>
      <BottomSheet.Footer>
        <BottomSheet.Close>
          <Button variant="secondary" className="w-full">
            {t('register.steps.email_overlay.sub_button')}
          </Button>
        </BottomSheet.Close>
        <Button
          variant="primary"
          onClick={onSubmit}
          loading={form.formState.isSubmitting}
          className="w-full"
        >
          {t('register.steps.email_overlay.button')}
        </Button>
      </BottomSheet.Footer>
    </BottomSheet>
  );
}
