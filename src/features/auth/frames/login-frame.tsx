import { Link, useNavigate, useSearch } from '@tanstack/react-router';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import TextLogo from '../../../assets/text-logo.svg?react';
import { LoginForm } from '../components/login-form';
import { useLoginForm } from '../hooks/use-login-form';

import { Button, LoadingOverlay } from '@/features/core';
import { getClients } from '@/features/oauth';

export function LoginFrame() {
  const { form, onSubmit } = useLoginForm();
  const { t } = useTranslation();
  const { clientId, redirectUrl } = useSearch({ from: '/auth/login' });
  const navigate = useNavigate({ from: '/auth/login' });

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
          <form
            onSubmit={(e) => {
              onSubmit(e);
              // TEST: dummy client id: 8acf0a32-20a1-4c5d-a0d9-b43e24ea5d50
              getClients().then((clients) => {
                // 이미 인가 완료된 클라이언트인 경우 redirectUrl 혹은 프로필 페이지로 이동
                if (clients.some((c) => c.clientId === clientId)) {
                  if (redirectUrl != null) {
                    window.location.href = redirectUrl;
                  } else {
                    navigate({
                      to: '/profile',
                      search: (prev) => ({ ...prev }),
                    });
                  }
                } else {
                  navigate({
                    to: '/authorize',
                    search: (prev) => ({ ...prev }),
                  });
                }
              });
            }}
          >
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
                isLoading={form.formState.isSubmitting}
              >
                {t(`login.buttons.login`)}
              </Button>
              <div className="h-2" />
              <Link
                from="/auth/login"
                to="/auth/register"
                search={(prev) => ({
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
