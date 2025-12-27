import { zodResolver } from '@hookform/resolvers/zod';
import { type TFunction } from 'i18next';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { type RegisterSteps } from '../../frames/register-frame';
import { CODE_MAX_COUNT } from '../../frames/register-steps/email-code-step';

import { postVerify } from '@/data/verify';
import { type DifferenceNonNullable, Log } from '@/features/core';

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
  count,
}: {
  context: RegisterSteps['emailCode'];
  onNext: (
    data: DifferenceNonNullable<
      RegisterSteps['tel'],
      RegisterSteps['emailCode']
    >,
  ) => void;
  count: number;
}) => {
  const { t } = useTranslation();
  const form = useForm({
    resolver: zodResolver(createSchema(t)),
    mode: 'onChange',
  });

  const onSubmit = form.handleSubmit(async (formData) => {
    const res = await postVerify({
      subject: context.email,
      code: formData.code,
      hint: 'email',
    });

    if (!res.ok) {
      if (res.status === 400) {
        if (count < CODE_MAX_COUNT) {
          form.setError('code', {
            message: t('register.steps.email_code.inputs.code.errors.invalid', {
              count: count + 1,
              max: CODE_MAX_COUNT,
            }),
            type: 'value',
          });
        }
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

  return { form, onSubmit };
};
