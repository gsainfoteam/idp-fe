import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { type VerifyPhoneNumberSteps } from '../frames/verify-phone-number-frame';

import { postVerifyPhoneNumber } from '@/data/verify';
import { useLoading } from '@/features/core';

export const useResendPhoneNumberCode = ({
  context,
  resetTimer,
}: {
  context: VerifyPhoneNumberSteps['code'];
  resetTimer: () => void;
}) => {
  const { t } = useTranslation();
  const [isLoading, startLoading] = useLoading();

  const onResetTimer = async () => {
    await startLoading(async () => {
      const res = await postVerifyPhoneNumber({
        phoneNumber: context.phoneNumber,
      });

      if (!res.ok) {
        if (res.status === 500) {
          toast.error(t('toast.server_error'));
        } else {
          toast.error(t('toast.unknown_error'));
        }

        return;
      }

      resetTimer();
    });
  };

  return { onResetTimer, isLoading };
};
