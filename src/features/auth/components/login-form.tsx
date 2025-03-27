import { useFormContext } from 'react-hook-form';

import { LoginFormSchema } from '../hooks/use-login-form';

import { Input } from './input';

export function LoginForm({ disabled }: { disabled: boolean }) {
  const { register, formState } = useFormContext<LoginFormSchema>();

  const hasError =
    formState.errors.email != null || formState.errors.password != null;

  return (
    <div className="flex flex-col">
      <Input
        error={hasError}
        disabled={disabled}
        type="email"
        placeholder="m@gm.gist.ac.kr"
        {...register('email')}
      />
      <div className="h-4" />
      <Input
        error={hasError && '이메일 또는 비밀번호를 확인해주세요'}
        disabled={disabled}
        type="password"
        placeholder="password"
        {...register('password')}
      />
    </div>
  );
}
