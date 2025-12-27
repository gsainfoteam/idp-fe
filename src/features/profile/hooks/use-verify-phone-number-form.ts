import { zodResolver } from '@hookform/resolvers/zod';
import { type TFunction } from 'i18next';
import parsePhoneNumber, { isValidPhoneNumber } from 'libphonenumber-js';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import z from 'zod';

import { type VerifyPhoneNumberSteps } from '../frames/verify-phone-number-frame';

import { postVerifyPhoneNumber } from '@/data/verify';
import { useAuth } from '@/features/auth';
import { type DifferenceNonNullable, Log } from '@/features/core';

const createSchema = (t: TFunction) =>
  z.object({
    phoneNumber: z
      .string()
      .refine(
        (value) => isValidPhoneNumber(value, 'KR'),
        t('verify_phone_number.steps.tel.inputs.phone_number.errors.format'),
      ),
  });

export function useVerifyPhoneNumberForm({
  onSuccess,
  onFailure,
}: {
  onSuccess: (
    data: DifferenceNonNullable<
      VerifyPhoneNumberSteps['code'],
      VerifyPhoneNumberSteps['tel']
    >,
  ) => void;
  onFailure: (
    data: DifferenceNonNullable<
      VerifyPhoneNumberSteps['failure'],
      VerifyPhoneNumberSteps['tel']
    >,
  ) => void;
}) {
  const { t } = useTranslation();
  const { user } = useAuth();

  const phoneNumber = user ? parsePhoneNumber(user.phoneNumber, 'KR') : null;

  const form = useForm({
    resolver: zodResolver(createSchema(t)),
    mode: 'onChange',
    defaultValues: {
      phoneNumber: phoneNumber?.formatInternational() ?? '',
    },
  });

  const onSubmit = form.handleSubmit(async (formData) => {
    // Return early if user is not loaded yet
    if (!user) {
      return;
    }

    const tel = parsePhoneNumber(formData.phoneNumber, 'KR');
    if (tel?.country !== 'KR') {
      onFailure({});
      return;
    }

    // country가 KR이면 인증 코드 발송 후 code로
    const res = await postVerifyPhoneNumber({
      phoneNumber: tel.formatInternational(),
    });

    if (!res.ok) {
      if (res.status === 500) {
        toast.error(t('toast.server_error'));
      } else {
        toast.error(t('toast.unknown_error'));
      }

      return;
    }

    Log.submit('phone_number_verify');
    onSuccess({
      phoneNumber: tel.formatInternational(),
    });
  });

  return { form, onSubmit };
}
