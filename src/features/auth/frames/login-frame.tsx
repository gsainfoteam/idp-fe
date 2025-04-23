import { Link, useLocation } from '@tanstack/react-router';
import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import TextLogo from '../../../assets/text-logo.svg?react';
import { LoginForm } from '../components/login-form';
import { useLoginForm } from '../hooks/use-login-form';

import { Button, Overlay } from '@/features/core';

export function LoginFrame() {
  const [hasLoginError, setLoginError] = useState<string | null>(null);
  const { form, onSubmit } = useLoginForm(setLoginError);
  const { t } = useTranslation();
  const location = useLocation();

  const onChange = () => {
    if (hasLoginError) {
      setLoginError(null);
      form.clearErrors();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-[400px] px-5">
        <div className="flex flex-col items-center justify-center">
          <Overlay show={form.formState.isSubmitting}>
            <TextLogo />
          </Overlay>
        </div>
        <div className="h-8" />
        <FormProvider {...form}>
          <form onSubmit={onSubmit}>
            <div className="h-[150px]">
              <Overlay show={form.formState.isSubmitting}>
                <LoginForm onChange={onChange} hasLoginError={hasLoginError} />
              </Overlay>
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
                search={(prev) => ({
                  redirectUrl: location.pathname,
                  ...prev,
                })}
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
