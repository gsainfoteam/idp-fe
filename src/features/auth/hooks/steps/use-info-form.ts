import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { RegisterSteps } from '../../frames/register-frame';

import { postUser } from '@/data/post-user';
import { DifferenceNonNullable } from '@/features/core';

const createSchema = (t: TFunction) =>
  z.object({
    name: z.string().min(1, t('register.errors.name')),
    studentId: z.string().regex(
      /^\d{5}$|^\d{8}$/,
      t('register.errors.student_id', {
        format: `${new Date().getFullYear()}0000`,
      }),
    ),
    phoneNumber: z
      .string()
      .refine(
        (value) => isValidPhoneNumber(value, 'KR'),
        t('register.errors.phone_number'),
      ),
  });

export const useInfoForm = ({
  context,
  onNext,
}: {
  context: RegisterSteps['info'];
  onNext: (
    data: DifferenceNonNullable<
      RegisterSteps['complete'],
      RegisterSteps['info']
    >,
  ) => void;
}) => {
  const { t } = useTranslation();
  const form = useForm({
    resolver: zodResolver(createSchema(t)),
    mode: 'onBlur',
  });

  const onSubmit = form.handleSubmit(async (formData) => {
    const { status } = await postUser({ ...context, ...formData });

    if (status) {
      switch (status) {
        case 'INVALID_TOKEN':
          form.setError('root', {
            message: t('register.errors.invalid_token'),
          });
          break;
        case 'USER_ALREADY_EXISTS':
          form.setError('root', {
            message: t('register.errors.email_already_exists'),
          });
          break;
        case 'SERVER_ERROR':
          console.error('Server error');
          break;
        case 'UNKNOWN_ERROR':
          console.error('Unknown error');
          break;
      }

      return;
    }

    onNext(formData);
  });

  return { form, onSubmit };
};
