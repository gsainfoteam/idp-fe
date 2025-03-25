import { FormProvider } from 'react-hook-form';

import { BoxButton } from '../components/box-button';
import { LoginForm } from '../components/login-form';
import { Logo } from '../components/logo';
import { TextButton } from '../components/text-button';
import { useLoginForm } from '../hooks/use-login-form';

export const LoginFrame = () => {
  const { form, onSubmit } = useLoginForm();

  const isError =
    form.formState.errors.email != null ||
    form.formState.errors.password != null;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full ml-5 mr-5 max-w-[400px] h-[513px]">
        <Logo />
        <div className="h-[32px]" />
        <div className="h-[150px]">
          <FormProvider {...form}>
            <form onSubmit={onSubmit}>
              <LoginForm isDisabled={form.formState.isSubmitting} />
            </form>
          </FormProvider>
        </div>
        <div className="h-[32px]" />
        <div className="flex flex-col justify-center items-center h-[80px]">
          <BoxButton
            text="로그인"
            height={48}
            isDisabled={isError}
            isLoading={form.formState.isSubmitting}
            onClick={onSubmit}
          />
          <div className="h-[8px]" />
          <TextButton text="회원가입" width={56} height={24} />
        </div>
      </div>
    </div>
  );
};
