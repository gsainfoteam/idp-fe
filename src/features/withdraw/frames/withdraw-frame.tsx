import { useNavigate } from '@tanstack/react-router';

import { ConfirmStep } from './steps/confirm-step';
import { DoneStep } from './steps/done-step';
import { PasswordStep } from './steps/password-step';

import { useFunnel } from '@/features/core';

export function WithdrawFrame() {
  const funnel = useFunnel<{
    password: { password?: string };
    confirm: { password: string };
    done: { password: string };
  }>({
    id: 'withdraw',
    initial: { context: {}, step: 'password' },
  });
  const navigate = useNavigate();

  return (
    <funnel.Render
      password={({ history }) => (
        <PasswordStep
          onNext={(password) => history.push('confirm', { password })}
        />
      )}
      confirm={({ history }) => (
        <ConfirmStep onNext={() => history.push('done')} />
      )}
      done={({ history, context }) => (
        <DoneStep onNext={() => navigate({ to: '/auth/login' })} />
      )}
    />
  );
}
