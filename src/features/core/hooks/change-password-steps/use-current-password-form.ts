import { zodResolver } from '@hookform/resolvers/zod';
import { type TFunction } from 'i18next';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { type ChangePasswordSteps } from '../../frames/change-password-frame';

import { postAuthLogin } from '@/data/auth';
import { useAuth, useToken } from '@/features/auth';
import { type DifferenceNonNullable } from '@/features/core';

const createSchema = (t: TFunction) =>
  z.object({
    password: z
      .string()
      .min(
        1,
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
    mode: 'onChange',
  });

  // impossible case, just type guard
  if (!user) throw new Error('User not found');

  const onSubmit = form.handleSubmit(async (formData) => {
    const res = await postAuthLogin({
      email: user.email,
      password: formData.password,
    });

    if (!res.ok) {
      if (res.status === 401) {
        form.setError('password', {
          message: t(
            'change_password.steps.current_password.inputs.password.errors.invalid',
          ),
        });
      } else if (res.status === 500) {
        toast.error(t('toast.server_error'));
      } else {
        toast.error(t('toast.unknown_error'));
      }

      return;
    }

    saveToken(res.data.accessToken);
    onNext({ oldPassword: formData.password });
  });

  return { form, onSubmit };
};
