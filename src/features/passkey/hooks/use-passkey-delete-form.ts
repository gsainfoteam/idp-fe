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
          return false;
        case 'INVALID_USER':
          toast.error(t('toast.invalid_user'));
          return false;
        case 'INVALID_ID':
          toast.error(t('passkey.steps.list.errors.passkey_not_found'));
          return false;
        case 'SERVER_ERROR':
          toast.error(t('toast.server_error'));
          return false;
        case 'UNKNOWN_ERROR':
          toast.error(t('toast.unknown_error'));
          return false;
      }
    }

    return true;
  };

  return { onSubmit };
}
