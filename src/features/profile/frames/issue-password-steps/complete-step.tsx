import { useTranslation } from 'react-i18next';

import thumbsUpImg from '@/assets/icons/color/thumbs-up.png';
import { Button, FunnelLayout } from '@/features/core';

export function CompleteStep({ onNext }: { onNext: () => void }) {
  const { t } = useTranslation();

  return (
    <FunnelLayout
      title={t('issue_password.title')}
      stepTitle={t('issue_password.steps.complete.title')}
      hideUndo
      button={
        <Button variant="primary" className="w-full" onClick={onNext}>
          {t('issue_password.steps.complete.button')}
        </Button>
      }
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <img src={thumbsUpImg} className="size-[125px] opacity-40" />
      </div>
    </FunnelLayout>
  );
}
