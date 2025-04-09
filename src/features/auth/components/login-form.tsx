import { Dispatch, SetStateAction } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { LoginFormSchema } from '../hooks/use-login-form';

import { Input } from '@/features/core';

export function LoginForm({
  loginErrorState: [hasLoginError, setLoginError],
}: {
  loginErrorState: [string | null, Dispatch<SetStateAction<string | null>>];
}) {
  const { register, formState, clearErrors } =
    useFormContext<LoginFormSchema>();
  const { t } = useTranslation();

  const handleChange = () => {
    if (hasLoginError) {
      setLoginError(null);
      clearErrors();
    }
  };

  return (
    <div className="flex flex-col">
      <Input
        error={formState.errors.email?.message || hasLoginError != null}
        disabled={formState.isSubmitting}
        type="email"
        placeholder={t('login.placeholders.email')}
        {...register('email', { onChange: handleChange })}
      />
      <div className="h-4" />
      <Input
        error={formState.errors.password?.message || (hasLoginError ?? false)}
        disabled={formState.isSubmitting}
        type="password"
        placeholder={t('login.placeholders.password')}
        {...register('password', { onChange: handleChange })}
      />
    </div>
  );
}
