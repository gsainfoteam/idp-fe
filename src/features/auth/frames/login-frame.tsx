import { Link } from '@tanstack/react-router';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import InfoTeamLogo from '../../../assets/logo.svg?react';
import InfoTeamTextLogo from '../../../assets/text-logo.svg?react';
import { Button } from '../components/button';
import { LoginForm } from '../components/login-form';
import { useLoginForm } from '../hooks/use-login-form';

export function LoginFrame() {
  const { form, onSubmit } = useLoginForm();
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-[400px] px-5">
        <div className="flex flex-col items-center justify-center">
          <InfoTeamLogo />
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
                {t(`login.login`)}
              </Button>
              <div className="h-2" />
              <Link to="/auth/register">
                <Button
                  variant="link"
                  className="text-neutral-800 no-underline"
                >
                  {t('login.register')}
                </Button>
              </Link>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
