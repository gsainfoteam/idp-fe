import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { FormProvider } from 'react-hook-form';

import { RegisterForm } from '../components/register-form';
import { useRegisterForm } from '../hooks/use-register-form';

import { Button } from '@/features/core';

export function RegisterFrame() {
  const { form, onSendVerificationCode, onVerifyCode, onRegister } =
    useRegisterForm();

  const [isRegisterSuccess, setRegisterSuccess] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-[400px] flex-col px-5 py-6">
        <div className="text-title-1 mb-4">회원가입</div>
        {!isRegisterSuccess ? (
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
                onClick={async () =>
                  setRegisterSuccess(await onRegister(form.getValues()))
                }
              >
                다음으로
              </Button>
            </form>
          </FormProvider>
        ) : (
          <>
            <div className="text-title-3 text-neutral-900">
              회원가입이 완료되었습니다
            </div>
            <div className="h-100" />
            <Link to="/auth/login">
              <Button variant="primary" type="button">
                로그인하기
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
