import { zodResolver } from '@hookform/resolvers/zod';
import { type TFunction } from 'i18next';
import parsePhoneNumber, { isValidPhoneNumber } from 'libphonenumber-js';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { type RegisterSteps } from '../../frames/register-frame';

import { postUser } from '@/data/user';
import { type DifferenceNonNullable, Log } from '@/features/core';

const createSchema = (t: TFunction) =>
  z.object({
    name: z
      .string()
      .min(1, t('register.steps.info_staff.inputs.name.errors.format')),
    phoneNumber: z
      .string()
      .refine(
        (value) => isValidPhoneNumber(value, 'KR'),
        t('register.steps.info_staff.inputs.phone_number.errors.format'),
      ),
    studentId: z
      .string()
      .regex(/^\d{5}$/, t('register.steps.info_staff.inputs.id.errors.format')),
  });

export const useInfoStaffForm = ({
  context,
  onNext,
}: {
  context: RegisterSteps['infoStaff'];
  onNext: (
    data: DifferenceNonNullable<
      RegisterSteps['complete'],
      RegisterSteps['infoStaff']
    >,
  ) => void;
}) => {
  const { t } = useTranslation();
  const form = useForm({
    resolver: zodResolver(createSchema(t)),
    mode: 'onChange',
  });

  const onSubmit = form.handleSubmit(async (formData) => {
    const body = {
      ...context,
      ...formData,
      phoneNumber: parsePhoneNumber(
        formData.phoneNumber,
        'KR',
      )!.formatInternational(),
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

  return { form, onSubmit };
};
