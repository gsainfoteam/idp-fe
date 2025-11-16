import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { postUser } from '@/data/post-user';
import { postVerifyStudentId } from '@/data/post-verify-student-id';
import { DifferenceNonNullable, formatDateToYYYYMMDD } from '@/features/core';

import { RegisterSteps } from '../../frames/register-frame';

const createSchema = (t: TFunction) =>
  z.object({
    name: z.string().min(1, t('register.steps.info.inputs.name.errors.format')),
    phoneNumber: z
      .string()
      .refine(
        (value) => isValidPhoneNumber(value, 'KR'),
        t('register.steps.info.inputs.phone_number.errors.format'),
      ),
    birthDate: z.date({
      required_error: t('register.steps.info.inputs.birth_date.errors.format'),
    }),
    studentId: z.string().nullable().default(null),
    studentIdVerificationJwtToken: z.string().nullable().default(null),
  });

export const useInfoForm = ({
  context,
  onNext,
}: {
  context: RegisterSteps['info'];
  onNext: (
    data: DifferenceNonNullable<
      RegisterSteps['complete'],
      RegisterSteps['info']
    >,
  ) => void;
}) => {
  const { t } = useTranslation();
  const form = useForm({
    resolver: zodResolver(createSchema(t)),
    mode: 'onChange',
  });

  const onVerify = form.handleSubmit(async (formData) => {
    const { data: verifyData, status: verifyStatus } =
      await postVerifyStudentId({
        birthDate: formatDateToYYYYMMDD(formData.birthDate),
        name: formData.name,
      });

    if (!verifyData || verifyStatus) {
      switch (verifyStatus) {
        case 'USER_NOT_FOUND':
          form.setError('root', {
            message: t('register.steps.info.inputs.birth_date.errors.invalid'),
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

    form.setValue('studentId', verifyData.studentId);
    form.setValue(
      'studentIdVerificationJwtToken',
      verifyData.verificationJwtToken,
    );
  });

  const onSubmit = form.handleSubmit(async (formData) => {
    if (!formData.studentId || !formData.studentIdVerificationJwtToken) {
      await onVerify();
      return;
    }

    const body = {
      ...context,
      ...formData,
      studentId: formData.studentId,
      studentIdVerificationJwtToken: formData.studentIdVerificationJwtToken,
    };

    const { status } = await postUser(body);

    if (status) {
      switch (status) {
        case 'INVALID_TOKEN':
          form.setError('root', {
            message: t('register.errors.invalid_token'),
          });
          break;
        case 'USER_ALREADY_EXISTS':
          form.setError('root', {
            message: t('register.errors.email_already_exists'),
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

    onNext(body);
  });

  return { form, onVerify, onSubmit };
};
