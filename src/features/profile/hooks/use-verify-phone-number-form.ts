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
  onNext,
}: {
  onNext: (
    data: DifferenceNonNullable<
      VerifyPhoneNumberSteps['code'],
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
    if (!user) {
      return;
    }

    // zod에서 검증됨
    const tel = parsePhoneNumber(formData.phoneNumber, 'KR')!;

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
    onNext({
      phoneNumber: tel.formatInternational(),
    });
  });

  return { form, onSubmit };
}
