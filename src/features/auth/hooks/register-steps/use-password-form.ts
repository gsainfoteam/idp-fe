import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { RegisterSteps } from '../../frames/register-frame';

import { DifferenceNonNullable } from '@/features/core';

const createSchema = (t: TFunction) =>
  z
    .object({
      password: z
        .string()
        .min(12, t('register.steps.password.inputs.password.errors.format')),
      passwordConfirm: z
        .string()
        .min(
          12,
          t('register.steps.password.inputs.password_confirm.errors.format'),
        ),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: t(
        'register.steps.password.inputs.password_confirm.errors.invalid',
      ),
      path: ['passwordConfirm'],
    });

export const usePasswordForm = ({
  onNext,
}: {
  context: RegisterSteps['password'];
  onNext: (
    data: DifferenceNonNullable<
      RegisterSteps['info'],
      RegisterSteps['password']
    >,
  ) => void;
}) => {
  const { t } = useTranslation();
  const form = useForm({
    resolver: zodResolver(createSchema(t)),
    mode: 'onBlur',
  });

  const onSubmit = form.handleSubmit(async (formData) => {
    onNext(formData);
  });

  return { form, onSubmit };
};
