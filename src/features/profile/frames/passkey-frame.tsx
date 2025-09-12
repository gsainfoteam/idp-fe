import { useFunnel } from '@/features/core';
import { useNavigate } from '@tanstack/react-router';
import { RegisterStep } from './passkey-steps/passkey-register-step';
import { CompleteStep } from './passkey-steps/complete-step';

export type PasskeySteps = {
  register: {};
  complete: {};
};

export function PasskeyFrame() {
  const navigate = useNavigate({ from: '/passkey' });
  const funnel = useFunnel<PasskeySteps>({
    id: 'passkey',
    initial: {
      context: {},
      step: 'register',
    },
  });

  return (
    <funnel.Render
      register={({ history }) => (
        <RegisterStep onNext={() => history.push('complete')} />
      )}
      complete={() => (
        <CompleteStep
          onNext={async () => {
            funnel.history.cleanup();
            await navigate({ to: '/' });
          }}
        />
      )}
    />
  );
}
