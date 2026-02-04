import { zodResolver } from '@hookform/resolvers/zod';
import { type TFunction } from 'i18next';
import parsePhoneNumber, { isValidPhoneNumber } from 'libphonenumber-js';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { type RegisterSteps } from '../../frames/register-frame';

import { postVerifyPhoneNumber } from '@/data/verify';
import { type DifferenceNonNullable, Log } from '@/features/core';

const createSchema = (t: TFunction) =>
  z.object({
    phoneNumber: z
      .string()
      .min(1, t('register.steps.tel.inputs.phone_number.errors.format'))
      .refine(
        (value) => isValidPhoneNumber(value),
        t('register.steps.tel.inputs.phone_number.errors.format'),
      ),
  });

export const useTelForm = ({
  onNext,
}: {
  onNext: (
    data: DifferenceNonNullable<RegisterSteps['telCode'], RegisterSteps['tel']>,
  ) => void;
}) => {
  const { t } = useTranslation();
  const form = useForm({
    resolver: zodResolver(createSchema(t)),
    mode: 'onChange',
  });

  const onSubmit = form.handleSubmit(async (formData) => {
    const tel = parsePhoneNumber(formData.phoneNumber);

    if (!tel) {
      form.setError('phoneNumber', {
        message: t('register.steps.tel.inputs.phone_number.errors.format'),
      });
      return;
    }

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

    Log.submit('auth_register_tel');
    onNext({
      phoneNumber: tel.formatInternational(),
    });
  });

  return { form, onSubmit };
};
