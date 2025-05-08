import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { RegisterSteps } from '../register-frame';

import { Avatar, Button, FunnelLayout, uniqueKey } from '@/features/core';

export function CompleteStep({
  context,
}: {
  context: RegisterSteps['complete'];
}) {
  const { t } = useTranslation();

  return (
    <FunnelLayout
      title={t('register.title')}
      stepTitle={t('register.steps.complete.title')}
      button={
        <Link to="/auth/login" search={(prev) => ({ ...prev })}>
          <Button variant="primary" className="w-full">
            {t('register.steps.complete.button')}
          </Button>
        </Link>
      }
    >
      <div className="flex h-full flex-col items-center justify-center">
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
