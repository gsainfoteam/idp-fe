import { Link } from '@tanstack/react-router';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { LoginForm } from '../components/login-form';
import { useLoginForm } from '../hooks/use-login-form';

import TextLogo from '@/assets/logos/text-logo.svg?react';
import { Button, LoadingOverlay } from '@/features/core';

export function LoginFrame() {
  const { form, onSubmit } = useLoginForm();
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-[400px] px-5">
        <div className="flex flex-col items-center justify-center">
          <LoadingOverlay show={form.formState.isSubmitting}>
            <TextLogo />
          </LoadingOverlay>
        </div>
        <div className="h-8" />
        <FormProvider {...form}>
          <form onSubmit={onSubmit}>
            <div className="h-[150px]">
              <LoadingOverlay show={form.formState.isSubmitting}>
                <LoginForm />
              </LoadingOverlay>
            </div>
            <div className="h-8" />
            <div className="flex flex-col items-center justify-center">
              <Button
                variant="primary"
                className="w-full"
                disabled={!form.formState.isValid}
                loading={form.formState.isSubmitting}
              >
                {t(`login.buttons.login`)}
              </Button>
              <div className="h-3" />
              <div className="flex items-center justify-center gap-1">
                <Link to="/auth/register" search={(prev) => ({ ...prev })}>
                  <Button
                    variant="text"
                    className="text-body-2 p-0 text-neutral-800"
                    type="button"
                  >
                    {t('login.buttons.register')}
                  </Button>
                </Link>
                <div className="text-body-2 text-neutral-400">
                  {t('login.buttons.or')}
                </div>
                <Link to="/issue-password" search={(prev) => ({ ...prev })}>
                  <Button
                    variant="text"
                    className="text-body-2 p-0 text-neutral-800"
                    type="button"
                  >
                    {t('login.buttons.find_password')}
                  </Button>
                </Link>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
