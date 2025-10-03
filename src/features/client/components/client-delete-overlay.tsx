import { useTranslation } from 'react-i18next';

import { Button, Dialog } from '@/features/core';
import { overlay } from 'overlay-kit';

export function ClientDeleteOverlay({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: (_: boolean) => void;
}) {
  const { t } = useTranslation();

  return (
    <Dialog
      isOpen={isOpen}
      close={() => close(false)}
      className="mx-10 min-w-75"
    >
      <Dialog.Header>{t('services.detail.delete.dialog.header')}</Dialog.Header>
      <Dialog.Body>{t('services.detail.delete.dialog.body')}</Dialog.Body>
      <Dialog.Footer>
        <Dialog.Close className="w-full">
          <Button variant="secondary" className="w-full">
            {t('services.detail.delete.dialog.cancel')}
          </Button>
        </Dialog.Close>
        <Button
          variant="primary"
          className="w-full"
          onClick={() => close(true)}
        >
          {t('services.detail.delete.dialog.confirm')}
        </Button>
      </Dialog.Footer>
    </Dialog>
  );
}

export function onTrigger(onSubmit: () => Promise<void>) {
  return async () => {
    const result = await overlay.openAsync<boolean>(({ isOpen, close }) => (
      <ClientDeleteOverlay isOpen={isOpen} close={close} />
    ));

    if (result) {
      await onSubmit();
    }
  };
}
