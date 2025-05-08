import { useFunnel } from '@use-funnel/browser';

import { CodeStep } from './steps/code-step';
import { CompleteStep } from './steps/complete-step';
import { EmailOverlayStep } from './steps/email-overlay-step';
import { EmailStep } from './steps/email-step';
import { InfoStep } from './steps/info-step';
import { PasswordStep } from './steps/password-step';

import { postUser } from '@/data/post-user';
import { Pretty, RequireKeys } from '@/features/core';

type RegisterContext = Pretty<Partial<Parameters<typeof postUser>[0]>>;

export type RegisterSteps = {
  email: RegisterContext;
  emailOverlay: RequireKeys<RegisterSteps['email'], 'email'>;
  code: RequireKeys<RegisterSteps['email'], 'email'>;
  password: RequireKeys<RegisterSteps['code'], 'verificationJwtToken'>;
  info: RequireKeys<RegisterSteps['password'], 'password'>;
  complete: RequireKeys<
    RegisterSteps['info'],
    'name' | 'studentId' | 'phoneNumber'
  >;
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
          onNext={(data) => history.push('emailOverlay', data)}
        />
      )}
      emailOverlay={funnel.Render.overlay({
        render({ context, history, close }) {
          return (
            <EmailOverlayStep
              context={context}
              onNext={() => history.push('code', {})}
              close={close}
            />
          );
        },
      })}
      code={({ history, context }) => (
        <CodeStep
          context={context}
          onNext={(data) => history.push('password', data)}
        />
      )}
      password={({ history, context }) => (
        <PasswordStep
          context={context}
          onNext={(data) => history.push('info', data)}
        />
      )}
      info={({ history, context }) => (
        <InfoStep
          context={context}
          onNext={(data) => history.push('complete', data)}
        />
      )}
      complete={({ context }) => <CompleteStep context={context} />}
    />
  );
}
