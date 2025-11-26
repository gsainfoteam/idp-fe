import { useTranslation } from 'react-i18next';

import { Button, Dialog, LogClick, LogDialog } from '@/features/core';

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
    <LogDialog
      isOpen={isOpen}
      close={close}
      defaultCloseValue={false}
      className="mx-10 min-w-75"
      event="delete_confirmation"
      openProperties={{ resource: 'client' }}
      closeProperties={(value) => ({
        resource: 'client',
        result: value ? 'confirm' : 'cancel',
      })}
    >
      <Dialog.Header>{t('services.detail.delete.dialog.header')}</Dialog.Header>
      <Dialog.Body>{t('services.detail.delete.dialog.body')}</Dialog.Body>
      <Dialog.Footer>
        <Dialog.Close closeValue={false} className="grow">
          <Button variant="secondary" className="w-full">
            {t('services.detail.delete.dialog.cancel')}
          </Button>
        </Dialog.Close>
        <Dialog.Close closeValue={true} className="grow">
          <LogClick
            event="client_delete_button"
            properties={{ clientId: client.clientId }}
          >
            <Button variant="primary" className="w-full" onClick={onSubmit}>
              {t('services.detail.delete.dialog.confirm')}
            </Button>
          </LogClick>
        </Dialog.Close>
      </Dialog.Footer>
    </LogDialog>
  );
}
