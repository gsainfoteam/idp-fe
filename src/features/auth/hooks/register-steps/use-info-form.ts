import { zodResolver } from '@hookform/resolvers/zod';
import { type TFunction } from 'i18next';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { type RegisterSteps } from '../../frames/register-frame';

import { postUser } from '@/data/user';
import { postVerifyStudentId } from '@/data/verify';
import {
  type DifferenceNonNullable,
  Log,
  formatDateToYYYYMMDD,
} from '@/features/core';

const createSchema = (t: TFunction) =>
  z.object({
    name: z.string().min(1, t('register.steps.info.inputs.name.errors.format')),
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

  const onVerify = async () => {
    const isValid = await form.trigger();
    if (!isValid) return false;

    const formData = form.getValues();

    const verifyRes = await postVerifyStudentId({
      birthDate: formatDateToYYYYMMDD(formData.birthDate),
      name: formData.name,
    });

    if (!verifyRes.ok) {
      if (verifyRes.status === 404) {
        form.setError('root', {
          message: t('register.steps.info.inputs.birth_date.errors.invalid'),
        });
      } else if (verifyRes.status === 500) {
        toast.error(t('toast.server_error'));
      } else {
        toast.error(t('toast.unknown_error'));
      }

      return false;
    }

    form.setValue('studentId', verifyRes.data.studentId);
    form.setValue(
      'studentIdVerificationJwtToken',
      verifyRes.data.verificationJwtToken,
    );

    return true;
  };

  const onSubmit = form.handleSubmit(async (formData) => {
    if (!formData.studentId || !formData.studentIdVerificationJwtToken) {
      await onVerify();
      return;
    }

    const body = {
      ...context,
      ...formData,
      phoneNumber: context.phoneNumber,
      studentId: formData.studentId,
      studentIdVerificationJwtToken: formData.studentIdVerificationJwtToken,
    };

    const res = await postUser(body);

    if (!res.ok) {
      if (res.status === 403) {
        form.setError('root', {
          message: t('register.errors.invalid_token'),
        });
      } else if (res.status === 409) {
        form.setError('root', {
          message: t('register.errors.email_already_exists'),
        });
      } else if (res.status === 500) {
        toast.error(t('toast.server_error'));
      } else {
        toast.error(t('toast.unknown_error'));
      }

      return;
    }

    Log.submit('auth_register_info');
    onNext(body);
  });

  return { form, onVerify, onSubmit };
};
