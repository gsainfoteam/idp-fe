import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { RegisterSteps } from '../register-frame';

import { Avatar, Button, FunnelLayout, uniqueKey } from '@/features/core';

export function CompleteStep({
  context,
  onNext,
}: {
  context: RegisterSteps['complete'];
  onNext: () => void;
}) {
  const { t } = useTranslation();
  const navigate = useNavigate({ from: '/auth/register' });

  return (
    <FunnelLayout
      title={t('register.title')}
      stepTitle={t('register.steps.complete.title')}
      hideUndo
      button={
        <Button
          variant="primary"
          className="w-full"
          onClick={async () => {
            await onNext();
            await navigate({ to: '/auth/login' });
          }}
        >
          {t('register.steps.complete.button')}
        </Button>
      }
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <Avatar
          size={32}
          name={context.name}
          seed={uniqueKey(context.studentId)}
        />
        <div className="mt-3 flex flex-col items-center">
          <div className="text-title-1 text-center text-neutral-950">
            {context.name}
          </div>
          <div className="text-body-1 text-center text-neutral-400">
            {context.email}
          </div>
        </div>
      </div>
    </FunnelLayout>
  );
}
