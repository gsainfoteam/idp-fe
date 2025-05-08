import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useEmailOverlayForm } from '../../hooks/steps/use-email-overlay-form';
import { RegisterSteps } from '../register-frame';

import { Button, Modal } from '@/features/core';
import { BottomSheet } from '@/features/core';

function Inner() {
  return (
    <div className="flex flex-col gap-2">
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
  context: RegisterSteps['emailOverlay'];
  onNext: () => void;
  close: () => void;
}) {
  const { form, onSubmit } = useEmailOverlayForm({ context, onNext });
  const { t } = useTranslation();
  const [open, setOpen] = useState(true);
  const [isPC, setIsPC] = useState(window.innerWidth > 768);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');

    const handleResize = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsPC(e.matches);
    };

    // 초기 상태 설정
    handleResize(mediaQuery);

    // 이벤트 리스너 등록
    mediaQuery.addEventListener('change', handleResize);

    // 클린업
    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, []);

  return isPC ? (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      title={t('register.steps.emailOverlay.title')}
      button={
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={close}>
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
      }
    >
      <Inner />
    </Modal>
  ) : (
    <BottomSheet
      className="fixed right-0 bottom-0 left-0 mx-3 mb-3"
      open={open}
      onClose={() => setOpen(false)}
      title={t('register.steps.emailOverlay.title')}
      button={
        <div className="flex w-full gap-3">
          <Button
            variant="secondary"
            onClick={close}
            className="grow basis-1/3"
          >
            {t('register.steps.emailOverlay.sub_button')}
          </Button>
          <Button
            variant="primary"
            onClick={onSubmit}
            loading={form.formState.isSubmitting}
            className="grow basis-2/3"
          >
            {t('register.steps.emailOverlay.button')}
          </Button>
        </div>
      }
    >
      <Inner />
    </BottomSheet>
  );
}
