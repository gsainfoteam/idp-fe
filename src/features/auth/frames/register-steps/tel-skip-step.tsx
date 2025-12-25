import { useTranslation } from 'react-i18next';

import { RegisterSteps } from '../register-frame';

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
      title={t('register.title')}
      stepTitle={
        <div className="flex flex-col items-start gap-5">
          <StepProgress
            currentStep={RegisterSteps.indexOf('telCode')}
            totalSteps={RegisterSteps.length}
          />
          {t('register.steps.tel_skip.title')}
        </div>
      }
      button={
        <Button variant="primary" className="w-full" onClick={onNext}>
          {t('register.steps.tel_skip.button')}
        </Button>
      }
    />
  );
}
