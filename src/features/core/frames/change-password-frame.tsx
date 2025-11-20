import { useEffect } from 'react';

import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { patchUserPassword } from '@/data/user';
import { useAuth, useToken } from '@/features/auth';
import { Pretty, RequireKeys, useFunnel } from '@/features/core';

import { CompleteStep } from './change-password-steps/complete-step';
import { CurrentPasswordStep } from './change-password-steps/current-password-step';
import { NewPasswordStep } from './change-password-steps/new-password-step';

type StepContext = Pretty<Partial<Parameters<typeof patchUserPassword>[0]>>;

export type ChangePasswordSteps = {
  currentPassword: StepContext;
  newPassword: RequireKeys<
    ChangePasswordSteps['currentPassword'],
    'oldPassword'
  >;
  complete: RequireKeys<ChangePasswordSteps['newPassword'], 'password'>;
};

export function ChangePasswordFrame() {
  const { user, signOut } = useAuth();
  const { token } = useToken();
  const { t } = useTranslation();
  const funnel = useFunnel<ChangePasswordSteps>({
    id: 'change_password',
    initial: {
      context: {},
      step: 'currentPassword',
    },
  });

  useEffect(() => {
    if (!user) toast.error(t('toast.invalid_user'));
    if (!token) toast.error(t('toast.invalid_token'));
  }, [user, token, t]);

  if (!user || !token) return null;

  return (
    <funnel.Render
      currentPassword={({ history, context, step }) => (
        <CurrentPasswordStep
          step={step}
          context={context}
          onNext={(data) => history.push('newPassword', data)}
          onUndo={() => history.back()}
        />
      )}
      newPassword={({ history, context, step }) => (
        <NewPasswordStep
          step={step}
          context={context}
          onNext={(data) => history.replace('complete', data)}
          onUndo={() => history.back()}
        />
      )}
      complete={({ step }) => (
        <CompleteStep
          step={step}
          onNext={async () => {
            await funnel.history.cleanup();
            await signOut(false);
          }}
        />
      )}
    />
  );
}
