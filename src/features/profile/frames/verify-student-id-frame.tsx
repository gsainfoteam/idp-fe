import { useNavigate } from '@tanstack/react-router';

import { postVerifyStudentId } from '@/data/post-verify-student-id';
import { Pretty, RequireKeys, useFunnel } from '@/features/core';

import { CompleteStep } from './verify-student-id-steps/complete-step';
import { FailureStep } from './verify-student-id-steps/failure-step';
import { InfoStep } from './verify-student-id-steps/info-step';
import { NewInfoStep } from './verify-student-id-steps/new-info-step';

type StepContext = Pretty<
  Partial<
    Omit<Parameters<typeof postVerifyStudentId>[0], 'birthDate'> & {
      birthDate: Date;
    }
  >
>;

export type VerifyStudentIdSteps = {
  info: StepContext;
  failure: RequireKeys<StepContext, 'birthDate'>;
  newInfo: RequireKeys<StepContext, 'birthDate'>;
  complete: StepContext;
};

export function VerifyStudentIdFrame() {
  const navigate = useNavigate();
  const funnel = useFunnel<VerifyStudentIdSteps>({
    id: 'verify-student-id',
    initial: {
      context: {},
      step: 'info',
    },
  });

  const undo = async () => {
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
      info={({ history }) => (
        <InfoStep
          onSuccess={() => history.replace('complete')}
          onFailure={(data) => history.replace('failure', data)}
        />
      )}
      failure={({ history }) => (
        <FailureStep
          onCancel={undo}
          onNext={() => history.replace('newInfo')}
        />
      )}
      newInfo={({ history, context }) => (
        <NewInfoStep
          context={context}
          onNext={() => history.replace('complete')}
        />
      )}
      complete={() => <CompleteStep onNext={undo} />}
    />
  );
}
