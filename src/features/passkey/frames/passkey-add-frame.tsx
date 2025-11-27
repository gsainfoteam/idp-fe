import { useRouter } from '@tanstack/react-router';

import { CompleteStep } from './passkey-add-steps/complete-step';
import { RegisterStep } from './passkey-add-steps/register-step';

import { useFunnel } from '@/features/core';

export type PasskeySteps = {
  register: {};
  complete: {};
};

export function PasskeyAddFrame() {
  const router = useRouter();
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
            await funnel.history.cleanup();
            router.history.back();
          }}
        />
      )}
    />
  );
}
