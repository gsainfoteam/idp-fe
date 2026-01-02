import { CompleteStep } from './verify-student-id-steps/complete-step';
import { FailureStep } from './verify-student-id-steps/failure-step';
import { InfoStep } from './verify-student-id-steps/info-step';
import { NewInfoStep } from './verify-student-id-steps/new-info-step';

import { type postVerifyStudentId } from '@/data/verify';
import { useAuth } from '@/features/auth';
import { type Pretty, type RequireKeys, useFunnel } from '@/features/core';

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
  complete: RequireKeys<StepContext, 'birthDate'>;
};

export function VerifyStudentIdFrame() {
  const { refetch } = useAuth();
  const funnel = useFunnel<VerifyStudentIdSteps>({
    id: 'verify-student-id',
    initial: {
      context: {},
      step: 'info',
    },
  });

  const undo = async () => {
    await refetch();
    await funnel.history.cleanup();
  };

  return (
    <funnel.Render
      info={({ history }) => (
        <InfoStep
          onSuccess={(data) => history.replace('complete', data)}
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
