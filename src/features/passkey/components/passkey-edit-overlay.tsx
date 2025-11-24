import { useTranslation } from 'react-i18next';

import { Button, Input, LogModal } from '@/features/core';

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
    <LogModal
      isOpen={isOpen}
      close={close}
      defaultCloseValue={false}
      event="passkey_edit_modal"
      closeProperties={(value) => ({ result: value ? 'confirm' : 'cancel' })}
    >
      <LogModal.Header>
        {t('passkey.steps.list.edit_overlay.title')}
      </LogModal.Header>
      <LogModal.Body>
        <Input
          error={formState.errors.name?.message}
          disabled={formState.isSubmitting}
          type="text"
          placeholder={t('passkey.steps.list.edit_overlay.placeholder')}
          {...register('name')}
        />
      </LogModal.Body>
      <LogModal.Footer>
        <LogModal.Close closeValue={false} className="w-full">
          <Button
            variant="secondary"
            className="w-full"
            disabled={formState.isSubmitting}
          >
            {t('passkey.steps.list.edit_overlay.cancel')}
          </Button>
        </LogModal.Close>
        <LogModal.Close closeValue={true}>
          <Button
            variant="primary"
            className="w-full"
            disabled={!formState.isValid || formState.isSubmitting}
            onClick={async () => {
              if (await onSubmit()) {
                // onSubmit 성공 시 close는 LogModal.Close에서 자동으로 처리됨
              }
            }}
          >
            {t('passkey.steps.list.edit_overlay.apply')}
          </Button>
        </LogModal.Close>
      </LogModal.Footer>
    </LogModal>
  );
}
