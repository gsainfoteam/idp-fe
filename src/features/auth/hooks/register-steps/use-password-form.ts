import { zodResolver } from '@hookform/resolvers/zod';
import { type TFunction } from 'i18next';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { type RegisterSteps } from '../../frames/register-frame';

import { type DifferenceNonNullable } from '@/features/core';

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
  context,
  onStudentNext,
  onStaffNext,
}: {
  context: RegisterSteps['password'];
  onStudentNext: (
    data: DifferenceNonNullable<
      RegisterSteps['info'],
      RegisterSteps['password']
    >,
  ) => void;
  onStaffNext: (
    data: DifferenceNonNullable<
      RegisterSteps['infoStaff'],
      RegisterSteps['password']
    >,
  ) => void;
}) => {
  const { t } = useTranslation();
  const form = useForm({
    resolver: zodResolver(createSchema(t)),
    mode: 'onChange',
  });

  const onSubmit = form.handleSubmit(async (formData) => {
    const onNext = context.email.endsWith('@gm.gist.ac.kr')
      ? onStudentNext
      : onStaffNext;

    onNext({
      password: formData.password,
    });
  });

  return { form, onSubmit };
};
