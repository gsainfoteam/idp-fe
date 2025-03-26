import { useFormContext } from 'react-hook-form';

import { LoginFormSchema } from '../hooks/use-login-form';

import { Input } from './input';
import { Typo } from './typo';

export function LoginForm({ isDisabled }: { isDisabled: boolean }) {
  const { register, formState } = useFormContext<LoginFormSchema>();

  const isError =
    formState.errors.email != null || formState.errors.password != null;

  return (
    <div className="flex flex-col">
      <Input
        isError={isError}
        isDisabled={isDisabled}
        type="email"
        placeholder="m@gm.gist.ac.kr"
        {...register('email')}
      />
      <div className="h-4" />
      <Input
        isError={isError}
        isDisabled={isDisabled}
        type="password"
        placeholder="password"
        {...register('password')}
      />
      <div className="h-1" />
      {isError && (
        <Typo variant="label1" className="text-red-500 pl-1 pr-1">
          이메일 또는 비밀번호를 확인해주세요
        </Typo>
      )}
    </div>
  );
}
