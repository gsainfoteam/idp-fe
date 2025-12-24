import { useTranslation } from 'react-i18next';

import { Button, FunnelLayout, StepProgress } from '@/features/core';

export function TelSkipStep({
  onNext,
  onUndo,
}: {
  onNext: () => void;
  onUndo: () => void;
}) {
  const { t } = useTranslation();

  return (
    <FunnelLayout
      onUndo={onUndo}
      title={
        <div className="flex flex-col gap-5">
          <StepProgress currentStep={5} totalSteps={7} />
          {t('register.title')}
        </div>
      }
      stepTitle={t('register.steps.tel_skip.title')}
      button={
        <Button variant="primary" className="w-full" onClick={onNext}>
          {t('register.steps.tel_skip.button')}
        </Button>
      }
    >
      <div className="text-body-1 text-basics-secondary-label">
        {t('register.steps.tel_skip.description')}
      </div>
    </FunnelLayout>
  );
}
