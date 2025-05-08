import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { RegisterSteps } from '../../frames/register-frame';

import { postVerifyEmail } from '@/data/post-verify-email';
import { DifferenceNonNullable } from '@/features/core';

const createSchema = (t: TFunction) =>
  z.object({
    email: z
      .string()
      .regex(/^\S+@(?:gm\.)?gist\.ac\.kr$/, t('register.errors.email')),
  });

export const useEmailForm = ({
  onNext,
}: {
  context: RegisterSteps['email'];
  onNext: (
    data: DifferenceNonNullable<RegisterSteps['code'], RegisterSteps['email']>,
  ) => void;
}) => {
  const { t } = useTranslation();
  const form = useForm({
    resolver: zodResolver(createSchema(t)),
    mode: 'onBlur',
  });

  const onSubmit = form.handleSubmit(async (formData) => {
    const { status } = await postVerifyEmail(formData);

    if (status) {
      switch (status) {
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
