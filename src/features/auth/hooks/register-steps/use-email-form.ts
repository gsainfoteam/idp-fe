import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { RegisterSteps } from '../../frames/register-frame';

import { DifferenceNonNullable } from '@/features/core';

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
      RegisterSteps['emailOverlay'],
      RegisterSteps['email']
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
