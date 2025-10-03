import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { deleteUserPasskey } from '@/data/delete-user-passkey';

import { Passkey } from './use-passkey-list';

export function usePasskeyDeleteForm(passkey: Passkey) {
  const { t } = useTranslation();

  const onSubmit = async () => {
    const { status } = await deleteUserPasskey(passkey.id);

    if (status) {
      switch (status) {
        case 'INVALID_TOKEN':
          toast.error(t('toast.invalid_token'));
          break;
        case 'INVALID_USER':
          toast.error(t('toast.invalid_user'));
          break;
        case 'INVALID_ID':
          toast.error(t('passkey.steps.list.errors.passkey_not_found'));
          break;
        case 'SERVER_ERROR':
          toast.error(t('toast.server_error'));
          break;
        case 'UNKNOWN_ERROR':
          toast.error(t('toast.unknown_error'));
          break;
      }
    }
  };

  return { onSubmit };
}
