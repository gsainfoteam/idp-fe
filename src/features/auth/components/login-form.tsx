import { useFormContext } from 'react-hook-form';

import { LoginFormSchema } from '../hooks/use-login-form';

import { Input } from './input';

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
        register={register}
      />
      <div className="h-[16px]" />
      <Input
        isError={isError}
        isDisabled={isDisabled}
        type="password"
        placeholder="password"
        register={register}
      />
      <div className="h-[38px]">
        <div className="h-1" />
        {isError && (
          <p className="text-[#ff2534] font-normal text-[14px] tracking-[0%] pl-1 pr-1">
            이메일 또는 비밀번호를 확인해주세요
          </p>
        )}
      </div>
    </div>
  );
}
