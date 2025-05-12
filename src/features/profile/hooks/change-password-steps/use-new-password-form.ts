import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { ChangePasswordSteps } from '../../frames/change-password-frame';

import { patchUserPassword } from '@/data/patch-user-password';
import { useToken } from '@/features/auth';
import { DifferenceNonNullable } from '@/features/core';

const createSchema = (t: TFunction) =>
  z
    .object({
      password: z.string().min(12, t('change_password.errors.password_format')),
      passwordConfirm: z
        .string()
        .min(12, t('change_password.errors.password_format')),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      path: ['passwordConfirm'],
      message: t('change_password.errors.password_confirm'),
    });

export const useNewPasswordForm = ({
  context,
  onNext,
}: {
  context: ChangePasswordSteps['newPassword'];
  onNext: (
    data: DifferenceNonNullable<
      ChangePasswordSteps['complete'],
      ChangePasswordSteps['newPassword']
    >,
  ) => void;
}) => {
  const { t } = useTranslation();
  const { token } = useToken();
  const form = useForm({
    resolver: zodResolver(createSchema(t)),
    mode: 'onBlur',
  });

  // impossible case, just type guard
  if (!token) throw new Error('Token not found');

  const onSubmit = form.handleSubmit(async (formData) => {
    const { status } = await patchUserPassword({
      email: context.email,
      verificationJwtToken: token,
      password: formData.password,
    });

    if (status) {
      switch (status) {
        case 'INVALID_TOKEN':
          form.setError('root', {
            message: t('change_password.errors.token_invalid'),
            type: 'value',
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

    onNext(formData);
  });

  return { form, onSubmit };
};
