import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { getUserEmail } from '@/data/user';
import { postVerifyEmail } from '@/data/verify';
import { DifferenceNonNullable } from '@/features/core';

import { RegisterSteps } from '../../frames/register-frame';

const createSchema = (t: TFunction) =>
  z.object({
    email: z
      .string()
      .regex(
        /^\S+@(?:gm\.)?gist\.ac\.kr$/,
        t('register.steps.email.inputs.email.errors.format'),
      ),
    emailChecked: z.boolean().default(false),
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
    mode: 'onChange',
  });

  const onCheckEmail = form.handleSubmit(async (formData) => {
    const emailRes = await getUserEmail({ email: formData.email });

    if (!emailRes.ok) {
      if (emailRes.status === 500) {
        toast.error(t('toast.server_error'));
      } else {
        toast.error(t('toast.unknown_error'));
      }

      return;
    }

    if (emailRes.data === true) {
      form.setError('email', {
        message: t('register.steps.email.inputs.email.errors.already_exists'),
      });

      return;
    }

    form.setValue('emailChecked', true);
  });

  const onSubmit = form.handleSubmit(async (formData) => {
    if (!formData.emailChecked) {
      await onCheckEmail();
      return;
    }

    const verifyRes = await postVerifyEmail({ email: formData.email });

    if (!verifyRes.ok) {
      if (verifyRes.status === 500) {
        toast.error(t('toast.server_error'));
      } else {
        toast.error(t('toast.unknown_error'));
      }

      return;
    }

    onNext({ emailAgree: true, ...formData });
  });

  return { form, onCheckEmail, onSubmit };
};
