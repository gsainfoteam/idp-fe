import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { RegisterSteps } from '../../frames/register-frame';

import { postVerify } from '@/data/post-verify';
import { DifferenceNonNullable } from '@/features/core';

const createSchema = (t: TFunction) =>
  z.object({
    code: z.string().regex(/^\d{6}$/, t('register.errors.code')),
  });

export const useCodeForm = ({
  context,
  onNext,
}: {
  context: RegisterSteps['code'];
  onNext: (
    data: DifferenceNonNullable<
      RegisterSteps['password'],
      RegisterSteps['code']
    >,
  ) => void;
}) => {
  const { t } = useTranslation();
  const form = useForm({
    resolver: zodResolver(createSchema(t)),
    mode: 'onBlur',
  });

  const onSubmit = form.handleSubmit(async (formData) => {
    const { data, status } = await postVerify({
      subject: context.email,
      code: formData.code,
      hint: 'email',
    });

    if (!data || status) {
      switch (status) {
        case 'INVALID_CERTIFICATE':
          form.setError('code', {
            message: t('register.errors.invalid_code'),
          });
          break;
        case 'SERVER_ERROR':
          toast.error(t('toast.server_error'));
          break;
        case 'UNKNOWN_ERROR':
          toast.error(t('toast.unknown_error'));
          break;
      }

      return;
    }

    onNext(data);
  });

  return { form, onSubmit };
};
