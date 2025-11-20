import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { postUserPassword } from '@/data/user';
import { DifferenceNonNullable } from '@/features/core';

import { IssuePasswordSteps } from '../../frames/issue-password-frame';

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
      IssuePasswordSteps['complete'],
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
    const res = await postUserPassword(formData);

    if (!res.ok) {
      if (res.status === 400) {
        toast.error(t('toast.invalid_body'));
      } else if (res.status === 403) {
        form.setError('email', {
          message: t('issue_password.steps.email.inputs.email.errors.invalid'),
          type: 'value',
        });
      } else if (res.status === 500) {
        toast.error(t('toast.server_error'));
      } else {
        toast.error(t('toast.unknown_error'));
      }

      return;
    }

    onNext(formData);
  });

  return { form, onSubmit };
};
