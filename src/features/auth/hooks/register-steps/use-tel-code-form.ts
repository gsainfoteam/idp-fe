import { zodResolver } from '@hookform/resolvers/zod';
import { type TFunction } from 'i18next';
import parsePhoneNumber from 'libphonenumber-js';
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
      .regex(/^\d{6}$/, t('register.steps.tel_code.inputs.code.errors.format')),
  });

export const useTelCodeForm = ({
  context,
  onNext,
  count,
}: {
  context: RegisterSteps['telCode'];
  onNext: (
    data: DifferenceNonNullable<
      RegisterSteps['password'],
      RegisterSteps['telCode']
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
    // use-tel-form.ts에서 검증한(파싱 가능하고, KR) 전화번호를 사용
    const tel = parsePhoneNumber(context.phoneNumber, 'KR')!;

    const res = await postVerify({
      subject: tel.formatNational(),
      code: formData.code,
      hint: 'phoneNumber',
    });

    if (!res.ok) {
      if (res.status === 400) {
        if (count < CODE_MAX_COUNT) {
          form.setError('code', {
            message: t('register.steps.tel_code.inputs.code.errors.invalid', {
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

    Log.submit('auth_register_tel_code');
    onNext({ phoneNumberVerificationJwtToken: res.data.verificationJwtToken });
  });

  return { form, onSubmit };
};
