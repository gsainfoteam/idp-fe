import { Link } from '@tanstack/react-router';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import InfoTeamTextLogo from '../../../assets/text-logo.svg?react';
import { LoginForm } from '../components/login-form';
import { useLoginForm } from '../hooks/use-login-form';

import { Button } from '@/features/core';

export function LoginFrame() {
  const { form, onSubmit } = useLoginForm();
  const { t } = useTranslation();

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
              <LoginForm />
            </div>
            <div className="h-8" />
            <div className="flex flex-col items-center justify-center">
              <Button
                variant="primary"
                className="w-full"
                disabled={!form.formState.isValid}
                isLoading={form.formState.isSubmitting}
              >
                {t(`login.buttons.login`)}
              </Button>
              <div className="h-2" />
              <Link
                from="/auth/login"
                to="/auth/register"
                search={(prev) => ({ ...prev })}
              >
                <Button
                  variant="link"
                  className="text-neutral-800 no-underline"
                  type="button"
                >
                  {t('login.buttons.register')}
                </Button>
              </Link>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
