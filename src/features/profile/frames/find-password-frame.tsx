import { NewPasswordStep } from './change-password-steps/new-password-step';
import { CodeStep } from './find-password-steps/code-step';
import { CompleteStep } from './find-password-steps/complete-step';
import { EmailStep } from './find-password-steps/email-step';

import { patchUserPassword } from '@/data/patch-user-password';
import {
  Pretty,
  RequireKeys,
  UndoWarningStep,
  useFunnel,
} from '@/features/core';

type StepContext = Pretty<Partial<Parameters<typeof patchUserPassword>[0]>>;

export type FindPasswordSteps = {
  email: StepContext;
  code: RequireKeys<FindPasswordSteps['email'], 'email'>;
  newPassword: RequireKeys<FindPasswordSteps['code'], 'verificationJwtToken'>;
  complete: RequireKeys<FindPasswordSteps['newPassword'], 'password'>;
  undoOverlay: StepContext;
};

export function FindPasswordFrame() {
  const funnel = useFunnel<FindPasswordSteps>({
    id: 'change_password',
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
          onNext={(data) => history.push('code', data)}
        />
      )}
      code={({ history, context }) => (
        <CodeStep
          context={context}
          onNext={(data) => history.replace('newPassword', data)}
          onUndo={() => history.push('undoOverlay')}
        />
      )}
      newPassword={({ history, context }) => (
        <NewPasswordStep
          context={context}
          onNext={(data) => history.replace('complete', data)}
        />
      )}
      complete={() => <CompleteStep />}
      undoOverlay={funnel.Render.overlay({
        // undoOverlay -> newPassword/code -> email
        render: ({ history, close }) => (
          <UndoWarningStep onNext={() => history.go(-2)} close={close} />
        ),
      })}
    />
  );
}
