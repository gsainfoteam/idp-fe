import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { PasskeyLoginFormSchema } from '../hooks/use-passkey-login-form';

import { Input } from '@/features/core';

export function PasskeyLoginForm() {
  const { register, formState, clearErrors } =
    useFormContext<PasskeyLoginFormSchema>();
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
        {...register('email', { onChange })}
      />
    </div>
  );
}
