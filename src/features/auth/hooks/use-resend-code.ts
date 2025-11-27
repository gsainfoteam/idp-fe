import { useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { type RegisterSteps } from '../frames/register-frame';

import { postVerifyEmail } from '@/data/verify';

export const useResendCode = ({
  context,
  resetTimer,
}: {
  context: RegisterSteps['code'];
  resetTimer: () => void;
}) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const onResetTimer = async () => {
    setIsLoading(true);
    const res = await postVerifyEmail(context);

    if (!res.ok) {
      if (res.status === 500) {
        toast.error(t('toast.server_error'));
      } else {
        toast.error(t('toast.unknown_error'));
      }

      setIsLoading(false);
      return;
    }

    resetTimer();
    setIsLoading(false);
  };

  return { onResetTimer, isLoading };
};
