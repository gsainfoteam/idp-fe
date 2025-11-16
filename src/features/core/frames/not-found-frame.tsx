import { useCallback } from 'react';

import { useRouter } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { Button } from '../components/button';
import { FunnelLayout } from '../components/funnel-layout';

export function NotFoundFrame() {
  const { t } = useTranslation();
  const router = useRouter();

  const undo = useCallback(() => {
    if (router.history.canGoBack()) {
      router.history.back();
    } else {
      router.navigate({ to: '/' });
    }
  }, [router]);

  return (
    <FunnelLayout
      title={t('not_found.title')}
      stepTitle={t('not_found.step_title')}
      description={t('not_found.description')}
      onUndo={undo}
      button={
        <Button className="w-full" variant="primary" onClick={undo}>
          {t('not_found.button')}
        </Button>
      }
    >
      <div className="text-funnel-steptitle absolute inset-0 flex flex-col items-center justify-center text-6xl font-black">
        404
      </div>
    </FunnelLayout>
  );
}
