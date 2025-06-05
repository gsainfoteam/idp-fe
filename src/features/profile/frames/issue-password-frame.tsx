import { CompleteStep } from './issue-password-steps/complete-step';
import { EmailStep } from './issue-password-steps/email-step';

import { postUserPassword } from '@/data/post-user-password';
import { Pretty, RequireKeys, useFunnel } from '@/features/core';

type StepContext = Pretty<Partial<Parameters<typeof postUserPassword>[0]>>;

export type IssuePasswordSteps = {
  email: StepContext;
  complete: RequireKeys<IssuePasswordSteps['email'], 'email'>;
};

export function IssuePasswordFrame() {
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
          onNext={(data) => history.push('complete', data)}
        />
      )}
      // TODO: 추후에 history.cleanup 으로 변경하기, 현재 코드 오류 발생
      complete={() => <CompleteStep onNext={() => funnel.history.cleanup()} />}
    />
  );
}
