import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ZodError } from 'zod';

import { Button, FunnelLayout } from '@/features/core';

type ErrorFallbackFrameProps = {
  onRetry?: () => void;
  status?: number;
  message?: string;
  description?: string;
  error?: unknown;
};

export function ErrorFallbackFrame({
  onRetry,
  status,
  message,
  description,
  error,
}: ErrorFallbackFrameProps) {
  const { t } = useTranslation();

  const resolvedMessage = (() => {
    if (error instanceof ZodError) {
      return error.issues
        .map((issue) => {
          const path = issue.path.join('.');
          return path ? `${path}: ${issue.message}` : issue.message;
        })
        .join('\n');
    }
    return message;
  })();

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
      <div className="flex flex-col items-center gap-3">
        <div className="text-funnel-steptitle text-6xl font-black">
          {status ?? 'Unknown'}
        </div>
        {resolvedMessage && (
          <div className="text-body-2 text-basics-secondary-label w-full whitespace-pre-line">
            {t('error_fallback.details_label')}: {resolvedMessage}
          </div>
        )}
      </div>
    </FunnelLayout>
  );
}
