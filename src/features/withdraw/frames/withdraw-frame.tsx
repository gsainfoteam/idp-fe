import { ConfirmStep } from './steps/confirm-step';
import { DoneStep } from './steps/done-step';
import { PasswordStep } from './steps/password-step';

import { useAuth } from '@/features/auth';
import { useFunnel } from '@/features/core';

type User = {
  name: string;
  email: string;
  studentId: string;
};

export function WithdrawFrame() {
  const { signOut, user } = useAuth();

  if (!user) throw new Error('User not found');

  const funnel = useFunnel<{
    password: { password?: string } & User;
    confirm: { password: string } & User;
    done: { password: string } & User;
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
            history.replace('done', (prev) => ({
              ...prev,
              password: context.password,
            }))
          }
        />
      )}
      done={() => (
        <DoneStep
          onNext={async () => {
            await funnel.history.cleanup();
            await signOut(false);
          }}
        />
      )}
    />
  );
}
