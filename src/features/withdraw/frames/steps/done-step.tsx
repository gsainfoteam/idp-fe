import { useTranslation } from 'react-i18next';

import thumbsUpSrc from '@/assets/icons/color/thumbs-up.png';
import { Button, FunnelLayout } from '@/features/core';

export function DoneStep({ onNext }: { onNext: () => void }) {
  const { t } = useTranslation();

  return (
    <FunnelLayout
      hideUndo
      title={t('withdraw.title')}
      stepTitle={t('withdraw.steps.done.title')}
      button={
        <Button variant="primary" className="w-full" onClick={onNext}>
          {t('withdraw.steps.done.button')}
        </Button>
      }
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <img
          src={thumbsUpSrc}
          alt="thumbs-up"
          className="size-[125px] opacity-40"
        />
      </div>
    </FunnelLayout>
  );
}
