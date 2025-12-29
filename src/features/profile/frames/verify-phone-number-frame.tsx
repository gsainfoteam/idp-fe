import { useNavigate } from '@tanstack/react-router';

import { CodeStep } from './verify-phone-number-steps/code-step';
import { FailureStep } from './verify-phone-number-steps/failure-step';
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
  failure: StepContext;
  code: RequireKeys<StepContext, 'phoneNumber'>;
  success: RequireKeys<StepContext, 'phoneNumber' | 'code'>;
};

export function VerifyPhoneNumberFrame() {
  const navigate = useNavigate();
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
    await navigate({
      to: '/profile',
      replace: true,
      viewTransition: { types: ['backwards'] },
      search: (prev) => ({ ...prev }),
    });
  };

  return (
    <funnel.Render
      tel={({ history }) => (
        <TelStep
          onSuccess={(data) => history.replace('code', data)}
          onFailure={(data) => history.replace('failure', data)}
        />
      )}
      failure={() => <FailureStep onUndo={undo} />}
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
