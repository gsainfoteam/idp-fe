import { postUser } from '@/data/post-user';
import { Pretty, RequireKeys, useFunnel } from '@/features/core';
import { useNavigate } from '@tanstack/react-router';
import { overlay } from 'overlay-kit';

import { RegisterStepUndoWarningOverlay } from '../components/register-step-undo-warning-overlay';
import { CodeStep } from './register-steps/code-step';
import { CompleteStep } from './register-steps/complete-step';
import { EmailStep } from './register-steps/email-step';
import { InfoStep } from './register-steps/info-step';
import { PasswordStep } from './register-steps/password-step';

type StepContext = Pretty<
  Partial<Parameters<typeof postUser>[0]> & {
    emailAgree?: boolean;
  }
>;

export type RegisterSteps = {
  email: StepContext;
  code: RequireKeys<RegisterSteps['email'], 'email' | 'emailAgree'>;
  password: RequireKeys<RegisterSteps['code'], 'verificationJwtToken'>;
  info: RequireKeys<RegisterSteps['password'], 'password'>;
  complete: RequireKeys<
    RegisterSteps['info'],
    'name' | 'studentId' | 'phoneNumber'
  >;
};

export function RegisterFrame() {
  const navigate = useNavigate();
  const funnel = useFunnel<RegisterSteps>({
    id: 'register',
    initial: {
      context: {},
      step: 'email',
    },
  });

  const undoWarning = async () => {
    const result = await overlay.openAsync<boolean>(({ isOpen, close }) => (
      <RegisterStepUndoWarningOverlay isOpen={isOpen} close={close} />
    ));

    if (result) funnel.history.back();
  };

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
          onNext={(data) => history.push('password', data)}
          onUndo={undoWarning}
        />
      )}
      password={({ history, context }) => (
        <PasswordStep
          context={context}
          onNext={(data) => history.push('info', data)}
          onUndo={undoWarning}
        />
      )}
      info={({ history, context }) => (
        <InfoStep
          context={context}
          onNext={(data) => history.replace('complete', data)}
          onUndo={undoWarning}
        />
      )}
      complete={({ context }) => (
        <CompleteStep
          context={context}
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
