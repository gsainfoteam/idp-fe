import { ConfirmStep } from './steps/confirm-step';
import { DoneStep } from './steps/done-step';
import { PasswordStep } from './steps/password-step';

import { useAuth } from '@/features/auth';
import { useFunnel } from '@/features/core';

export function WithdrawFrame() {
  const { signOut, user } = useAuth();
  /* assert user is not null */
  if (!user) throw new Error('User not found');
  const funnel = useFunnel<{
    password: {
      password?: string;
      name: string;
      email: string;
      studentId: string;
    };
    confirm: {
      password: string;
      name: string;
      email: string;
      studentId: string;
    };
    done: { password: string; name: string; email: string; studentId: string };
  }>({
    id: 'withdraw',
    initial: { context: user, step: 'password' },
  });

  return (
    <funnel.Render
      password={({ history }) => (
        <PasswordStep
          onNext={(password) =>
            history.push('confirm', (prev) => ({ ...prev, password }))
          }
        />
      )}
      confirm={({ history, context }) => (
        <ConfirmStep
          context={context}
          onNext={() =>
            history.push('done', (prev) => ({
              ...prev,
              password: context.password,
            }))
          }
        />
      )}
      done={({ context }) => (
        <DoneStep onNext={() => signOut()} context={context} />
      )}
    />
  );
}
