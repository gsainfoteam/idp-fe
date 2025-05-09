import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { RegisterSteps } from '../../frames/register-frame';

import { postVerifyEmail } from '@/data/post-verify-email';
import { DifferenceNonNullable } from '@/features/core';

// TODO: 인증번호 5번 제한 구현 + 5번 틀리면 맞아도 못들어가게

export const useEmailOverlayForm = ({
  context,
  onNext,
}: {
  context: RegisterSteps['emailOverlay'];
  onNext: (
    data: DifferenceNonNullable<
      RegisterSteps['code'],
      RegisterSteps['emailOverlay']
    >,
  ) => void;
}) => {
  const { t } = useTranslation();
  const form = useForm({
    resolver: zodResolver(z.object({})),
  });

  const onSubmit = form.handleSubmit(async () => {
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

    onNext({ emailAgree: true });
  });

  return { form, onSubmit };
};
