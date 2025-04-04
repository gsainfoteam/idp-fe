import { useRouter } from '@tanstack/react-router';
import { FormProvider } from 'react-hook-form';

import { RegisterForm } from '../components/register-form';
import { useRegisterForm } from '../hooks/use-register-form';

import { Button } from '@/features/core';

export function RegisterFrame() {
  const { form, onSendVerificationCode, onVerifyCode, onRegister } =
    useRegisterForm();

  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-[400px] flex-col px-5 py-6">
        <div className="text-title-1 mb-4">회원가입</div>
        <FormProvider {...form}>
          <form>
            <RegisterForm
              onSendVerificationCode={onSendVerificationCode}
              onVerifyCode={onVerifyCode}
            />
            <div className="h-16" />
            <Button
              variant="primary"
              type="button"
              disabled={!form.formState.isValid}
              isLoading={form.formState.isSubmitting}
              onClick={async () => {
                if (await onRegister(form.getValues()))
                  router.navigate({ to: '/auth/register/done' });
              }}
            >
              다음으로
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
