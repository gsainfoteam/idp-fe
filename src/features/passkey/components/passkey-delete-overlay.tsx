import { useTranslation } from 'react-i18next';

import { Button, Dialog } from '@/features/core';

import { usePasskeyDeleteForm } from '../hooks/use-passkey-delete-form';
import { Passkey } from '../hooks/use-passkey-list';

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
    <Dialog
      isOpen={isOpen}
      close={() => close(false)}
      className="mx-10 min-w-75"
    >
      <Dialog.Header>
        {t('passkey.steps.list.remove_overlay.title')}
      </Dialog.Header>
      <Dialog.Body>
        {t('passkey.steps.list.remove_overlay.description')}
      </Dialog.Body>
      <Dialog.Footer>
        <Dialog.Close className="w-full">
          <Button variant="secondary" className="w-full">
            {t('passkey.steps.list.remove_overlay.cancel')}
          </Button>
        </Dialog.Close>
        <Button
          variant="primary"
          className="w-full"
          onClick={async () => {
            if (await onSubmit()) close(true);
          }}
        >
          {t('passkey.steps.list.remove_overlay.confirm')}
        </Button>
      </Dialog.Footer>
    </Dialog>
  );
}
