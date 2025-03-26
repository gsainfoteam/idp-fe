import { Link } from '@tanstack/react-router';
import { FormProvider } from 'react-hook-form';

import { Button } from '../components/button';
import { LoginForm } from '../components/login-form';
import { Logo } from '../components/logo';
import { useLoginForm } from '../hooks/use-login-form';

import { cn } from '@/features/core';

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
              <LoginForm disabled={form.formState.isSubmitting} />
            </form>
          </FormProvider>
        </div>
        <div className="h-8" />
        <div className="flex flex-col justify-center items-center">
          <Button
            variant="primary"
            className="w-full"
            text="로그인"
            disabled={isError}
            isLoading={form.formState.isSubmitting}
            onClick={onSubmit}
          />
          <div className="h-2" />
          <Link to="/auth/register">
            <Button
              variant="link"
              className={cn('text-neutral-800 text-body-1 no-underline')}
              text="회원가입"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
