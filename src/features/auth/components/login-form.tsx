import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { LoginFormSchema } from '../hooks/use-login-form';

import { Input } from '@/features/core';

export function LoginForm() {
  const { register, formState } = useFormContext<LoginFormSchema>();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col">
      <Input
        error={formState.errors.email?.message}
        disabled={formState.isSubmitting}
        type="email"
        placeholder={t('login.placeholders.email')}
        {...register('email')}
      />
      <div className="h-4" />
      <Input
        error={formState.errors.password?.message}
        disabled={formState.isSubmitting}
        type="password"
        placeholder={t('login.placeholders.password')}
        {...register('password')}
      />
    </div>
  );
}
