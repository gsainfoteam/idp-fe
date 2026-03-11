import { useNavigate } from '@tanstack/react-router';

import { CodeStep } from './issue-password-steps/code-step';
import { CompleteStep } from './issue-password-steps/complete-step';
import { EmailStep } from './issue-password-steps/email-step';

import { type postUserPassword } from '@/data/user';
import { type Pretty, type RequireKeys, useFunnel } from '@/features/core';

type StepContext = Pretty<Partial<Parameters<typeof postUserPassword>[0]>>;

export const IssuePasswordSteps = ['email', 'code', 'complete'] as const;

export type IssuePasswordSteps = {
  email: StepContext;
  code: RequireKeys<IssuePasswordSteps['email'], 'email'>;
  complete: RequireKeys<
    IssuePasswordSteps['code'],
    'emailVerificationJwtToken'
  >;
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
          onNext={(data) => history.replace('code', data)}
        />
      )}
      code={({ history, context }) => (
        <CodeStep
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
