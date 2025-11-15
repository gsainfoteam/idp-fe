import { useTranslation } from 'react-i18next';

import flashImg from '@/assets/icons/color/flash.png';
import { Button, FunnelLayout } from '@/features/core';

export function FailureStep({
  onCancel,
  onNext,
}: {
  onCancel: () => void;
  onNext: () => void;
}) {
  const { t } = useTranslation();

  return (
    <FunnelLayout
      title={t('verify_student_id.title')}
      stepTitle={t('verify_student_id.steps.failure.title')}
      hideUndo
      button={
        <div className="flex gap-2.5">
          <Button variant="secondary" className="w-full" onClick={onCancel}>
            {t('verify_student_id.steps.failure.buttons.cancel')}
          </Button>
          <Button variant="primary" className="w-full" onClick={onNext}>
            {t('verify_student_id.steps.failure.buttons.confirm')}
          </Button>
        </div>
      }
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <img src={flashImg} className="size-[125px] opacity-40" />
      </div>
    </FunnelLayout>
  );
}
