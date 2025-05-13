import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { ChangePasswordSteps } from '../../frames/change-password-frame';

import { patchUserPassword } from '@/data/patch-user-password';
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
  const form = useForm({
    resolver: zodResolver(createSchema(t)),
    mode: 'onBlur',
  });

  const onSubmit = form.handleSubmit(async (formData) => {
    const { status } = await patchUserPassword({
      oldPassword: context.oldPassword,
      password: formData.password,
    });

    if (status) {
      switch (status) {
        case 'INVALID_BODY':
          toast.error(t('toast.invalid_body'));
          break;
        case 'INVALID_TOKEN':
          form.setError('root', {
            message: t('change_password.errors.token_invalid'),
            type: 'value',
          });
          break;
        case 'INVALID_PASSWORD':
          form.setError('password', {
            message: t('change_password.errors.password_invalid'),
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
