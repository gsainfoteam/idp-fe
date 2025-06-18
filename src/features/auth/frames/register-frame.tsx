import { CodeStep } from './register-steps/code-step';
import { CompleteStep } from './register-steps/complete-step';
import { EmailOverlayStep } from './register-steps/email-overlay-step';
import { EmailStep } from './register-steps/email-step';
import { InfoStep } from './register-steps/info-step';
import { PasswordStep } from './register-steps/password-step';

import { postUser } from '@/data/post-user';
import {
  Pretty,
  RequireKeys,
  useFunnel,
  UndoWarningOverlay,
} from '@/features/core';

type StepContext = Pretty<
  Partial<Parameters<typeof postUser>[0]> & {
    emailAgree?: boolean;
  }
>;

export type RegisterSteps = {
  email: StepContext;
  emailOverlay: RequireKeys<RegisterSteps['email'], 'email'>;
  code: RequireKeys<RegisterSteps['emailOverlay'], 'emailAgree'>;
  password: RequireKeys<RegisterSteps['code'], 'verificationJwtToken'>;
  info: RequireKeys<RegisterSteps['password'], 'password'>;
  complete: RequireKeys<
    RegisterSteps['info'],
    'name' | 'studentId' | 'phoneNumber'
  >;
  undoOverlay: StepContext;
};

export function RegisterFrame() {
  const funnel = useFunnel<RegisterSteps>({
    id: 'register',
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
          // TODO: context.emailAgree에 따라 emailOverlay 또는 code 로 이동
          onNext={(data) => history.push('emailOverlay', data)}
        />
      )}
      emailOverlay={funnel.Render.overlay({
        render: ({ context, history, close }) => (
          <EmailOverlayStep
            context={context}
            onNext={(data) => history.push('code', data)}
            close={close}
          />
        ),
      })}
      undoOverlay={funnel.Render.overlay({
        // undoOverlay -> complete/info/password/code -> emailOverlay -> email
        render: ({ history, close }) => (
          <UndoWarningOverlay onNext={() => history.go(-3)} close={close} />
        ),
      })}
      code={({ history, context }) => (
        <CodeStep
          context={context}
          onNext={(data) => history.replace('password', data)}
          onUndo={() => history.push('undoOverlay', {})}
        />
      )}
      password={({ history, context }) => (
        <PasswordStep
          context={context}
          onNext={(data) => history.replace('info', data)}
          onUndo={() => history.push('undoOverlay', {})}
        />
      )}
      info={({ history, context }) => (
        <InfoStep
          context={context}
          onNext={(data) => history.replace('complete', data)}
          onUndo={() => history.push('undoOverlay', {})}
        />
      )}
      complete={({ context }) => <CompleteStep context={context} />}
    />
  );
}
