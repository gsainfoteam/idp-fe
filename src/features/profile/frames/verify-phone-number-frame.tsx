import { CodeStep } from './verify-phone-number-steps/code-step';
import { SuccessStep } from './verify-phone-number-steps/success-step';
import { TelStep } from './verify-phone-number-steps/tel-step';

import { type postVerifyPhoneNumber } from '@/data/verify';
import { useAuth } from '@/features/auth';
import { type Pretty, type RequireKeys, useFunnel } from '@/features/core';

type StepContext = Pretty<
  Partial<Parameters<typeof postVerifyPhoneNumber>[0] & { code: string }>
>;

export type VerifyPhoneNumberSteps = {
  tel: StepContext;
  code: RequireKeys<StepContext, 'phoneNumber'>;
  success: RequireKeys<StepContext, 'phoneNumber' | 'code'>;
};

export function VerifyPhoneNumberFrame() {
  const { refetch } = useAuth();
  const funnel = useFunnel<VerifyPhoneNumberSteps>({
    id: 'verify-phone-number',
    initial: {
      context: {},
      step: 'tel',
    },
  });

  const undo = async () => {
    await refetch();
    await funnel.history.cleanup();
  };

  return (
    <funnel.Render
      tel={({ history }) => (
        <TelStep onNext={(data) => history.replace('code', data)} />
      )}
      code={({ history, context }) => (
        <CodeStep
          context={context}
          onNext={(data) => history.replace('success', data)}
        />
      )}
      success={() => <SuccessStep onNext={undo} />}
    />
  );
}
