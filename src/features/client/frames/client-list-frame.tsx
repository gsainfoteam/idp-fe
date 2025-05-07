import { useTranslation } from 'react-i18next';

import puzzleImage from '@/assets/icons/color/puzzle.png';
import { Button, FunnelLayout } from '@/features/core';

export function ClientListFrame() {
  const { t } = useTranslation();
  return (
    <FunnelLayout
      stepTitle={t('services.list.title')}
      title={t('profile.developer')}
      description={t('services.list.description')}
      button={
        <Button variant="primary" className="w-full">
          {t('services.list.add')}
        </Button>
      }
    >
      <div className="flex h-full flex-col justify-center">
        <div className="flex flex-col items-center">
          <img src={puzzleImage} className="size-[100px] opacity-40" />
          <div className="text-body-1 text-center whitespace-pre-wrap text-neutral-600">
            {t('services.list.empty')}
          </div>
        </div>
      </div>
    </FunnelLayout>
  );
}
