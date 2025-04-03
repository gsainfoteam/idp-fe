import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Button } from '../../core/components/button';
import { Input } from '../../core/components/input';
import { RegisterFormSchema } from '../hooks/use-register-form';

// TODO: isSubmitting 직접 구현해서 button loading 처리하기
// TODO: 인증번호 발송 버튼 누르면 onBlur 되어서 모든 인풋 컴포넌트들에 에러 라벨 생김

export function RegisterForm({
  onSendVerificationCode,
  onVerifyCode,
}: {
  onSendVerificationCode: (data: RegisterFormSchema) => Promise<void>;
  onVerifyCode: (data: RegisterFormSchema) => Promise<boolean>;
}) {
  const { register, formState, getFieldState, getValues } =
    useFormContext<RegisterFormSchema>();

  const [isCodeSent, setCodeSent] = useState(false);
  const [isCodeValid, setCodeValid] = useState(false);

  // TODO: 인증번호 만료 타이머

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
          <Button
            variant="default"
            type="button"
            disabled={(() => {
              console.log(getFieldState('email')); // TEST: DEBUG // TODO: 바로 맞게 입력하면 disabled가 해제가 안됨
              return (
                getFieldState('email').invalid ||
                !getFieldState('email').isTouched
              );
            })()}
            onClick={async () => {
              setCodeSent(true);
              await onSendVerificationCode(getValues());
            }}
          >
            {isCodeSent ? '인증번호 재발송' : '인증번호 발송'}
          </Button>
        )}
      </div>
      {isCodeSent && (
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
