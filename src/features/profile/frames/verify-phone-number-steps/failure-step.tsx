import { useTranslation } from 'react-i18next';

import flashImg from '@/assets/icons/color/flash.png';
import { Button, FunnelLayout } from '@/features/core';

export function FailureStep({ onUndo }: { onUndo: () => void }) {
  const { t } = useTranslation();

  return (
    <FunnelLayout
      title={t('verify_phone_number.title')}
      stepTitle={t('verify_phone_number.steps.failure.title')}
      hideUndo
      button={
        <Button variant="primary" className="w-full" onClick={onUndo}>
          {t('verify_phone_number.steps.failure.button')}
        </Button>
      }
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <img src={flashImg} className="size-[125px] opacity-40" />
      </div>
    </FunnelLayout>
  );
}
