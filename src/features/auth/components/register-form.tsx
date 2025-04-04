import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { RegisterFormSchema } from '../hooks/use-register-form';

import { Button, Input } from '@/features/core';

export function RegisterForm({
  onSendVerificationCode,
  onVerifyCode,
}: {
  onSendVerificationCode: (data: RegisterFormSchema) => Promise<void>;
  onVerifyCode: (data: RegisterFormSchema) => Promise<boolean>;
}) {
  const { register, formState, getValues, control } =
    useFormContext<RegisterFormSchema>();

  const [isCodeSent, setCodeSent] = useState<'none' | 'sending' | 'sent'>(
    'none',
  );
  const [isCodeValid, setCodeValid] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="text-title-3 mb-2.5 text-neutral-900">이메일</div>
      <div className="flex flex-col gap-2">
        <Input
          label="GIST 이메일"
          error={formState.errors.email?.message}
          type="email"
          placeholder="m@gm.gist.ac.kr"
          required
          {...register('email', {
            onChange: () => setCodeValid(false),
          })}
        />
        {!isCodeValid && (
          <Controller
            control={control}
            name="email"
            render={({ fieldState }) => (
              <Button
                variant="default"
                type="button"
                isLoading={isCodeSent === 'sending'}
                disabled={fieldState.invalid || !fieldState.isTouched}
                onClick={async () => {
                  setCodeSent('sending');
                  await onSendVerificationCode(getValues());
                  setCodeSent('sent');
                }}
              >
                {isCodeSent === 'sent' ? '인증번호 재발송' : '인증번호 발송'}
              </Button>
            )}
          />
        )}
      </div>
      {isCodeSent === 'sent' && (
        <>
          <div className="h-5" />
          <Input
            label="인증번호"
            error={formState.errors.code?.message}
            type="text"
            placeholder="인증번호"
            required
            disabled={isCodeValid}
            {...register('code')}
            suffix={
              <Button
                variant="secondary"
                type="button"
                className="w-17.5"
                disabled={isCodeValid}
                onClick={async () =>
                  setCodeValid(await onVerifyCode(getValues()))
                }
              >
                확인
              </Button>
            }
          />
        </>
      )}
      <div className="h-8" />
      <div>
        <div className="text-title-3 mb-2.5 text-neutral-900">비밀번호</div>
        <Input
          label="비밀번호"
          error={formState.errors.password?.message}
          type="password"
          placeholder="비밀번호"
          required
          className="mb-5"
          {...register('password')}
        />
        <Input
          label="비밀번호 확인"
          error={formState.errors.passwordConfirm?.message}
          type="password"
          placeholder="비밀번호 확인"
          required
          {...register('passwordConfirm')}
        />
      </div>
      <div className="h-8" />
      <div>
        <div className="text-title-3 mb-2.5 text-neutral-900">기본정보</div>
        <Input
          label="이름"
          error={formState.errors.name?.message}
          type="text"
          placeholder="김지니"
          required
          className="mb-5"
          {...register('name')}
        />
        <Input
          label="학번"
          error={formState.errors.studentId?.message}
          type="number"
          placeholder={`${new Date().getFullYear()}0000`}
          required
          className="mb-5"
          {...register('studentId')}
        />
        <Input
          label="전화번호"
          error={formState.errors.phoneNumber?.message}
          type="tel"
          placeholder="010-0000-0000"
          required
          {...register('phoneNumber')}
        />
      </div>
    </div>
  );
}
