import { Link } from '@tanstack/react-router';
import { type TFunction } from 'i18next';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { UAParser } from 'ua-parser-js';

import FaceIDIcon from '@/assets/icons/line/face-id.svg?react';
import FingerprintIcon from '@/assets/icons/line/fingerprint.svg?react';
import KeyIcon from '@/assets/icons/line/key.svg?react';
import WindowsHelloIcon from '@/assets/icons/line/windows-hello.svg?react';
import TextLogo from '@/assets/logos/text-logo.svg?react';
import { LoginForm, useLoginForm, usePasskeyLoginForm } from '@/features/auth';
import {
  Button,
  FunnelLayout,
  LoadingOverlay,
  LogClick,
  ThemeSwitcher,
} from '@/features/core';

function getPasskeyButtonInfo(t: TFunction) {
  const { os, device } = UAParser(navigator.userAgent);
  const osName = os.name?.toLowerCase() ?? '';
  const deviceType = device.type ?? '';

  if (osName.startsWith('windows')) {
    return {
      prefixIcon: <WindowsHelloIcon />,
      buttonText: t('login.buttons.login_with_windows_hello'),
    };
  } else if (osName.startsWith('ios')) {
    return {
      prefixIcon: <FaceIDIcon />,
      buttonText: t('login.buttons.login_with_face_id'),
    };
  } else if (osName.startsWith('macos')) {
    return {
      prefixIcon: <FingerprintIcon />,
      buttonText: t('login.buttons.login_with_touch_id'),
    };
  } else if (deviceType === 'mobile') {
    return {
      prefixIcon: <FingerprintIcon />,
      buttonText: t('login.buttons.login_with_biometric'),
    };
  } else {
    return {
      prefixIcon: <KeyIcon />,
      buttonText: t('login.buttons.login_with_passkey'),
    };
  }
}

export function LoginFrame() {
  const { form, onSubmit: onLogin } = useLoginForm();
  const { onSubmit: onPasskeyLogin } = usePasskeyLoginForm();
  const { t } = useTranslation();
  const { prefixIcon, buttonText } = getPasskeyButtonInfo(t);

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
          <form onSubmit={onLogin} className="w-full">
            <div className="h-fit w-full">
              <LoadingOverlay show={form.formState.isSubmitting}>
                <LoginForm />
              </LoadingOverlay>
            </div>
            <div className="h-8" />
            <div className="flex w-full flex-col items-center justify-center gap-3">
              <LogClick event="auth_login_email_button">
                <Button
                  variant="primary"
                  className="w-full"
                  disabled={!form.formState.isValid}
                  loading={form.formState.isSubmitting}
                >
                  {t(`login.buttons.login`)}
                </Button>
              </LogClick>
              <div className="flex w-full items-center justify-center gap-3">
                <div className="bg-basics-tertiary-label h-0.25 w-full" />
                <span className="text-funnel-description">or</span>
                <div className="bg-basics-tertiary-label h-0.25 w-full" />
              </div>
              <LogClick event="auth_login_passkey_button">
                <Button
                  variant="default"
                  className="w-full"
                  disabled={
                    form.formState.isSubmitting || !navigator.credentials
                  }
                  prefixIcon={prefixIcon}
                  type="button"
                  onClick={onPasskeyLogin}
                >
                  {buttonText}
                </Button>
              </LogClick>
              <div className="flex w-full items-center justify-center gap-1">
                <Link to="/auth/register" search={(prev) => ({ ...prev })}>
                  <LogClick event="auth_register_button">
                    <Button
                      variant="link"
                      size="none"
                      type="button"
                      className="text-body-2 no-underline"
                    >
                      {t('login.buttons.register')}
                    </Button>
                  </LogClick>
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
