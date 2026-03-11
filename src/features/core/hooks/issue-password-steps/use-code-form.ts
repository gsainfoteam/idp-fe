import { zodResolver } from '@hookform/resolvers/zod';
import { type TFunction } from 'i18next';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { type IssuePasswordSteps } from '../../frames/issue-password-frame';

import { postUserPassword } from '@/data/user';
import { postVerify, postVerifyEmail } from '@/data/verify';
import { type DifferenceNonNullable, Log, useLoading } from '@/features/core';
import { useVerificationCodeTimer } from '@/features/core';

const createSchema = (t: TFunction) =>
  z.object({
    code: z
      .string()
      .regex(
        /^\d{6}$/,
        t('issue_password.steps.code.inputs.code.errors.format'),
      ),
  });

export const useCodeForm = ({
  context,
  onNext,
}: {
  context: IssuePasswordSteps['code'];
  onNext: (
    data: DifferenceNonNullable<
      IssuePasswordSteps['complete'],
      IssuePasswordSteps['code']
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
        message: t('issue_password.steps.code.inputs.code.errors.expired'),
        type: 'value',
      });
    },
    onMaxCountReached: () => {
      form.setError('code', {
        message: t('issue_password.steps.code.inputs.code.errors.max_try'),
        type: 'value',
      });
    },
    onInvalidCode: (currentCount, maxCount) => {
      form.setError('code', {
        message: t('issue_password.steps.code.inputs.code.errors.invalid', {
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

    const verifyRes = await postVerify({
      subject: context.email,
      code: formData.code,
      hint: 'email',
    });

    if (!verifyRes.ok) {
      if (verifyRes.status === 400) {
        handleInvalidCode(tryCount);
      } else if (verifyRes.status === 500) {
        toast.error(t('toast.server_error'));
      } else {
        toast.error(t('toast.unknown_error'));
      }

      return;
    }

    Log.submit('issue_password_code');

    const emailVerificationJwtToken = verifyRes.data.verificationJwtToken;
    const passwordRes = await postUserPassword({
      email: context.email,
      emailVerificationJwtToken,
    });

    if (!passwordRes.ok) {
      if (passwordRes.status === 400) {
        toast.error(t('toast.invalid_body'));
      } else if (passwordRes.status === 403) {
        // impossible case
      } else if (passwordRes.status === 500) {
        toast.error(t('toast.server_error'));
      } else {
        toast.error(t('toast.unknown_error'));
      }

      return;
    }

    onNext({ emailVerificationJwtToken });
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
