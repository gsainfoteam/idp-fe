import { zodResolver } from '@hookform/resolvers/zod';
import { type TFunction } from 'i18next';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { type RegisterSteps } from '../../frames/register-frame';
import { useVerificationCodeTimer } from '../use-verification-code-timer';

import { postVerify, postVerifyEmail } from '@/data/verify';
import { type DifferenceNonNullable, Log, useLoading } from '@/features/core';

const createSchema = (t: TFunction) =>
  z.object({
    code: z
      .string()
      .regex(
        /^\d{6}$/,
        t('register.steps.email_code.inputs.code.errors.format'),
      ),
  });

export const useEmailCodeForm = ({
  context,
  onNext,
}: {
  context: RegisterSteps['emailCode'];
  onNext: (
    data: DifferenceNonNullable<
      RegisterSteps['tel'],
      RegisterSteps['emailCode']
    >,
  ) => void;
}) => {
  const { t } = useTranslation();
  const form = useForm({
    resolver: zodResolver(createSchema(t)),
    mode: 'onChange',
  });

  const [isResending, startResendLoading] = useLoading();

  const {
    remainSec,
    tryCount,
    incrementTryCount,
    handleInvalidCode,
    resetTimer,
    isExpired,
    isMaxCountReached,
  } = useVerificationCodeTimer({
    initialSec: 300,
    maxTryCount: 5,
    onExpired: () => {
      form.setError('code', {
        message: t('register.steps.email_code.inputs.code.errors.expired'),
        type: 'value',
      });
    },
    onMaxCountReached: () => {
      form.setError('code', {
        message: t('register.steps.email_code.inputs.code.errors.max_try'),
        type: 'value',
      });
    },
    onInvalidCode: (currentCount, maxCount) => {
      form.setError('code', {
        message: t('register.steps.email_code.inputs.code.errors.invalid', {
          count: currentCount + 1,
          max: maxCount,
        }),
        type: 'value',
      });
    },
    onReset: () => {
      form.clearErrors();
    },
  });

  const onResendCode = async () => {
    await startResendLoading(async () => {
      const res = await postVerifyEmail(context);

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

  const onSubmit = form.handleSubmit(async (formData) => {
    incrementTryCount();

    const res = await postVerify({
      subject: context.email,
      code: formData.code,
      hint: 'email',
    });

    if (!res.ok) {
      if (res.status === 400) {
        handleInvalidCode(tryCount);
      } else if (res.status === 500) {
        toast.error(t('toast.server_error'));
      } else {
        toast.error(t('toast.unknown_error'));
      }

      return;
    }

    Log.submit('auth_register_email_code');
    onNext({ emailVerificationJwtToken: res.data.verificationJwtToken });
  });

  return {
    form,
    onSubmit,
    remainSec,
    tryCount,
    resetTimer,
    onResendCode,
    isResending,
    isExpired,
    isMaxCountReached,
  };
};
