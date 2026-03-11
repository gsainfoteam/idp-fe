import { zodResolver } from '@hookform/resolvers/zod';
import { type TFunction } from 'i18next';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import z from 'zod';

import { postUserVerifyStudentId } from '@/data/user';
import { postVerifyStudentId } from '@/data/verify';
import { useAuth } from '@/features/auth';
import { formatDateToYYYYMMDD, isKoreanName } from '@/features/core';

const createSchema = (t: TFunction) =>
  z
    .object({
      name: z
        .string()
        .min(
          1,
          t('verify_student_id.steps.new_info.inputs.name.errors.format'),
        ),
      firstName: z.string().optional(),
      birthDate: z.date({
        required_error: t(
          'verify_student_id.steps.new_info.inputs.birth_date.errors.format',
        ),
      }),
      studentId: z.string().nullable().default(null),
    })
    .refine((data) => isKoreanName(data.name) || !!data.firstName?.trim(), {
      message: t(
        'verify_student_id.steps.new_info.inputs.first_name.errors.required',
      ),
      path: ['firstName'],
    });

export type VerifyStudentNewInfoFormValues = z.infer<
  ReturnType<typeof createSchema>
>;

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

  const buildVerifyPayload = (formData: {
    name: string;
    firstName?: string;
    birthDate: Date;
  }) => ({
    birthDate: formatDateToYYYYMMDD(formData.birthDate),
    name: formData.name,
    ...(!isKoreanName(formData.name) &&
      formData.firstName?.trim() && {
        firstName: formData.firstName.trim(),
      }),
  });

  const onVerify = async () => {
    const isValid = await form.trigger();
    if (!isValid) return false;

    const formData = form.getValues();

    const res = await postVerifyStudentId(buildVerifyPayload(formData));

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
    const res = await postUserVerifyStudentId(buildVerifyPayload(formData));

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
