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
        (value) => isValidPhoneNumber(value, 'KR'),
        t('register.steps.tel.inputs.phone_number.errors.format'),
      ),
  });

export const useTelForm = ({
  onTelCodeNext,
  onTelSkipNext,
}: {
  onTelCodeNext: (
    data: DifferenceNonNullable<RegisterSteps['telCode'], RegisterSteps['tel']>,
  ) => void;
  onTelSkipNext: (
    data: DifferenceNonNullable<RegisterSteps['telSkip'], RegisterSteps['tel']>,
  ) => void;
}) => {
  const { t } = useTranslation();
  const form = useForm({
    resolver: zodResolver(createSchema(t)),
    mode: 'onChange',
  });

  const onSubmit = form.handleSubmit(async (formData) => {
    const tel = parsePhoneNumber(formData.phoneNumber, 'KR');

    if (!tel) {
      form.setError('phoneNumber', {
        message: t('register.steps.tel.inputs.phone_number.errors.format'),
      });
      return;
    }

    // country가 KR이 아니면 telSkip으로
    if (tel.country !== 'KR') {
      onTelSkipNext({
        phoneNumber: tel.formatInternational(),
      });
      return;
    }

    // country가 KR이면 인증 코드 발송 후 telCode로
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

    Log.submit('auth_register_tel');
    onTelCodeNext({
      phoneNumber: tel.formatInternational(),
    });
  });

  return { form, onSubmit };
};
