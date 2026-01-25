import { useTranslation } from 'react-i18next';

import { type RegisterSteps } from '../register-frame';

import {
  Avatar,
  Button,
  FunnelLayout,
  LogClick,
  uniqueKey,
} from '@/features/core';

export function CompleteStep({
  context,
  onNext,
}: {
  context: RegisterSteps['complete'];
  onNext: () => void;
}) {
  const { t } = useTranslation();

  return (
    <FunnelLayout
      title={t('register.title')}
      stepTitle={t('register.steps.complete.title')}
      hideUndo
      button={
        <LogClick event="register_complete_button">
          <Button variant="primary" className="w-full" onClick={onNext}>
            {t('register.steps.complete.button')}
          </Button>
        </LogClick>
      }
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <Avatar size={32} seed={uniqueKey(context.studentId)}>
          {context.name.charAt(0)}
        </Avatar>
        <div className="mt-3 flex flex-col items-center">
          <div className="text-title-1 text-basics-primary-label text-center">
            {context.name}
          </div>
          <div className="text-body-1 text-basics-secondary-label text-center">
            {context.email}
          </div>
        </div>
      </div>
    </FunnelLayout>
  );
}
