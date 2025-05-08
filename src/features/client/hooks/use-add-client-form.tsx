import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

const createSchema = (t: TFunction) =>
  z.object({
    name: z.string().min(1, { message: t('services.add.name.placeholder') }),
  });

export type CreateFormSchema = z.infer<ReturnType<typeof createSchema>>;

export const useAddClientForm = () => {
  const { t } = useTranslation();
  const form = useForm<CreateFormSchema>({
    resolver: zodResolver(createSchema(t)),
    mode: 'onBlur',
  });

  const handleSubmit = form.handleSubmit((data) => {});

  return { form, handleSubmit };
};
