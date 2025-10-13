import { useFunnel } from '@/features/core';
import { useNavigate } from '@tanstack/react-router';

import { CompleteStep } from './passkey-add-steps/complete-step';
import { RegisterStep } from './passkey-add-steps/register-step';

export type PasskeySteps = {
  register: {};
  complete: {};
};

export function PasskeyAddFrame() {
  const navigate = useNavigate({ from: '/passkeys/new' });
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
        <RegisterStep onNext={() => history.replace('complete')} />
      )}
      complete={() => (
        <CompleteStep
          onNext={async () => {
            funnel.history.cleanup();
            await navigate({ to: '/passkeys', replace: true });
          }}
        />
      )}
    />
  );
}
