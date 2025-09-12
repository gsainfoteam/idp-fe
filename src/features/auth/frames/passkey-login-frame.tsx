import { Link } from '@tanstack/react-router';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { PasskeyLoginForm, usePasskeyLoginForm } from '@/features/auth';

import TextLogo from '@/assets/logos/text-logo.svg?react';
import {
  Button,
  FunnelLayout,
  LoadingOverlay,
  ThemeSwitcher,
} from '@/features/core';
import { getOsVariant } from '../utils/get-os-variant';

export function PasskeyLoginFrame({ changeMode }: { changeMode: () => void }) {
  const { form, onSubmit } = usePasskeyLoginForm();
  const { t } = useTranslation();
  const { prefixIcon, buttonText } = getOsVariant();

  return (
    <FunnelLayout contentClassName="flex flex-col items-center justify-center">
      <div className="absolute top-4 right-5">
        <ThemeSwitcher />
      </div>
      <div className="flex w-full flex-col items-center justify-center">
        <LoadingOverlay show={form.formState.isSubmitting}>
          <TextLogo className="text-dark dark:text-white" />
        </LoadingOverlay>
        <div className="h-8" />
        <FormProvider {...form}>
          <form onSubmit={onSubmit} className="w-full">
            <div className="h-fit w-full">
              <LoadingOverlay show={form.formState.isSubmitting}>
                <PasskeyLoginForm />
              </LoadingOverlay>
            </div>
            <div className="h-8" />
            <div className="flex w-full flex-col items-center justify-center gap-3">
              <Button
                variant="primary"
                className="w-full"
                disabled={!form.formState.isValid}
                loading={form.formState.isSubmitting}
                prefixIcon={prefixIcon}
              >
                {buttonText}
              </Button>
              <div className="flex w-full items-center justify-center gap-3">
                <div className="bg-basics-tertiary-label h-0.25 w-full" />
                <span className="text-funnel-description">or</span>
                <div className="bg-basics-tertiary-label h-0.25 w-full" />
              </div>
              <Button
                variant="default"
                className="w-full"
                disabled={form.formState.isSubmitting}
                type="button"
                onClick={changeMode}
              >
                {t(`login.buttons.login_with_password`)}
              </Button>
              <div className="flex w-full items-center justify-center gap-1">
                <Link to="/auth/register" search={(prev) => ({ ...prev })}>
                  <Button
                    variant="link"
                    size="none"
                    type="button"
                    className="text-body-2 no-underline"
                  >
                    {t('login.buttons.register')}
                  </Button>
                </Link>
                <Button
                  variant="grayText"
                  size="none"
                  className="text-body-2 no-underline"
                  disabled
                >
                  {t('login.buttons.or')}
                </Button>
                <Link to="/issue-password" search={(prev) => ({ ...prev })}>
                  <Button
                    variant="link"
                    size="none"
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
