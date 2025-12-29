import { zodResolver } from '@hookform/resolvers/zod';
import { type TFunction } from 'i18next';
import parsePhoneNumber from 'libphonenumber-js';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { type RegisterSteps } from '../../frames/register-frame';
import { useVerificationCodeTimer } from '../use-verification-code-timer';

import { postVerify, postVerifyPhoneNumber } from '@/data/verify';
import { type DifferenceNonNullable, Log, useLoading } from '@/features/core';

const createSchema = (t: TFunction) =>
  z.object({
    code: z
      .string()
      .regex(/^\d{6}$/, t('register.steps.tel_code.inputs.code.errors.format')),
  });

export const useTelCodeForm = ({
  context,
  onNext,
}: {
  context: RegisterSteps['telCode'];
  onNext: (
    data: DifferenceNonNullable<
      RegisterSteps['password'],
      RegisterSteps['telCode']
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
    incrementCount,
    handleInvalidCode,
    resetTimer,
    isExpired,
    isMaxCountReached,
  } = useVerificationCodeTimer({
    initialSec: 300,
    maxTryCount: 5,
    onExpired: () => {
      form.setError('code', {
        message: t('register.steps.tel_code.inputs.code.errors.expired'),
        type: 'value',
      });
    },
    onMaxCountReached: () => {
      form.setError('code', {
        message: t('register.steps.tel_code.inputs.code.errors.max_try'),
        type: 'value',
      });
    },
    onInvalidCode: (currentCount, maxCount) => {
      form.setError('code', {
        message: t('register.steps.tel_code.inputs.code.errors.invalid', {
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

  const onSubmit = form.handleSubmit(async (formData) => {
    // use-tel-form.ts에서 검증한(파싱 가능하고, KR) 전화번호를 사용
    const tel = parsePhoneNumber(context.phoneNumber, 'KR')!;

    const res = await postVerify({
      subject: tel.formatInternational(),
      code: formData.code,
      hint: 'phoneNumber',
    });

    if (!res.ok) {
      if (res.status === 400) {
        handleInvalidCode();
      } else if (res.status === 500) {
        toast.error(t('toast.server_error'));
      } else {
        toast.error(t('toast.unknown_error'));
      }

      return;
    }

    Log.submit('auth_register_tel_code');
    onNext({ phoneNumberVerificationJwtToken: res.data.verificationJwtToken });
  });

  return {
    form,
    onSubmit,
    remainSec,
    tryCount,
    incrementCount,
    resetTimer,
    onResendCode,
    isResending,
    isExpired,
    isMaxCountReached,
  };
};
