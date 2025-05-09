import { useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { RegisterSteps } from '../frames/register-frame';

import { postVerifyEmail } from '@/data/post-verify-email';

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
    const { status } = await postVerifyEmail(context);

    if (status) {
      switch (status) {
        case 'SERVER_ERROR':
          toast.error(t('toast.server_error'));
          break;
        case 'UNKNOWN_ERROR':
          toast.error(t('toast.unknown_error'));
          break;
      }

      return;
    }

    resetTimer();
    setIsLoading(false);
  };

  return { onResetTimer, isLoading };
};
