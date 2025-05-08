import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CreateFormSchema } from '../hooks/use-add-client-form';

import { Input, Label } from '@/features/core';

export function ClientAddForm() {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateFormSchema>();

  return (
    <div className="flex flex-col gap-3">
      <Label text={t('services.add.name.label')}>
        <Input
          {...register('name')}
          placeholder={t('services.add.name.placeholder')}
          error={errors.name?.message}
        />
      </Label>
    </div>
  );
}
