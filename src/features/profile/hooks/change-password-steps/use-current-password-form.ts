import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { ChangePasswordSteps } from '../../frames/change-password-frame';

import { postAuthLogin } from '@/data/post-auth-login';
import { useAuth, useToken } from '@/features/auth';
import { DifferenceNonNullable } from '@/features/core';

const createSchema = (t: TFunction) =>
  z.object({
    password: z
      .string()
      .min(
        12,
        t(
          'change_password.steps.current_password.inputs.password.errors.format',
        ),
      ),
  });

export const useCurrentPasswordForm = ({
  onNext,
}: {
  context: ChangePasswordSteps['currentPassword'];
  onNext: (
    data: DifferenceNonNullable<
      ChangePasswordSteps['newPassword'],
      ChangePasswordSteps['currentPassword']
    >,
  ) => void;
}) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { saveToken } = useToken();
  const form = useForm({
    resolver: zodResolver(createSchema(t)),
    mode: 'onBlur',
  });

  // impossible case, just type guard
  if (!user) throw new Error('User not found');

  const onSubmit = form.handleSubmit(async (formData) => {
    const { data, status } = await postAuthLogin({
      email: user.email,
      password: formData.password,
    });

    if (!data || status) {
      switch (status) {
        case 'LOGIN_FAILURE':
          form.setError('password', {
            message: t(
              'change_password.steps.current_password.inputs.password.errors.invalid',
            ),
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

    saveToken(data.accessToken);
    onNext({ oldPassword: formData.password });
  });

  return { form, onSubmit };
};
