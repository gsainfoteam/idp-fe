import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import z from 'zod';

import { postUserVerifyStudentId } from '@/data/post-user-verify-student-id';
import { DifferenceNonNullable, formatDateToYYYYMMDD } from '@/features/core';

import { VerifyStudentIdSteps } from '../frames/verify-student-id-frame';

const createSchema = (t: TFunction) =>
  z.object({
    birthDate: z.date(),
    name: z
      .string()
      .min(1, t('verify_student_id.steps.new_info.inputs.name.errors.format')),
  });

export function useVerifyStudentNewInfoForm({
  onNext,
}: {
  onNext: (
    data: DifferenceNonNullable<
      VerifyStudentIdSteps['complete'],
      VerifyStudentIdSteps['newInfo']
    >,
  ) => void;
}) {
  const { t } = useTranslation();
  const form = useForm({
    resolver: zodResolver(createSchema(t)),
    mode: 'onChange',
  });

  const onSubmit = form.handleSubmit(async (formData) => {
    const { status } = await postUserVerifyStudentId({
      birthDate: formatDateToYYYYMMDD(formData.birthDate),
      name: formData.name,
    });

    if (status) {
      switch (status) {
        case 'USER_NOT_FOUND':
          form.setError('root', {
            message: t(
              'verify_student_id.steps.new_info.inputs.birth_date.errors.invalid',
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

    onNext(formData);
  });

  return { form, onSubmit };
}
