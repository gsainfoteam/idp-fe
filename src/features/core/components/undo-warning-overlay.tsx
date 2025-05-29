import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Modal } from '@/features/core';

export function UndoWarningStep({
  onNext,
  close,
}: {
  onNext: () => void;
  close: () => void;
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(true);

  return (
    <Modal
      isOpen={open}
      close={() => {
        setOpen(false);
        close();
      }}
      className="mx-10 w-auto"
    >
      <Modal.Header>{t('common.undo_overlay.title')}</Modal.Header>
      <Modal.Body>{t('common.undo_overlay.content')}</Modal.Body>
      <Modal.Footer>
        <Modal.Close>
          <Button variant="secondary" className="w-full">
            {t('common.undo_overlay.sub_button')}
          </Button>
        </Modal.Close>
        <Button
          variant="primary"
          onClick={() => {
            setOpen(false);
            onNext();
          }}
          className="w-full"
        >
          {t('common.undo_overlay.button')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
