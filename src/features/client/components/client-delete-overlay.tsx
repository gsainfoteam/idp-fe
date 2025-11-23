import { useTranslation } from 'react-i18next';

import { Button, Dialog, LogClick } from '@/features/core';

import { Client } from '../hooks/use-client';
import { useClientDeleteForm } from '../hooks/use-client-delete-form';

export function ClientDeleteOverlay({
  client,
  isOpen,
  close,
}: {
  client: Client;
  isOpen: boolean;
  close: (_: boolean) => void;
}) {
  const { t } = useTranslation();
  const { onSubmit } = useClientDeleteForm(client);

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
        <LogClick
          event="client_delete_button"
          properties={{ clientId: client.clientId }}
        >
          <Button
            variant="primary"
            className="w-full"
            onClick={async () => {
              if (await onSubmit()) close(true);
            }}
          >
            {t('services.detail.delete.dialog.confirm')}
          </Button>
        </LogClick>
      </Dialog.Footer>
    </Dialog>
  );
}
