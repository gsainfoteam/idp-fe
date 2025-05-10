import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useEmailOverlayForm } from '../../hooks/steps/use-email-overlay-form';

import { Button, Modal } from '@/features/core';
import { BottomSheet } from '@/features/core';

function Inner() {
  return (
    <div className="mt-2 flex w-full flex-col gap-1.5">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://infoteam-rulrudino.notion.site/GIST-1e5365ea27df8051a3e6f6dc2bb11ded"
      >
        <Button variant="link" className="text-body-2">
          GIST 메일로 로그인 이용약관
        </Button>
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://infoteam-rulrudino.notion.site/GSA-90e5824ded1c42479ab61354c8d15db5?pvs=4"
      >
        <Button variant="link" className="text-body-2">
          GIST 메일로 로그인 개인정보처리방침
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
  const [open, setOpen] = useState(true);
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
    <Modal open={open} onClose={handleClose} className="w-[400px]">
      <div className="text-title-1 w-full text-pretty whitespace-pre-wrap text-neutral-950">
        {t('register.steps.emailOverlay.title')}
      </div>
      <Inner />
      <div className="mt-6 flex w-full justify-end gap-3">
        <Button variant="secondary" onClick={handleClose}>
          {t('register.steps.emailOverlay.sub_button')}
        </Button>
        <Button
          variant="primary"
          onClick={onSubmit}
          loading={form.formState.isSubmitting}
        >
          {t('register.steps.emailOverlay.button')}
        </Button>
      </div>
    </Modal>
  ) : (
    <BottomSheet open={open} onClose={handleClose}>
      <div className="text-title-1 w-full text-pretty whitespace-pre-wrap text-neutral-950">
        {t('register.steps.emailOverlay.title')}
      </div>
      <Inner />
      <div className="mt-6 flex w-full justify-end gap-3">
        <Button variant="secondary" onClick={handleClose} className="w-full">
          {t('register.steps.emailOverlay.sub_button')}
        </Button>
        <Button
          variant="primary"
          onClick={onSubmit}
          loading={form.formState.isSubmitting}
          className="w-full"
        >
          {t('register.steps.emailOverlay.button')}
        </Button>
      </div>
    </BottomSheet>
  );
}
