import { postUserPassword } from '@/data/post-user-password';
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
  const navigate = useNavigate();
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
      complete={() => (
        <CompleteStep
          onNext={async () => {
            await funnel.history.cleanup();
            await navigate({
              to: '/auth/login',
              replace: true,
              viewTransition: { types: ['reload'] },
              search: (prev) => ({ ...prev }),
            });
          }}
        />
      )}
    />
  );
}
