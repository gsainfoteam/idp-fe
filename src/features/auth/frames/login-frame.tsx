import { Link } from '@tanstack/react-router';
import { FormProvider } from 'react-hook-form';

import InfoTeamLogo from '../../../assets/logo.svg?react';
import InfoTeamTextLogo from '../../../assets/text-logo.svg?react';
import { Button } from '../components/button';
import { LoginForm } from '../components/login-form';
import { useLoginForm } from '../hooks/use-login-form';

export function LoginFrame() {
  const { form, onSubmit } = useLoginForm();

  const hasError =
    form.formState.errors.email != null ||
    form.formState.errors.password != null;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full px-5 max-w-[400px]">
        <div className="flex flex-col justify-center items-center">
          <InfoTeamLogo />
          <InfoTeamTextLogo />
        </div>
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
            disabled={hasError}
            isLoading={form.formState.isSubmitting}
            onClick={onSubmit}
          >
            로그인
          </Button>
          <div className="h-2" />
          <Link to="/auth/register">
            <Button variant="link" className="text-neutral-800 no-underline">
              회원가입
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
