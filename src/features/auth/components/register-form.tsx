import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const [isCodeSent, setCodeSent] = useState<'none' | 'sending' | 'sent'>(
    'none',
  );
  const [isVerifying, setVerifying] = useState(false);
  const [isCodeValid, setCodeValid] = useState(false);

  // TODO: 인증번호 확인 버튼 width도 hug로 만들어야 다국어 지원 가능

  return (
    <div className="flex flex-col">
      <div className="text-title-3 mb-2.5 text-neutral-900">
        {t('register.titles.email')}
      </div>
      <div className="flex flex-col gap-2">
        <Input
          label={t('register.fields.email')}
          error={formState.errors.email?.message}
          type="email"
          placeholder={t('register.placeholders.email')}
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
                {isCodeSent === 'sent'
                  ? t('register.buttons.resend_code')
                  : t('register.buttons.send_code')}
              </Button>
            )}
          />
        )}
      </div>
      {isCodeSent === 'sent' && (
        <>
          <div className="h-5" />
          <Input
            label={t('register.fields.code')}
            error={formState.errors.code?.message}
            type="text"
            placeholder={t('register.placeholders.code')}
            required
            disabled={isCodeValid}
            {...register('code')}
            suffix={
              <Button
                variant="default"
                type="button"
                className="w-17.5"
                isLoading={isVerifying}
                disabled={isCodeValid}
                onClick={async () => {
                  setVerifying(true);
                  setCodeValid(await onVerifyCode(getValues()));
                  setVerifying(false);
                }}
              >
                {t('register.buttons.verify_code')}
              </Button>
            }
          />
        </>
      )}
      <div className="h-8" />
      <div>
        <div className="text-title-3 mb-2.5 text-neutral-900">
          {t('register.titles.password')}
        </div>
        <Input
          label={t('register.fields.password')}
          error={formState.errors.password?.message}
          type="password"
          placeholder={t('register.placeholders.password')}
          required
          className="mb-5"
          {...register('password')}
        />
        <Input
          label={t('register.fields.password_confirm')}
          error={formState.errors.passwordConfirm?.message}
          type="password"
          placeholder={t('register.placeholders.password_confirm')}
          required
          {...register('passwordConfirm')}
        />
      </div>
      <div className="h-8" />
      <div>
        <div className="text-title-3 mb-2.5 text-neutral-900">
          {t('register.titles.default_info')}
        </div>
        <Input
          label={t('register.fields.name')}
          error={formState.errors.name?.message}
          type="text"
          placeholder={t('register.placeholders.name')}
          required
          className="mb-5"
          {...register('name')}
        />
        <Input
          label={t('register.fields.student_id')}
          error={formState.errors.studentId?.message}
          type="text"
          placeholder={t('register.placeholders.student_id', {
            form: `${new Date().getFullYear()}0000`,
          })}
          required
          className="mb-5"
          {...register('studentId')}
        />
        <Input
          label={t('register.fields.phone_number')}
          error={formState.errors.phoneNumber?.message}
          type="tel"
          placeholder={t('register.placeholders.phone_number')}
          required
          {...register('phoneNumber')}
        />
      </div>
    </div>
  );
}
