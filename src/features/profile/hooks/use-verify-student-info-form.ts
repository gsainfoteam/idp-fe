import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import z from 'zod';

import { postVerifyStudentId } from '@/data/post-verify-student-id';
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
    const { data, status } = await postVerifyStudentId({
      birthDate: formatDateToYYYYMMDD(formData.birthDate),
      name: user.name,
    });

    if (!data || status) {
      switch (status) {
        case 'USER_NOT_FOUND':
          onFailure({
            birthDate: formData.birthDate,
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

    if (data.studentId === user.studentId) {
      onSuccess({
        birthDate: formData.birthDate,
        name: user.name,
      });
    } else {
      onFailure({
        birthDate: formData.birthDate,
      });
    }
  });

  return { form, onSubmit };
}
