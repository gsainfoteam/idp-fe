import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { LoginFormSchema } from '../hooks/use-login-form';

import { Input } from '@/features/core';

export function LoginForm() {
  const { register, formState } = useFormContext<LoginFormSchema>();
  const { t } = useTranslation();

  // TODO: 이메일/비번 잘못 입력하면 모든 input 컴포넌트에 에러 뜨게 해놨는데, 여기서 하나만 수정하면 다른 하나는 에러가 그대로 남아있는 게 부자연스러움.

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
