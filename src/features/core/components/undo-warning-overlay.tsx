import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Dialog } from '@/features/core';

export function UndoWarningOverlay({
  onNext,
  close,
}: {
  onNext: () => void;
  close: () => void;
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(true);

  return (
    <Dialog
      isOpen={open}
      close={() => {
        setOpen(false);
        close();
      }}
    >
      <Dialog.Header>{t('common.undo_overlay.title')}</Dialog.Header>
      <Dialog.Body>{t('common.undo_overlay.content')}</Dialog.Body>
      <Dialog.Footer>
        <Dialog.Close className="grow">
          <Button variant="secondary" className="w-full">
            {t('common.undo_overlay.sub_button')}
          </Button>
        </Dialog.Close>
        <Button
          variant="primary"
          onClick={() => {
            setOpen(false);
            onNext();
          }}
          className="grow"
        >
          {t('common.undo_overlay.button')}
        </Button>
      </Dialog.Footer>
    </Dialog>
  );
}
