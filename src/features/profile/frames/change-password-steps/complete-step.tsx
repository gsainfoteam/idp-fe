import { useTranslation } from 'react-i18next';

import thumbsUpImg from '@/assets/icons/color/thumbs-up.png';
import { useAuth } from '@/features/auth';
import { Button, FunnelLayout } from '@/features/core';

export function CompleteStep({
  step,
  onUndo,
  onNext,
}: {
  step: string;
  onUndo: () => void;
  onNext: () => void;
}) {
  const { t } = useTranslation();
  const { user } = useAuth();

  if (!user) return null;

  return (
    <FunnelLayout
      key={step}
      onUndo={onUndo}
      title={t('change_password.title')}
      stepTitle={t('change_password.steps.complete.title')}
      hideUndo
      button={
        // signOut이 되면 자동으로 /auth/login으로 이동하도록 라우팅 되어있음
        <Button variant="primary" className="w-full" onClick={onNext}>
          {t('change_password.steps.complete.button')}
        </Button>
      }
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <img src={thumbsUpImg} className="size-[125px] opacity-40" />
      </div>
    </FunnelLayout>
  );
}
