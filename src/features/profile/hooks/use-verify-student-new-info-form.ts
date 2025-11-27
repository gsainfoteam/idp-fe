import { zodResolver } from '@hookform/resolvers/zod';
import { type TFunction } from 'i18next';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import z from 'zod';

import { postUserVerifyStudentId } from '@/data/user';
import { postVerifyStudentId } from '@/data/verify';
import { useAuth } from '@/features/auth';
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

export function useVerifyStudentNewInfoForm({
  onNext,
}: {
  onNext: () => void;
}) {
  const { user } = useAuth();
  const { t } = useTranslation();
  const form = useForm({
    resolver: zodResolver(createSchema(t)),
    mode: 'onChange',
  });

  // impossible
  if (!user) throw new Error('User not found');

  const onVerify = async () => {
    const isValid = await form.trigger();
    if (!isValid) return false;

    const formData = form.getValues();

    const res = await postVerifyStudentId({
      birthDate: formatDateToYYYYMMDD(formData.birthDate),
      name: formData.name,
    });

    if (!res.ok) {
      if (res.status === 404) {
        form.setError('root', {
          message: t(
            'verify_student_id.steps.new_info.inputs.birth_date.errors.invalid',
          ),
        });
      } else if (res.status === 500) {
        toast.error(t('toast.server_error'));
      } else {
        toast.error(t('toast.unknown_error'));
      }
      return false;
    }

    form.setValue('studentId', res.data.studentId);

    return true;
  };

  const onSubmit = form.handleSubmit(async (formData) => {
    const res = await postUserVerifyStudentId({
      birthDate: formatDateToYYYYMMDD(formData.birthDate),
      name: user.name,
    });

    if (!res.ok) {
      if (res.status === 404) {
        form.setError('root', {
          message: t(
            'verify_student_id.steps.new_info.inputs.birth_date.errors.invalid',
          ),
        });
      } else if (res.status === 500) {
        toast.error(t('toast.server_error'));
      } else {
        toast.error(t('toast.unknown_error'));
      }
      return;
    }

    onNext();
  });

  return { form, onVerify, onSubmit };
}
