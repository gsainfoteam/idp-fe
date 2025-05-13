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
    <Modal open={open} onClose={() => setOpen(false)} className="mx-10 w-auto">
      <div className="text-title-2 w-full text-pretty whitespace-pre-wrap text-neutral-950">
        {t('register.warnings.undo.title')}
      </div>
      <div className="text-body-2 mt-2 w-full text-neutral-400">
        {t('register.warnings.undo.content')}
      </div>
      <div className="mt-6 flex w-full justify-end gap-3">
        <Button
          variant="secondary"
          onClick={() => {
            setOpen(false);
            close();
          }}
          className="w-full"
        >
          {t('register.warnings.undo.cancel')}
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            setOpen(false);
            onNext();
          }}
          className="w-full"
        >
          {t('register.warnings.undo.button')}
        </Button>
      </div>
    </Modal>
  );
}
