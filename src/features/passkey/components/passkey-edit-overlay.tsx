import { useTranslation } from 'react-i18next';

import { Button, Input, Modal } from '@/features/core';

import { usePasskeyEditForm } from '../hooks/use-passkey-edit-form';
import { Passkey } from '../hooks/use-passkey-list';

export function PasskeyEditOverlay({
  passkey,
  isOpen,
  close,
}: {
  passkey: Passkey;
  isOpen: boolean;
  close: (_: boolean) => void;
}) {
  const { t } = useTranslation();
  const {
    form: { formState, register },
    onSubmit,
  } = usePasskeyEditForm(passkey);

  return (
    <Modal isOpen={isOpen} close={() => close(false)}>
      <Modal.Header>{t('passkey.steps.list.edit_overlay.title')}</Modal.Header>
      <Modal.Body>
        <Input
          error={formState.errors.name?.message}
          disabled={formState.isSubmitting}
          type="text"
          placeholder={t('passkey.steps.list.edit_overlay.placeholder')}
          {...register('name')}
        />
      </Modal.Body>
      <Modal.Footer>
        <Modal.Close className="w-full">
          <Button
            variant="secondary"
            className="w-full"
            disabled={formState.isSubmitting}
          >
            {t('passkey.steps.list.edit_overlay.cancel')}
          </Button>
        </Modal.Close>
        <Button
          variant="primary"
          className="w-full"
          disabled={!formState.isValid || formState.isSubmitting}
          onClick={async () => {
            if (await onSubmit()) close(true);
          }}
        >
          {t('passkey.steps.list.edit_overlay.apply')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
