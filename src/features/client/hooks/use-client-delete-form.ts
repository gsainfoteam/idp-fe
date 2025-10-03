import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { postClientDelete } from '@/data/post-client-delete';

import { Client } from './use-client';

export const useClientDeleteForm = (client: Client) => {
  const { t } = useTranslation();

  const onSubmit = async () => {
    const { status } = await postClientDelete(client.clientId);

    if (status) {
      switch (status) {
        case 'INVALID_TOKEN':
          toast.error(t('toast.invalid_token'));
          return false;
        case 'INACCESSIBLE':
          toast.error(t('toast.invalid_token'));
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
};
