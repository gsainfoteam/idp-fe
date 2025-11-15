import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import z from 'zod';

import { postVerifyStudentId } from '@/data/post-verify-student-id';
import { formatDateToYYYYMMDD } from '@/features/core';

const createSchema = (t: TFunction) =>
  z.object({
    birthDate: z.date({
      required_error: t(
        'verify_student_id.steps.new_info.inputs.birth_date.errors.format',
      ),
    }),
    name: z
      .string()
      .min(1, t('verify_student_id.steps.new_info.inputs.name.errors.format')),
    studentId: z.string().nullable().default(null),
  });

export function useVerifyStudentNewInfoForm() {
  const { t } = useTranslation();
  const form = useForm({
    resolver: zodResolver(createSchema(t)),
    mode: 'onChange',
  });

  const onSubmit = form.handleSubmit(async (formData) => {
    const { data, status } = await postVerifyStudentId({
      birthDate: formatDateToYYYYMMDD(formData.birthDate),
      name: formData.name,
    });

    if (!data || status) {
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

    form.setValue('studentId', data.studentId);
  });

  return { form, onSubmit };
}
