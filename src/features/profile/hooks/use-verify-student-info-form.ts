import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import z from 'zod';

import { postUserVerifyStudentId } from '@/data/user';
import { useAuth } from '@/features/auth';
import { DifferenceNonNullable, formatDateToYYYYMMDD } from '@/features/core';

import { VerifyStudentIdSteps } from '../frames/verify-student-id-frame';

const createSchema = (t: TFunction) =>
  z.object({
    birthDate: z.date({
      required_error: t(
        'verify_student_id.steps.info.inputs.birth_date.errors.format',
      ),
    }),
  });

export function useVerifyStudentInfoForm({
  onSuccess,
  onFailure,
}: {
  onSuccess: (
    data: DifferenceNonNullable<
      VerifyStudentIdSteps['complete'],
      VerifyStudentIdSteps['info']
    >,
  ) => void;
  onFailure: (
    data: DifferenceNonNullable<
      VerifyStudentIdSteps['failure'],
      VerifyStudentIdSteps['info']
    >,
  ) => void;
}) {
  const { t } = useTranslation();
  const form = useForm({
    resolver: zodResolver(createSchema(t)),
    mode: 'onChange',
  });
  const { user } = useAuth();

  if (!user) throw new Error('User not found');

  const onSubmit = form.handleSubmit(async (formData) => {
    const res = await postUserVerifyStudentId({
      birthDate: formatDateToYYYYMMDD(formData.birthDate),
      name: user.name,
    });

    if (!res.ok) {
      if (res.status === 404) {
        onFailure({
          birthDate: formData.birthDate,
        });
      } else if (res.status === 500) {
        toast.error(t('toast.server_error'));
      } else {
        toast.error(t('toast.unknown_error'));
      }

      return;
    }

    onSuccess({
      birthDate: formData.birthDate,
    });
  });

  return { form, onSubmit };
}
