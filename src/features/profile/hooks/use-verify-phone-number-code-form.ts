import { zodResolver } from '@hookform/resolvers/zod';
import { type TFunction } from 'i18next';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import z from 'zod';

import { type VerifyPhoneNumberSteps } from '../frames/verify-phone-number-frame';
import { CODE_MAX_COUNT } from '../frames/verify-phone-number-steps/code-step';

import { postUserVerifyPhoneNumber } from '@/data/user';
import { useAuth } from '@/features/auth';
import { type DifferenceNonNullable, Log } from '@/features/core';

const createSchema = (t: TFunction) =>
  z.object({
    code: z
      .string()
      .regex(
        /^\d{6}$/,
        t('verify_phone_number.steps.code.inputs.code.errors.format'),
      ),
  });

export function useVerifyPhoneNumberCodeForm({
  context,
  onNext,
  count,
}: {
  context: VerifyPhoneNumberSteps['code'];
  onNext: (
    data: DifferenceNonNullable<
      VerifyPhoneNumberSteps['success'],
      VerifyPhoneNumberSteps['code']
    >,
  ) => void;
  count: number;
}) {
  const { t } = useTranslation();
  const form = useForm({
    resolver: zodResolver(createSchema(t)),
    mode: 'onChange',
  });
  const { user } = useAuth();

  if (!user) throw new Error('User not found');

  const onSubmit = form.handleSubmit(async (formData) => {
    const res = await postUserVerifyPhoneNumber({
      phoneNumber: context.phoneNumber,
      code: formData.code,
    });

    if (!res.ok) {
      if (res.status === 404) {
        if (count < CODE_MAX_COUNT) {
          form.setError('code', {
            message: t(
              'verify_phone_number.steps.code.inputs.code.errors.invalid',
              {
                count: count + 1,
                max: CODE_MAX_COUNT,
              },
            ),
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

    Log.submit('phone_number_verify_code');
    onNext({
      code: formData.code,
    });
  });

  return { form, onSubmit };
}
