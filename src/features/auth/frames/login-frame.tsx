import { Link } from '@tanstack/react-router';
import { FormProvider } from 'react-hook-form';

import InfoTeamTextLogo from '../../../assets/text-logo.svg?react';
import { LoginForm } from '../components/login-form';
import { useLoginForm } from '../hooks/use-login-form';

import { Button } from '@/features/core';

export function LoginFrame() {
  const { form, onSubmit } = useLoginForm();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-[400px] px-5">
        <div className="flex flex-col items-center justify-center">
          <InfoTeamTextLogo />
        </div>
        <div className="h-8" />
        <FormProvider {...form}>
          <form onSubmit={onSubmit}>
            <div className="h-[150px]">
              <LoginForm disabled={form.formState.isSubmitting} />
            </div>
            <div className="h-8" />
            <div className="flex flex-col items-center justify-center">
              <Button
                variant="primary"
                className="w-full"
                disabled={!form.formState.isValid}
                isLoading={form.formState.isSubmitting}
              >
                로그인
              </Button>
              <div className="h-2" />
              <Link to="/auth/register">
                <Button
                  variant="link"
                  className="text-neutral-800 no-underline"
                >
                  회원가입
                </Button>
              </Link>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
