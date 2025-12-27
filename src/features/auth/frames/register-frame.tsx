import { useNavigate } from '@tanstack/react-router';
import { overlay } from 'overlay-kit';

import { RegisterStepUndoWarningOverlay } from '../components/register-step-undo-warning-overlay';

import { AgreeStep } from './register-steps/agree-step';
import { CompleteStep } from './register-steps/complete-step';
import { EmailCodeStep } from './register-steps/email-code-step';
import { EmailStep } from './register-steps/email-step';
import { InfoStaffStep } from './register-steps/info-staff-step';
import { InfoStep } from './register-steps/info-step';
import { PasswordStep } from './register-steps/password-step';
import { TelCodeStep } from './register-steps/tel-code-step';
import { TelSkipStep } from './register-steps/tel-skip-step';
import { TelStep } from './register-steps/tel-step';

import { type postUser } from '@/data/user';
import { type Pretty, type RequireKeys, useFunnel } from '@/features/core';
type StepContext = Pretty<Partial<Parameters<typeof postUser>[0]>>;

export const RegisterSteps = [
  'agree',
  'email',
  'emailCode',
  'tel',
  'telCode',
  'password',
  'info',
] as const;

export type RegisterSteps = {
  agree: StepContext;
  email: StepContext;
  emailCode: RequireKeys<RegisterSteps['email'], 'email'>;
  tel: RequireKeys<RegisterSteps['emailCode'], 'emailVerificationJwtToken'>;
  telCode: RequireKeys<RegisterSteps['tel'], 'phoneNumber'>;
  telSkip: RequireKeys<RegisterSteps['tel'], 'phoneNumber'>;
  password: RegisterSteps['telCode'] | RegisterSteps['telSkip'];
  info: RequireKeys<RegisterSteps['password'], 'password'>;
  infoStaff: RequireKeys<RegisterSteps['password'], 'password'>;
  complete: RequireKeys<
    RegisterSteps['info'] | RegisterSteps['infoStaff'],
    'name' | 'studentId' | 'phoneNumber'
  >;
};

export function RegisterFrame() {
  const navigate = useNavigate();
  const funnel = useFunnel<RegisterSteps>({
    id: 'register',
    initial: {
      context: {},
      step: 'agree',
    },
  });

  const undo = async () => {
    const result = await overlay.openAsync<boolean>(({ isOpen, close }) => (
      <RegisterStepUndoWarningOverlay isOpen={isOpen} close={close} />
    ));

    if (result) funnel.history.back();
  };

  return (
    <funnel.Render
      agree={({ history }) => (
        <AgreeStep onNext={() => history.replace('email')} />
      )}
      email={({ history, context }) => (
        <EmailStep
          context={context}
          onNext={(data) => history.replace('emailCode', data)}
          onUndo={undo}
        />
      )}
      emailCode={({ history, context }) => (
        <EmailCodeStep
          context={context}
          onNext={(data) => history.replace('tel', data)}
          onUndo={undo}
        />
      )}
      tel={({ history }) => (
        <TelStep
          onTelCodeNext={(data) => history.replace('telCode', data)}
          onTelSkipNext={(data) => history.replace('telSkip', data)}
          onUndo={undo}
        />
      )}
      telCode={({ history, context }) => (
        <TelCodeStep
          context={context}
          onNext={(data) => history.replace('password', data)}
          onUndo={undo}
        />
      )}
      telSkip={({ history }) => (
        <TelSkipStep
          onNext={(data) => history.replace('password', data)}
          onUndo={undo}
        />
      )}
      password={({ history, context }) => (
        <PasswordStep
          context={context}
          onStudentNext={(data) => history.replace('info', data)}
          onStaffNext={(data) => history.replace('infoStaff', data)}
          onUndo={undo}
        />
      )}
      info={({ history, context }) => (
        <InfoStep
          context={context}
          onNext={(data) => history.replace('complete', data)}
          onUndo={undo}
        />
      )}
      infoStaff={({ history, context }) => (
        <InfoStaffStep
          context={context}
          onNext={(data) => history.replace('complete', data)}
          onUndo={undo}
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
