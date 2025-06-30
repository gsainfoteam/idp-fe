import { Button, Dialog } from '@/features/core';
import { useTranslation } from 'react-i18next';

export function RegisterStepUndoWarningOverlay({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: (_: boolean) => void;
}) {
  const { t } = useTranslation();

  return (
    <Dialog isOpen={isOpen} close={() => close(false)} className="mx-10 w-auto">
      <Dialog.Header>{t('common.undo_overlay.title')}</Dialog.Header>
      <Dialog.Body>{t('common.undo_overlay.content')}</Dialog.Body>
      <Dialog.Footer>
        <Dialog.Close>
          <Button variant="secondary" className="w-full">
            {t('common.undo_overlay.sub_button')}
          </Button>
        </Dialog.Close>
        <Button
          variant="primary"
          onClick={() => close(true)}
          className="w-full"
        >
          {t('common.undo_overlay.button')}
        </Button>
      </Dialog.Footer>
    </Dialog>
  );
}
