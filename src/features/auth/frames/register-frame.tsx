import { useNavigate } from '@tanstack/react-router';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { RegisterForm } from '../components/register-form';
import { useRegisterForm } from '../hooks/use-register-form';

export function RegisterFrame() {
  const { form, onSendVerificationCode, onVerifyCode, onSubmit } =
    useRegisterForm();
  const { t } = useTranslation();
  const navigate = useNavigate({ from: '/auth/register' });

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-[400px] flex-col px-5 py-6">
        <div className="text-title-1 mb-4">{t('register.title')}</div>
        <FormProvider {...form}>
          <form
            onSubmit={(e) => {
              onSubmit(e);
              // FIXME: https://github.com/TanStack/router/issues/3679 에러 발생
              navigate({ to: '/auth/register/done' });
            }}
          >
            <RegisterForm
              onSendVerificationCode={onSendVerificationCode}
              onVerifyCode={onVerifyCode}
            />
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
