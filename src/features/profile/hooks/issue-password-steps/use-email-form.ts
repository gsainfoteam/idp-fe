import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { IssuePasswordSteps } from '../../frames/issue-password-frame';

import { postUserPassword } from '@/data/post-user-password';
import { DifferenceNonNullable } from '@/features/core';

const createSchema = (t: TFunction) =>
  z.object({
    email: z
      .string()
      .regex(/^\S+@(?:gm\.)?gist\.ac\.kr$/, t('register.errors.email')),
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
    mode: 'onBlur',
  });

  const onSubmit = form.handleSubmit(async (formData) => {
    const { status } = await postUserPassword(formData);

    if (status) {
      switch (status) {
        case 'INVALID_BODY':
          toast.error(t('toast.invalid_body'));
          break;
        case 'INVALID_EMAIL':
          form.setError('email', {
            message: t('issue_password.errors.invalid_email'),
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
