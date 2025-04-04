import { useFormContext } from 'react-hook-form';

import { LoginFormSchema } from '../hooks/use-login-form';

import { Input } from '@/features/core';

export function LoginForm() {
  const { register, formState } = useFormContext<LoginFormSchema>();

  return (
    <div className="flex flex-col">
      <Input
        error={formState.errors.email?.message}
        disabled={formState.isSubmitting}
        type="email"
        placeholder="m@gm.gist.ac.kr"
        {...register('email')}
      />
      <div className="h-4" />
      <Input
        error={formState.errors.password?.message}
        disabled={formState.isSubmitting}
        type="password"
        placeholder="password"
        {...register('password')}
      />
    </div>
  );
}
