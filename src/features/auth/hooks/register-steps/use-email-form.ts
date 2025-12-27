import { zodResolver } from '@hookform/resolvers/zod';
import { type TFunction } from 'i18next';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { type RegisterSteps } from '../../frames/register-frame';

import { getUserEmail } from '@/data/user';
import { postVerifyEmail } from '@/data/verify';
import { type DifferenceNonNullable, Log } from '@/features/core';

const createSchema = (t: TFunction) =>
  z.object({
    email: z
      .string()
      .regex(
        /^\S+@(?:gm\.)?gist\.ac\.kr$/,
        t('register.steps.email.inputs.email.errors.format'),
      ),
  });

export const useEmailForm = ({
  onNext,
}: {
  context: RegisterSteps['email'];
  onNext: (
    data: DifferenceNonNullable<
      RegisterSteps['emailCode'],
      RegisterSteps['email']
    >,
  ) => void;
}) => {
  const { t } = useTranslation();
  const form = useForm({
    resolver: zodResolver(createSchema(t)),
    mode: 'onChange',
  });

  const onCheckEmail = async () => {
    const isValid = await form.trigger('email');
    if (!isValid) return false;

    const emailRes = await getUserEmail({ email: form.getValues('email') });

    if (!emailRes.ok) {
      if (emailRes.status === 500) {
        toast.error(t('toast.server_error'));
      } else {
        toast.error(t('toast.unknown_error'));
      }

      return false;
    }

    if (emailRes.data === true) {
      form.setError('email', {
        message: t('register.steps.email.inputs.email.errors.already_exists'),
      });

      return false;
    }

    return true;
  };

  const onSubmit = form.handleSubmit(async (formData) => {
    const verifyRes = await postVerifyEmail({ email: formData.email });

    if (!verifyRes.ok) {
      if (verifyRes.status === 500) {
        toast.error(t('toast.server_error'));
      } else {
        toast.error(t('toast.unknown_error'));
      }

      return;
    }

    Log.submit('auth_register_email');
    onNext(formData);
  });

  // TODO: Logging 새로운 페이지들에

  return { form, onCheckEmail, onSubmit };
};
