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

  // impossible
  if (!user) throw new Error('User not found');

  const phoneNumber = parsePhoneNumber(user.phoneNumber, 'KR');

  // impossible
  if (phoneNumber == null) {
    throw new Error('Invalid phone number');
  }

  const form = useForm({
    resolver: zodResolver(createSchema(t)),
    mode: 'onChange',
    defaultValues: {
      phoneNumber: phoneNumber.formatNational(),
    },
  });

  const onSubmit = form.handleSubmit(async (formData) => {
    const tel = parsePhoneNumber(formData.phoneNumber, 'KR');
    if (tel?.country != 'KR') {
      onFailure({});
      return;
    }

    const res = await postVerifyPhoneNumber({
      phoneNumber: tel.formatNational(),
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
      phoneNumber: tel.formatNational(),
    });
  });

  return { form, onSubmit };
}
