import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useEmailOverlayForm } from '../../hooks/steps/use-email-overlay-form';
import { RegisterSteps } from '../register-frame';

import { Button } from '@/features/core';
import { BottomSheet } from '@/features/core';

// TODO: pc에서는 모달로

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

  return (
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
    </BottomSheet>
  );
}
