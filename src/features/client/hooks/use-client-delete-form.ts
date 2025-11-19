import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { postClientDelete } from '@/data/client';

import { Client } from './use-client';

export const useClientDeleteForm = (client: Client) => {
  const { t } = useTranslation();

  const onSubmit = async () => {
    const res = await postClientDelete({ clientId: client.clientId });

    if (!res.ok) {
      if (res.status === 401) {
        toast.error(t('toast.invalid_token'));
      } else if (res.status === 403) {
        toast.error(t('toast.invalid_token'));
      } else if (res.status === 500) {
        toast.error(t('toast.server_error'));
      } else {
        toast.error(t('toast.unknown_error'));
      }

      return false;
    }

    return true;
  };

  return { onSubmit };
};
