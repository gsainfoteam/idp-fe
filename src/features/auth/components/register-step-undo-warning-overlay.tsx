import { useTranslation } from 'react-i18next';

import { Button, Dialog, LogDialog } from '@/features/core';

export function RegisterStepUndoWarningOverlay({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: (_: boolean) => void;
}) {
  const { t } = useTranslation();

  return (
    <LogDialog
      isOpen={isOpen}
      close={close}
      defaultCloseValue={false}
      className="mx-10 w-auto"
      event="register_undo_warning_dialog"
      closeProperties={(value) => ({ result: value ? 'confirm' : 'cancel' })}
    >
      <Dialog.Header>{t('register.steps.undo_overlay.title')}</Dialog.Header>
      <Dialog.Body>{t('register.steps.undo_overlay.content')}</Dialog.Body>
      <Dialog.Footer>
        <Dialog.Close closeValue={false} className="grow">
          <Button variant="secondary" className="w-full">
            {t('register.steps.undo_overlay.sub_button')}
          </Button>
        </Dialog.Close>
        <Dialog.Close closeValue={true} className="grow">
          <Button variant="primary" className="w-full">
            {t('register.steps.undo_overlay.button')}
          </Button>
        </Dialog.Close>
      </Dialog.Footer>
    </LogDialog>
  );
}
