import { zodResolver } from '@hookform/resolvers/zod';
import { type TFunction } from 'i18next';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

const createSchema = (t: TFunction) =>
  z.object({
    newUrl: z.string().url(t('services.detail.urls.errors.format')),
  });

export type ClientUrlFormSchema = z.infer<ReturnType<typeof createSchema>>;

export const useClientUrlForm = () => {
  const { t } = useTranslation();
  const form = useForm<ClientUrlFormSchema>({
    resolver: zodResolver(createSchema(t)),
    mode: 'onBlur',
  });

  const reset = () => {
    form.reset({ newUrl: '' });
  };

  return { form, reset };
};
