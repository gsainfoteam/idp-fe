import { FormProvider } from 'react-hook-form';

import { Button } from '../components/button';
import { LoginForm } from '../components/login-form';
import { Logo } from '../components/logo';
import { useLoginForm } from '../hooks/use-login-form';

export const LoginFrame = () => {
  const { form, onSubmit } = useLoginForm();

  const isError =
    form.formState.errors.email != null ||
    form.formState.errors.password != null;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full ml-5 mr-5 max-w-[400px]">
        <Logo />
        <div className="h-8" />
        <div className="h-[150px]">
          <FormProvider {...form}>
            <form onSubmit={onSubmit}>
              <LoginForm isDisabled={form.formState.isSubmitting} />
            </form>
          </FormProvider>
        </div>
        <div className="h-8" />
        <div className="flex flex-col justify-center items-center">
          <Button
            variant="primary"
            width="w-full"
            text="로그인"
            isDisabled={isError}
            isLoading={form.formState.isSubmitting}
            onClick={onSubmit}
          />
          <div className="h-2" />
          <Button
            variant="link"
            typoVariant="body1"
            className="text-neutral-800 no-underline"
            text="회원가입"
            to="/auth/register"
          />
          {/* FIXME: /auth/register 라우터에 추가하면 오류 사라짐 */}
        </div>
      </div>
    </div>
  );
};
