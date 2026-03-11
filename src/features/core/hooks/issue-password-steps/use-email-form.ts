import { zodResolver } from '@hookform/resolvers/zod';
import { type TFunction } from 'i18next';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { type IssuePasswordSteps } from '../../frames/issue-password-frame';

import { getUserEmail } from '@/data/user';
import { type DifferenceNonNullable } from '@/features/core';

const createSchema = (t: TFunction) =>
  z.object({
    email: z
      .string()
      .regex(
        /^\S+@(?:gm\.)?gist\.ac\.kr$/,
        t('issue_password.steps.email.inputs.email.errors.format'),
      ),
  });

export const useEmailForm = ({
  onNext,
}: {
  context: IssuePasswordSteps['email'];
  onNext: (
    data: DifferenceNonNullable<
      IssuePasswordSteps['code'],
      IssuePasswordSteps['email']
    >,
  ) => void;
}) => {
  const { t } = useTranslation();
  const form = useForm({
    resolver: zodResolver(createSchema(t)),
    mode: 'onChange',
  });

  const onSubmit = form.handleSubmit(async (formData) => {
    const emailRes = await getUserEmail(formData);

    if (!emailRes.ok) {
      if (emailRes.status === 500) {
        toast.error(t('toast.server_error'));
      } else {
        toast.error(t('toast.unknown_error'));
      }

      return;
    }

    if (emailRes.data === false) {
      form.setError('email', {
        message: t('issue_password.steps.email.inputs.email.errors.invalid'),
        type: 'value',
      });

      return;
    }

    onNext(formData);
  });

  return { form, onSubmit };
};
