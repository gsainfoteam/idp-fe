import { useTranslation } from 'react-i18next';

import { Button, LogDialog } from '@/features/core';

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
      <LogDialog.Header>
        {t('register.steps.undo_overlay.title')}
      </LogDialog.Header>
      <LogDialog.Body>
        {t('register.steps.undo_overlay.content')}
      </LogDialog.Body>
      <LogDialog.Footer>
        <LogDialog.Close closeValue={false} className="grow">
          <Button variant="secondary" className="w-full">
            {t('register.steps.undo_overlay.sub_button')}
          </Button>
        </LogDialog.Close>
        <LogDialog.Close closeValue={true} className="grow">
          <Button variant="primary">
            {t('register.steps.undo_overlay.button')}
          </Button>
        </LogDialog.Close>
      </LogDialog.Footer>
    </LogDialog>
  );
}
