import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { CompleteStep } from './change-password-steps/complete-step';
import { CurrentPasswordStep } from './change-password-steps/current-password-step';
import { NewPasswordStep } from './change-password-steps/new-password-step';

import { patchUserPassword } from '@/data/patch-user-password';
import { useAuth, useToken } from '@/features/auth';
import { Pretty, RequireKeys, useFunnel } from '@/features/core';

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
  const { user } = useAuth();
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
    if (!user) toast.error(t('change_password.errors.user_not_found'));
    if (!token) toast.error(t('change_password.errors.token_not_found'));
  }, [user, token, t]);

  if (!user || !token) return null;

  return (
    <funnel.Render
      currentPassword={({ history, context }) => (
        <CurrentPasswordStep
          context={context}
          onNext={(data) => history.push('newPassword', data)}
        />
      )}
      newPassword={({ history, context }) => (
        <NewPasswordStep
          context={context}
          onNext={(data) => history.push('complete', data)}
        />
      )}
      complete={() => <CompleteStep />}
    />
  );
}
