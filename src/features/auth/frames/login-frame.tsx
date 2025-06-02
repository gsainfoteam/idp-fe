import { Link } from '@tanstack/react-router';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { LoginForm } from '../components/login-form';
import { useLoginForm } from '../hooks/use-login-form';

import LightTextLogo from '@/assets/logos/light-text-logo.svg?react';
import DarkTextLogo from '@/assets/logos/dark-text-logo.svg?react';
import {
  Button,
  FunnelLayout,
  LoadingOverlay,
  ThemeSwitcher,
  useTheme,
} from '@/features/core';
import { useEffect } from 'react';

export function LoginFrame() {
  const { form, onSubmit } = useLoginForm();
  const { t } = useTranslation();
  const { isDark } = useTheme();

  // DEBUG: 왜 안 되는지 확인하기
  useEffect(() => {
    console.log(isDark);
  }, [isDark]);

  return (
    <FunnelLayout contentClassName="flex flex-col items-center justify-center">
      <div className="absolute top-4 right-5">
        <ThemeSwitcher />
      </div>
      <div className="flex w-full flex-col items-center justify-center">
        <LoadingOverlay show={form.formState.isSubmitting}>
          {isDark ? <LightTextLogo /> : <DarkTextLogo />}
        </LoadingOverlay>
        <div className="h-8" />
        <FormProvider {...form}>
          <form onSubmit={onSubmit} className="w-full">
            <div className="h-[150px] w-full">
              <LoadingOverlay show={form.formState.isSubmitting}>
                <LoginForm />
              </LoadingOverlay>
            </div>
            <div className="h-8" />
            <div className="flex w-full flex-col items-center justify-center">
              <Button
                variant="primary"
                className="w-full"
                disabled={!form.formState.isValid}
                loading={form.formState.isSubmitting}
              >
                {t(`login.buttons.login`)}
              </Button>
              <div className="h-3" />
              <div className="flex w-full items-center justify-center gap-1">
                <Link to="/auth/register" search={(prev) => ({ ...prev })}>
                  <Button
                    variant="link"
                    type="button"
                    className="text-body-2 no-underline"
                  >
                    {t('login.buttons.register')}
                  </Button>
                </Link>
                <Button
                  variant="link"
                  className="text-body-2 no-underline"
                  disabled
                >
                  {t('login.buttons.or')}
                </Button>
                <Link to="/issue-password" search={(prev) => ({ ...prev })}>
                  <Button
                    variant="link"
                    type="button"
                    className="text-body-2 no-underline"
                  >
                    {t('login.buttons.find_password')}
                  </Button>
                </Link>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </FunnelLayout>
  );
}
