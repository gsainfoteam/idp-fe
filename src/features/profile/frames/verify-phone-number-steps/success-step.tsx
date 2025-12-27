import { useTranslation } from 'react-i18next';

import thumbsUpImg from '@/assets/icons/color/thumbs-up.png';
import { Button, FunnelLayout, LogClick } from '@/features/core';

export function SuccessStep({ onNext }: { onNext: () => void }) {
  const { t } = useTranslation();

  return (
    <FunnelLayout
      title={t('verify_phone_number.title')}
      stepTitle={t('verify_phone_number.steps.success.title')}
      hideUndo
      button={
        <LogClick event="phone_number_verify_success_button">
          <Button variant="primary" className="w-full" onClick={onNext}>
            {t('verify_phone_number.steps.success.button')}
          </Button>
        </LogClick>
      }
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <img src={thumbsUpImg} className="size-[125px] opacity-40" />
      </div>
    </FunnelLayout>
  );
}
