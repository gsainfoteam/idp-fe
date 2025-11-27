import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, FunnelLayout } from '@/features/core';

type ErrorFallbackFrameProps = {
  onRetry?: () => void;
  status?: number;
  message?: string;
  description?: string;
};

export function ErrorFallbackFrame({
  onRetry,
  status,
  message,
  description,
}: ErrorFallbackFrameProps) {
  const { t } = useTranslation();

  const handleRetry = useCallback(() => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  }, [onRetry]);

  return (
    <FunnelLayout
      title={t('error_fallback.title')}
      stepTitle={t('error_fallback.step_title')}
      description={description ?? t('error_fallback.description')}
      button={
        <Button className="w-full" variant="primary" onClick={handleRetry}>
          {t('error_fallback.button')}
        </Button>
      }
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="text-funnel-steptitle text-6xl font-black">
          {status ?? 'Unknown'}
        </div>
        {message && (
          <div className="text-body-2 text-basics-secondary-label whitespace-pre-line">
            {t('error_fallback.details_label')}: {message}
          </div>
        )}
      </div>
    </FunnelLayout>
  );
}
