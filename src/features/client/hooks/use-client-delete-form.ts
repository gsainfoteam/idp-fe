import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { postClientDelete } from '@/data/post-client-delete';

import { Client } from './use-client';

export const useClientDeleteForm = () => {
  const { t } = useTranslation();

  const onSubmit = async (client: Client) => {
    const { status } = await postClientDelete(client.clientId);

    if (status) {
      switch (status) {
        case 'INVALID_TOKEN':
          toast.error(t('toast.invalid_token'));
          break;
        case 'INACCESSIBLE':
          toast.error(t('toast.invalid_token'));
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
};
