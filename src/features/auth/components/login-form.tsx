import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Input, PasswordInput } from '@/features/core';

import { LoginFormSchema } from '../hooks/use-login-form';

export function LoginForm() {
  const { register, formState, clearErrors } =
    useFormContext<LoginFormSchema>();
  const { t } = useTranslation();

  const onChange = () => {
    if (formState.errors.root != null) {
      clearErrors('root');
    }
  };

  return (
    <div className="flex flex-col">
      <Input
        error={formState.errors.email?.message || formState.errors.root != null}
        disabled={formState.isSubmitting}
        type="email"
        placeholder={t('login.inputs.email.placeholder')}
        autoComplete="email"
        {...register('email', { onChange })}
      />
      <div className="h-4" />
      <PasswordInput
        error={
          formState.errors.password?.message ||
          (formState.errors.root?.message ?? false)
        }
        disabled={formState.isSubmitting}
        placeholder={t('login.inputs.password.placeholder')}
        autoComplete="current-password"
        {...register('password', { onChange })}
      />
    </div>
  );
}
