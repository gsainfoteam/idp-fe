import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { postVerifyEmail } from '@/data/post-verify-email';
import { DifferenceNonNullable } from '@/features/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import { z } from 'zod';

import { RegisterSteps } from '../../frames/register-frame';

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
  overlay,
}: {
  context: RegisterSteps['email'];
  onNext: (
    data: DifferenceNonNullable<RegisterSteps['code'], RegisterSteps['email']>,
  ) => void;
  overlay: () => Promise<boolean>;
}) => {
  const { t } = useTranslation();
  const form = useForm({
    resolver: zodResolver(createSchema(t)),
    mode: 'onChange',
  });

  const onSubmit = form.handleSubmit(async (formData) => {
    const result = await overlay();
    if (result === false) return;

    const { status } = await postVerifyEmail({ email: formData.email });

    if (status) {
      switch (status) {
        case 'SERVER_ERROR':
          toast.error(t('toast.server_error'));
          break;
        case 'UNKNOWN_ERROR':
          toast.error(t('toast.unknown_error'));
          break;
      }

      return;
    }

    onNext({ emailAgree: true, ...formData });
  });

  return { form, onSubmit };
};
