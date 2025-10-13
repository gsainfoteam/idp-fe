import { postUserPassword } from '@/data/post-user-password';
import { useAuth } from '@/features/auth';
import { Pretty, RequireKeys, useFunnel } from '@/features/core';
import { useNavigate } from '@tanstack/react-router';

import { CompleteStep } from './issue-password-steps/complete-step';
import { EmailStep } from './issue-password-steps/email-step';

type StepContext = Pretty<Partial<Parameters<typeof postUserPassword>[0]>>;

export type IssuePasswordSteps = {
  email: StepContext;
  complete: RequireKeys<IssuePasswordSteps['email'], 'email'>;
};

export function IssuePasswordFrame() {
  const { signOut } = useAuth();
  const navigate = useNavigate({ from: '/issue-password' });
  const funnel = useFunnel<IssuePasswordSteps>({
    id: 'issue_password',
    initial: {
      context: {},
      step: 'email',
    },
  });

  return (
    <funnel.Render
      email={({ history, context }) => (
        <EmailStep
          context={context}
          onNext={(data) => history.replace('complete', data)}
        />
      )}
      // TODO: 추후에 history.cleanup 으로 변경하기
      complete={() => (
        <CompleteStep
          onNext={async () => {
            await navigate({ to: '/auth/login', replace: true });
            funnel.history.cleanup();
            await signOut();
          }}
        />
      )}
    />
  );
}
