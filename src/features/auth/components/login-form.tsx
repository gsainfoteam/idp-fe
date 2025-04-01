import { useFormContext } from 'react-hook-form';

import { LoginFormSchema } from '../hooks/use-login-form';

import { Input } from './input';

export function LoginForm({ disabled }: { disabled: boolean }) {
  const { register, formState } = useFormContext<LoginFormSchema>();

  return (
    <div className="flex flex-col">
      <Input
        error={formState.errors.email?.message}
        disabled={disabled}
        type="email"
        placeholder="m@gm.gist.ac.kr"
        {...register('email')}
      />
      <div className="h-4" />
      <Input
        error={formState.errors.password?.message}
        disabled={disabled}
        type="password"
        placeholder="password"
        {...register('password')}
      />
    </div>
  );
}
