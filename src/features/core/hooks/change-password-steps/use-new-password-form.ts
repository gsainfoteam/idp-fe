import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { patchUserPassword } from '@/data/user';
import { DifferenceNonNullable, Log } from '@/features/core';

import { ChangePasswordSteps } from '../../frames/change-password-frame';

const createSchema = (t: TFunction) =>
  z
    .object({
      password: z
        .string()
        .min(
          12,
          t('change_password.steps.new_password.inputs.password.errors.format'),
        ),
      passwordConfirm: z
        .string()
        .min(
          12,
          t(
            'change_password.steps.new_password.inputs.password_confirm.errors.format',
          ),
        ),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      path: ['passwordConfirm'],
      message: t(
        'change_password.steps.new_password.inputs.password_confirm.errors.invalid',
      ),
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
    mode: 'onChange',
  });

  const onSubmit = form.handleSubmit(async (formData) => {
    const res = await patchUserPassword({
      oldPassword: context.oldPassword,
      password: formData.password,
    });

    if (!res.ok) {
      if (res.status === 400) {
        toast.error(t('toast.invalid_body'));
      } else if (res.status === 401 || res.status === 403) {
        toast.error(t('toast.invalid_token'));
      } else if (res.status === 500) {
        toast.error(t('toast.server_error'));
      } else {
        toast.error(t('toast.unknown_error'));
      }

      return;
    }

    Log.submit('profile_password_change');
    onNext(formData);
  });

  return { form, onSubmit };
};
