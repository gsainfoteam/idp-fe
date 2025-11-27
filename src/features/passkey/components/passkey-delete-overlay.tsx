import { useTranslation } from 'react-i18next';

import { usePasskeyDeleteForm } from '../hooks/use-passkey-delete-form';
import { type Passkey } from '../hooks/use-passkey-list';

import { Button, Dialog, LogClick, LogDialog } from '@/features/core';

export function PasskeyDeleteOverlay({
  passkey,
  isOpen,
  close,
}: {
  passkey: Passkey;
  isOpen: boolean;
  close: (_: boolean) => void;
}) {
  const { t } = useTranslation();
  const { onSubmit } = usePasskeyDeleteForm(passkey);

  return (
    <LogDialog
      isOpen={isOpen}
      close={close}
      defaultCloseValue={false}
      className="mx-10 min-w-75"
      event="delete_confirmation"
      openProperties={{ resource: 'passkey' }}
      closeProperties={(value) => ({
        resource: 'passkey',
        result: value ? 'confirm' : 'cancel',
      })}
    >
      <Dialog.Header>
        {t('passkey.steps.list.remove_overlay.title')}
      </Dialog.Header>
      <Dialog.Body>
        {t('passkey.steps.list.remove_overlay.description')}
      </Dialog.Body>
      <Dialog.Footer>
        <Dialog.Close className="grow" closeValue={false}>
          <Button variant="secondary" className="w-full">
            {t('passkey.steps.list.remove_overlay.cancel')}
          </Button>
        </Dialog.Close>
        <Dialog.Close className="grow" closeValue={true}>
          <LogClick
            event="passkey_delete_button"
            properties={{ passkeyId: passkey.id }}
          >
            <Button variant="primary" className="w-full" onClick={onSubmit}>
              {t('passkey.steps.list.remove_overlay.confirm')}
            </Button>
          </LogClick>
        </Dialog.Close>
      </Dialog.Footer>
    </LogDialog>
  );
}
